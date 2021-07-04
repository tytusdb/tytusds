import React from 'react'
import {Switch, Route, BrowserRouter} from 'react-router-dom'

import Layout from './Layout'
//Menus
import Home from '../pages/Menus/mHome'
import NotFound from '../pages/Menus/NotFound'
import Lineal from '../pages/Menus/mLineal'
import Arborea from '../pages/Menus/mArborea'
import NoLineal from '../pages/Menus/mNoLineal'
import Codificacion from '../pages/Menus/mCodificacion'
import Compuesta from '../pages/Menus/mCompuesta'
//Lineales
import Simple from '../pages/lineal/pSimpleEC'
import PilaCola from '../pages/lineal/pPilaCola'
import ColaPrioridad from '../pages/lineal/pColaPrioridad'
import Dobles from '../pages/lineal/pDobleEC'
//Ordenamientos
import Ordenamiento from '../pages/pOrdenamiento'
//Arboreas
import Arboles from '../pages/arborea/pArbol'
import ArbolB from '../pages/arborea/pArbolB'
//No Lineales
import HashC from '../pages/noLineal/pHashC'
import HashA from '../pages/noLineal/pHashA'
import grafoB from '../pages/noLineal/pGrafosB'
//Codificacion
import Hamming from '../pages/cadificacion/pHamming'
import Huffman from '../pages/cadificacion/pHuffman'
import LZW from '../pages/cadificacion/pLZW'
import Feistel from '../pages/cadificacion/pFeistel'
//import Feistel from '../pages/cadificacion/pFeistel'
//Compuesta
import RCMajor from '../pages/compuesta/pRCMayor'
import mDispersa from '../pages/compuesta/pMatrizD'

function  App(){
    return (
      <BrowserRouter>
        <Layout>
          <Switch>
            {/*Menus*/}
            <Route exact path="/tytusds/20211SVAC/G16/frontend/build/" component={Home} />
            <Route exact path="/tytusds/20211SVAC/G16/frontend/build/Lineales" component={Lineal} />
            <Route exact path="/tytusds/20211SVAC/G16/frontend/build/Arboreas" component={Arborea} />
            <Route exact path="/tytusds/20211SVAC/G16/frontend/build/NoLineales" component={NoLineal} />
            <Route exact path="/tytusds/20211SVAC/G16/frontend/build/Codificacion" component={Codificacion} />
            <Route exact path="/tytusds/20211SVAC/G16/frontend/build/Compuestas" component={Compuesta} />
            {/*Lineales*/}
            <Route exact path="/tytusds/20211SVAC/G16/frontend/build/Lineales/EnlazadaSimple" component={Simple} />
            <Route exact path="/tytusds/20211SVAC/G16/frontend/build/Lineales/EnlazadaDoble" component={Dobles} />
            <Route exact path="/tytusds/20211SVAC/G16/frontend/build/Lineales/CircularSimple" component={Simple} />
            <Route exact path="/tytusds/20211SVAC/G16/frontend/build/Lineales/CircularDoble" component={Dobles} />
            <Route exact path="/tytusds/20211SVAC/G16/frontend/build/Lineales/Pila" component={PilaCola} />
            <Route exact path="/tytusds/20211SVAC/G16/frontend/build/Lineales/Cola" component={PilaCola} />
            <Route exact path="/tytusds/20211SVAC/G16/frontend/build/Lineales/ColaPrioridad" component={ColaPrioridad} />
            {/*Ordenamientos*/}
            <Route exact path="/tytusds/20211SVAC/G16/frontend/build/Ordenamientos" component={Ordenamiento} />
            {/*Arboreas*/}
            <Route exact path="/tytusds/20211SVAC/G16/frontend/build/Arboreas/ArbolBinario" component={Arboles} />
            <Route exact path="/tytusds/20211SVAC/G16/frontend/build/Arboreas/AVL" component={Arboles} />
            <Route exact path="/tytusds/20211SVAC/G16/frontend/build/Arboreas/ArbolB" component={ArbolB} />
            <Route exact path="/tytusds/20211SVAC/G16/frontend/build/Arboreas/ArbolB+" component={ArbolB} />
            {/*No Lineales*/}
            <Route exact path="/tytusds/20211SVAC/G16/frontend/build/NoLineales/HashCerrada" component={HashC} />
            <Route exact path="/tytusds/20211SVAC/G16/frontend/build/NoLineales/HashAbierta" component={HashA} />
            <Route exact path="/tytusds/20211SVAC/G16/frontend/build/NoLineales/AnchuraDeGrafos" component={grafoB} />
            <Route exact path="/tytusds/20211SVAC/G16/frontend/build/NoLineales/ProfundidadDeGrafos" component={grafoB} />
            <Route exact path="/tytusds/20211SVAC/G16/frontend/build/NoLineales/CostoUniforme" component={grafoB} />
            <Route exact path="/tytusds/20211SVAC/G16/frontend/build/NoLineales/RecubrimientoMinimo" component={grafoB} />
            {/*Codificacion*/}
            <Route exact path="/tytusds/20211SVAC/G16/frontend/build/Codificacion/Hamming" component={Hamming} />
            <Route exact path="/tytusds/20211SVAC/G16/frontend/build/Codificacion/Huffman" component={Huffman} />
            <Route exact path="/tytusds/20211SVAC/G16/frontend/build/Codificacion/LZW" component={LZW} />
            <Route exact path="/tytusds/20211SVAC/G16/frontend/build/Codificacion/Feistel" component={Feistel} />
            {/*Compuestas*/}
            <Route exact path="/tytusds/20211SVAC/G16/frontend/build/Compuestas/RowMajor" component={RCMajor} />
            <Route exact path="/tytusds/20211SVAC/G16/frontend/build/Compuestas/ColMajor" component={RCMajor} />
            <Route exact path="/tytusds/20211SVAC/G16/frontend/build/Compuestas/MatrizDispersa" component={mDispersa} />
            <Route component={NotFound} />
          </Switch>
        </Layout>
      </BrowserRouter>
    )
  
}

export default App;
