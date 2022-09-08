import { useState } from 'react'
import ConfigLocalStorage from '../ConfigLocalStorage'
import { actionsClass, SelectElement } from '../querySelector'
import './styles/PokedexConfig.css'

const cardsToShow = ConfigLocalStorage('config.pokedex.cardsToShow')
const theme = ConfigLocalStorage('config.theme')
const IconConfigClass = actionsClass('#pokedex__config--icon', 'click')

const PokedexConfig = ({ setCardsToShow }) => {
    const [selected, setSelected] = useState(theme.get())
    const [visibilityForm, setVisibilityForm] = useState(false)
    const onClickIconConfig = () => {
        IconConfigClass.toggleTransition(200)
        setVisibilityForm(!visibilityForm)
    }

    const onChangeAmountPokemons = (e) => {
        const selectValue = e.target.value
        cardsToShow.set(selectValue)
        setCardsToShow(selectValue)
    }
    const onChangeTheme = (e) => {
        const radioValue = e.target.value
        setSelected(radioValue)
        theme.set(radioValue)
        const App = SelectElement('#App')
        if (radioValue == 'light')
            App.setAttribute('class', 'App')
        else if (radioValue == 'dark')
            App.setAttribute('class', 'App theme--dark')

        // setCardsToShow(selectValue)
    }
    return (
        <div className='pokedex__config'>
            <i id='pokedex__config--icon'
                onClick={onClickIconConfig}
                className='bx bx-cog pokedex__config--icon'></i>
            <form
                id='pokedex__config__form'
                className={`pokedex__config__form ${visibilityForm ? 'show' : ''}`} >
                <div className='config__amount__pokemons__container'>
                    <label className='pokedex__config__label' htmlFor="config__amount__pokemons">Pokemons to show</label>
                    <select onChange={onChangeAmountPokemons} className='config__amount__pokemons' name="config__amount__pokemons" defaultValue={cardsToShow.get()} >
                        <option value="4">4</option>
                        <option value="8">8</option>
                        <option value="12">12</option>
                        <option value="16">16</option>
                        <option value="20">20</option>
                    </select>
                </div>
                <div className="pokedex__config__inputs">
                    <label className='pokedex__config__label' htmlFor="pokedex__config__theme" >Theme</label>
                    <div >
                        <input
                            type="radio"
                            name="pokedex__config__theme"
                            id="pokedex__config__theme--light" value='light'
                            checked={selected === 'light'}
                            onChange={onChangeTheme}
                        />
                        <label className='pokedex__config__label' htmlFor="pokedex__config__theme--light">Light</label>
                    </div>

                    <div>
                        <input
                            type="radio"
                            name="pokedex__config__theme"
                            id="pokedex__config__theme--dark" value='dark'
                            checked={selected === 'dark'}
                            onChange={onChangeTheme}
                        />
                        <label className='pokedex__config__label' htmlFor="pokedex__config__theme--dark">Dark</label>
                    </div>
                </div>


            </form>
        </div>
    )
}
export default PokedexConfig