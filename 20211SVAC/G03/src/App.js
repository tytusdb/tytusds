

import React from 'react'
import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Navbar from './components/Navbar';
import Divisiones from './components/Divisiones';
import NavbarInter from './components/NavbarInter'; 
var sectionStyle = {
  backgroundImage: "url( https://res.cloudinary.com/practicaldev/image/fetch/s--AILWL9dz--/c_imagga_scale,f_auto,fl_progressive,h_500,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/i/6vnsxy7g486k12yp4bhd.jpg )"
};
function App() {
  return (
    <div className="App" style={sectionStyle}>
      <Router>
      <Route exact path="/tytusds/20211SVAC/G03/build/" render={() =>{
        return <div> 
          <Navbar/>
          <Divisiones/> 
        </div>
      }}>
        </Route>

        <Route exact path="/tytusds/20211SVAC/G03/build/estructura" component={NavbarInter}/>
      </Router>
    </div>
  );
}



export default App;
