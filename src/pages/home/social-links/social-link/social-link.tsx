import React from "react";
import './social-link.scss';
import Icon from "../../../../components/icon/icon";
import {Link} from 'react-router-dom';

interface Prop {
  linkUrl: string,
  text: string,
  iconName?: string,
  inner?: boolean;
}

class SocialLink extends React.Component<Prop> {
  render() {
    return (
      (!this.props.inner) ? <a href={this.props.linkUrl} className="social-link">
        {this.props.iconName && <Icon name={this.props.iconName} />}
        <span className="social-link__text">
          {this.props.text}
        </span>
      </a> :
      <Link to={this.props.linkUrl} className="social-link">
        {this.props.iconName && <Icon name={this.props.iconName} />}
        <span className="social-link__text">
          {this.props.text}
        </span>
      </Link>
    );
  }
}

export default SocialLink;
