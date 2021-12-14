<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>{{ age }}</h2>
    <h3>{{ name }}</h3>
    <h4>{{ name2 }}</h4>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watchEffect } from 'vue'

const PropsType = {
  msg: String,
  age: {
    type: Number,
    requried: true,
  },
} as const

export default defineComponent({
  name: 'HelloWorld',
  // props: {
  //   msg: String,
  //   age: {
  //     type: Number,
  //     requried: true,
  //   },
  // },
  props: PropsType,
  setup() {
    const nameRef = ref('invi')

    setInterval(() => {
      // state.name += 'ts'
      nameRef.value += 'ts'
    }, 1000)

    const computedName = computed(() => {
      return nameRef.value + '0'
    })

    watchEffect(() => {
      console.log(nameRef.value)
    })

    return {
      name: nameRef,
      name2: computedName,
    }
  },
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
