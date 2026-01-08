import { Link } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"

export function AdminTrigger() {
    const { isAuthenticated, isAdmin } = useAuth()
    if (!isAuthenticated || !isAdmin) return null

    return (
        <Link
            to="/admin"
            className="text-xs text-muted-foreground hover:text-foreground transition-colors font-mono uppercase tracking-widest"
        >
            Admin
        </Link>
    )
}