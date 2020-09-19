import React from 'react';
import {Bem} from '@igor-gerasimovich/bem-helper';
import './contacts.scss';
import Creator from '../home/creator/creator';
import Contact from './contact';

const bem = new Bem('contacts-page');

class ContactsPage extends React.PureComponent {
  render() {
    return (
      <div className={bem.block()}>
        <Creator name={<>Igor <br /> Gerasimovich</>} additionalInfo={<>Ukraine, Full stack developer</>} />
        <Contact className={bem.element('contact')} iconName="linkedin" linkUrl="https://www.linkedin.com/in/mgorunuch" text="LinkedIn" />
        <Contact className={bem.element('contact')} iconName="twitter" linkUrl="https://twitter.com/mgorunuch" text="Twitter" />
        <Contact className={bem.element('contact')} iconName="telegram" linkUrl="https://t.me/mgorunuch" text="Telegram" />
        <Contact className={bem.element('contact')} iconName="facebook" linkUrl="https://fb.com/mgorunuch" text="Facebook" />
        <Contact className={bem.element('contact')} iconName="github" linkUrl="https://github.com/Mgorunuch" text="Github" />
        <Contact className={bem.element('contact')} iconName="medium" linkUrl="https://medium.com/@mgorunuch.igor" text="Medium" />
        <Contact className={bem.element('contact')} iconName="phone-call" linkUrl="tel:+380987665465" text="Phone" />
        <Contact className={bem.element('contact')} iconName="instagram" linkUrl="https://instagram.com/mgorunuch" text="Instagram" />
        <Contact className={bem.element('contact')} iconName="world-wide-web" linkUrl="https://mgorunuch.pro" text="Website" />
      </div>
    );
  }
}

export default ContactsPage;
