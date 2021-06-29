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
            <Route component={NotFound} />
          </Switch>
        </Layout>
      </BrowserRouter>
    )
  
}

export default App;
