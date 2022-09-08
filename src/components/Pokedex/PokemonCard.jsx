import axios from 'axios'
import React, { useEffect, useState } from 'react'
import getBase64 from '../getBase64'
import pokedexIDB from '../pokedex.IDB'
import StatPokemon from './StatPokemon'
import './styles/PokemonCard.css'
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

const PokemonCard = ({ url, setPokeSelect }) => {

  const [pokemon, setPokemon] = useState()

  const setSavePokemon = async (url) => {
    let id = url.match(/(?<=\/)[^/]+(?=\/$)/)?.[0]
    let pokemon = await pokedexIDB.read('pokemons-cards', Number(id))
      .catch(err => { })
    if (!pokemon) {
      // console.log({ pokemon, id })
      const res = await axios.get(url)
      res.data.stats.splice(3,2)
      const cardPokemon = {
        id: res.data.id,
        name: res.data.name,
        types: res.data.types,
        sprites: res.data.sprites,
        stats: res.data.stats,
      }
      setPokemon(cardPokemon)
      pokedexIDB.create('pokemons-cards', cardPokemon)
        .catch(err => { })
    }
    else {
      // readed from db
      setPokemon(pokemon)
    }
  }

  useEffect(() => {
    try {
      setSavePokemon(url)

    } catch (error) {
      console.log(error);
    }
  }, [])
  const pokemonTypes = pokemon?.types.map(slot => (slot.type.name))
  const pokemonTypeColor = PokemonColors[pokemonTypes?.[0]]

  const style = {
    card: { border: `7px solid ${pokemonTypeColor}` },
    name: { color: pokemonTypeColor, },
    image: { filter: `drop-shadow(0 6px 2px ${pokemonTypeColor}) drop-shadow(0 -6px 2px ${pokemonTypeColor})` }
  }

  return (
    <article onClick={() => setPokeSelect(pokemon?.name)} style={style.card} className={`pokemon ${pokemonTypes?.join(' ')}`}>
      <header className='pokemon__header'>
        <ul className='pokemon__bkg__list'>
          {
            pokemon?.types.map(type => (
              <li
                key={type.type.name}
                style={{ backgroundColor: PokemonColors[type.type.name] }}
                className={`pokemon__bkg__list--item ${type.type.name}`}>
              </li>
            ))}
        </ul>
        <img style={style.image} className='pokemon__img' src={pokemon?.sprites.other["official-artwork"]["front_default"]} alt="" />
      </header>
      <section className='pokemon__body'>
        <h3 style={style.name} className='pokemon__name'>{pokemon?.name}</h3>

        <div className='pokemon__types'>
          {pokemonTypes?.join(' / ')}
        </div>
        <div className='pokemon__types__title'>
          Type
        </div>
      </section>
      <footer className='pokemon__footer'>
        <ul className='pokemon__stats'>
          {
            pokemon?.stats.map(stat => (
              <StatPokemon
                key={stat.stat.url}
                infoStat={stat}
              />
            ))
          }
        </ul>
      </footer>
    </article>
  )
}

export default PokemonCard