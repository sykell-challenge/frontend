import { Chart } from 'primereact/chart';
import React from 'react'
import type { TagsBarChartProps } from '../types';

const TagsBarChart = ({ tags }: TagsBarChartProps) => {
    return (
        <Chart
            type="bar"
            data={{
                labels: tags.map(tag => tag.name),
                datasets: [
                    {
                        label: '', // Hide label by setting it to empty string
                        data: tags.map(tag => tag.count),
                        backgroundColor: tags.map(tag => tag.color),
                        barThickness: 16,
                        maxBarThickness: 20,
                    },
                ],
            }}
            options={{
                maintainAspectRatio: false,
            aspectRatio: 1.5,

                plugins: {
                    legend: {
                        display: false, // Hide legend completely
                    },
                },
                scales: {
                    x: {                        
                        border: {
                            display: true,
                            color: '#205B73',
                        },
                    },
                    y: {                        
                        border: {
                            display: true,
                            color: '#205B73',
                        },
                    },
                },
            }}
        />
    )
}

export default TagsBarChart