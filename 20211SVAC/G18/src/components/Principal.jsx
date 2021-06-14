import React from 'react'
import './principal.css'
import Particles from 'react-particles-js';

function Principal() {
    return (

        <div className="principal">
             
            <section className="Bienvenida ">
      
                    <div className="contenedor_bienvenida">
                        
                        <div className="contenedor_bienvenida__hero">
                            <h1 className="hero animate__animated animate__fadeInDown">Bienvenido...</h1>
                        </div>


                        <p className="contenedor_bienvenida__texto ">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dignissimos fugiat officia pariatur impedit distinctio harum consequuntur minima qui blanditiis perferendis aspernatur, tenetur placeat delectus? Perspiciatis commodi vitae quos dolorem fuga?</p>
                        <a href="/index" className="btn_nav"><button>Inicio</button></a>
                        <img
                            src="https://joshsol.carrd.co/assets/images/image01.gif?v83885887198851"
                            alt=""
                            className="contenedor_bienvenida__cohete animate__animated animate__fadeInUp"
                        />
                    </div>
                    <Particles id="particles-js"
            params={{
                "particles": {
                  "number": {
                    "value": 100,
                    "density": {
                      "enable": false,
                      "value_area": 800
                    }
                  },
                  "color": {
                    "value": "#ffffff"
                  },
                  "shape": {
                    "type": "star",
                    "stroke": {
                      "width": 0,
                      "color": "#000000"
                    },
                    "polygon": {
                      "nb_sides": 5
                    },
                    "image": {
                      "src": "http://wiki.lexisnexis.com/academic/images/f/fb/Itunes_podcast_icon_300.jpg",
                      "width": 100,
                      "height": 100
                    }
                  },
                  "opacity": {
                    "value": 0.5,
                    "random": false,
                    "anim": {
                      "enable": false,
                      "speed": 1,
                      "opacity_min": 0.1,
                      "sync": false
                    }
                  },
                  "size": {
                    "value": 4,
                    "random": true,
                    "anim": {
                      "enable": false,
                      "speed": 40,
                      "size_min": 0.1,
                      "sync": false
                    }
                  },
                  "line_linked": {
                    "enable": false,
                    "distance": 150,
                    "color": "#ffffff",
                    "opacity": 0.4,
                    "width": 1
                  },
                  "move": {
                    "enable": true,
                    "speed": 14,
                    "direction": "top",
                    "random": false,
                    "straight": true,
                    "out_mode": "out",
                    "bounce": false,
                    "attract": {
                      "enable": false,
                      "rotateX": 600,
                      "rotateY": 1200
                    }
                  }
                },
                "interactivity": {
                  "detect_on": "canvas",
                  "events": {
                    "onhover": {
                      "enable": false,
                      "mode": "grab"
                    },
                    "onclick": {
                      "enable": true,
                      "mode": "repulse"
                    },
                    "resize": true
                  },
                  "modes": {
                    "grab": {
                      "distance": 200,
                      "line_linked": {
                        "opacity": 1
                      }
                    },
                    "bubble": {
                      "distance": 400,
                      "size": 40,
                      "duration": 2,
                      "opacity": 8,
                      "speed": 3
                    },
                    "repulse": {
                      "distance": 200,
                      "duration": 0.4
                    },
                    "push": {
                      "particles_nb": 4
                    },
                    "remove": {
                      "particles_nb": 2
                    }
                  }
                },
                "retina_detect": true
              }}    
        />
                   
            </section>
            
            <section>

            </section>

        </div>

    )
}

export default Principal
