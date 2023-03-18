import fs from 'node:fs'

interface StoreInterface {
  uuid: string
  text: string
  expires: Date
}

export default class Store {
  private store: StoreInterface[]

  constructor() {
    this.store = this.load()
    return this
  }

  private static current = (entry: StoreInterface): boolean => new Date(entry.expires) > new Date()

  private load(): StoreInterface[] {
    if (!fs.existsSync('/tmp/store.json')) return []
    return JSON.parse(fs.readFileSync('/tmp/store.json', 'utf-8')) as StoreInterface[]
  }

  add(uuid: string, text: string) {
    this.store.push({ uuid, text, expires: new Date(Date.now() + 4 * 60 * 60 * 1000) })
    this.save()
  }

  get(uuid: string): StoreInterface | undefined {
    return this.store.filter(Store.current).find(entry => entry.uuid === uuid)
  }

  save() {
    fs.writeFileSync('/tmp/store.json', JSON.stringify(this.store.filter(Store.current)), 'utf-8')
  }
}
