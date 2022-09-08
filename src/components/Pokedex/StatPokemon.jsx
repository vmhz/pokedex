import React from 'react'

const StatPokemon = ({infoStat}) => {
  
  return (
    <li className='pokemon__stat__item'>
      <h4 className='pokemon__stat__item--title'>{infoStat.stat.name}</h4>
      <p className='pokemon__stat__item--value'>{infoStat.base_stat}</p>
    </li>
  )
}

export default StatPokemon