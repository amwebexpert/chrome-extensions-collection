import { collectOnlineGuidelines } from '../../../../background/service-worker.utils'
import { loadRules } from '../../../../ia/utils/guideline.collector'
import type { GuidelineNode } from '../../../../models/models'

declare global {
  interface Window {
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    ai?: any
  }
}

export const initGemini = async (search: string) => {
  if (!window.ai?.assistant?.create) {
    console.error('cannot create assistant')
    return
  }

  const rootNode = await collectOnlineGuidelines()
  if (!rootNode.children?.length) {
    console.error('cannot load guides', rootNode)
    return
  }

  const tsCodingGuidelines: GuidelineNode = rootNode.children[0] // 1st one is TS coding guidelines
  const rules = await loadRules(tsCodingGuidelines)
  //console.info('====>>> rules', rules)

  const prompt = `You are a coding typescript assistant and these are the coding guide rules that a reviewer is searching through: \n\n
    ${rules.map((rule, index) => `RULE ${index + 1}: ${rule.title}\n${rule.content}`).join('\n')}\n\n
    What it the rule number that matches the following search criteria? \n\n
    "${search}"`
  //console.info('====>>> prompt', prompt)

  const assistant = await window.ai.assistant.create()
  const response = await assistant.prompt(prompt)
  console.info('====>>> assistant response', response)
}
