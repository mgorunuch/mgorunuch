import React from "react";
import './icon.scss';

interface Prop {
  name: string,
}

class Icon extends React.Component<Prop> {
  render() {
    const icon = require(`!raw-loader!../../assets/icons/${this.props.name}.svg`).default;
    return (
      <div className="icon" dangerouslySetInnerHTML={{__html: icon}} />
    );
  }
}

export default Icon;
