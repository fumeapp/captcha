<script lang="ts" setup>
import type { Captcha, Submission } from '@/types/vue-shim'
import { PushButton } from 'tailvue'
const { $toast } = useNuxtApp()

const captcha = ref<Captcha|undefined>(undefined)
const submission = ref<Submission>({
  name: '',
  captcha: '',
  uuid: '',
})

const getCaptcha = async () => {
  captcha.value = (await useFetch('/api/generate')).data.value as Captcha
  submission.value.uuid = captcha.value.uuid
}

interface Response {
  success: boolean
  message: string
  errors: string[]
}

const submit = async () => {
  const { data } = await useFetch('/api/submit', {
    method: 'POST',
    body: submission.value,
  }) as { data: { value: Response } }
  if (data.value?.success) {
    $toast.success(data.value?.message)
  } else {
    data.value.errors.map(e => $toast.show({ message: e, timeout: 0}))
    getCaptcha()
  }
}

onMounted(getCaptcha)
</script>

<template>
  <div class="dark max-w-md m-16 mx-auto flex flex-col space-y-4 border border-gray-600 bg-gray-800 p-4 rounded-lg">
    <div class="flex items-center justify-start">
      <label class="w-30" for="name">Name</label>
      <input id="name" type="text" class="w-full" v-model="submission.name" />
    </div>
    <div class="flex items-center justify-start">
      <label class="w-30" for="captcha">Captcha</label>
      <div class="w-40 mx-4 flex items-center bg-gray-300 border border-gray-600 rounded">
        <span v-if="captcha" v-html="captcha.svg" />
      </div>
      <input id="captcha" type="text" class="w-40" @keydown.enter="submit" v-model="submission.captcha" />
    </div>
    <div class="flex items-center justify-end space-x-4">
      <push-button value="Refresh" @click="getCaptcha">Refresh</push-button>
      <push-button value="Submit"  @click="submit">Submit</push-button>
    </div>
  </div>
</template>


<style>
body, html { @apply bg-gray-900 text-gray-300; }
input[type="text"] { @apply h-10 border border-gray-700 bg-gray-600 rounded; }
p { margin: 0; }
button { background: transparent; }
</style>