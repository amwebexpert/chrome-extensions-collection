import * as fs from 'node:fs'
import * as os from 'node:os'
import * as path from 'node:path'

export const normalizeFilename = (filename: string): string => filename.replace(/[/\\?%*:|"<>]/g, '-')

type WriteLocalTextFile = {
  title: string
  content: string
}

export const writeLocalTextFile = ({ title, content }: WriteLocalTextFile): string => {
  console.info(`====>>> ${title}:`, content)

  const filename = normalizeFilename(title)
  const dir = `${os.homedir()}/markdowns`
  const filePath = path.join(dir, `${filename}.md`)

  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })

  fs.writeFileSync(filePath, content)

  return filePath
}
