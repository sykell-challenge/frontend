import React from 'react'

interface TitleProps {
    title: string;
}

interface TitleProps {
    title: string;
}

const Title: React.FC<TitleProps> = ({ title }) => {
    return (
        <h1 className={`text-4xl uppercase`}>{title}</h1>
    )
}

export default Title