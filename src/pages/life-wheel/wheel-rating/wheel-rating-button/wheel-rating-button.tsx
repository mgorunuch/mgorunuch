import React from 'react';
import './wheel-rating-button.scss';

interface Props {
  onClick: (event: any) => void,
}

class WheelRatingButton extends React.Component<Props> {
  render() {
    return <button className="wheel-rating-button" onClick={this.props.onClick}>{this.props.children}</button>;
  }
}

export default WheelRatingButton;
