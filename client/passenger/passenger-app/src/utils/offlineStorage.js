import { openDB } from 'idb'


const DB_NAME = 'passenger-app'
const STORE = 'kv'


async function db() {
return openDB(DB_NAME, 1, {
upgrade(d) {
if (!d.objectStoreNames.contains(STORE)) d.createObjectStore(STORE)
}
})
}


export async function setItem(key, value) {
const d = await db();
return d.put(STORE, value, key)
}


export async function getItem(key) {
const d = await db();
return d.get(STORE, key)
}


export const Keys = {
MY_JOURNEYS: 'myJourneys'
}