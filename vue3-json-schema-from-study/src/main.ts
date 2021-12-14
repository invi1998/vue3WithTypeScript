import { createApp, defineComponent, h } from 'vue'
// import App from './App.vue'

import HelloWorld from './components/HelloWorld.vue'

// import img from './assets/logo.png'
const img = require('./assets/logo.png')  // eslint-disable-line
// 如果直接这么写，在ts里因为ts类型校验比较强，所以会报错ts校验不通过，这里换成requried

// 这里h其实对应的就是react里的createElement,这个其实是差不多的一个东西，他就是用来创建节点的
// 第一个参数是节点类型：比如一个div原生节点，就直接用字符串进行声明,如果我们需要创建一个hellWorld组件，那么我们直接传HelloWorld那个对象即可
// 然后第二个参数是这个节点的属性，
// 第三个参数是他子节点信息
const App = defineComponent({
  render() {
    return h('div', {id: 'app'}, [
      // h('img', {alt: 'Vue Logo', src: './assets/logo.png'}),
      h('img', {alt: 'Vue Logo', src: img}),
      h(HelloWorld, {msg: 'Welcome to Your Vue.js + TypeScript App', age:1212})
    ])
  },
})

// 然后注意这里，如果对于这种静态资源路径，比如这个图片，他没有显示出来
// 为什么？因为如果我们在templat里面去写的中src路径字符串（相对路径的地址），vue-loader是会进行一个寻址的
// 他会根据这个图片的相对地址，通过file-loader或者url-loader做webpack的loader来去加载那个图片形成一个真正的path
// 那么对于这种jsx的写法，这中肯定是不行的。所以需要使用import进行引入使用

createApp(App).mount('#app')
