import React from 'react'

interface WebsiteInformationProps {
    title: string;
    loginPageAvailable: boolean;
    url: string;
    htmlVersion: string;
}

const WebsiteInformation: React.FC<WebsiteInformationProps> = ({
    title,
    loginPageAvailable,
    url,
    htmlVersion,
}) => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-4 p-4 text-md'>
      <p>
        <strong>Title:</strong> {title}
      </p>
      <p>
        <strong>URL:</strong> {url}
      </p>
      <p>
        <strong>HTML Version:</strong> {htmlVersion}
      </p>
      <p>
        <strong>Login Page:</strong> {loginPageAvailable ? 'Available' : 'Not Available'}
      </p>
    </div>
  )
}

export default WebsiteInformation