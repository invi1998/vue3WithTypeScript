// require("ajv-formats")(ajv)
const Ajv = require("ajv")
const ajv = new Ajv({allErrors: true})

require('ajv-errors')(ajv)

const localize = require("ajv-i18n")

const addFormats = require("ajv-formats")
addFormats(ajv)


const schema = {
  type: "object",
  properties: {
    name: {
      type: 'string',
      // format: 'email',
      test: true,
      errorMessage: {
        type: '必须是字符串',
        minLength: '长度不能小于10'
      },
      minLength: 10
    },
    age: {
      type: 'integer',
      testCmpile: 333,
      errorMessage: '校验失败（不通过）'
    },
    pets: {
      type: 'array',
      items: {
        type: 'string'
      }
    },
    isWorker: {
      type: 'boolean'
    }
  },
  required: ['name', 'age']
}

ajv.addKeyword('test', {
  // validate(schema, data) {
  //   console.log(schema, data, '----------------------')
  //   if (schema === true)
  //     return true
  //   return schema.length === 6
  // },
  macro() {
    return {
      minLength: 10
    }
  }
})

ajv.addKeyword('testCmpile', {
  // compile(sch, parentSchema) {
  //   console.log('sch, parentSchema = ' , sch, parentSchema)
  //   return () => true
  // },
  metaSchema: {
    type: 'integer',
  }
})

const data = {
  name: 'invi.com',
  age: 32,
  pets: ['dog', 'cat'],
  isWorker: true
}
const valid = ajv.validate(schema, data)
if (!valid) {
  localize.zh(ajv.errors)
  console.log(ajv.errors)
}