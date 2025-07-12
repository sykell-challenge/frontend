import { Card } from '@mui/material';
import React from 'react'

interface WebsiteInformationProps {
  title: string;
  loginPageAvailable: boolean;
  url: string;
  htmlVersion: string;
  className?: string;
}

const WebsiteInformation: React.FC<WebsiteInformationProps> = ({
  title,
  loginPageAvailable,
  url,
  htmlVersion,
  className
}) => {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-3 gap-4 p-4 text-md ${className}`}>
      <p>
        <strong>Title:</strong> {title}
      </p>
      <p className='col-span-1 md:col-span-2 lg:pl-2'>
        <strong>URL:</strong> {url}
      </p>
      <p>
        <strong>HTML Version:</strong> {htmlVersion}
      </p>
      <p className='col-span-1 md:col-span-2 lg:pl-2'>
        <strong>Login Page:</strong> {loginPageAvailable ? 'Available' : 'Not Available'}
      </p>
    </div>
  )
}

export default WebsiteInformation