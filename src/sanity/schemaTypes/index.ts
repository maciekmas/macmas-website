import { type SchemaTypeDefinition } from 'sanity'
import { projectType } from './projectType'
import { serviceType } from './serviceType'
import { aboutType } from './aboutType'
import { settingsType } from './settingsType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [projectType, serviceType, aboutType, settingsType],
}
