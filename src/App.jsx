import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import ProtectedRoutes from './components/ProtectedRoutes'
import Pokedex from './components/Pokedex'
import PokemonDetails from './components/PokemonDetails'
import Header from './components/Header'
import Footer from './components/Footer'
import ConfigLocalStorage, { CheckConfigLocalStorage } from './components/ConfigLocalStorage'
const theme = ConfigLocalStorage('config.theme')

function App() {
  useEffect(() => {
    CheckConfigLocalStorage()
  }, [])
  return (
    <div className={`App theme--${theme.get()}`} id='App'>
      <Header></Header>
      <Routes>

        <Route path='/' element={<Home />} />

        <Route element={<ProtectedRoutes />} >
          <Route path='/pokedex' element={<Pokedex />} />
          <Route path='/pokedex/:name' element={<PokemonDetails />} />
          <Route path='/config' element={<PokemonDetails />} />
        </Route>
      </Routes>
      <Footer />
    </div>
  )
}

export default App
