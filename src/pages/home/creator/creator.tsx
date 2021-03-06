import React from "react";
import creatorImage from "../../../assets/creator.jpg";
import './creator.scss';

interface Props {
  name: JSX.Element,
  additionalInfo?: JSX.Element,
  className?: string;
}

class Creator extends React.Component<Props> {
  render() {
    let mainClass = "creator";
    if (this.props.className) {
      mainClass += ` ${this.props.className}`
    }

    return (
      <div className={mainClass}>
        <div className="creator__image" style={{backgroundImage: `url(${creatorImage})`}} />
        <div className="creator__info">
          <div className="creator__name">{ this.props.name }</div>
          { this.props.additionalInfo && <div className="creator__additional-info">{ this.props.additionalInfo }</div> }
        </div>
      </div>
    );
  }
}

export default Creator;
