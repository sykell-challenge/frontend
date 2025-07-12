import React from 'react'
import useCheckLogin from '../../hooks/useCheckLogin'
import Button from '@mui/material/Button'
import { Link, useLocation } from '@tanstack/react-router'

const Topbar = () => {
    const loggedIn = useCheckLogin()
    const location = useLocation()

    return (
        <div className="w-full bg-white border-b border-slate-200 shadow-sm sticky top-0 z-50 mx-auto px-4 sm:px-6 lg:px-8">

            <div className="flex justify-between items-center h-16">
                {/* Logo/Brand */}
                <div className="flex items-center">
                    <Link
                        to="/"
                        className="text-xl font-bold text-slate-800 hover:text-blue-600 transition-colors no-underline"
                    >
                        WebCrawler
                    </Link>
                </div>

                {/* Navigation Links */}
                <div className="flex items-center space-x-6">
                    {loggedIn ? (
                        <>
                            {/* Authenticated Navigation */}
                            <Link
                                to="/"
                                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors no-underline ${location.pathname === '/'
                                    ? 'bg-blue-100 text-blue-700'
                                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                                    }`}
                            >
                                Crawler
                            </Link>
                            <Link
                                to="/results"
                                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors no-underline ${location.pathname === '/results'
                                    ? 'bg-blue-100 text-blue-700'
                                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                                    }`}
                            >
                                Results
                            </Link>

                            {/* User Menu */}
                            <div className="flex items-center space-x-3 pl-3 border-l border-slate-200">
                                <Button
                                    onClick={() => {
                                        localStorage.removeItem('token')
                                        window.location.href = '/login'
                                    }}
                                >Logout</Button>
                            </div>
                        </>
                    ) : (
                        <>
                            {/* Unauthenticated Navigation */}
                            <Link
                                to="/login"
                                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors no-underline ${location.pathname === '/login' || location.pathname === '/register'
                                    ? 'hidden'
                                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                                    }`}
                            >
                                Login
                            </Link>
                            <Link
                                to="/register"
                                className={`px-4 py-2 rounded-md text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 transition-colors no-underline ${location.pathname === '/login' || location.pathname === '/register' ? 'hidden' : ''
                                    }`}
                            >
                                Sign Up
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </div>

    )
}

export default Topbar