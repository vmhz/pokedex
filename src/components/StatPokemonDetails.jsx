
const StatPokemonDetails = ({ infoStat }) => {
  const widthProgres = parseInt(Number(infoStat.base_stat) * 100 / 150)
  const styleProgres = {
    width: `${widthProgres}%`
  }
  return (
    <li className='pokemon__details__stat__item'>
      <h4 className='pokemon__details__stat__item--title'>{infoStat.stat.name}</h4>
      <div className='pokemon__details__stat__item__container'>
        <p className='pokemon__details__stat__item--value'>{infoStat.base_stat}</p>
        <div style={styleProgres} className='pokemon__details__stat__item--progress'></div>
      </div>
    </li>
  )
}

export default StatPokemonDetails