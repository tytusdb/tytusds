import React from 'react'
import Card from './Card'
import ListaEnlazadaED from '../assets/ListaEnlazadaED.png'
import circularDoble from '../assets/circularDoble.jpg'
import dobleEnlazada from '../assets/dobleEnlazada.jpg'
import circularSimple from '../assets/circularSimple.jpg'
import cola from '../assets/cola.png'
import pila from '../assets/pila.png'
import colaPriori from '../assets/colaPriori.png'
import burbuja from '../assets/burbuja.png'
import rapido from '../assets/rapido.jpg'
import seleccion from '../assets/seleccion.jpg'
import insercion from '../assets/insercion.jpg'
import abb from '../assets/abb.png'
import avl from '../assets/avl.png'
import bmas from '../assets/bmas.JPG'
import merkle from '../assets/merkle.png'



const EstructurasLineales = [
    {
        id: 1,
        title: 'Lista simple enlazada',
        image: ListaEnlazadaED,
        url: '/ListaSimpleEnlazada',
    },

    {
        id: 2,
        title: 'Lista doblemente enlazada',
        image: dobleEnlazada,
        url: '/ListaDobleEnlazada'
    },
    {
        id: 4,
        title: 'Lista circular simple enlazada',
        image: circularSimple,
        url: "/ListaCircularSimple",
    },
    {
        id: 5,
        title: 'Lista circular doblemente enlazada',
        image: circularDoble,
        url: "/ListaCircularDoble",
    },

    {
        id: 6,
        title: 'Pila',
        image: pila,
        url: "/stack",
    },

    {
        id: 6,
        title: 'Cola',
        image: cola,
        url: "/queue",
    },

    {
        id: 6,
        title: 'Cola de prioridad',
        image: colaPriori,
        url: "/",
    },




]



const Ordenamientos = [
    {
        id: 7,
        title: 'Burbuja',
        image: burbuja,
        url: '/burbuja'
    },

    {
        id: 8,
        title: 'Seleccion',
        image: seleccion,
        url: "/Seleccion",
    },
    {
        id: 9,
        title: 'Insercion',
        image: insercion,
        url: "/insercion",
    },
    {
        id: 10,
        title: 'Rapido',
        image: rapido,
        url: "/",
    },

]


const arboles = [
    {
        id: 11,
        title: 'Arbol binario de busqueda',
        image: abb,
        url: '/abb'
    },

    {
        id: 12,
        title: 'AVL',
        image: avl,
        url: "/avl",
    },
    {
        id: 13,
        title: 'Árbol B+',
        image: bmas,
        url: "/",
    },
    {
        id: 14,
        title: 'Árbol de Merkle',
        image: merkle,
        url: "/",
    },

]

const codificacion = [
    {
        id: 15,
        title: 'Codigo de Hamming',
        image: abb,
        url: '/hamming'
    },

    {
        id: 16,
        title: 'Algoritmo de Huffman',
        image: avl,
        url: "/huffman",
    },
    {
        id: 17,
        title: 'Algoritmo LZW',
        image: bmas,
        url: "/",
    },
    {
        id: 18,
        title: 'Cifrado Feistel',
        image: merkle,
        url: "/",
    },
    {
        id: 19,
        title: 'Cifrado RSA',
        image: merkle,
        url: "/",
    },

]





function Cards() {


    return (

        <div className="container d-flex justify-content-center align-items-center h-100 ">
            <div className="row">

                <h2 className="text-white" >Estructuras Lineales</h2>

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

                <h2 className="text-white">Algoritmos de codificación</h2>
                {
                    codificacion.map(card => (
                        <div className="col-md-3 " key={card.id} id="codificacion">
                            <Card title={card.title} imageSource={card.image} url={card.url} text={card.text} />
                        </div>
                    ))
                }
            </div>


        </div>

    )
}

export default Cards
