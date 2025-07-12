import React from 'react'
import { Chart } from 'primereact/chart';

type URLPieChartProps = {
  internalUrlCount: number;
  externalUrlCount: number;
  brokenUrlCount: number;
};

const URLPieChart: React.FC<URLPieChartProps> = ({
  internalUrlCount,
  externalUrlCount,
  brokenUrlCount,
}) => {
  return (
    <Chart type="pie" data={{
      labels: ['Internal', 'External', 'Broken'],
      datasets: [{
        data: [internalUrlCount, externalUrlCount, brokenUrlCount],
      }]
    }} />
  );
}

export default URLPieChart