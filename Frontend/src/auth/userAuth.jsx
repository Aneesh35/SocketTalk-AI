import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../context/user.context'

const UserAuth = ({ children }) => {
    const { user, setUser } = useContext(UserContext)
    const [loading, setLoading] = useState(true)
    const token = localStorage.getItem('token')
    const storedUser = localStorage.getItem('user')
    const navigate = useNavigate()

    useEffect(() => {
        if (!token) {
            navigate('/login')
            return
        }
        if (user) {
            setLoading(false)
            return
        }
        if (storedUser) {
            try {
                const userData = JSON.parse(storedUser)
                console.log(userData)
                setUser(userData)
                setLoading(false)
                return
            } catch (error) {
                console.error("Error user data not found")
                navigate('/login')
            }
        }
        const timer = setTimeout(() => {
            if (loading) {
                console.error("Authentication timeout")
                logout()
            }
        }, 5000)

        return () => clearTimeout(timer)
    }, [user, token, navigate, setUser]) 

    const logout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        setUser(null)
        navigate('/login')
    }

    if (loading) {
        return <div className="flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
    }

    return <>{children}</>
}

export default UserAuth