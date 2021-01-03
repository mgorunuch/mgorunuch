import React from "react";
import './stack-items.scss';
import StackItem from "./stack-item/stack-item";
import { Skill } from '../types';

class StackItems extends React.Component<{ items: Skill[] }, {}> {
  render() {
    const $stackBlocks = this.props.items.map(item => (
      <StackItem level={item.level} icon={item.icon} name={item.name} />
    ));

    return (
      <div className="stack-items">
        {$stackBlocks}
      </div>
    );
  }
}

export default StackItems;
