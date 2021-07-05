import React, { Component } from 'react'
import { Button, Header, Icon, Modal,Menu,Input } from 'semantic-ui-react'

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
        let splitarr ;
        let i;
        let j;
        switch(nombre){
            case "Pila" :
                edd.actualizar(datoAnterior,datoNuevo)
                break
            case "Cola":
                edd.actualizar(datoAnterior,datoNuevo)
                break
            case "Cola de prioridad":
                edd.actualizar(datoAnterior,datoNuevo)
                break
            case "Lista simplemente enlazada":

                edd.actualizar(datoAnterior,datoNuevo)
                break

            case "Lista doblemente enlazada":

                edd.actualizar(datoAnterior,datoNuevo)
                break

            case "Lista circular simplemente enlazada":

                edd.actualizar(datoAnterior,datoNuevo)
                break

            case "Lista circular doblemente enlazada":

                edd.actualizar(datoAnterior,datoNuevo)
                break
            case "Arbol ABB":
                edd.actualizar(datoAnterior,datoNuevo)
                break
            case "Arbol AVL":
                edd.actualizar(datoAnterior,datoNuevo)
                break
            case "Arbol B":
                edd.modificar(datoAnterior,datoNuevo)
                break
            case "Arbol B+":
                edd.actualizar(datoAnterior,datoNuevo)
            break
            case "Arbol Merkle":
                edd.modificar(datoAnterior,datoNuevo)
            break
            case "Tabla Hash Cerrada":
                edd.actualizar(datoAnterior,datoNuevo)
            break
            case "Tabla Hash Abierta":
                edd.actualizar(datoAnterior,datoNuevo)
            break
            case "Col Major":
                let arreglosplit = datoAnterior.split(",")
                let x = arreglosplit[0]
                let y = arreglosplit[1]
                edd.actualizar(x,y,nombre,datoNuevo)
            break
            case "Row Major":    
                 splitarr = datoAnterior.split(",")
                 i = splitarr[0]
                 j = splitarr[1]
                edd.actualizar(i,j,nombre,datoNuevo)
            break
            case "Matriz Dispersa":    
                edd.modificar(datoAnterior,datoNuevo)
            break
            case "Grafo No Dirigido":    
                edd.modificar(datoAnterior,datoNuevo)
            break
            case "Grafo Dirigido":    
                edd.modificar(datoAnterior,datoNuevo)
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

