import React from "react";
import './block-item.scss';

interface Props {
  title: string,
}

class BlockItem extends React.Component<Props> {
  render() {
    return (
      <div className="block-item">
        <div className="block-item__title">
          {this.props.title}
        </div>
        <div className="block-item__content">
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default BlockItem;
