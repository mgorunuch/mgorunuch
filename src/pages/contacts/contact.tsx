import React from 'react';
import {Bem} from '@igor-gerasimovich/bem-helper';
import Icon from '../../components/icon/icon';
import './contact.scss';

const bem = new Bem('contact');

interface ComponentProps {
  className?: string;
  iconName: string;
  text: string;
  linkUrl: string;
}

class Contact extends React.PureComponent<ComponentProps> {
  render() {
    const {
      className,
      iconName,
      text,
      linkUrl,
    } = this.props;

    const classNames = [bem.block()];
    if (className) {
      classNames.push(className);
    }

    return (
      <a target="_blank" className={classNames.join(' ')} href={linkUrl}>
        <Icon name={iconName} />
        {text}
      </a>
    )
  }
}

export default Contact;
