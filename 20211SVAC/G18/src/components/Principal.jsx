import React from 'react'
import './principal.css'
import Particles from 'react-particles-js';

function Principal() {
    return (

        <div className="principal">

            <section className="Bienvenida ">

                    <div className="contenedor_bienvenida">

                        <div className="contenedor_bienvenida__hero">
                            <h1 className="hero animate__animated animate__fadeInDown">¡Bienvenido!</h1>
                        </div>

                        <div  className="contenedor_bienvenida__texto">
                        <p>¿Sabias qué?... Una estructura de datos, es una colección de valores, la relación que existe entre ellos y las operaciones que podemos realizar con los mismos; en pocas palabras se refiere a cómo los datos están organizados y cómo se pueden administrar.
                        </p>
                        <p>Desarrollamos este sitio web para que logres observar de manera grafica el funcionamiento de cada estructura. Por parte del grupo de desarrollo, esperamos te sea de mucha ayuda.</p>
                        </div>
                        <a href="/index" className="btn_nav"><button>¡Vamos!</button></a>
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
                    "direction": "bottom",
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
