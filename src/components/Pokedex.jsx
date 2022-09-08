// import "./styles/Pokedex.css";
import axios from 'axios'
import PokemonCard from './Pokedex/PokemonCard'
import SearchInput from './Pokedex/SearchInput';
import { useSelector } from 'react-redux/es/exports';
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import SelectType from "./Pokedex/SelectType";
import './styles/Pokedex.css'
import PokedexConfig from './Pokedex/PokedexConfig';
import ConfigLocalStorage from './ConfigLocalStorage';
import { SelectElement } from './querySelector';
const LScardsToShow = ConfigLocalStorage('config.pokedex.cardsToShow')

const Pokedex = () => {

  const [pokemons, setPokemons] = useState()
  const [pokeSarch, setPokeSarch] = useState()
  const [pokeSelect, setPokeSelect] = useState()
  const [optionType, setOptionType] = useState('All')
  const [cardsToShow, setCardsToShow] = useState(LScardsToShow.get())
  const navigate = useNavigate()

  const nameTrainer = useSelector(state => state.nameTrainer)
  const preSetPokemons = (pokemons) => {
    if (pokemons?.results)
      pokemons.results = pokemons.results.splice(0, cardsToShow)

    setPokemons(pokemons)
  }
  if (pokeSelect) {
    navigate(`/pokedex/${pokeSelect}`)
  }

  useEffect(() => {
    let URL
    if (pokeSarch) {

      const urls = pokeSarch?.map(pokematch => ({
        url: `https://pokeapi.co/api/v2/pokemon/${pokematch}/`
      }))
      const data = {
        results: urls
      }
      // console.log(pokeSarch)
      if (urls) preSetPokemons(data)

      setOptionType()
      setPokeSarch()
    } else if (optionType == 'All') {
      URL = `https://pokeapi.co/api/v2/pokemon?offset=0&limit=${cardsToShow}`
      axios.get(URL)
        .then(res => preSetPokemons(res.data))
        .catch(err => console.log(err))
    } else if (optionType) {
      URL = `https://pokeapi.co/api/v2/type/${optionType}`
      axios.get(URL)
        .then(res => {
          setPokeSarch()
          preSetPokemons({
            results: res.data.pokemon.map(e => e.pokemon)
          })
        }
        )
        .catch(err => console.log(err))
    }

  }, [pokeSarch, optionType, cardsToShow])
  SelectElement('body').removeAttribute('class')
  return (
    <div className="pokedex">
      <h1 className='pokedex__title'>Welcome {nameTrainer} </h1>
      <PokedexConfig setCardsToShow={setCardsToShow} />
      <div className='pokedex__search__and__type'>

        <SearchInput setPokeSarch={setPokeSarch}></SearchInput>
        <SelectType setOptionType={setOptionType}></SelectType>
      </div>

      <div className='pokedex__cards'>
        {
          pokemons?.results.map(pokemon => (
            <PokemonCard
              key={pokemon.url}
              url={pokemon.url}
              setPokeSelect={setPokeSelect}
            />
          ))
        }
      </div>
    </div>
  )
}

export default Pokedex