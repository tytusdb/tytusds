import React from 'react';

import './styles/Button.css';

class Button extends React.Component {
  render() {
    return (
      <div className={this.props.clas}>
        <div className={this.props.header+" Button_header"}>
          <h3>{this.props.title}</h3>
        </div>

        <div className="Button_section-logo">
            <img className="Button_logo" src={this.props.logo} alt="Logo" />
        </div>

        <div className="Button_section-name">
          <h3>{this.props.name}</h3>
        </div>
      </div>
    );
  }
}

export default Button;