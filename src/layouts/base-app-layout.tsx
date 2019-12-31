import React from 'react';
import './base-app-layout.scss';
import Icon from "../components/icon/icon";
import {Link} from 'react-router-dom';

interface Props {
  title: string,
}

class BaseAppLayout extends React.Component<Props> {
  render() {
    return (
      <div className="base-app-layout">
        <div className="base-app-layout__header">
          <Link className="base-app-layout__button" to={`/`}>
            <Icon name="left-arrow-chevron" />
            Back
          </Link>
          <h1 className="base-app-layout__title">{this.props.title}</h1>
        </div>
        <div className="base-app-layout__content">
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default BaseAppLayout;
