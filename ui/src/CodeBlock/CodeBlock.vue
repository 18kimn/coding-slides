<template>
  <div class="container">
    <div v-on:click="shouldShowList = !shouldShowList" class="language-picker">{{ language }}</div>
    <div
      class="language-picker menu"
      v-if="shouldShowList"
      v-on:click-outside="shouldShowList = false"
    >
      <div
        class="languages"
        v-for="(_, lang) in languages"
        v-on:click="language = lang; shouldShowList = false"
      >{{ lang }}</div>
    </div>
    <div ref="editor" id="code-editor"></div>
    <div class="code-submit" v-on:click="onSubmit">
      <span style="margin-right: 0.5em; font-size: 0.7em">run</span>
      <Icon icon="mdi:play-circle-outline" style="color: #6acb52; width: 0.7em; height: 0.7em" />
    </div>
    <div v-if="result" class="code-output">{{ result }}</div>
  </div>
</template>

<script setup>
import { watchEffect, ref, onMounted } from 'vue'
import { toRefs } from '@vue/reactivity'
import { basicSetup, EditorState, EditorView } from '@codemirror/basic-setup'
import { keymap } from '@codemirror/view'
import { Compartment } from '@codemirror/state'
import { indentWithTab } from '@codemirror/commands'
import { StreamLanguage } from '@codemirror/stream-parser'
import { Icon } from '@iconify/vue'
import languages from './languages'
import Reveal from 'reveal.js'

const props = defineProps({
  defaultLanguage: String,
})
const { defaultLanguage } = toRefs(props)
const language = ref(defaultLanguage.value)
const result = ref(0)
const editor = ref(null)
const shouldShowList = ref(false)

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

onMounted(() => {
  view.value = new EditorView({ state: state, parent: editor.value })
  const slide = Reveal.getCurrentSlide()
  slide.addEventListener('click', () => console.log("asdfasdfasdfa"))
})

watchEffect(() => {
  if (!view.value) return
  view.value.dispatch({
    effects: langCompartment.reconfigure(
      StreamLanguage.define(languages[language.value]),
    ),
  })
})

const onSubmit = async () => {
  // view: the Vue state object for the editor
  // value: the current value of the state
  // state: CodeMirror's state object
  // doc: an object representing the currently typed input into the state
  const body = new URLSearchParams({
    data: encodeURIComponent(view.value.state.doc.toString()),
    languageEngine: encodeURIComponent(language.value),
  }).toString()

  const consoleResult =
    process.env.NODE_ENV === 'development'
      ? await fetch(`http://localhost:3010/src/?${body}`)
      : await fetch(`http://18.189.132.155/src/?${body}`)
  result.value = await consoleResult.text()
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

.language-picker {
  width: fit-content;
  font-family: "Fira Code";
  font-size: 0.7em;
  background: #f3f9ff;
  padding: 0.5em 1em;
  border-radius: 5px 5px 0 0;
  cursor: pointer;
}

.language-picker.menu {
  border-radius: 0;
  position: absolute;
  max-height: 10em;
  z-index: 5;
  overflow: auto;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}

.language-picker.menu::-webkit-scrollbar {
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
