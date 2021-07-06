import React, { Component } from 'react'
import { Card } from 'semantic-ui-react'
import Division from './Division'
import './Divisiones.css'


export default class Divisiones extends Component {
    render() {
        return (
            <div className="divisiones"> 
            <div className="one">
                <h1 style={{ color: 'white' }}>TytusDS</h1>
            </div>
            
            <br/>
            <br/>
            <Card.Group itemsPerRow={4} >
                    <Division title="Ordenamiento Burbuja" descripcion="this a description" color='red' imagen="https://upload.wikimedia.org/wikipedia/commons/e/ef/Sorting_shaker_sort_anim.gif"/>
                    <Division title="Ordenamiento Selección" descripcion="this a description" color='green' imagen="https://upload.wikimedia.org/wikipedia/commons/a/a5/Smoothsort.gif"/>
                    <Division title="Ordenamiento Inserción" descripcion="this a description" color='yellow' imagen="https://thumbs.gfycat.com/DazzlingGracefulAngelfish-size_restricted.gif"/>
                    <Division title="Ordenamiento Rapido" descripcion="this a description" color='blue' imagen="https://media.geeksforgeeks.org/wp-content/uploads/20190705180519/quicksort.gif"/>
                   
                    <Division title="Lista simplemente enlazada" descripcion="this a description" color='green' imagen="https://s6.gifyu.com/images/A-1.gif"/>
                    <Division title="Lista doblemente enlazada" descripcion="this a description" color='yellow' imagen="https://s6.gifyu.com/images/A-2.gif"/>
                    <Division title="Lista circular simplemente enlazada" descripcion="this a description" color='blue' imagen="https://s6.gifyu.com/images/A-4.gif"/>
                    <Division title="Lista circular doblemente enlazada" descripcion="this a description" color='violet' imagen="https://s6.gifyu.com/images/A-3.gif"/>

                    <Division title="Pila" descripcion="this a description" color='green' imagen="https://s6.gifyu.com/images/Pila.gif"/>
                    <Division title="Cola" descripcion="this a description" color='yellow' imagen="https://s6.gifyu.com/images/Cola.gif"/>
                    <Division title="Cola de prioridad" descripcion="this a description" color='blue' imagen="https://s6.gifyu.com/images/Cola-de-Prioridad.gif"/>


                    <Division title="Arbol ABB" descripcion="this a description" color='yellow' imagen="https://s6.gifyu.com/images/Arbol-ABB.gif"/>
                    <Division title="Arbol AVL" descripcion="this a description" color = 'green' imagen="https://s6.gifyu.com/images/Arbol-AVL.gif"/>
                    <Division title="Arbol B" descripcion="this a description"color='blue' imagen="https://s6.gifyu.com/images/Arbol-B.gif"/>
                    <Division title="Arbol B+" descripcion="this a description" color='violet' imagen="https://s6.gifyu.com/images/Arbol-B03b18e464b7dd774.gif"/>
                    <Division title="Arbol Merkle" descripcion="this a description" color="green" imagen="https://s6.gifyu.com/images/Arbol-Merkle.gif"/>
                    <Division title="Tabla Hash Abierta" descripcion="this a description" color="green" imagen=""/>
                    <Division title="Tabla Hash Cerrada" descripcion="this a description" color="green" imagen=""/>
                    <Division title="Col Major" descripcion="this a description" color="green" imagen=""/>
                    <Division title="Row Major" descripcion="this a description" color="green" imagen=""/>

                    <Division title="Matriz Dispersa" descripcion="this a description" color="green" imagen=""/>
                    <Division title="Grafo Dirigido" descripcion="this a description" color="green" imagen=""/>
                    <Division title="Grafo No Dirigido" descripcion="this a description" color="green" imagen=""/>

                    <Division title="Código de Hamming" descripcion="this a description" color="green" imagen=""/>
                    <Division title="Algoritmo de Huffman" descripcion="this a description" color="green" imagen=""/>
                    <Division title="Algoritmo LZW" descripcion="this a description" color="green" imagen=""/>
                    <Division title="Cifrado Feistel" descripcion="this a description" color="green" imagen=""/>

                    
                    <Division title="Algoritmo de costo uniforme" descripcion="this a description" color="green" imagen=""/>
                    <Division title="Árbol de recubrimiento mínimo" descripcion="this a description" color="green" imagen=""/>

            </Card.Group>
            </div>
        )
    }
}

