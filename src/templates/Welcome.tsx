import React from 'react'

const Welcome = () => {
    return (
        <div className="border-border border-[16px] px-16 pt-4 pb-8 flex flex-col items-start justify-center gap-4">
            <h2 className="text-xl font-bold">Welcome to the URL crawler!</h2>
            <h3 className="text-lg font-semibold">Features</h3>
            <ul className="list-disc list-inside">
                <li>URL Management</li>
                <li>Results Dashboard</li>
                <li>Details View</li>
                <li>Bulk Actions</li>
                <li>Real-Time Progress</li>
            </ul>
            <p>However, you need to create a account first, <br />if you haven’t already!</p>
        </div>
    )
}

export default Welcome