import { compile } from 'handlebars'

const templates: { [fileName: string]: HandlebarsTemplateDelegate } = {}

export async function asyncRenderFile(filename: string, data: object) {
  if (templates[filename]) return templates[filename](data)

  const filePath = await import.meta.resolve(`./emails/${filename}.xml`)
  const templateString = await Bun.file(filePath).text()
  const template = compile(templateString)
  templates[filename] = template

  return template(data)
}
