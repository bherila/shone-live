import {
  DEFINITIONS_KEY,
  ObjectDefinition,
  Property,
  RefProperty,
} from './interfaces'
import { CodeBuilder, CodeFile } from '@elg/tscodegen'
import Pluralize from 'pluralize'
import path from 'path'
import fs from 'fs'
import { dashed, underscored, camelCase } from './nameHelpers'

export const outputDir = './src/nest/__generated__'

function mapSwaggerToJsType(prop: Property, name: string) : string {
  if (!prop.type) {
    return 'string'
  }
  if (prop.format === 'date-time') {
    return 'Date'
  }
  if (prop.type === 'integer') {
    return 'number'
  }
  if (prop.type === 'array') {
    console.warn(`⚠️ Warning: Generating array property ${name} as string`)
    return 'string' // TODO: Provide better type here.
  }
  if (prop.type.indexOf(DEFINITIONS_KEY) === 0) {
    return prop.type.substr(DEFINITIONS_KEY.length).replace(/ /g, '')
  }
  return prop.type
}

function genFieldContents(key: string, desc: string) {
  return (fieldBlock: CodeBuilder) => {
    fieldBlock.addLine(`name: '${key}',`)
    if (desc) {
      fieldBlock.addLine(`description: '${desc}',`)
    }
    return fieldBlock
  }
}

export function processObjectDefinition(name: string, type: ObjectDefinition) {
  const simpleName = name.replace(/ /g, '')
  const dashName = dashed(simpleName)
  const underscoreName = underscored(simpleName)
  const camelName = simpleName.replace(/^[A-Z]/, (m) => m.toLowerCase())
  const pluralName = Pluralize(simpleName, 2)
  console.info(`processing ${simpleName} => ${dashName}.*`)

  const dirname = path.join(outputDir, dashName)
  fs.mkdirSync(dirname, { recursive: true })

  const propertyNames = Object.keys(type.properties || {})
  const refTypeImports = [
    ...new Set(
      propertyNames.map((key) => {
        const refType = (type.properties[key] as RefProperty)?.$ref
        if (!refType) {
          return null
        }
        const mappedType = mapSwaggerToJsType(type.properties[key], key)
        if (['string', 'array'].indexOf(mappedType) !== -1) {
          return null
        }
        const mappedTypeDashName = dashed(mappedType)
        return `import { ${mappedType} } from '../${mappedTypeDashName}/${mappedTypeDashName}.entity'`
      }),
    ),
  ].join('\n')

  // module
  new CodeFile(path.join(dirname, dashName + '.module.ts'))
    .build((builder) =>
      builder
        .add(
          `
    import { Module } from '@nestjs/common'
    import { TypeOrmModule } from '@nestjs/typeorm'

    import { ${pluralName}Repository } from './${dashName}.repository'
    import { ${pluralName}Resolver } from './${dashName}.resolver'
    import { ${pluralName}Service } from './${dashName}.service'
    import { ${simpleName} } from './${dashName}.entity'

    @Module({
        imports: [TypeOrmModule.forFeature([${simpleName}, ${pluralName}Repository])],
        providers: [${pluralName}Service, ${pluralName}Resolver],
    })
    `,
        )
        .addBlock(`export class ${pluralName}Module`, (module) => {
          // module.addManualSection("module", (manual) => manual.addLine())
          return module
        })
        .format(),
    )
    .lock()
    .saveToFile()

  // repository
  new CodeFile(path.join(dirname, dashName + '.repository.ts'))
    .build((builder) =>
      builder
        .addLine(`import { EntityRepository, Repository } from 'typeorm'`)
        .addLine(`import { ${simpleName} } from './${dashName}.entity'`)
        .addLine(refTypeImports)
        .addLine(`@EntityRepository(${simpleName})`)
        .addLine(
          `export class ${pluralName}Repository extends Repository<${simpleName}> {}`,
        ),
    )
    .lock()
    .saveToFile()

  // resolver
  new CodeFile(path.join(dirname, dashName + '.resolver.ts'))
    .build((builder) =>
      builder
        .add(
          `
  import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
  
  import { PaginationQueryDto } from '../../common/dto/pagination-query.dto'
  import { ${pluralName}Service } from './${dashName}.service'
  import { ${simpleName} } from './${dashName}.entity'
  
  @Resolver(() => ${simpleName})
  export class ${pluralName}Resolver {
    constructor(private readonly ${pluralName}Service: ${pluralName}Service) {}
    
    @Query(() => ${simpleName}, { nullable: true })
    ${camelName}EntId(@Args('${camelName}EntId') ${camelName}EntId: string /* UUID */) {
      return this.${pluralName}Service.getByEntId(${camelName}EntId)
    }
    
    @Query(() => [${simpleName}])
    ${Pluralize(camelName, 2)}(
      @Args('paginationQuery') paginationQuery: PaginationQueryDto,
    ): Promise<${simpleName}[]> {
      return this.${pluralName}Service.findAll(paginationQuery)
    }
    
    // @Mutation(() => ${simpleName})
    // async add${simpleName}(@Args('email') email: string) {
    //   return await this.${pluralName}Service.create({
    //     email,
    //   })
    // }
  `,
        )
        .addManualSection('RESOLVERS', (sb) =>
          sb.add('// Add custom resolver here?'),
        )
        .add('}')
        .format(),
    )
    .lock()
    .saveToFile()

  // service
  new CodeFile(path.join(dirname, dashName + '.service.ts'))
    .build((builder) =>
      // Prepare ref (imports)

      builder
        .addLine(
          `
import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { PaginationQueryDto } from '../../common/dto/pagination-query.dto'
import { ${pluralName}Repository } from './${dashName}.repository'
import { Create${simpleName}Dto } from './create-${dashName}.dto'
import { ${simpleName} } from './${dashName}.entity'

@Injectable()
export class ${pluralName}Service {
  constructor(
    @InjectRepository(${simpleName})
    private readonly ${pluralName}Repository: ${pluralName}Repository,
  ) {}

  findAll(paginationQuery: PaginationQueryDto) {
    const { limit, offset } = paginationQuery
    return this.${pluralName}Repository.find({
      skip: offset,
      take: limit,
    })
  }

  async getByEntId(entId: string): Promise<${simpleName}> {
    const ${simpleName} = await this.${pluralName}Repository.findOne(entId)
    if (!${simpleName}) {
      throw new NotFoundException(\`${simpleName} entId: \${entId} not found\`)
    }
    return ${simpleName}
  }
  
  async getCreatedAfter(createdAfter: Date): Promise<${simpleName}[]> {
    return await this.${pluralName}Repository.createQueryBuilder()
        .where('ent_created > :dt', {dt: createdAfter})
        .getRawMany();
  }
  
  async create(create${simpleName}Dto: Create${simpleName}Dto): Promise<${simpleName}> {
    const ${simpleName} = this.${pluralName}Repository.create(
      create${simpleName}Dto,
    )
    return this.${pluralName}Repository.save(
      ${simpleName},
      {transaction: false}
    )
  }
  
  async createBulk(create${simpleName}Dto: Create${simpleName}Dto[]): Promise<${simpleName}[]> {
    const ${simpleName} = this.${pluralName}Repository.create(
      create${simpleName}Dto,
    )
    return this.${pluralName}Repository.save(
      ${simpleName},
      {transaction: false}
    )
  }

  async removeByEntId(entId: string): Promise<${simpleName}> {
    const ${simpleName} = await this.getByEntId(entId)
    return this.${pluralName}Repository.softRemove(${simpleName})
  }
  `,
        )
        .addManualSection('CUSTOM_SERVICE', (x) => x)
        .add('}')
        .format(),
    )
    .lock()
    .saveToFile()

  // dto
  new CodeFile(path.join(dirname, 'create-' + dashName + '.dto.ts'))
    .build((builder) =>
      builder
        .add(refTypeImports)
        .add(
          `
  import { Field, InputType } from '@nestjs/graphql'
import { IsEmail, IsString, IsInt, IsDate, MinLength, MaxLength, Matches } from 'class-validator'

@InputType()
export class Create${simpleName}Dto
  `,
        )
        .addBlock('', (classBuilder) => {
          /*
        @Field()
        @IsString()
        @IsEmail()
        readonly email: string
      */
          classBuilder.addManualSection(
            'CUSTOM_PROPERTIES',
            (manualSectionBuilder) =>
              manualSectionBuilder.add('// Add any custom properties you need'),
          )

          propertyNames.forEach((key) => {
            const property = type.properties[key]
            if (!!property.dtoExclude) {
              return
            }
            const desc = (property.description || '').replace(/'/g, "\\'")
            const jsType = mapSwaggerToJsType(property, key)
            classBuilder
              .addLine()
              .addLine('// Gen from: ' + JSON.stringify(property))
              .addBlock(`@Field(`, genFieldContents(key, desc))
              .add(')')
            if (property.type === 'string') {
              classBuilder.addLine('@IsString()')

              if (typeof property.max_length !== 'undefined') {
                classBuilder.addLine(`@MaxLength(${property.max_length})`)
              }
              if (typeof property.min_length !== 'undefined') {
                classBuilder.addLine(`@MinLength(${property.min_length})`)
              }
              if (typeof property.pattern !== 'undefined') {
                classBuilder.addLine(`@Matches("${property.pattern}")`)
              }
              if (property.format === 'date-time') {
                classBuilder.addLine('@IsDate()')
              }
            }
            if (key.toLowerCase().indexOf('email') !== -1) {
              classBuilder.addLine('@IsEmail()')
            }
            if (property.type === 'integer') {
              classBuilder.addLine('@IsInt()')
            }
            classBuilder
              //.addManualSection(key, (sectionBuilder) => sectionBuilder)
              .addLine(`readonly ${camelCase(key)}?: ${jsType}`)
          })

          return classBuilder
        })
        .format(),
    )
    .lock()
    .saveToFile()

  // entity
  new CodeFile(path.join(dirname, dashName + '.entity.ts'))
    .build((builder) =>
      builder
        .add(
          `
          import { Field, ObjectType } from '@nestjs/graphql'
          import {
            Column, JoinColumn,
            CreateDateColumn, UpdateDateColumn,
            Entity,
            PrimaryGeneratedColumn,
          } from 'typeorm'
          `,
        )
        .add(refTypeImports)
        .addBlock(
          `
          @ObjectType()
          @Entity({name: '${underscoreName}'})
          export class ${simpleName}`,
          (classBuilder) => {
            classBuilder.addLine(`
            @Field({name: 'ent_id', description: 'Global unique ID for this entity (within SHONE)'})
            @PrimaryGeneratedColumn('uuid', {name: 'ent_id'}) readonly entId: string
          `)
            classBuilder.addLine(`
            @Field({name: 'ent_created', description: 'Date this entity was created'})
            @CreateDateColumn({name: 'ent_created', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)', nullable: false, })
            readonly entCreated: Date
          `)
            classBuilder.addLine(`
            @Field({name: 'ent_updated', description: 'Date this entity was updated'})
            @UpdateDateColumn({name: 'ent_updated', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)', nullable: false, })
            readonly entUpdated: Date
          `)

            classBuilder.addManualSection(
              'CUSTOM_PROPERTIES',
              (manualSectionBuilder) =>
                manualSectionBuilder.add(
                  '// Add any custom properties you need',
                ),
            )

            propertyNames.map((key) => {
              const property = type.properties[key]
              const desc = (property.description || '').replace(/'/g, "\\'")
              const jsType = mapSwaggerToJsType(property, key)
              classBuilder
                .addLine()
                .addLine('// Gen from: ' + JSON.stringify(property))
                .addBlock(`@Field(`, genFieldContents(key, desc))
                .add(')')
              if ((property as RefProperty)?.$ref) {
                classBuilder
                  .addBlock(`@JoinColumn(`, (fieldBlock) => {
                    fieldBlock.addLine(`name: '${key}_id',`)
                    return fieldBlock
                  })
                  .add(')')
              } else {
                classBuilder
                  .addBlock(`@Column(`, (fieldBlock) => {
                    fieldBlock.addLine(`name: '${key}',`)
                    if (property.type === 'integer') {
                      fieldBlock.addLine(`type: 'bigint',`)
                    }
                    if (property.type === 'string') {
                      fieldBlock.addLine(`type: 'text',`)
                    }
                    return fieldBlock
                  })
                  .add(')')
              }
              classBuilder.addLine(`${camelCase(key)}: ${jsType}`)
            })
            return classBuilder
          },
        )
        .format(),
    )
    .lock()
    .saveToFile()
}
