import React from 'react'

interface TitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
    title: string;
}

const Title: React.FC<TitleProps> = ({ title, className }) => {
    return (
        <h1 className={`text-4xl uppercase ${className}`}>{title}</h1>
    )
}

export default Title