# [Vue 中的无状态组件](https://www.cnblogs.com/qianxiaox/p/13831058.html)

## 啥是应用程序状态，为什么咱们需要它？

状态管理通常在较小的项目并不需要，但是当涉及到更大的范围时，如企业级的应用大部分需要它了。简单的说，状态是一个包含应用程序使用的最新值的对象。但是，如果咱们从结构的、更抽象的角度来看待它，就会清楚地看到，状态是复杂应该中重要一块，它使能够构建干净的体系结构，并将关注点强有力地分离开来。

通常，缺乏经验的开发人员无法预测对状态管理的需求，以及如何实现状态管理，因此很难了解状态管理的重要性。如果基于状态的组件堆积起来，它们之间的数据管理和共享将成为一场噩梦。从长远来看，拥有的基于状态的组件越多，出现的问题就越多。

如果没有使用外部包进行状态管理，那么最好尽可能少地使用基于状态的组件，而展示组件则使用围绕它们构建的状态。

 

## vue 和无状态(函数)组件

vue 中的无状态组件其实就是函数组件。但函数组件又是啥呢? 要回答这个问题，咱们首先必须理解什么是函数式编程。

与将程序分解为对象的面向对象方法不同，函数式编程鼓励将程序分解为小函数，这些小函数用于形成更高级的程序。我们创建的函数不依赖于或可以改变任何外部状态，这导致另一个观察结果，对于给定的输入，它们总是返回相同的输出。

因此，函数组件是没有状态的组件，并且可以更改它。函数组件输出总是基于给定的输入。在 Vue 方面，这类组件会根据给定的props给出不同的输出。

#### 语法

Vue 提供了一种定义函数组件的简单方法。咱们只需要给个 functional 关键字就可以。在 2.5.0 及以上版本中，如果使用了单文件组件，那么基于模板的函数式组件可以这样声明：：

```
<template functional>
  <div> 函数/无状态组件 </div>
</template>
```

或者

```
export default {
  functional: true,
  props: {
    // ...
  },
  render(createElement, context) {
    return createElement(
      'div', '函数/无状态组件'
    )
  }
}
```

> 注意：在 2.3.0 之前的版本中，如果一个函数式组件想要接收 prop，则 props 选项是必须的。在 2.3.0 或以上的版本中，你可以省略 props 选项，所有组件上的特性都会被自动隐式解析为 prop。
>
> 当使用函数式组件时，该引用将会是 htmlElement，因为他们是无状态的也是无实例的。

**需要注意的是**，传递给函数组件的惟一数据是props。这些组件是完全无状态的(没有响应数据)，它们忽略传递给它们的任何状态，并且不触发任何生命周期方法(created、mounted等等)。

而且，咱们也不能通过使用 this 关键字来访问实例，因为这些组件也是不实例化的。相反，组件需要的所有东西都是通过context提供的。在render函数中，它作为createElement方法的第二个参数传递。

组件需要的一切都是通过 context 参数传递，它是一个包括如下字段的对象：

- props：提供所有 prop 的对象
- children: VNode 子节点的数组
- slots: 一个函数，返回了包含所有插槽的对象
- scopedSlots: (2.6.0+) 一个暴露传入的作用域插槽的对象。也以函数形式暴露普通插槽。
- data：传递给组件的整个数据对象，作为 createElement 的第二个参数传入组件
- parent：对父组件的引用
- listeners: (2.3.0+) 一个包含了所有父组件为当前组件注册的事件监听器的对象。这是 data.on 的一个别名。
- injections: (2.3.0+) 如果使用了 inject 选项，则该对象包含了应当被注入的属性。

 

## 为什么咱们需要无状态组件

到目前为止，咱们已经了解到函数组件是无状态的，在它们的核心中，它们只是可执行的函数，接受一些输入并根据其提供输出。

就它们的用法而言，因为函数式组件只是函数，所以渲染开销也低很多，这也意味着它们是非常高效的，不需要花太多时间渲染。同时，考虑高阶组件，它们不需要任何状态，它们所要做的就是用额外的逻辑或样式包装给定的子组件。

接下来，通例事例展示一样啥时使用函数组件，函数组件非常适合此类任务。

 

## 实例

在这个示例中，咱们创建一个panel组件，它充当一个包装器，并提供所需的样式。子组件将在panel 主体中渲染：

```jsx
export default {
  name: 'panel',
  functional: true,
  props: {
    title: String
  },
  render(createElement, context) {
    const slots = context.slots();

    const header = createElement('header', {
      attrs: { class: 'panel-header'}
    }, context.props.title);
    
    const body = createElement('main', {
      attrs: { class: 'panel-body'}
    }, slots.default);

    return createElement('section', {
      attrs: { class: 'panel' }
    }, [header, body]);
  }
}
```

如上所述，此组件的唯一目的是提供类似于面板(卡片)的样式，它有header 和main元素，分别保存面板标题和html内容。整个过程是通过使用render函数中的createElement参数在中完成。createElement是 **Vue** 核心中实现的虚拟 Dom 系统的一部分。

**虚拟 DOM**

Vue 通过建立一个虚拟 DOM 来追踪自己要如何改变真实 DOM。请仔细看这行代码：

```js
return createElement('h1', this.blogTitle)
```

createElement 到底会返回什么呢？其实不是一个实际的 DOM 元素。它更准确的名字可能是 createNodeDescription，因为它所包含的信息会告诉 Vue 页面上需要渲染什么样的节点，包括及其子节点的描述信息。我们把这样的节点描述为“虚拟节点 (virtual node)”，也常简写它为“**VNode**”。“虚拟 DOM”是我们对由 Vue 组件树建立起来的整个 VNode 树的称呼。

**createElement 参数**

接下来你需要熟悉的是如何在 createElement 函数中使用模板中的那些功能。这里是 createElement 接受的参数：

```jsx
// @returns {VNode}
createElement(
  // {String | Object | Function}
  // 一个 HTML 标签名、组件选项对象，或者
  // resolve 了上述任何一种的一个 async 函数。必填项。
  'div',

  // {Object}
  // 一个与模板中属性对应的数据对象。可选。
  {
    // (详情见下一节)
  },

  // {String | Array}
  // 子级虚拟节点 (VNodes)，由 `createElement()` 构建而成，
  // 也可以使用字符串来生成“文本虚拟节点”。可选。
  [
    '先写一些文字',
    createElement('h1', '一则头条'),
    createElement(MyComponent, {
      props: {
        someProp: 'foobar'
      }
    })
  ]
)
```

面板 css 样式如下：

```css
.panel {
  margin-bottom: .5rem
}

.panel, .panel-header {
    border: 1px solid #d3d3d3;
    border-radius: 4px;
}

.panel-header, .panel-body, .panel {
  padding: .5rem;
}

.panel-header {
  background-color:#efefef;
  color: #eeeee
}
```

这是一个简单直接的 css，提供了一些padding 和color。

#### 子组件

现在，为了让例子更加生动为此，咱们再创建两个附加组件，一个显示汽车列表，另一个只是一个简单lorem-ipsum的文本组件，要求它们具有相同的面板样式和外观。

**列表组件：**

```js
export default {
  name: 'cars',
  props: {
    data: Array
  }
}
```

**template：**

```vue
<template>
  <ul>
    <li v-for="car in data" :key="car">{{car}}</li>
  </ul>
</template>
```

**文本组件：**

```js
export default {
  name: 'lorem-ipsum'
}
```

template:

```vue
<template>
  <p>
   终身学习者，终身学习者，终身学习者，终身学习者，终身学习者
  </p>
</template>
```

现在，有了可用的子组件，咱们所需要做的就是用panel组件将它们封装到应用程序中，如下所示：

```html
<div class="vue-app">
  <panel :title="'Car Manufacturers'">
    <cars :data="['Mazda', 'Ford', 'Mercedes']"></cars>
  </panel>
  <panel :title="'Lorem Ipsum'">
    <lorem-ipsum></lorem-ipsum>
  </panel>
</div>
```

> 请注意，使用这些组件是因为示例比较简单。在实际应用中，它可以是任何类型的组件。



## 完整代码

**hmtl**

```html
<div class="vue-app">
  <panel :title="'Car Manufacturers'">
    <cars :data="['Mazda', 'Ford', 'Mercedes']"></cars>
  </panel>
  <panel :title="'Lorem Ipsum'">
    <lorem-ipsum></lorem-ipsum>
  </panel>
</div>

<script type="text/x-template" id="cars">
  <template>
    <ul>
      <li v-for="car in data" :key="car">{{car}}</li>
    </ul>
  </template>
</script>

<script type="text/x-template" id="lorem-ipsum">
  <template>
    <p>前端小智， 终身学习者，终身学习者，终身学习者，终身学习者，终身学习者</p>
  </template>
</script>
```

**css**

```less
body {
  padding: .5rem
}

* {
  padding: 0;
  margin:0;
  box-sizing: border-box;
}

.panel {
  margin-bottom: .5rem
}

.panel, .panel-header {
    border: 1px solid #d3d3d3;
    border-radius: 4px;
}

.panel-header, .panel-body, .panel {
  padding: .5rem;
}

.panel-header {
  background-color:#efefef;
  color: #eeeee
}

ul {
  list-style: none;
}

ul > li {
  padding: .5rem .2rem
}
```

**js**

```jsx
// the wrapper panel
const panel = {
  functional: true,
  name: "panel",
  props: {
    title: String
  },
  render(createElement, context) {
    const slots = context.slots();

    const header = createElement('header', {
      attrs: { class: 'panel-header'}
    }, context.props.title);
    
    const body = createElement('main', {
      attrs: { class: 'panel-body'}
    }, slots.default);

    return createElement('section', {
      attrs: { class: 'panel' }
    }, [header, body]);
  }
}

// sample components

const cars = {
  name: 'cars',
  template: '#cars',
  props: {
    data: Array
  }
}

const loremIpsum = {
  name: 'lorem-ipsum',
  template: '#lorem-ipsum'
}

new Vue({
  el: '.vue-app',
  components: {
    panel,
    cars,
    'lorem-ipsum': loremIpsum
  }
});
```