import React from 'react'
import Cards from './components/Cards'
import {BrowserRouter,Switch, Route} from 'react-router-dom';
import './App.css'
import StackComponent from './EDDC/Stack'
import QueueComponent from './EDDC/Cola'
import Principal from './components/Principal'
import Particles from 'react-particles-js';
import Burbuja from './OrdenamientoComponentes/Burbuja'

function App() {
    return (

     <BrowserRouter>
        <Switch>

            <Route path="/index" component={Cards} />
            <Route path="/stack" component={StackComponent} />
            <Route path="/queue" component={QueueComponent}/>
            <Route path="/burbuja" component={Burbuja}/>
            <Route path="/" component={Principal}/>


        </Switch>

     </BrowserRouter>
    )
}

export default App
