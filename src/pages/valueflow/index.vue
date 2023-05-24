<template>
  <div style="border: 1px solid #ccc">
    <Toolbar style="border-bottom: 1px solid #ccc" :editor="editorRef" :defaultConfig="toolbarConfig" :mode="mode" />
    <Editor style="height: 500px; overflow-y: hidden;" v-model="valueHtml" :defaultConfig="editorConfig" :mode="mode"
      @onCreated="handleCreated" @onChange="handleChange" @onDestroyed="handleDestroyed" @onFocus="handleFocus"
      @onBlur="handleBlur" @customAlert="customAlert" @customPaste="customPaste" />
  </div>
</template>
<script setup>
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'

    // 编辑器实例，必须用 shallowRef
    const editorRef = shallowRef()
    const mode = ref('default')
    // 内容 HTML
    const valueHtml = ref('<p>hello wangjingtao</p>')

    // 模拟 ajax 异步获取内容
    onMounted(() => {
      setTimeout(() => {
        valueHtml.value = '<p>模拟 Ajax 异步设置内容</p>'
      }, 1500)
    })

    const toolbarConfig = reactive({})
    const editorConfig = reactive({ placeholder: '请输入内容...' })

    // 组件销毁时，也及时销毁编辑器
    onBeforeUnmount(() => {
      const editor = editorRef.value
      if (editor == null) return
      editor.destroy()
    })

    const handleCreated = (editor) => {
      editorRef.value = editor
      console.log('created', editor)
    }
    const handleChange = (editor) => { console.log('change:', editor.children) }
    const handleDestroyed = (editor) => { console.log('destroyed', editor) }
    const handleFocus = (editor) => { console.log('focus', editor) }
    const handleBlur = (editor) => { console.log('blur', editor) }
    const customAlert = (info, type) => { alert(`【自定义提示】${type} - ${info}`) }
    const customPaste = (editor, event, callback) => {
      console.log('ClipboardEvent 粘贴事件对象', event)
      // const html = event.clipboardData.getData('text/html') // 获取粘贴的 html
      // const text = event.clipboardData.getData('text/plain') // 获取粘贴的纯文本
      // const rtf = event.clipboardData.getData('text/rtf') // 获取 rtf 数据（如从 word wsp 复制粘贴）

      // 自定义插入内容
      editor.insertText('xxx')

      // 返回 false ，阻止默认粘贴行为
      event.preventDefault()
      callback(false) // 返回值（注意，vue 事件的返回值，不能用 return）

      // 返回 true ，继续默认的粘贴行为
      // callback(true)
    }
  
</script>