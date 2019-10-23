import React from "react";
import './stack-item.scss';
import Icon from "../../../../components/icon/icon";

interface Props {
  icon: string,
  name: string,
  level: string,
}

class StackItem extends React.Component<Props> {
  render() {
    return (
      <div className="stack-item">
        <Icon name={this.props.icon} />
        <span className="stack-item__title">{this.props.name}</span>
        <span className="stack-item__know-level">{this.props.level}</span>
      </div>
    );
  }
}

export default StackItem;
