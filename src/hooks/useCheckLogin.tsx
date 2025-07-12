import { useLocation, useNavigate } from '@tanstack/react-router'

const useCheckLogin = () => {
    const navigate = useNavigate()
    const location = useLocation()

    const token = localStorage.getItem('token')

    if (!token && location.pathname === '/register') {
        return false
    }

    if (!token) {
        navigate({ to: '/login' })
        return false
    }    

    return true
}

export default useCheckLogin