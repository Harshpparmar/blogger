import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { loginUser, logoutUser, getCurrentUser } from "../api/auth.api"
import { AuthContext } from "./auth.context"

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        const checkUser = async () => {
            try {
                const res = await getCurrentUser()
                // Backend returns user directly in data field
                if (res.data) {
                    setUser(res.data)
                } else {
                    setUser(null)
                }
            } catch (error) {
                console.log("Not authenticated:", error.message)
                // Clear token if getCurrentUser fails
                localStorage.removeItem("token")
                setUser(null)
            } finally {
                setLoading(false)
            }
        }

        const token = localStorage.getItem("token")
        if (token) {
            checkUser()
        } else {
            setLoading(false)
        }
    }, [])

    const login = async (email, password) => {
        try {
            const res = await loginUser({ email, password })
            const { accessToken, user: userData } = res.data

            localStorage.setItem("token", accessToken)
            setUser(userData)
            navigate("/admin", { replace: true })
        } catch (error) {
            console.error("Login error:", error.message)
            throw error
        }
    }

    const logout = async () => {
        try {
            await logoutUser()
        } catch (error) {
            console.log("Logout error:", error.message)
        }
        localStorage.removeItem("token")
        setUser(null)
        navigate("/", { replace: true })
    }

    const value = {
        user,
        loading,
        isAuthenticated: !!user,
        isAdmin: user?.role === "ADMIN",
        login,
        logout,
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}