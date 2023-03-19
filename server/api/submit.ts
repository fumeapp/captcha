import { createStorage } from 'unstorage'
import fsDriver from 'unstorage/drivers/fs'
import type { Submission } from '@/types/vue-shim'

export default defineEventHandler(async (event) => {
  const body = await readBody<Submission>(event)
  const entry = await createStorage({ driver: fsDriver({ base: '/tmp' }) }).getItem(body.uuid)
  if (!entry || entry !== body.captcha)
    return {
      error: true,
      errors: ['Invalid captcha.']
    }

  return {
    success: true,
    message: 'Captcha is valid.'
  }

})
