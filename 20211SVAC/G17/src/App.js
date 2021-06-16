import React, {Component} from "react";

import Galeria from "./components/Menu/Galeria";
import Navbar from "./components/Header/Header";
import {HashRouter, Route} from "react-router-dom";


// Paginas
import ListaSimple from "./Paginas/Listasimple";
import ListaDoble from "./Paginas/Listadoble";
import ListaCircularSimple from "./Paginas/Listacicurlarsimple";
import ListaCicularDoble from "./Paginas/listaciculardoble";
import Pila from "./Paginas/Pila";
import Cola from "./Paginas/Cola";
import ColaPriori from "./Paginas/ColaPriori";
import Burbuja from "./Paginas/Burbuja";
import Seleccion from "./Paginas/Seleccion";
import Insercion from "./Paginas/Insercion";
import Rapido from "./Paginas/Rapido";
import ABB from "./Paginas/ABB";
import AVL from "./Paginas/AVL";
import ArbolB from "./Paginas/ArbolB";
import ArbolBmas from "./Paginas/ArbolB+";
import ArbolMerkle from "./Paginas/ArbolMerkle";
import Prox from "./Paginas/Prox"






class App extends Component{
    render(){
        return(
            <HashRouter basename = '/'>
                <>
                    <Navbar />
                </>
                <Route exact path={"/"} component={Galeria}/>
                <Route exact path={"/404"} component={Prox}/>
                <Route path ="/listasimple" component={ListaSimple}/>
                <Route path ="/listadoble" component={ListaDoble}/>
                <Route path ="/listacircularsimpleenlazada" component={ListaCircularSimple}/>
                <Route path ="/listacirculardobleenlazada" component={ListaCicularDoble}/>
                <Route path ="/pila" component={Pila}/>
                <Route path ="/cola" component={Cola}/>
                <Route path ="/coladeprioridad" component={ColaPriori}/>
                <Route path ="/burbuja" component={Burbuja}/>
                <Route path ="/seleccion" component={Seleccion}/>
                <Route path ="/insercion" component={Insercion}/>
                <Route path ="/rapido" component={Rapido}/>
                <Route path ="/abb" component={ABB}/>
                <Route path ="/avl" component={AVL}/>
                <Route path ="/arbolb" component={ArbolB}/>
                <Route path ="/arbolb+" component={ArbolBmas}/>
                <Route path ="/arbolmerkle" component={ArbolMerkle}/>
            </HashRouter>
        );
    }
}


export default App;
