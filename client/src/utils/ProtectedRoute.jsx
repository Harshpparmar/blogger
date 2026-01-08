import { Navigate } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"

export default function ProtectedRoute({ children }) {
    const { loading, isAuthenticated, isAdmin } = useAuth()

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center text-sm text-muted-foreground transition-colors duration-300">
                Loading…
            </div>
        )
    }

    if (!isAuthenticated || !isAdmin) {
        return <Navigate to="/login" replace />
    }

    return children
}