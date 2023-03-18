import Store from '@/lib/store'
import type { Submission } from '@/types/vue-shim'

export default defineEventHandler(async (event) => {
  const body = await readBody<Submission>(event)
  const entry = new Store().get(body.uuid)
  if (!entry || entry.text !== body.captcha)
    return {
      error: true,
      errors: ['Invalid captcha.']
    }

  return {
    success: true,
    message: 'Captcha is valid.'
  }

})
