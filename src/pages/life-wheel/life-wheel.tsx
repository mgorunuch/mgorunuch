import React from 'react';
import './lefe-wheel.scss';
import BaseAppLayout from "../../layouts/base-app-layout";
import WheelRating from "./wheel-rating/wheel-rating";
import {WheelItem} from "./types";
import WheelRatingChart from "./wheel-rating-chart/wheel-rating-chart";

interface Props {
}

interface State {
  wheelResult: WheelItem[],
}

class LifeWheel extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      wheelResult: [],
    };
  }

  handleWheelResult(items: WheelItem[]) {
    this.setState({
      wheelResult: items,
    });
  }

  render() {
    let content;
    if (this.state.wheelResult.length > 0) {
      content = <WheelRatingChart items={this.state.wheelResult} />;
    } else {
      content = <WheelRating onItemsSelected={this.handleWheelResult.bind(this)} />;
    }

    return (
      <BaseAppLayout title="Life wheel">
        <div className="life-wheel">
          {content}
        </div>
      </BaseAppLayout>
    );
  }
}

export default LifeWheel;
