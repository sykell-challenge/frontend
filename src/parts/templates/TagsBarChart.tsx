import { BarChart } from '@mui/x-charts/BarChart';
import type { TagsBarChartProps } from '../../types';

const TagsBarChart = ({ tags }: TagsBarChartProps) => {
  return (
    <BarChart
      xAxis={[{ data: tags.map((tag) => tag.tagName) }]}
      series={[{ data: tags.map((tag) => tag.count) }]}
    />
  );
};

export default TagsBarChart;
