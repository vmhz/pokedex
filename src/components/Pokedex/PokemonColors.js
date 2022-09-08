
import axios from 'axios';
import pokedexIDB from '../pokedex.IDB';

const PokemonColors = () => {
  const setColorsIDB = (data) => {
    if (data) return true;
    let i = 0
    while (++i < 11) {
      axios.get(`https://pokeapi.co/api/v2/pokemon-color/${i}/`)
        .then(res => pokedexIDB.create('colors', {
          key: res.data.id,
          ...res.data
        }))
    }
  }
  pokedexIDB.read('colors', 1)
    .then((data = null) => setColorsIDB(data))
    .catch(err => console.log(err))

}
export default PokemonColors