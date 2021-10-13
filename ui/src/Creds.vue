<template>
  <div id="creds" v-if="!submitted">
    <input type="password" v-model="password" />
    <input id="submit" type="submit" value="check for admin access" v-on:click="verify" />
  </div>
  <div v-else>
    {{
      isVerified
        ? 'verified! live code editing enabled'
        : 'wrong key; you can reload and try again'
    }}
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

const verify = () => {
  submitted.value = true
  isVerified.value = password.value === import.meta.env.VITE_KEY
  if (isVerified.value) emit('verified')
}

</script>

<style scoped>
#creds {
  min-width: 20%;
  display: flex;
  flex-direction: column;
  place-items: center;
}

#creds input {
  width: 100%;
  margin: 0.2em;
}

#creds #submit {
  width: fit-content;
  font-family: Lato;
}
</style>
