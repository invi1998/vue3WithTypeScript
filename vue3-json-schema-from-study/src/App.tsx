import { defineComponent, ref, Ref } from 'vue'
import MonacoEditor from './components/MonacoEditor'

function toJson(data: any) {
  return JSON.stringify(data, null, 2)
}

const schema = {
  type: 'string'
}



export default defineComponent({
  setup() {

    const schemaRef:Ref<any> = ref(schema)

    const handleCodeChange = (code: string) => {
      let schema:any
      try {
        schema = JSON.parse(code)
      } catch(err) {}

      schemaRef.value = schema
    }
    
    return () => {
      const code = toJson(schemaRef.value)
      return (
        <div>
          <MonacoEditor code={code} onChange={handleCodeChange} title='Schema INVI Editor'></MonacoEditor>
        </div>
      )
    }
     
  },
})
