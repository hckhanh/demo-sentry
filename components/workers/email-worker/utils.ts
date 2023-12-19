import { render, renderFile } from "squirrelly";
import {compile} from 'handlebars'
import {file} from 'bun'

const templates: {[fileName: string]: string} = {

}

export async function asyncRenderFile(filename: string, data: object) {
  const templateString = await file(`./emails/${filename}.xml`).text()
  const template = compile(templateString);
  
  return template({})
}
