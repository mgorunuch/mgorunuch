import React from 'react';
import {WithBemProps, withThemedBem} from '../../utils/hocks/with-bem';

interface ComponentProps {}
type Props = ComponentProps & WithBemProps;

class Learner extends React.Component<any, any> {
  render() {
    return null;
  }
}

export default withThemedBem('irregular-learner')(Learner);
