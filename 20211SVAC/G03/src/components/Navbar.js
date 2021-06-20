import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react';
import {Link} from 'react-router-dom'

export default class Navbar extends Component {


    render() {
        return (
            <div >
                <Menu className="ui tpo inverted attached menu">
                    <Menu.Item>
                        <Link to="/tytusds/20211SVAC/G03/build/">TytusDS</Link>
                    </Menu.Item>
                </Menu>
            </div>
        )
    }
}