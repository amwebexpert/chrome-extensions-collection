import { collectOnlineGuidelines } from '../background/service-worker.utils'
import type { GuidelineNode } from '../models/models'
import { isAvoidOrPreferTitle } from './guideline.collector'
import type { Rule } from './models'

declare global {
  interface Window {
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    ai?: any
  }
}

const ASSISTANT_ROLE = 'You are a react.js and typescript assistant and these are the coding rules:'
const EXPECTED_ACTION =
  'Give the one rule number (only the number) that matches the following search query:'

export const isAssistantAvailableOnPlatform = (): boolean => !!window.ai?.assistant?.create

const extractFullRule = (node: GuidelineNode): Rule => {
  const { title, href } = node

  const content = node.children
    .filter(({ title }) => isAvoidOrPreferTitle(title))
    .map(({ title }) => title)
    .join('\n')

  return { title, href, content }
}

const loadRules = (guidelineNode: GuidelineNode): Rule[] => {
  const rules: Rule[] = []
  for (const child of guidelineNode.children) {
    rules.push(extractFullRule(child))
  }

  return rules
}

class BrowserAssistant {
  rules: Rule[] = []

  get hasRules(): boolean {
    return !!this.rules.length
  }

  get isReadyToQuery(): boolean {
    return isAssistantAvailableOnPlatform() && this.hasRules
  }

  get allRulesAsJson(): string {
    const allRules = this.rules
      .map((rule, index) => ({
        number: index + 1,
        title: rule.title,
        content: rule.content,
      }))
      .slice(0, 5) // limit to 5 rules otherwise it's too much info for the gemini nano (for now)

    return JSON.stringify(allRules, null, 2)
  }

  buildPrompt(search: string): string {
    return `${ASSISTANT_ROLE}\n${this.allRulesAsJson}\n\n${EXPECTED_ACTION} "${search}"`
  }

  async init() {
    if (!isAssistantAvailableOnPlatform()) throw Error('Assistant not available')
    if (this.isReadyToQuery) return

    const rootNode = await collectOnlineGuidelines() // TODO get from local storage cache

    if (!rootNode.children?.length) throw Error('Cannot load guidelines')

    const tsCodingGuidelines: GuidelineNode = rootNode.children[0] // 1st one is TS coding guidelines
    this.rules = loadRules(tsCodingGuidelines)
  }

  async promptAssistant(search: string): Promise<Rule | undefined> {
    if (!search) return undefined
    if (!this.isReadyToQuery) return undefined

    const prompt = this.buildPrompt(search)
    console.info('====>>> prompt', prompt)

    const assistant = await window.ai.assistant.create()
    const response = await assistant.prompt(prompt)
    await assistant.destroy()

    const ruleNumber: number = +response - 1
    if (Number.isNaN(ruleNumber)) return undefined

    return this.rules[ruleNumber]
  }
}

export const browserAssistant = new BrowserAssistant()

// ternary abuse
// many args position
// multiple values comparison
