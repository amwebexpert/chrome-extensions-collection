import { simpleHash } from '../utils/hash.utils'
import type { EmbeddingVector, Rule, SerializedRule } from './models'

const buildStorageKey = (rule: SerializedRule | Rule): string => `rule-${rule.href}`

export const storeRuleEmbeddings = async (rule: Rule): Promise<void> => {
  const key = buildStorageKey(rule)
  const serializedRule: SerializedRule = {
    href: rule.href,
    contentSha256: simpleHash(rule.content),
    embedding: rule.embedding ?? [],
  }

  chrome.storage.local.set({ [key]: serializedRule })
}

export const loadRuleEmbeddings = async (rule: Rule): Promise<EmbeddingVector | null> => {
  const key = buildStorageKey(rule)

  return new Promise((resolve) => {
    chrome.storage.local.get(key, (result) => {
      const serializedRule = result[key] as SerializedRule | undefined
      if (!serializedRule?.embedding) {
        resolve(null)
        return
      }

      if (simpleHash(rule.content) === serializedRule.contentSha256) {
        resolve(serializedRule.embedding)
      } else {
        chrome.storage.local.remove(key) // remove outdated embedding
      }
    })
  })
}