import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './Componentes/Navbar';
import Home from './Componentes/Paginas/Home';
import ListaSE from './Componentes/Paginas/ListaSE';
import ListaDE from './Componentes/Paginas/ListaDE';
import ListaCSE from './Componentes/Paginas/ListaCSE';
import ListaCDE from './Componentes/Paginas/ListaCDE';
import Pila from './Componentes/Paginas/Pila';
import Cola from './Componentes/Paginas/Cola';
import ColaPrioridad from './Componentes/Paginas/ColaPrioridad';
import Burbuja from './Componentes/Paginas/Burbuja';
import Seleccion from './Componentes/Paginas/Seleccion';
import Insercion from './Componentes/Paginas/Insercion';
import Rapido from './Componentes/Paginas/Rapido';
import AVL from './Componentes/Paginas/AVL';
import ArbolB from './Componentes/Paginas/Arbolb';
import ArbolBPlus from './Componentes/Paginas/Arbolbplus';
import ArbolMerkle from './Componentes/Paginas/Arbolmerkle';
import MatrizDispersa from './Componentes/Paginas/MatrizDispersa';
import TablaHashAbierta from './Componentes/Paginas/HashAbierta';
import Compuesta from './Componentes/Paginas/Compuesta'



function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/HashAbierta' exact component={TablaHashAbierta} />
        <Route path='/Listasimplementeenlazada' component={ListaSE} />
        <Route path='/Listadoblementeenlazada' component={ListaDE} />
        <Route path='/Listacircularsimplementeenlazada' component={ListaCSE} />
        <Route path='/Listacirculardoblementeenlazada' component={ListaCDE} />
        <Route path='/Pila' component={Pila} />
        <Route path='/Cola' component={Cola} />
        <Route path='/Colaprioridad' component={ColaPrioridad} />
        <Route path='/Burbuja' component={Burbuja} />
        <Route path='/Seleccion' component={Seleccion} />
        <Route path='/Insercion' component={Insercion} />
        <Route path='/Rapido' component={Rapido} />
        <Route path='/AVL' component={AVL} />
        <Route path='/Arbolb' component={ArbolB} />
        <Route path='/Arbolbplus' component={ArbolBPlus} />
        <Route path='/Arbolmerkle' component={ArbolMerkle} />
        <Route path='/MatrizDispersa' component={MatrizDispersa} />
        <Route path='/Compuesta' component={Compuesta} />
      </Switch>
    </Router>
  );
}

export default App;
