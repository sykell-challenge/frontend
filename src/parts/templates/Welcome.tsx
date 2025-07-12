
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import React from 'react'

const Welcome = () => {
    return (
        <Card>
             title="Welcome to the URL crawler!" subTitle="Features"
             <Typography variant="h2" component="div" className="px-16 pt-4">
                Welcome to the URL crawler!
            </Typography>
            <Typography variant="h3" className="px-16 pb-4">
                Features
            </Typography>
            <div className="px-16 pt-4 pb-8 flex flex-col items-start justify-center gap-4">
                <ul className="list-disc list-inside">
                    <li>URL Management</li>
                    <li>Results Dashboard</li>
                    <li>Details View</li>
                    <li>Bulk Actions</li>
                    <li>Real-Time Progress</li>
                </ul>
                <p>However, you need to create a account first, <br />if you haven’t already!</p>
            </div>
        </Card>
    )
}

export default Welcome