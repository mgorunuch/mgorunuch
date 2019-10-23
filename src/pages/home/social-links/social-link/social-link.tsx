import React from "react";
import './social-link.scss';
import Icon from "../../../../components/icon/icon";

interface Prop {
  linkUrl: string,
  text: string,
  iconName: string,
}

class SocialLink extends React.Component<Prop> {
  render() {
    return (
      <a href={this.props.linkUrl} className="social-link">
        <Icon name={this.props.iconName} />
        <span className="social-link__text">
          {this.props.text}
        </span>
      </a>
    );
  }
}

export default SocialLink;
