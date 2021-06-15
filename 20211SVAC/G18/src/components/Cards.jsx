import React from 'react'
import Card from './Card'
import image1 from '../assets/image1.jpg'
import image2 from '../assets/image2.jpg'
import image3 from '../assets/image3.jpg'


const EstructurasLineales = [
    {
        id: 1,
        title: 'Lista simple enlazada',
        image: image1,
        url: '/index'
    },

    {
        id: 2,
        title: 'Lista doblemente enlazda',
        image: image1,
        url: "/",
        text: 'Sebas gay'
    },
    {
        id: 4,
        title: 'Lista Circular siple enlazada',
        image: image1,
        url: "/",
    },
    {
        id: 5,
        title: 'Lista circular Doblemente enlazada',
        image: image1,
        url: "/",
    },

    {
        id: 6,
        title: 'pila',
        image: image1,
        url: "/stack",
    },

    {
        id: 6,
        title: 'cola',
        image: image1,
        url: "/queue",
    },

    {
        id: 6,
        title: 'Cola de proriedad',
        image: image1,
        url: "/",
    },




]



const Ordenamientos = [
    {
        id: 7,
        title: 'Burbuja',
        image: image2,
        url: '/burbuja'
    },

    {
        id: 8,
        title: 'Seleccion',
        image: image2,
        url: "/",
        text: 'Sebas gay'
    },
    {
        id: 9,
        title: 'Insercion',
        image: image2,
        url: "/",
    },
    {
        id: 10,
        title: 'Rapido',
        image: image2,
        url: "/",
    },

]


const arboles = [
    {
        id: 11,
        title: 'Arbol binario de Busqueda',
        image: image3,
        url: '/'
    },

    {
        id: 12,
        title: 'AVL',
        image: image3,
        url: "/",
        text: 'Árbol B'
    },
    {
        id: 13,
        title: 'Árbol B+',
        image: image3,
        url: "/",
    },
    {
        id: 14,
        title: 'Árbol de Merkle',
        image: image3,
        url: "/",
    },

]





function Cards() {


    return (

        <div className="container d-flex justify-content-center align-items-center h-100 ">
            <div className="row">

            <h2 className="text-white" >Estcructuras Lineales</h2 >
                
                {
                    EstructurasLineales.map(card => (
                        
                        <div className="col-md-3 " key={card.id} id="lineales">
                            
                            <Card title={card.title} imageSource={card.image} url={card.url} text={card.text} />
                        </div>
                    ))
                }


                <h2 className="text-white">Ordenamientos </h2>
                {
                    Ordenamientos.map(card => (
                        <div className="col-md-3 " key={card.id} id="Ordenamientos">
                            <Card title={card.title} imageSource={card.image} url={card.url} text={card.text} />
                        </div>
                    ))
                }


                <h2 className="text-white">Estructuras arbóreas</h2>
                {
                    arboles.map(card => (
                        <div className="col-md-3 " key={card.id} id="arboreas">
                            <Card title={card.title} imageSource={card.image} url={card.url} text={card.text} />
                        </div>
                    ))
                }
            </div>


        </div>

    )
}

export default Cards
