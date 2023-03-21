import fsDriver from 'unstorage/drivers/fs'
useStorage().mount('captcha', fsDriver({ base: '/tmp' }))
export const captchaStorage = useStorage('captcha')