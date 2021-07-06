import React, { Component } from 'react'
import { Button, Header, Icon, Modal,Menu,Input } from 'semantic-ui-react'




export default class Eliminar extends Component {

    state={
        open: false,
        textoDato: "" 
    }

    swtEdd=()=>{
        let nombre = this.props.nombre
        let edd = this.props.edd
        let dato = this.state.textoDato
        switch(nombre){
            case "Pila" :
                edd.eliminar(dato)
                break
            case "Cola":
                edd.eliminar(dato)
                break
            case "Cola de prioridad":
                edd.eliminar(dato)
                break
            case "Lista simplemente enlazada":
                edd.eliminar(dato)
                break
    
            case "Lista doblemente enlazada":
                edd.eliminar(dato)
                break
    
            case "Lista circular simplemente enlazada":
    
                edd.eliminar(dato)
                break
    
            case "Lista circular doblemente enlazada":
                edd.eliminar(dato)
                break
            case "Arbol ABB":
                edd.eliminando(dato);
                break
            case "Arbol AVL":
                edd.eliminar(dato)
                break
             case "Arbol B":
                edd.eliminar(dato)
                break
            case "Arbol B+":
                edd.eliminar(dato)
                break
             case "Arbol Merkle":
                edd.Eliminar(dato)
                break
            case "Tabla Hash Cerrada":
                edd.eliminar(dato)
            break
            case "Tabla Hash Abierta":
                edd.eliminar(dato)
            break;
            case "Col Major":
                let arreglosplit = dato.split(",")
                let x = arreglosplit[0]
                let y = arreglosplit[1]
                edd.eliminar(x,y,nombre,dato)
            break;
            case "Row Major":    
                let splitarr = dato.split(",")
                let i = splitarr[0]
                let j = splitarr[1]
                edd.eliminar(i,j,nombre,dato)
            break;

            case "Matriz Dispersa":
                edd.eliminar(dato)
                break;
            case "Grafo Dirigido":
                edd.eliminar(dato)
                break;
            case "Grafo No Dirigido":
                edd.eliminar(dato)
                break;
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
                onClose={() => this.setState({open: false})}
                onOpen={() => this.setState({open: true})}
                open={this.state.open}
                size='small'
                trigger={<Menu.Item>Eliminar</Menu.Item>}
                >
                <Header icon>
                    <Icon name='trash' />
                    Eliminar Dato
                </Header>
                <Modal.Content>
                        <Input type="text" fluid name="textoDato" value={this.state.textoDato} onChange={this.obtenerText} placeholder="Eliminanr dato"/>
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
