import SavePokemonNames from "./Pokedex/SavePokemonNames"

const configsDefault = [
    { key: "config.trainer.name", value: null },
    { key: "config.pokedex.cardsToShow", value: 20 },
    { key: "config.theme", value: 'light' },
]

const CheckConfigLocalStorage = () => {
    for (const config of configsDefault) {
        const existConfig = localStorage.getItem(config.key)
        if (!existConfig) localStorage.setItem(config.key, config.value)
    }
    SavePokemonNames()
}
const ConfigLocalStorage = (key) => (
    {
        get: () => localStorage.getItem(key) ,
        set: (value) => { localStorage.setItem(key, value) },
    }
)

export default ConfigLocalStorage
export { CheckConfigLocalStorage }