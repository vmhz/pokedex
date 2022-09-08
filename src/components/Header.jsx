import React from 'react'
import { useNavigate } from 'react-router-dom';
import logo from './../assets/pokedex_logo.png'
import "./styles/Header.css";
const Header = () => {
    const navigate = useNavigate()
    const OnClickLogo = () => navigate('/pokedex')
    return (

        <header className='header'>
            <div className="header__logo__container">
                <img onClick={OnClickLogo} className='header__logo' src={logo} alt="" />
            </div>
            <ul className="header__lines">
                <li className="line__red">
                </li>
                <li className="line__black">
                    <div className="header__pokeball">
                        <div className="point">
                        </div>
                    </div>

                </li>
            </ul>
            <div className="header__logo__container">
            </div>
        </header>
    )
}

export default Header