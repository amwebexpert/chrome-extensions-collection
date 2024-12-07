import * as fs from 'node:fs'
import * as os from 'node:os'
import * as path from 'node:path'

export const normalizeFilename = (filename: string): string => filename.replace(/[/\\?%*:|"<>]/g, '-')

type WriteLocalTextFile = {
  title: string
  content: string
}

export const writeLocalTextFile = async ({ title, content }: WriteLocalTextFile): Promise<string> => {
  const filename = normalizeFilename(title)
  const dir = `${os.homedir()}/markdowns`
  const filePath = path.join(dir, `${filename}.md`)

  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })

  console.info('====>>> writing rule content', filePath)
  fs.writeFileSync(filePath, content)

  return filePath
}
