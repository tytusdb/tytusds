import React from "react";
import "../Header/Header.css"
import {Link} from "react-router-dom";

import logo2 from "../../assets/img/logo-fiusac.png"

const Navbar = ()=>{
    return(
        <header className={"header  "}>
            <div className={"container logo-nav-container "}>

                <a   href={"https://portal.ingenieria.usac.edu.gt/"} className={"logo"}><img src={logo2}/> </a>
                <nav className={"navigation"}>
                    <ul>
                        <li><Link to = "/"> Inicio</Link> </li>
                        <li><a href={"https://portal.ingenieria.usac.edu.gt/"}>Acerca</a> </li>
                    </ul>

                </nav>
            </div>
        </header>
    )
}

export default Navbar