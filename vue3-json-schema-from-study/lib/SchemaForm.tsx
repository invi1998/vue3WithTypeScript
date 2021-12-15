import { defineComponent, PropType } from "vue";
import { Schema, SchemaTypes } from "./types";
import SchemaItem from './SchemaItems'

export default defineComponent({

  props: {
    schema: {
      type: Object as PropType<Schema>,
      required: true
    },
    value: {
      required: true
    },
    onChange: {
      type: Function as PropType<(v:any) => void>,
      required: true
    }
  },


  name: 'SchemaFrom',
  setup(props, {slots, emit, attrs}) {
    return () => {
      const handleChange = (v:any) => {
        props.onChange(v)
      }
      const {schema, value} = props
      
      return (
        <SchemaItem schema={schema} value={value} onChange={handleChange}></SchemaItem>
      )
    }
  }
})