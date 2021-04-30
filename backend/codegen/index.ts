import { CodeFile } from '@elg/tscodegen'
import * as violet from './violet-swagger.json'
import path from 'path'
import Pluralize from 'pluralize'
import { EntSchema } from './entschema'
import { outputDir, processObjectDefinition } from './processObjectDefinition'
import { dashed } from './nameHelpers'
const violetDefinitions = Object.keys(violet.definitions)

const violetObjects = violetDefinitions.filter(
  (d) => (violet as any).definitions[d].type === 'object',
)
violetObjects.sort()
violetObjects.map((key) =>
  processObjectDefinition(key, (violet as any).definitions[key]),
)

const shoneObjects = []

shoneObjects.push(
  new EntSchema('EntShow')
    .ownedByUser()
    .stringProp('title', 'title of the show')
    .stringProp('description', 'description of the show')
    .stringProp('start_date', 'date and time the show will start (store in UTC')
    .stringProp('end_date', 'date and time the show will end (store in UTC)'),
)

shoneObjects.push(
  new EntSchema('EntShowSegment')
    .ownedByUser()
    .parentRef('show', 'EntShow')
    .stringProp(
      'title',
      'title of the show segment, for shows with 1 segment this can be null',
    )
    .stringProp('description', 'description of the show segment'),
)

shoneObjects.push(
  new EntSchema('EntBrand')
    .ownedByUser()
    .stringProp('brand_name', 'name of the brand')
    .stringProp('brand_url', "URL to the brand's website")
    .stringProp('brand_ig_url', 'URL to the brand instagram page')
    .stringProp('brand_fb_url', 'URL to the brand facebook page'),
)

shoneObjects.push(
  new EntSchema('EntProduct').ownedByUser().stringProp('product_name'),
)

shoneObjects.forEach((def) => processObjectDefinition(def.type, def))

new CodeFile(path.join(outputDir, 'modules.ts'))
  .build((builder) => {
    const later: string[] = []
    violetObjects.forEach((key) => {
      const simpleName = key.replace(/ /g, '')
      const pluralName = Pluralize(simpleName)
      const dashName = dashed(simpleName)
      builder.addLine(
        `import {${pluralName}Module} from './${dashName}/${dashName}.module'`,
      )
      later.push(pluralName + 'Module')
    })
    builder
      .addLine()
      .addLine('const nestModules = [' + later.join(',') + '];')
      .addLine('export default nestModules;')
    return builder.format()
  })
  .lock()
  .saveToFile()

new CodeFile(path.join(outputDir, 'entities.ts'))
  .build((builder) => {
    const later: string[] = []
    violetObjects.forEach((key) => {
      const simpleName = key.replace(/ /g, '')
      const dashName = dashed(simpleName)
      builder.addLine(
        `import {${simpleName}} from './${dashName}/${dashName}.entity'`,
      )
      later.push(simpleName)
    })
    builder
      .addLine()
      .addLine('const entities = [' + later.join(',') + '];')
      .addLine('export default entities;')
    return builder.format()
  })
  .lock()
  .saveToFile()
