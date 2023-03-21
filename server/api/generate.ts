import svgCaptcha from 'svg-captcha'
import { v4 as uuidv4 } from 'uuid'

export default defineEventHandler(async () => {
  const captcha = svgCaptcha.create({ height: 40 })
  const uuid = uuidv4()
  await captchaStorage.setItem(uuid, captcha.text)
  return { uuid, svg: captcha.data }
})