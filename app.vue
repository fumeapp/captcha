<script lang="ts" setup>
import type { Captcha, Submission } from '@/types/vue-shim'
const { $toast } = useNuxtApp()

const captcha = ref<Captcha|undefined>(undefined)
const submission = ref<Submission>({
  name: '',
  captcha: '',
  uuid: '',
})

const getCaptcha = async () => {
  captcha.value = (await useFetch('/api/generate')).data.value as Captcha
  submission.value.captcha = ''
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
    data.value.errors.map($toast.danger)
  }
  getCaptcha()
}

onMounted(getCaptcha)
</script>

<template>
  <div class="max-w-md m-16 mx-auto flex flex-col space-y-4">
    <div class="flex items-center justify-start">
      <label class="w-30" for="name">Name</label>
      <input id="name" type="text" class="w-full" v-model="submission.name" />
    </div>
    <div class="flex items-center justify-start">
      <label class="w-30" for="captcha">Captcha</label>
      <div class="w-40 h-11 mx-4 flex justify-center">
        <span v-if="captcha" class="-mt-2" v-html="captcha.svg" />
      </div>
      <input id="captcha" type="text" class="w-47" v-model="submission.captcha" />
    </div>
    <div class="flex items-center justify-end space-x-4">
      <input type="button" value="Refresh" class="py-2 px-4 cursor-pointer" @click="getCaptcha" />
      <input type="button" value="Submit" class="py-2 px-4 cursor-pointer" @click="submit" />
    </div>
  </div>
</template>


<style>
p {
  margin: 0;
}
button {
  background-color: #fff;
}
</style>