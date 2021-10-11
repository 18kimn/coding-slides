<template>
<div id="creds">
  <div v-if="!submitted">
    <input type="password" v-model="password">
    <input type="submit" value="check for admin access" v-on:click="verify">
  </div>
  <div v-else>
    {{
      isVerified
        ? 'verified! live code editing enabled'
        : 'wrong key; you can reload and try again'
    }}
  </div>
</div>
</template>

<script setup>
/*
  for security and practical reasons
    the R interface on the slides should *only* work on my computer
  the easiest way i can think of is using a UUID key that the slides ask for
    which we verify by comparing it to a environment variable
*/
import { ref } from '@vue/reactivity'
const password = ref('')
const submitted = ref(false)
const isVerified = ref(false)
console.log('message')

const emit = defineEmits(['verified'])

function verify(){
  submitted.value = true
  isVerified.value = password.value === import.meta.env.VITE_KEY
  if (isVerified.value) emit('verified')
}
// const verify = new Promise((resolve) => {
//   submit.addEventListener('click', () => {
//     resultDiv.innerText = resultMessage
//     resolve(isVerified)
//   })
// })

// export default verify
</script>

<style>
</style>
