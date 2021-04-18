import React from 'react';
import styles from './links-list.module.scss';
import cn from 'classnames';
import {Link} from 'react-router-dom';

export interface RenderLink {
  href: string;
  internal: boolean;
  text: string;
}

interface Props {
  className?: string;
  links: RenderLink[];
}

const LinksList: React.FC<Props> = ({ className, links }) => {
  return (
    <ul className={cn(styles.container, className)}>
      {
        links.map(link => (
          link.internal
            ? <Link className={styles.link} to={link.href}>{link.text}</Link>
            : <a className={styles.link} href={link.href} target="_blank">{link.text}</a>
        )).map(v => <li className={styles.linkItem}>{v}</li>)
      }
    </ul>
  );
}

export default LinksList;
