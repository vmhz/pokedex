import axios from "axios"

const SavePokemonNames = () => {
    // 'https://pokeapi.co/api/v2/pokemon?offset=20&limit=20'
    let isSaved = localStorage.getItem('pokemons.names.saved')
    if (!isSaved) {
        const URL = 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=1154'
        axios.get(URL)
            .then(res => {
                const pokemonsNames = res.data.results
                .map(result => (result.name))
                .join('|')
                localStorage.setItem(`pokemons.names`, `|${pokemonsNames}|`)
            })
            .catch(err => console.log(err))
        localStorage.setItem('pokemons.names.saved', true)
    }
}

export default SavePokemonNames