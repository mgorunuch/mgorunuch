import React from "react";
import './priority-detector.scss';
import BaseAppLayout from "../../layouts/base-app-layout";
import {itemsNames} from "../../utils";

interface Props {}

interface State {
  currentCompareKey: number,
  showResults: boolean,
}

interface Decision {
  name: string,
  value: number,
}

const decisions: Decision[] = itemsNames.map(name => ({
  name,
  value: 0,
}));

const comparisions: number[][] = decisions.map((decision, decisionKey) => {
  // eslint-disable-next-line array-callback-return
  return decisions.map((decision2, decisionKey2) => {
    if (decisionKey2 !== decisionKey && decisionKey2 > decisionKey) {
      return [decisionKey, decisionKey2];
    }
  }).filter((_) => !!_) as number[][];
}).reduce((a, b) => a.concat(b), []);

const compareVariant = (currentKey: number) => {
  return comparisions[currentKey];
};

const leftDecisionKey = (currentKey: number): number => {
  return compareVariant(currentKey)[0];
};

const leftCompare = (currentKey: number): Decision => {
  return decisions[compareVariant(currentKey)[0]];
};

const rightDecisionKey = (currentKey: number): number => {
  return compareVariant(currentKey)[1];
};

const rightCompare = (currentKey: number): Decision => {
  return decisions[compareVariant(currentKey)[1]];
};

class PriorityDetector extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      currentCompareKey: 0,
      showResults: false,
    };
  }

  selectLeft() {
    decisions[leftDecisionKey(this.state.currentCompareKey)].value += 1;

    this.next();
  };

  selectRight() {
    decisions[rightDecisionKey(this.state.currentCompareKey)].value += 1;

    this.next();
  };

  next() {
    if (compareVariant(this.state.currentCompareKey + 1) === undefined) {
      this.setState({
        showResults: true,
      });
      return;
    }

    this.setState({
      currentCompareKey: this.state.currentCompareKey + 1,
    });
  }

  render() {
    const compareLeft: Decision = leftCompare(this.state.currentCompareKey);
    const compareRight: Decision = rightCompare(this.state.currentCompareKey);

    if (this.state.showResults) {
      const sortedDecisions = decisions.sort((a, b) => a.value > b.value ? -1 : 1);;
      const decisionsHtml = sortedDecisions.map(decision => {
        return <div className="priority-detector__result-decision">
          <div className="priority-detector__result-decision-name">
            {decision.name}
          </div>
          <div className="priority-detector__result-decision-value">
            {decision.value}
          </div>
        </div>
      });
      return (
        <BaseAppLayout title="Priority detector">
          <div className="priority-detector">
            {decisionsHtml}
          </div>
        </BaseAppLayout>
      );
    }

    return (
      <BaseAppLayout title="Priority detector">
        <div className="priority-detector">
          <div className="priority-detector__title">
            What is more important for you?
          </div>
          <div className="priority-detector__container">
            <button className="priority-detector__button" onClick={this.selectLeft.bind(this)}>
              {compareLeft.name}
            </button>
            or
            <button className="priority-detector__button" onClick={this.selectRight.bind(this)}>
              {compareRight.name}
            </button>
          </div>
        </div>
      </BaseAppLayout>
    );
  }
}

export default PriorityDetector;
