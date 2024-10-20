import { collectOnlineGuidelines } from '../../../../background/service-worker.utils'
import { loadRules } from '../../../../ia/utils/guideline.collector'
import type { GuidelineNode } from '../../../../models/models'

declare global {
  interface Window {
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    ai?: any
  }
}

const ASSISTANT_ROLE = 'You are a react.js and typescript assistant and these are the coding rules:'
const EXPECTED_ACTION = 'Find the most relevant rule number matching the following expression:'

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
  const allRulesAsText = rules.map((rule, index) => ({ number: index + 1, ...rule }))
  const allRulesAsJson = JSON.stringify(allRulesAsText, null, 2).trim()

  const prompt = `${ASSISTANT_ROLE}\n${allRulesAsJson}\n\n${EXPECTED_ACTION} "${search}"`
  console.info('====>>> prompt', prompt)

  // const assistant = await window.ai.assistant.create()
  // const response = await assistant.prompt(prompt)
  // console.info('====>>> assistant response', response)
}
