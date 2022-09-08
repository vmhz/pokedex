import { useEffect, useState } from 'react'
import axios from 'axios'

const SelectType = ({setOptionType}) => {
    const [listTypes, setListTypes] = useState()

    useEffect(() => {
        const URL = 'https://pokeapi.co/api/v2/type'
        axios.get(URL)
            .then(res => setListTypes(res.data.results))
            .catch(err=> console.log(err))

    }, [])
    const handleChange = (e) => {
        setOptionType(e.target.value)
    }

    return (
    <div className='pokedex__selecttype__container'>
        <label htmlFor="selectype">Select type</label>
        <select name='selectype' className='pokedex__selecttype' onChange={handleChange}>
        <option value="All">All pokemons</option>
        {
            listTypes?.map(type => (
                <option key={type.name} value={type.name}>{type.name}</option>
            ))
        }
    </select>
    </div>
    )
}

export default SelectType