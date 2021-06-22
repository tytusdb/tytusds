import React from 'react'
import PropTypes from 'prop-types'
import './card.css'
import { Link } from 'react-router-dom'



function Card({title,imageSource,text, url}) {
    
    return (
        <div className="card text-center bg-dark animate__animated animate__fadeInUp">
            <div className="over-flow">
                <img src={imageSource} alt="" className="card-img-top  "/>
            </div>
            <div className="card-body text-light">
                <h4 className="card-title">{title}</h4>
                
                    <p className="card-text text-secondary">
                        {
                            text ? text:""
                        }
                    </p>
                    <Link to={url} className="btn btn-outline-secondary">
                        ir a
                    </Link>
            </div>
        </div>
    )
}


Card.protoTypes={
    title: PropTypes.string.isRequired,
    url: PropTypes.string,
    imageSource: PropTypes.string,
    text: PropTypes.string
}

export default Card;



