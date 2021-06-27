import React from 'react'
import { Button, Header, Icon, Modal,Menu,Input } from 'semantic-ui-react'

import Cola from '../estructuras/EstructurasLineales/Cola'
import ColaPrioridad from '../estructuras/EstructurasLineales/ColaPrioridad'

import ArbolAVL from '../estructuras/Estructuras_Arboreas/AVL'
import ABB from '../estructuras/Estructuras_Arboreas/ABB'
import MerkleTree from '../estructuras/Estructuras_Arboreas/merkleTree'

import Pila from '../estructuras/EstructurasLineales/Pila'
import ListaCirD from '../estructuras/EstructurasLineales/ListaCirD'
import ListaCS from '../estructuras/EstructurasLineales/ListaCirS'
import ListaSimple from '../estructuras/EstructurasLineales/ListaSimple'
import ListaDoble from '../estructuras/EstructurasLineales/ListaDoble'

import ArbolB from '../estructuras/Estructuras_Arboreas/ArbolB'
import ArbolBplus from '../estructuras/Estructuras_Arboreas/ArbolBplus'

let propsG
function onChange(e){
    let files = e.target.files[0];
    let reader = new FileReader();
    console.log(e.target.files[0])
    reader.onload = (e) => {
        const text = reader.result.toString().trim();
        console.log(text)
        let data = JSON.parse(text); //parseo de archivo JSON
        structW(propsG.nombre, data.valores, propsG.edd,data.grado,data.posicion) 
    }
    reader.readAsText(files);
}
function structW(nombre,datos,edd,grado,posicion){ // FUNCION PARA SABER QUE TIPO DE ESTRUCTURA ES.
    switch(nombre){
        case "Pila" :
            if(edd == null){
                edd = new Pila();
            }
            edd.cargar(datos)
            break
        case "Cola":
            if(edd == null){
                edd = new Cola();
            }
            edd.cargar(datos)
            edd.Imprimir()
            break
        case "Cola de prioridad":
            if(edd == null){
                edd = new ColaPrioridad();
            }
            edd.cargar(datos)
            break
        case "Lista simplemente enlazada":

            if(edd == null){
                edd = new ListaSimple();
            }
            edd.cargar(datos,posicion)
            break

        case "Lista doblemente enlazada":

            if(edd == null){
                edd = new ListaDoble();
            }
            edd.cargar(datos,posicion) 
            break

        case "Lista circular simplemente enlazada":

            if(edd == null){
                edd = new ListaCS();
            }
            edd.cargar(datos,posicion)
            break

        case "Lista circular doblemente enlazada":

            if(edd == null){
                edd = new ListaCirD();
            }
            edd.cargar(datos,posicion)
            break
        case "Ordenamiento Selección":

            edd = arrString(datos)
            break
        case "Ordenamiento Inserción":

            edd = arrString(datos)
            break
        case "Ordenamiento Burbuja":

            edd = arrString(datos)
            break
        case "Ordenamiento Rapido":

            edd = arrString(datos)
            break
        case "Arbol ABB":

            edd = new ABB();
            edd.cargar(datos)
            console.log(edd.obtenerNodos())
            console.log(edd.obtenerAputadores())
            break
        case "Arbol AVL":

            edd = new ArbolAVL();
            edd.cargar(datos)
            console.log(edd.obtenerNodos())
            console.log(edd.obtenerAputadores())
            break
        case "Arbol B":

            edd = new ArbolB(grado);
            edd.cargar(datos)
            console.log(edd.graficar())
            break
        case "Arbol Merkle":

            edd = new MerkleTree();
            edd.cargar(datos)
            break
         case "Arbol B+":

            edd = new ArbolBplus(grado);
            edd.cargar(datos)
            console.log(edd.graficar())
            break
        default:
            break;
    }
    propsG.obtenerDatos(edd);
}



function arrString(arreglo){
    let newarr = []
  
    
    if(arreglo[0].charCodeAt){
        for (let i = 0; i < arreglo.length-1; i++) {
            let newValor = {valor:arreglo[i],ASCII:getCharCodes(arreglo[i])}
          newarr.push(newValor)
          
        }
    }else{
        for (let i = 0; i < arreglo.length-1; i++) {
            let newValor = {valor:arreglo[i],ASCII:arreglo[i]}
          newarr.push(newValor)
          
        }
    }
  
    return newarr
  }
  
  function getCharCodes(s){
    let charCodeArr = 0;
    
    for(let i = 0; i < s.length; i++){
        let code = s.charCodeAt(i);
        charCodeArr += code
    }
    
    return charCodeArr;
  }


export default function Cargar(props) {
    propsG = props
    const [open, setOpen] = React.useState(false)
    return (
        <Modal
            className="modalcargar"
            basic
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            size='small'
            trigger={<Menu.Item>Cargar</Menu.Item> }
            >
            <Header icon>
                <Icon name='folder open outline' />
                Cargar
            </Header>
            <Modal.Content>
            </Modal.Content>
                <Input className="inputcargar" fluid type="file" accept=".json" onChange={(e) =>  onChange(e)} />
            <Modal.Actions>
                <Button basic color='red' inverted onClick={() => setOpen(false)}>
                <Icon name='remove' /> No
                </Button>
                <Button className="buttoncargar" color='green' inverted onClick={() =>  setOpen(false)}>
                <Icon name='checkmark' /> Si
                </Button>
            </Modal.Actions>
            </Modal>
    )
}
