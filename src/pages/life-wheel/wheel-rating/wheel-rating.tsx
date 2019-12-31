import React from 'react';
import './wheel-rating.scss';
import {
  WheelItem,
} from "../types";
import WheelRatingButton from "./wheel-rating-button/wheel-rating-button";
import {itemsNames} from "../../../utils";

const items: WheelItem[] = itemsNames.map(item => ({
  name: item,
  value: 0,
}));

interface Props {
  onItemsSelected: (items: WheelItem[]) => void;
}

interface State {
  items: WheelItem[],
  currentItem: WheelItem,
  currentItemKey: number,
}

class WheelRating extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      items,
      currentItem: items[0],
      currentItemKey: 0,
    };
  }

  handleRatingClick(newRating: number) {
    const newItems = this.state.items.map((old, index) => {
      if (index === this.state.currentItemKey) {
        return {
          ...old,
          value: newRating,
        };
      }

      return old;
    });

    this.setState({
      items: newItems,
    });

    if (this.isLast()) {
      this.emitResult(newItems);
      return;
    }

    this.next();
  };

  next() {
    this.setState(state => ({
      currentItemKey: state.currentItemKey + 1,
      currentItem: state.items[state.currentItemKey + 1]
    }))
  }

  isLast() {
    return this.state.currentItemKey >= this.state.items.length - 1;
  }

  emitResult(items: WheelItem[]) {
    this.props.onItemsSelected(items);
  }

  render() {
    const ratingButtons = [];
    for (let i = 0; i < 10; i++) {
      ratingButtons.push(
        <WheelRatingButton onClick={() => this.handleRatingClick(i)}>{ i + 1 }</WheelRatingButton>
      );
    }

    if (!this.state.currentItem) {
      return null;
    }

    return (
      <div className="wheel-rating">
        <h3 className="wheel-rating__item-title">{this.state.currentItem.name}</h3>
        <small className="wheel-rating__descriptor">Rate this area of life</small>
        <div>
          {ratingButtons}
        </div>
      </div>
    );
  };
}

export default WheelRating;
