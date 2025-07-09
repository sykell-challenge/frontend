import { useLocation, useNavigate } from '@tanstack/react-router'

const useCheckLogin = () => {
    const navigate = useNavigate()
    const location = useLocation()

    const token = localStorage.getItem('token')

    if (location.pathname === '/register') {
        return false
    }

    if (!token) {
        navigate({ to: '/login' })
        return false
    }

    if (location.pathname === '/login' || location.pathname === '/') {
        navigate({ to: '/urlinput' })
        return true
    }

    return true
}

export default useCheckLogin