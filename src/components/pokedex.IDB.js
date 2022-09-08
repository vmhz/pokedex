const indexedDb = window.indexedDB;

let db

const conexion = indexedDb.open('pokedex', 5)
const stores = [
    {
        name: 'pokemons-cards',
        options: { keyPath: 'id' }
    }

]

conexion.onerror = (error) => console.log('Error ', error)

conexion.onsuccess = (e) => {
    db = e.target.result
    // console.log('Base de datos abierta', db)
}

conexion.onupgradeneeded = (e) => {
    db = e.target.result
    // console.log('Base de datos creada', db)
    stores.forEach(store => db.createObjectStore(store.name, store.options))
}

const transactions = {
    create: 'readwrite',
    read: 'readonly',
    update: 'readwrite',
    delete: 'readwrite',
}
const accions = {
    create: ({ store, data }) => store.add(data),
    read: ({ store, key }) => store.get(key),
    update: ({ store, data }) => store.put(data),
    delete: ({ store, key }) => store.delete(key),
}

const requestIDB = async ({ storeName, request, key = null, data = null }) => {
    // console.log('REQUEST IDB');
    // console.log({ storeName, request, key, data });
    if (!db) return false
    const transaction = await db.transaction([storeName], transactions[request])
    const objStore = transaction.objectStore(storeName)
    const conexion = await accions[request]({ store: objStore, key, data })

    const promise = new Promise((resolve, reject) => {
        conexion.onsuccess = (e) => {
            let result = e?.target.result
            resolve(result)
        }
        conexion.onerror = (e) => {
            let result = e?.target.result
            reject(result)
        }
    })
    const result = await promise
    return result
}
const pokedexIDB = {
    create: (storeName, data) =>
        requestIDB({ storeName, request: 'create', data }),

    read: (storeName, key) =>
        requestIDB({ storeName, request: 'read', key }),

    update: (storeName, data) =>
        requestIDB({ storeName, request: 'update', data }),

    delete: (storeName, key) =>
        requestIDB({ storeName, request: 'delete', key })
}

export default pokedexIDB