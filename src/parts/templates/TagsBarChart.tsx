import { BarChart } from '@mui/x-charts/BarChart';
import React from 'react'
import type { TagsBarChartProps } from '../../types';

const TagsBarChart = ({ tags }: TagsBarChartProps) => {
    return (
        <BarChart
            height={300}
            xAxis={tags.map((tag) => {
                return { data: [tag.name] }
            })}
            series={tags.map((tag) => {
                return { data: [tag.count] }
            })}


        />
    )
}

export default TagsBarChart