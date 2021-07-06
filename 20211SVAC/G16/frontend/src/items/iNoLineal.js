import Minimo from '../images/noLineal/minimo.png'
import Hash from '../images/noLineal/hash.png'
import Costo from '../images/noLineal/costo.png'
import Grafo from '../images/noLineal/grafo.png'
import Grafo1 from '../images/noLineal/grafo1.png'

const ItemNoLineal = [
    {
        title: "Tabla Hash",
        name: "Abierta",
        logo: Hash,
        path: "NoLineales/HashAbierta",
        header: "",
        class: "Button Button_right1"
    },
    {
        title: "Tabla Hash",
        name: "Cerrada",
        logo: Hash,
        path: "NoLineales/HashCerrada",
        header: "",
        class: "Button Button_1"
    },
    {
        title: "Recorrido y Búsqueda",
        name: "Por Anchura",
        logo: Grafo,
        path: "NoLineales/AnchuraDeGrafos",
        header: "",
        class: "Button Button_left1"
    },
    {
        title: "Recorrido y Búsqueda",
        name: "Por Profundidad",
        logo: Grafo1,
        path: "NoLineales/ProfundidadDeGrafos",
        header: "",
        class: "Button Top_right1"
    },
    {
        title: "Algoritmo de",
        name: "Costo Uniforme",
        logo: Costo,
        path: "NoLineales/CostoUniforme",
        header: "",
        class: "Button Top_button1"
    },
    {
        title: "Árbol de",
        name: "Recubrimiento Mínimo",
        logo: Minimo,
        path: "NoLineales/RecubrimientoMinimo",
        header: "",
        class: "Button Top_left1"
    }
]

export default ItemNoLineal