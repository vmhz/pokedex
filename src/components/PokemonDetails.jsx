import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import AbilityPokemonDetails from './AbilityPokemonDetails'
import MovesPokemonDetails from './MovesPokemonDetails'
import { actionsClass, SelectElement } from './querySelector'
import StatPokemonDetails from './StatPokemonDetails'
import './styles/PokemonDetails.css'
const PokemonColors = {
  normal: '#aaa',
  grass: '#0fc',
  fire: '#fb2',
  water: '#2df',
  bug: '#0d8',
  flying: '#b88',
  poison: '#88b',
  electric: '#e9ffbe',
  fighting: '#822',
  rock: '#aaa',
  ground: '#5e5b57',
  ghost: '#35556e',
  dark: '#373436',
  fairy: '#d3a7b1',
  ice: '#9b93b6',
  psychic: '#9a47',
  dark: "#024",
}
const PokemonDetails = () => {
  const { name } = useParams();
  const [pokemon, setPokemon] = useState();

  const pokemonTypes = pokemon?.types.map(slot => (slot.type.name))
  const pokemonBkgColor = PokemonColors[pokemonTypes?.[0]]
  const style = {
    card: {
      border: `7px solid ${pokemonBkgColor}`
    },
    name: {
      color: pokemonBkgColor,
    },
    image: {
      filter: `drop-shadow(0 6px 2px ${pokemonBkgColor}) drop-shadow(0 -6px 2px ${pokemonBkgColor})`
    }
  }

  useEffect(() => {
    const url = `https://pokeapi.co/api/v2/pokemon/${name}/`
    axios.get(url)
      .then(res => setPokemon(res.data))
  }, [])

  if (pokemon) {
    actionsClass('body', `App__${pokemonTypes[0]}`).add()
  }
  /* (<(?!\/)\w+).+ */
  return (
    <div className='pokemon__details'>
      <article style={style.card}
        className={`pokemon__details__card ${pokemonTypes?.join(' ')}`}
      >
        <header className='pokemon__details__header'>
          <ul className='pokemon__details__bkg__list'>
            {
              pokemon?.types.map(type => (
                <li
                  key={type.type.name}
                  style={{ backgroundColor: PokemonColors[type.type.name] }}
                  className={`pokemon__details__bkg__list--item ${type.type.name}`}>
                </li>
              ))}
          </ul>
          <img style={style.image} className='pokemon__details__img' src={pokemon?.sprites.other["official-artwork"]["front_default"]} alt="" />
        </header>
        <section className='pokemon__details__body'>
          <h3 style={style.name} className='pokemon__details__name'>{pokemon?.name}</h3>

          <div className='pokemon__details__types'>
            {pokemonTypes?.join(' / ')}
          </div>
        </section>
        <section className='pokemon__details__abilities__container'>
          <h2 className='pokemon__details__abilities__title'>Abilities</h2>
          <ul className='pokemon__details__abilities'>
            {
              pokemon?.abilities.map(ability => (
                <AbilityPokemonDetails
                  key={ability.ability.url}
                  name={ability.ability.name}
                />
              ))
            }
          </ul>
        </section>
        <footer className='pokemon__details__footer'>
          <h2>Stats</h2>
          <ul className='pokemon__details__stats'>
            {
              pokemon?.stats.map(stat => (
                <StatPokemonDetails
                  key={stat.stat.url}
                  infoStat={stat}
                />
              ))
            }
          </ul>

        </footer>
      </article>
      <section className='pokemon__details__moves__container'>
        <h2 >Moves</h2>
        <ul className='pokemon__details__moves'>
          {
            pokemon?.moves.map(move => (
              <MovesPokemonDetails
                key={move.move.url}
                name={move.move.name}
              />
            ))
          }
        </ul>
      </section>

    </div>


  )
}

export default PokemonDetails