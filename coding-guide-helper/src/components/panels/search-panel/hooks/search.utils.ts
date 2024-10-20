import { collectOnlineGuidelines } from '../../../../background/service-worker.utils'
import type { Rule } from '../../../../ia/models/models'
import { loadRules } from '../../../../ia/utils/guideline.collector'
import type { GuidelineNode } from '../../../../models/models'

declare global {
  interface Window {
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    ai?: any
  }
}

const ASSISTANT_ROLE = 'You are a react.js and typescript assistant and these are the coding rules:'
const EXPECTED_ACTION =
  'Give the rule (only respond with a simple number) that has the best matche to following criteria:'

export const isAssistantAvailableOnPlatform = (): boolean => !!window.ai?.assistant?.create

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
    this.rules = await loadRules(tsCodingGuidelines)
  }

  async promptAssistant(search: string): Promise<string> {
    if (!search) return ''
    if (!this.isReadyToQuery) return ''

    const prompt = this.buildPrompt(search)
    console.info('====>>> prompt', prompt)

    const assistant = await window.ai.assistant.create()
    const response = await assistant.prompt(prompt)
    await assistant.destroy()

    return response
  }
}

export const browserAssistant = new BrowserAssistant()

// ternary abuse
// many args position
// multiple values comparison
