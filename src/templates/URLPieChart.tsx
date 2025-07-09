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
        backgroundColor: ['#358C84', '#205B73', '#307B8C']
      }]
    }} options={{
        plugins:{
            legend:{
                display:false,                
            }
        },
        maintainAspectRatio: false,
        responsive: true,
        layout: {
            padding: 20
        }
    }} style={{ width: '150px', height: '150px' }} />
  );
}

export default URLPieChart