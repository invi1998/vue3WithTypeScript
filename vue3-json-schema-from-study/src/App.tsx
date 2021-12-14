import { defineComponent, reactive, ref } from 'vue'
// import App from './App.vue'

import HelloWorld from './components/HelloWorld.vue'
const img = require('./assets/logo.png')  // eslint-disable-line

function renderHelloWorld(num: number) {
  return <HelloWorld age={num} msg="test"></HelloWorld>
}

export default defineComponent({
  setup() {
    const state = reactive({ name: 'duoyi' })

    const numberRef = ref(1)

    const numHello = ref(100)

    setInterval(() => {
      state.name += '-/'
      numberRef.value += 1
    }, 1000)

    // const number = numberRef.value

    return () => {
      const number = numberRef.value

      return (
        <div id="app">
          <img src={img} alt="Vue Logo"></img>
          <HelloWorld
            msg="Welcome to Your Vue.js + TypeScript App"
            age={1243}
          ></HelloWorld>
          <h1>{state.name + numberRef.value}</h1>
          <h2>{number}</h2>
          <input type="number" v-model={numHello.value} />
          {renderHelloWorld(numHello.value)}
        </div>
      )
    }
  },
})
