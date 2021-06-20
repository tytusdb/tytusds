import React, { Component } from 'react'
import { Card, Icon, Image } from 'semantic-ui-react'
import {Link} from 'react-router-dom'

var colorcard ={
    background: "rgba(0, 0, 0, 0.1)"
}


export default class Division extends Component {

   
    render() {
        return (
                 <Card color = {this.props.color} style={colorcard}>
                    <Image src={this.props.imagen} wrapped ui={false} />
                    <Card.Content>
                    <Card.Header style={{ color: 'white' }}>{this.props.title}</Card.Header>
                    <Card.Description style={{ color: 'white' }}>
                        {this.props.descripcion}
                    </Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                    <a>
                        <Icon className='angle double right icon' style={{ color: 'white' }}>
                            <Link style={{ color: 'white' }} to={{pathname:"/tytusds/20211SVAC/G03/build/estructura", state:{nombre: this.props.title}}}>IR</Link>
                         </Icon>
                    </a>
                    </Card.Content>
                </Card>
        )
    }
}
