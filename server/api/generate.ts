import svgCaptcha from 'svg-captcha'
import { v4 as uuidv4 } from 'uuid'
import Store from '@/lib/store'

export default defineEventHandler(() => {
  const store = new Store()
  const captcha = svgCaptcha.create({ height: 60 })
  const uuid = uuidv4()
  store.add(uuid, captcha.text)
  return { uuid, svg: captcha.data }
})