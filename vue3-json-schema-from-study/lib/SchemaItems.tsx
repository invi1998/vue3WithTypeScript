import { Schema, SchemaTypes } from "./types";
import { defineComponent, PropType } from "vue";
import StringFields from "./fields/StringFields";
import NumberField from "./fields/NumberField";

export default defineComponent({
  name: 'SchemaItem',
  props: {
    schema: {
      type: Object as PropType<Schema>,
      required: true
    },
    value: {
      required: true
    },
    onChange: {
      type: Function as PropType<(v:any)=>void>,
      required: true
    },
  },
  setup(props) {
    return () => {

      const {schema} = props

      // todo: 如果type没有指定，我们就需要猜测这个type

      const type = schema.type

      let Component: any

      switch(type)
      {
        case SchemaTypes.STRING: {
          Component = StringFields
          break
        }
        case SchemaTypes.NUMBER: {
          Component = NumberField
          break
        }
        default: {
          console.warn(`${type} 暂不支持`)
        }
      }

      return <Component {...props}></Component>
    }
  },
})