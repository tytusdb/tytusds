import React, { Component } from 'react'
import { Button, Header, Icon, Modal,Menu,Input } from 'semantic-ui-react'

import Cola from '../estructuras/EstructurasLineales/Cola'

export default class Actualizar extends Component {

    state={
        open: false,
        datoAnterior: "" ,
        datoNuevo: ""
 }

    swtEdd=()=>{
        let nombre = this.props.nombre
        let edd = this.props.edd
        let datoAnterior = this.state.datoAnterior
        let datoNuevo = this.state.datoNuevo
        switch(nombre){
            case "Pila" :
                if(edd == null){
                    edd = new Cola();
                }
              //  edd.cargar(dato)
                break
            case "Cola":
                if(edd == null){
                    edd = new Cola();
                }
                edd.actualizar(datoAnterior,datoNuevo)
                break
            case "Cola de prioridad":
                if(edd == null){
                    edd = new Cola();
                }
                edd.actualizar(datoAnterior,datoNuevo)
                break
            case "Lista simplemente enlazada":

                /* edd = new Cola();
                edd.cargar(datos) */
                break

            case "Lista doblemente enlazada":

                /* edd = new Cola();
                edd.cargar(dato)  */
                break

            case "Lista circular simplemente enlazada":

                /* edd = new Cola();
                edd.cargar(datos) */
                break

            case "Lista circular doblemente enlazada":

               /*  edd = new Cola();
                edd.cargar(dato)  */
                break
            case "Arbol ABB":
                console.log("actualizando ABB")
                edd.actualizar(datoAnterior,datoNuevo)
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
        return (
            <Modal
            basic
            onClose={() =>this.setState({open: false})}
            onOpen={() => this.setState({open: true})}
            open={this.state.open}
            size='small'
            trigger={<Menu.Item>Actualizar</Menu.Item>}
            >
            <Header icon>
                <Icon name='edit' />
                Actualizar Dato
            </Header>
            <Modal.Content>
                    <Input type="text" name="datoAnterior" value={this.state.datoAnterior} fluid placeholder="Dato Anterior" onChange={this.obtenerText}/>
                    <br/>
                    <Input type="text" name="datoNuevo" value={this.state.datoNuevo} fluid placeholder="Dato Nuevo" onChange={this.obtenerText}/>
            </Modal.Content>
            <Modal.Actions>
                <Button basic color='red' inverted onClick={() => this.setState({open: false})}>
                <Icon name='remove' /> No
                </Button>
                <Button color='green' inverted onClick={this.swtEdd}>
                <Icon name='checkmark' /> Yes
                </Button>
            </Modal.Actions>
            </Modal>
        )
    }
}

