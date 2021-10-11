<template>
  <div v-if="isVerified" class="run-code">
    <textarea v-model="code" class="code-editor"></textarea>
    <input type="submit" value="run" class="code-submit" v-on:click="onSubmit" />
    <div v-if="result" class="code-output">{{ result }}</div>
  </div>
</template>

<script setup>
import { ref, toRefs } from '@vue/reactivity'
const props = defineProps({
  isVerified: Boolean
})
const { isVerified } = toRefs(props)
const result = ref(0)
const code = ref('')

console.log('asdfasfasdf')
const fetchExec = async (input, language) => {
  const body = new URLSearchParams({
    data: encodeURIComponent(input),
    languageEngine: encodeURIComponent(language),
  }).toString()
  const consoleResult = await fetch(`http://localhost:3100/?${body}`).then(
    (res) => res.text(),
  )
  return consoleResult
}

const onSubmit = async () => {
  const language = 'Rscript'
  result.value = await fetchExec(code.value, language)
}

</script>

<style>
.run-code {
  margin: var(--r-block-margin) auto;
  width: 90%;
  display: flex;
  flex-direction: column;
}

.run-code {
  margin: var(--r-block-margin) auto;
  width: 90%;
  display: flex;
  flex-direction: column;
}

.code-editor {
  min-height: 5em;
  background-color: #fdf6e3;
  color: #586e75;
  margin-bottom: 0.5em;
  font-family: Fira Code;
  font-size: 0.7em;
  padding: 0.5em;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}

.code-editor::-webkit-scrollbar {
  display: none;
}

.code-submit {
  width: 50px;
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
</style>