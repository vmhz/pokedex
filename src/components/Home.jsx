import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setNameTrainer } from '../store/slices/nameTrainer.slice'
import logo from './../assets/pokedex_logo.png'
import './styles/Home.css'

const Home = () => {

  const dispatch = useDispatch()

  const navigate = useNavigate()

  const handleSubmit = e => {
    e.preventDefault()
    const inputValue = e.target.name.value.trim()

    if (inputValue.length !== 0) {
      localStorage.setItem('trainer.name', inputValue)
      dispatch(setNameTrainer(inputValue))
      navigate('/pokedex')
    }
    e.target.name.value = ""
  }

  return (
    <article className='home'>
      <header className='home__header'>
        <img className='home__logo' src={logo} alt="" />
        <h1 className='home__title'>Hi Trainer!</h1>
      </header>
      <p>To Start give me your trainer name</p>
      <form className='home__form' onSubmit={handleSubmit}>
        <input className='home__input' placeholder='Your trainer name' id='name' type="text" />
        <button className='home__button'>Catch them all</button>
      </form>
    </article>
  )
}

export default Home