import React from 'react'

interface TitleProps {
    title: string;
}

interface TitleProps {
    title: string;
    className?: string;
}

const Title: React.FC<TitleProps> = ({ title, className }) => {
    return (
        <h1 className={`text-4xl uppercase ${className ?? ''}`.trim()}>{title}</h1>
    )
}

export default Title