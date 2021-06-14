import React from 'react'
import './nav.css'
import Logo from '../assets/diseno-de-logo.png'

function Nav() {
    return (
        <div className='header'>
            <img src={Logo} alt="no cargada" className="logo"/>
            <nav>
                <ul className="nav__links">
                    
                    <li><a href="#lineales">Estcructuras Lineales</a></li>
                    <li><a href="#Ordenamientos">Ordenamientos</a></li>
                    <li><a href="#arboreas ">Estructuras arbóreas</a></li>
                    
                </ul>
            </nav>
            <a href="/index" className="btn_nav"><button>Inicio</button></a>
    </div>
    )
}

export default Nav
