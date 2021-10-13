<template>
  <div v-if="isVerified" class="container">
    <div ref="editor" id="code-editor"></div>
    <div class="code-submit" v-on:click="onSubmit">
      <span style="margin-right: 0.5em; font-size: 0.7em">run</span>
      <Icon icon="mdi:play-circle-outline" style="color: #6acb52; width: 0.7em; height: 0.7em" />
    </div>
    <div v-if="result" class="code-output">{{ result }}</div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { toRefs } from '@vue/reactivity'
import { basicSetup, EditorState, EditorView } from '@codemirror/basic-setup'
import { keymap } from '@codemirror/view'
import { Compartment } from '@codemirror/state'
import { indentWithTab } from '@codemirror/commands'
import { StreamLanguage } from '@codemirror/stream-parser'
import { Icon } from '@iconify/vue'
import languages from './languages'

const props = defineProps({
  isVerified: Boolean,
  language: String,
})
const { isVerified, language } = toRefs(props)
const result = ref(0)
const code = ref('')
const editor = ref(null)

const langCompartment = new Compartment()
const state = EditorState.create({
  doc: 'type some code here',
  extensions: [
    basicSetup,
    keymap.of([indentWithTab]),
    langCompartment.of(StreamLanguage.define(languages[language.value])),
  ],
})
const view = ref(null)

// let view = new EditorView({
//   state: EditorState.create({
//     extensions: [basicSetup, StreamLanguage.define(lua)]
//   })
// })

onMounted(() => {
  view.value = new EditorView({ state: state, parent: editor.value })
  view.value.dispatch({
    effects: langCompartment.reconfigure(
      StreamLanguage.define(languages[language.value]),
    ),
  })
})

const fetchExec = async (input, language) => {
  // view: the Vue state object
  // value: the current value of the state, which is the CodeMirror editor
  // state: CodeMirror's state object
  // doc: an object representing the currently typed input into the state
  console.log(isVerified.value)
  const body = new URLSearchParams({
    data: encodeURIComponent(view.value.state.doc.toString()),
    languageEngine: encodeURIComponent(language),
  }).toString()

  const consoleResult =
    process.env.NODE_ENV === 'development'
      ? await fetch(`http://localhost:3100/src/?${body}`)
      : await fetch(`http://18.189.132.155/src/?${body}`)
  return consoleResult.text()
}

const onSubmit = async () => {
  result.value = await fetchExec(code.value, language.value)
}
</script>

<style>
.run-code {
  margin: var(--r-block-margin) auto;
  width: 90%;
  display: flex;
  flex-direction: column;
}

#code-editor {
  text-align: left;
  color: #586e75;
  margin-bottom: 0.5em;
  font-family: Fira Code;
  font-size: 0.7em;
  padding: 0.25em;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  background: #ffffff;
}

#code-editor::-webkit-scrollbar {
  display: none;
}

.code-submit {
  font-family: Fira Code;
  display: flex;
  flex-direction: row;
  background: #e0e0e0;
  width: fit-content;
  align-items: center;
  padding: 0.2em 0.5em;
  border-radius: 2px;
  cursor: pointer;
  margin-top: 0.5em;
}

.code-output {
  font-family: Fira Code;
  font-size: 0.7em;
  max-height: 4em;
  overflow: auto;
  margin-top: 1em;
  text-align: left;
  display: flex;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}

.code-output::-webkit-scrollbar {
  display: none;
}

.ͼ1 .cm-scroller {
  font-family: Fira Code;
}
</style>
