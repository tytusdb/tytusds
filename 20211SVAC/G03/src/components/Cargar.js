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

import TablaHashAbierta from '../estructuras/EstructurasNoLineales/TablaHashAbierta'
import TablaHashCerrada from '../estructuras/EstructurasNoLineales/TablaHashCerrada'

import CRMajor from '../estructuras/EstructurasCompuestas/Col_Major'
import Matriz from '../estructuras/EstructurasCompuestas/MatrizDis'

import ListaAdyacencia from '../estructuras/EstructurasNoLineales/ReccProfAnch'
import CostoUniforme from '../estructuras/EstructurasNoLineales/CostoUniforme'
import Hamming from '../estructuras/AlgoritmosDeCodificacion/Hamming'
import AlgoritmoHuffman from '../estructuras/AlgoritmosDeCodificacion/Huffman'
import LZW from '../estructuras/AlgoritmosDeCodificacion/LZW'
import Feistel from '../estructuras/AlgoritmosDeCodificacion/Feistel'
let propsG
function onChange(e){
    let files = e.target.files[0];
    let reader = new FileReader();
    console.log(e.target.files[0])
    reader.onload = (e) => {
        const text = reader.result.toString().trim();
        console.log(text)
        let data; //parseo de archivo JSON
        if("Código de Hamming" === propsG.nombre ||
           "Algoritmo de Huffman" === propsG.nombre ||
           "Algoritmo LZW" === propsG.nombre ||
           "Cifrado Feistel" === propsG.nombre ){
            data = text
        }else{
            data = JSON.parse(text);
        }
        
        structW(propsG.nombre, propsG.edd,data) 
    }
    reader.readAsText(files);
}
function structW(nombre,edd,json){ // FUNCION PARA SABER QUE TIPO DE ESTRUCTURA ES.
    let datos = json.valores
    let grado = json.grado
    let posicion = json.posicion
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
        case "Tabla Hash Abierta":

            edd = new TablaHashAbierta(json.m, json.minimo, json.maximo, json.funcion);
            edd.cargar(datos)
            edd.imprimir()
            break
        case "Tabla Hash Cerrada":

            edd = new TablaHashCerrada(json.m, json.minimo, json.maximo, json.funcion, json.prueba);
            edd.cargar(datos)
            edd.imprimir()
            break
        case "Row Major":

            edd = new CRMajor(json.m);
            edd.cargar(datos,nombre)
            edd.imprimirMatriz()
            break
        case "Col Major":

            edd = new CRMajor(json.m,nombre);
            edd.cargar(datos)
            edd.imprimirMatriz()
            break
        case "Matriz Dispersa":

            edd = new Matriz();
            edd.cargar(datos)
            break
        case "Grafo Dirigido":

            edd = new ListaAdyacencia();
            edd.cargar(datos,nombre)
            break
        case "Grafo No Dirigido":

            edd = new ListaAdyacencia();
            edd.cargar(datos,nombre)
            break
        case "Código de Hamming":
            edd = new Hamming();
            edd.cargar(json)
            break
        case "Algoritmo de Huffman":
            edd = new AlgoritmoHuffman();
            edd.cargar(json)
            break
        case "Algoritmo LZW":
            edd = new LZW();
            edd.cargar(json)
            break
        case "Cifrado Feistel":
            edd = new Feistel();
            edd.cargar(json,key,num)
            break
        case "Algoritmo de costo uniforme":
            edd = new CostoUniforme();
            edd.cargar(datos,nombre)
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
let key ;
let num ;
export default function Cargar(props) {
    propsG = props
    const [open, setOpen] = React.useState(false)    
    const [llave, setLlave] = React.useState("")
    const [Numero, setNumero] = React.useState(0)
    key = llave
    num = Numero
    if(propsG.nombre === "Cifrado Feistel"){
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
                    <Input className="inputAgregar" type="text" name="llave" value={llave}  fluid placeholder="agregar dato" onChange={e => setLlave(e.target.value)}/>
                    <br/>
                    <Input className="inputAgregar" type="text" name="Numero" value={Numero}  fluid placeholder="agregar prioridad" onChange={e => setNumero(e.target.value)}/>
                    <br/>
                    <Input className="inputcargar" fluid type="file" accept=".json, .txt" onChange={(e) =>  onChange(e)} />
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
    }else{
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
                    <Input className="inputcargar" fluid type="file" accept=".json, .txt" onChange={(e) =>  onChange(e)} />
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
}
