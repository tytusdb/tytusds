import React from 'react'
import './nav.css'
import Logo from '../assets/diseno-de-logo.png'

function Nav() {
    return (
        <div className='header'>
            <a href="/"><img src={Logo} alt="no cargada" className="logo"/></a>
            <nav>
                <ul className="nav__links">
<<<<<<< HEAD
                    
                    <li><a href="/index#lineales">Estructuras Lineales</a></li>
                    <li><a href="/index#Ordenamientos">Ordenamientos</a></li>
                    <li><a href="/index#arboreas ">Estructuras arbóreas</a></li>
                    
=======

                    <li><a href="index#lineales">Estructuras Lineales</a></li>
                    <li><a href="index#Ordenamientos">Ordenamientos</a></li>
                    <li><a href="index#arboreas ">Estructuras arbóreas</a></li>

>>>>>>> ac9f2dafee38a88e534923a1d5ce30156281926d
                </ul>
            </nav>
            <a href="/index" className="btn_nav"><button>Estructuras</button></a>
    </div>
    )
}

export default Nav
