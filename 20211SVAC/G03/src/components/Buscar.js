import React, { Component } from 'react'
import { Button, Header, Icon, Modal,Menu,Input } from 'semantic-ui-react'

export default class Buscar extends Component {
    state={
        open: false,
        textoDato: "" 
    }

    retornarValor = () =>{
        this.props.busqueda(this.state.textoDato)
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
            onClose={() =>  this.setState({open: false})}
            onOpen={() =>  this.setState({open: true})}
            open={this.state.open}
            size='small'
            trigger={<Menu.Item>Buscar</Menu.Item>}
            >
            <Header icon>
                <Icon name='search' />
                Buscar Dato
            </Header>
            <Modal.Content>
                    <Input type="text" fluid name='textoDato' value={this.state.textoDato} onChange={this.obtenerText} placeholder="buscar dato" icon="search"/>
            </Modal.Content>
            <Modal.Actions>
                <Button basic color='red' inverted onClick={() =>  this.setState({open: false})}>
                <Icon name='remove' /> No
                </Button>
                <Button color='green' inverted onClick={this.retornarValor}>
                <Icon name='checkmark' /> Yes
                </Button>
            </Modal.Actions>
            </Modal>
        )
    }
}

