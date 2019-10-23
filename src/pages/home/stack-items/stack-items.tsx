import React from "react";
import './stack-items.scss';
import StackItem from "./stack-item/stack-item";

class StackItems extends React.Component {
  render() {
    return (
      <div className="stack-items">
        <StackItem level="-" icon="react" name="React" />
        <StackItem level="-" icon="javascript" name="JavaScript" />
        <StackItem level="-" icon="php" name="PHP" />
        <StackItem level="-" icon="mysql" name="MySql" />
        <StackItem level="-" icon="postgresql" name="PostgreSQL" />
        <StackItem level="-" icon="vuejs" name="VueJS" />
        <StackItem level="-" icon="typescript" name="Typescript" />
        <StackItem level="-" icon="python" name="Python" />
        <StackItem level="-" icon="golang" name="Golang" />
      </div>
    );
  }
}

export default StackItems;
