import React from 'react'
import Cards from './components/Cards'
import {BrowserRouter,Switch, Route} from 'react-router-dom';
import './App.css'
import StackComponent from './EDDC/Stack'
import QueueComponent from './EDDC/Cola'
import Principal from './components/Principal'
import Particles from 'react-particles-js';
import Burbuja from './OrdenamientoComponentes/Burbuja'
import Seleccion from './OrdenamientoComponentes/Seleccion';
import Incersion from './OrdenamientoComponentes/Incersion'
import Rapido from './OrdenamientoComponentes/Rapido'
import ListaSimpleEnlazada from './components/EstructurasLineales/ListaSimpleEnlazada/ListaSimpleEnlazada';
import ListaDobleEnlazada from './components/ListaDobleEnlazada/ListaDobleEnlazada';
import ListaCircularSimple from './components/ListaCircularSimple/ListaCircularSimple';
import ListaCircularDoble from './components/ListaCircularDoble/ListaCircularDoble';
import abb from './components/ArbolBB/ArbolBB';
import avl from './components/ArbolAVL/ArbolAVL';
import hamming from './components/Hamming/Hamming';
import huffman from './components/Huffman/Huffman';

function App() {
    return (

     <BrowserRouter>
        <Switch>

            <Route path="/index" component={Cards} />
            <Route path="/stack" component={StackComponent} />
            <Route path="/queue" component={QueueComponent}/>
            <Route path="/burbuja" component={Burbuja}/>
            <Route path = "/seleccion" component={Seleccion}/>
            <Route path = "/insercion" component={Incersion}/>
            <Route path = "/rapido" component={Rapido}/>
            <Route path="/" exact component={Principal}/>
            <Route path="/ListaSimpleEnlazada" component={ListaSimpleEnlazada} />
            <Route path="/ListaDobleEnlazada" component={ListaDobleEnlazada} />
            <Route path="/ListaCircularSimple" component={ListaCircularSimple} />
            <Route path="/ListaCircularDoble" component={ListaCircularDoble} />
            <Route path="/abb" component={abb} />
            <Route path="/avl" component={avl} />
            <Route path="/hamming" component={hamming} />
            <Route path="/huffman" component={huffman} />

        </Switch>

     </BrowserRouter>
    )
}

export default App
