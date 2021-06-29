import React from 'react'

import '../Global.css'

class Footer extends React.Component{
    render(){
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <p className="col-sm">
                            &copy;&nbsp;{new Date().getFullYear()}&nbsp;
                            <a className="Link_text" href="https://github.com/tytusdb/tytusds" target="_blank" rel="noreferrer">
                                TytusDS
                            </a>&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;  
                                Todos los Derechos Reservados&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;    
                            <a className="Link_text" href="https://github.com/tytusdb/tytusds/blob/main/LICENSE.md" target="_blank" rel="noreferrer">
                                Terminos de Uso
                            </a>&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;        
                            <a className="Link_text" href="https://github.com/LegalmenteMiguel" target="_blank" rel="noreferrer">
                                Miguel Guirola
                            </a>&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;     
                            <a className="Link_text" href="https://github.com/NeryJim21" target="_blank" rel="noreferrer">
                                Nery Jiménez
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        )
    }
}

export default Footer