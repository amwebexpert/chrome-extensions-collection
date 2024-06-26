export const getDocumentRoot = (): HTMLElement => {
  const root = document.getElementById('root')

  if (!root) {
    throw new Error(`"root" element not found in the document: ${document.location.href}`)
  }

  return root
}
