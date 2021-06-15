import React from 'react'
import './nav.css'
import Logo from '../assets/diseno-de-logo.png'

function Nav() {
    return (
        <div className='header'>
            <a href="/"><img src={Logo} alt="no cargada" className="logo"/></a>
            <nav>
                <ul className="nav__links">
                    
                    <li><a href="/index#lineales">Estructuras Lineales</a></li>
                    <li><a href="/index#Ordenamientos">Ordenamientos</a></li>
                    <li><a href="/index#arboreas ">Estructuras arbóreas</a></li>
                    
                </ul>
            </nav>
            <a href="/index" className="btn_nav"><button>Inicio</button></a>
    </div>
    )
}

export default Nav
