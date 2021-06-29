import React from 'react'
import {Switch, Route, BrowserRouter} from 'react-router-dom'

import Layout from './Layout'
//Home
import Home from '../pages/Home'
//404
import NotFound from '../pages/NotFound'
//Lineales
import Lineal from '../pages/Lineal'
import LinealEC from '../pages/LinealEC'
import LinealPC from '../pages/LinealPC'
import LinealCP from '../pages/LinealCP'
import LinealECD from '../pages/LinealECD'
//Ordenamientos
import Ordenamiento from '../pages/Ordenamiento'
//Arboreas
import Arborea from '../pages/Arborea'
import Arboles from '../pages/Arboles'
import ArbolB from '../pages/ArbolB'

function  App(){
    return (
      <BrowserRouter>
        <Layout>
          <Switch>
            <Route exact path="/tytusds/20211SVAC/G16/frontend/build/" component={Home} />
            <Route exact path="/tytusds/20211SVAC/G16/frontend/build/Lineales" component={Lineal} />
            <Route exact path="/tytusds/20211SVAC/G16/frontend/build/Ordenamientos" component={Ordenamiento} />
            <Route exact path="/tytusds/20211SVAC/G16/frontend/build/Arboreas" component={Arborea} />
            <Route exact path="/tytusds/20211SVAC/G16/frontend/build/Lineales/EnlazadaSimple" component={LinealEC} />
            <Route exact path="/tytusds/20211SVAC/G16/frontend/build/Lineales/EnlazadaDoble" component={LinealECD} />
            <Route exact path="/tytusds/20211SVAC/G16/frontend/build/Lineales/CircularSimple" component={LinealEC} />
            <Route exact path="/tytusds/20211SVAC/G16/frontend/build/Lineales/CircularDoble" component={LinealECD} />
            <Route exact path="/tytusds/20211SVAC/G16/frontend/build/Lineales/Pila" component={LinealPC} />
            <Route exact path="/tytusds/20211SVAC/G16/frontend/build/Lineales/Cola" component={LinealPC} />
            <Route exact path="/tytusds/20211SVAC/G16/frontend/build/Lineales/ColaPrioridad" component={LinealCP} />
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