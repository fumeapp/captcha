import svgCaptcha from 'svg-captcha'
import { v4 as uuidv4 } from 'uuid'
import { createStorage } from 'unstorage'
import fsDriver from 'unstorage/drivers/fs'

export default defineEventHandler(async () => {
  const captcha = svgCaptcha.create({ height: 40 })
  const uuid = uuidv4()
  await createStorage({ driver: fsDriver({ base: '/tmp' }) }).setItem(uuid, captcha.text)
  return { uuid, svg: captcha.data }
})