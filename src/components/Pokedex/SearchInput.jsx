import React, { useState } from 'react'
import pokemonsNames from '../../assets/pokemonsNames'
import { SelectElement, actionsClass } from '../querySelector'
import './styles/SearchInput.css'
// const pokemonsNames = localStorage.getItem('pokemons.names') 
const ClassVisibility = actionsClass('#suggestions__container', 'show')

const SearchInput = ({ setPokeSarch }) => {
    const [options, setOptions] = useState()

    const setPokemonsSearch = (inputValue) => {
        const regexp = new RegExp(`(?<=\|)[^|]*${inputValue}[^|]*`, 'g')
        const matches = pokemonsNames.match(regexp)?.slice(0, 40)
        if (matches) {
            ClassVisibility.add()
            setOptions(matches)
        }
        else {
            ClassVisibility.remove()
            setOptions()
        }
    }

    const onChange = (e) => {
        e.preventDefault()
        const input = e.target
        const inputValue = e.target.value?.trim().toLowerCase()
        if (!inputValue) {
            input.value = ''
            ClassVisibility.remove()
            setOptions()
            console.log('hide seg undefined')
            return false
        }
        setPokemonsSearch(inputValue)
    }

    const onSubmit = (e) => {
        e.preventDefault()

        const input = e.target.search
        const inputValue = input.value.toLowerCase().trim()
        if (!inputValue) {
            setPokeSarch()
            return false
        }

        input.placeholder = inputValue
        ClassVisibility.remove()
        setPokeSarch(options)

        setTimeout(() => {
            input.value = ""
        }, 200);
    }

    const selectOption = (e) => {
        const optionValue = e.target.value
        if (!optionValue) return false;

        setPokeSarch([optionValue])
        const searchInput = SelectElement('#search')
        searchInput.placeholder = optionValue
        searchInput.value = ''
        ClassVisibility.remove()
        console.log(optionValue)
    }
/*     console.log('');
    console.log({class:, state: }); */
    return (
        <form className='pokedex__form' onSubmit={onSubmit}>
            <label htmlFor="search">Pokemon search
            </label>
            <div className="search__container">
                <div className="search__container__input">
                    <input
                        placeholder='pokemon'
                        className='search__input'
                        onChange={onChange}
                        id="search"
                        type="list"
                        autoComplete='off'
                    />
                    <div className="search__container__input--icons">
                        <i onClick={ClassVisibility.toggle}
                            className='bx bx-chevron-down search__container__input--icon'></i>
                        <button>
                            <i className='bx bx-search search__container__input--icon'></i>
                        </button>
                    </div>
                    <div
                        id='suggestions__container'
                        className={`suggestions__container ${ClassVisibility.className}`}
                        name="search">
                        <div className="suggestions__firts">
                            <div className='suggestions__firts__text'>Select matches</div>
                        </div>
                        <div onClick={selectOption}
                            className="search__container__options">
                            {
                                options?.map(option => (
                                    <option
                                        className='search__container__option'
                                        key={option}
                                        value={option}
                                    >{option}
                                    </option>
                                )) || (
                                    <p>Not found :(</p>
                                )
                            }
                        </div>
                    </div>
                </div>

            </div>


        </form>
    )
}

export default SearchInput