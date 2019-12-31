import React from 'react';
import './wheel-rating-chart.scss';
import {WheelItem} from "../types";
import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
} from 'recharts';

interface Props {
  items: WheelItem[],
}

class WheelRatingChart extends React.Component<Props> {
  render() {
    const data = this.props.items.map(item => ({

      subject: item.name,
      value: item.value,
    }));

    return (
      <RadarChart cx={300} cy={250} outerRadius={150} width={570} height={500} data={data}>
        <PolarGrid />
        <PolarAngleAxis dataKey="subject" stroke="#fff" />
        <PolarRadiusAxis tickCount={10} domain={[0, 10]} />
        <Radar name="Mike" dataKey="value" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
      </RadarChart>
    );
  }
}

export default WheelRatingChart;
