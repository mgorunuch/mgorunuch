import React from "react";
import './my-apps.scss';
import {Link} from 'react-router-dom';

class MyApps extends React.Component {
  render() {
    return (
      <div className="my-apps">
        <Link className="my-apps__link" to="wheel">- Life wheel</Link>
        <Link className="my-apps__link" to="priority">- Life priorities</Link>
        <Link className="my-apps__link" to="irregular-words">- Irregular words trainer</Link>
      </div>
    );
  }
}

export default MyApps;
