import React from 'react'
import useCheckLogin from '../hooks/useCheckLogin'
import { Button } from 'primereact/button'


const Topbar = () => {
    const loggedIn = useCheckLogin()
    if (!loggedIn) {
        return null // Still checking login status
    }
    return (
        <div className="w-full p-4 flex justify-end items-end">
            {
                loggedIn && <Button label="Logout" onClick={() => {
                    localStorage.removeItem('token')
                    window.location.href = '/login'
                }}
                    className='!bg-border !text-text !border-none py-2 mt-4 hover:!text-text-dark'
                />
            }
        </div>
    )
}

export default Topbar