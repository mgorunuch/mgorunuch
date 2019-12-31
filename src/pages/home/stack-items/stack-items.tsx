import React from "react";
import './stack-items.scss';
import StackItem from "./stack-item/stack-item";

class StackItems extends React.Component {
  render() {
    return (
      <div className="stack-items">
        <StackItem level="Medium" icon="react" name="React" />
        <StackItem level="High" icon="javascript" name="JavaScript" />
        <StackItem level="Medium" icon="php" name="PHP" />
        <StackItem level="High" icon="mysql" name="MySql" />
        <StackItem level="High" icon="postgresql" name="PostgreSQL" />
        <StackItem level="High" icon="vuejs" name="VueJS" />
        <StackItem level="High" icon="typescript" name="Typescript" />
        <StackItem level="Medium" icon="python" name="Python" />
        <StackItem level="Medium" icon="golang" name="Golang" />
      </div>
    );
  }
}

export default StackItems;
