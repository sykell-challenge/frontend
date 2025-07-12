import { Card } from 'primereact/card'
import React from 'react'

const Welcome = () => {
    return (
        <Card title="Welcome to the URL crawler!" subTitle="Features">
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