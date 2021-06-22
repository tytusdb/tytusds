import React from 'react'

import NavBar from './NavBar'
import Footer from './Footer'

function Layout(props) {

  return (
    <React.Fragment>
      <NavBar />
      {props.children}
      <Footer />
    </React.Fragment>

  );
}

export default Layout;