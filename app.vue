<script lang="ts" setup>
interface Submission {
  name: string
  captcha: string
  uuid: string
}
const submission = ref({
  name: '',
  captcha: '',
  uuid: '',
})
</script>

<template>
  <div class="max-w-md m-16 mx-auto flex flex-col space-y-4">
    <div class="flex items-center justify-start">
      <label class="w-30" for="name">Name</label>
      <input id="name" type="text" class="w-full" v-model="submission.name" />
    </div>
    <div class="flex items-center justify-start">
      <label class="w-30" for="captcha">Captcha</label>
      <input id="captcha" type="text" class="w-full" v-model="submission.captcha" />
    </div>
    <div class="flex items-center justify-end space-x-4">
      <input type="button" value="Refresh" class="py-2 px-4" />
      <input type="button" value="Submit" class="py-2 px-4" />
    </div>
  </div>
</template>
