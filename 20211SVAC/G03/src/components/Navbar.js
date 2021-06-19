import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react';
import {Link} from 'react-router-dom'

export default class Navbar extends Component {


    render() {
        return (
            <div >
                <Menu className="ui tpo inverted attached menu">
                    <Menu.Item>
                        <Link to="/gitPagueReac/estructura">TytusDS</Link>
                    </Menu.Item>
                </Menu>
            </div>
        )
    }
}