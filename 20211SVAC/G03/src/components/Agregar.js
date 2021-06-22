
import { Button, Header, Icon, Modal,Menu,Input } from 'semantic-ui-react'
import './modal.css'
import React, { Component } from 'react'
import Cola from '../estructuras/EstructurasLineales/Cola'
import ColaPrioridad from '../estructuras/EstructurasLineales/ColaPrioridad'
import ABB from '../estructuras/Estructuras_Arboreas/ABB'


import Pila from '../estructuras/EstructurasLineales/Pila'
import ListaCirD from '../estructuras/EstructurasLineales/ListaCirD'
import ListaCS from '../estructuras/EstructurasLineales/ListaCirS'


import ListaSimple from '../estructuras/EstructurasLineales/ListaSimple'
import ListaDoble from '../estructuras/EstructurasLineales/ListaDoble'

export default class Agregar extends Component {

    state={
           open: false,
           textoDato: "" ,
           prioridad: ""
    }


    swtEdd=()=>{
        let nombre = this.props.nombre
        let edd = this.props.edd
        let dato = this.state.textoDato
        let prioridad = this.state.prioridad
        switch(nombre){
            case "Pila" :
                if(edd == null){
                    edd = new Pila();
                }
                edd.agregar(dato)
                break
            case "Cola":
                if(edd == null){
                    edd = new Cola();
                }
                edd.Agregar(dato)
                break
            case "Cola de prioridad":
                if(edd == null){
                    edd = new ColaPrioridad();
                }
                edd.Agregar(dato,prioridad)
                break
            case "Lista simplemente enlazada":
    
                if(edd == null){
                    edd = new ListaSimple();
                }
                edd.agregar(dato)
                break
    
            case "Lista doblemente enlazada":
    
                if(edd == null){
                    edd = new ListaDoble();
                }
                edd.agregar(dato)
                break
    
            case "Lista circular simplemente enlazada":
    
                if(edd == null){
                    edd = new ListaCS();
                }
                edd.insert(dato)
                break
    
            case "Lista circular doblemente enlazada":
    
                if(edd == null){
                    edd = new ListaCirD();
                }
                edd.insert(dato) 
                break
            case "Arbol ABB":
    
                if(edd == null){
                    edd = new ABB();
                }
                edd.insertar(dato) 
                break
            default:
                break;
        }
        this.props.obtenerDatos(edd);
    }

    obtenerText = e =>{
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    render() {
       if(this.props.nombre=== "Cola de prioridad"){
        return (
            <Modal
                className="modalAgregar"
                basic
                onClose={() => this.setState({open: false})}
                onOpen={() =>  this.setState({open: true})}
                open={this.state.open}
                size='small'
                trigger={<Menu.Item>Agregar</Menu.Item>}
                >
                <Header icon>
                    <Icon name='add' />
                    Agregar Dato
                </Header>
                <Modal.Content>
                        <Input className="inputAgregar" type="text" name="textoDato" value={this.state.textoDato}  fluid placeholder="agregar dato" onChange={this.obtenerText}/>
                        <br/>
                        <Input className="inputAgregar" type="text" name="prioridad" value={this.state.prioridad}  fluid placeholder="agregar prioridad" onChange={this.obtenerText}/>
                </Modal.Content>
                <Modal.Actions>
                    <Button basic color='red' inverted onClick={() =>  this.setState({open: false})}>
                    <Icon name='remove' /> No
                    </Button>
                    <Button className="buttonAgregar" color='green' inverted onClick={this.swtEdd}>
                    <Icon name='checkmark' /> Si
                    </Button>
                </Modal.Actions>
                </Modal>
        )

       }else{
        return (
            <Modal
                className="modalAgregar"
                basic
                onClose={() => this.setState({open: false})}
                onOpen={() =>  this.setState({open: true})}
                open={this.state.open}
                size='small'
                trigger={<Menu.Item>Agregar</Menu.Item>}
                >
                <Header icon>
                    <Icon name='add' />
                    Agregar Dato
                </Header>
                <Modal.Content>
                        <Input className="inputAgregar" type="text" name="textoDato" value={this.state.textoDato}  fluid placeholder="agregar dato" onChange={this.obtenerText}/>
                </Modal.Content>
                <Modal.Actions>
                    <Button basic color='red' inverted onClick={() =>  this.setState({open: false})}>
                    <Icon name='remove' /> No
                    </Button>
                    <Button className="buttonAgregar" color='green' inverted onClick={this.swtEdd}>
                    <Icon name='checkmark' /> Si
                    </Button>
                </Modal.Actions>
                </Modal>
        )
       }
    }
}

