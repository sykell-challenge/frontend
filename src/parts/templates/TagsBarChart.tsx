import { Chart } from 'primereact/chart';
import React from 'react'
import type { TagsBarChartProps } from '../../types';

const TagsBarChart = ({ tags }: TagsBarChartProps) => {
    return (
        <Chart
            type="bar"
            data={{
                labels: tags.map(tag => tag.name),
                datasets: [
                    {
                        label: '', 
                        data: tags.map(tag => tag.count),
                    },
                ],
            }}
            options={{
                plugins: {
                    legend: {
                        display: false, 
                    },
                },
            }}
        />
    )
}

export default TagsBarChart