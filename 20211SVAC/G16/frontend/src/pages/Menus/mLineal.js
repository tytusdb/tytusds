import React from 'react';
import {Link} from 'react-router-dom'

import Button from '../../components/Button'
import ItemLineal from '../../items/iLineal'

import '../../Global.css'

class Lineal extends React.Component{
    render() {
        return (
            <div className="container">
                <div className="row Center ">
                    {ItemLineal.map((item, index) =>{
                        return (
                            <div className="col Center2">
                                <Link className="Link_text" to={item.path}>
                                    <Button 
                                        header={item.header}
                                        title={item.title}
                                        name={item.name}
                                        logo={item.logo}
                                        clas={item.class}
                                    />
                                </Link>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}

export default Lineal;