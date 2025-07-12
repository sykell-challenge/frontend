import React from 'react'
import { PieChart } from '@mui/x-charts/PieChart';


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
    <PieChart series={[{
      data: [
        { id: 0, value: internalUrlCount, label: "Internal" },
        { id: 1, value: externalUrlCount, label: "External" },
        { id: 2, value: externalUrlCount, label: "Inaccessible" },
      ]
    }]} />
  );
}

export default URLPieChart