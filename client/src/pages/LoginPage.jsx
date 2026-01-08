import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"
import { EyeOff,Eye  } from 'lucide-react';

export default function LoginPage() {
    const { login } = useAuth()
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError("")
        setLoading(true)

        try {
            await login(email, password)
            navigate("/admin")
        } catch (err) {
            setError(err.message || "Invalid credentials")
            setLoading(false)
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="max-w-sm w-full px-4 sm:px-6 flex flex-col">
                <header className="space-y-2 sm:space-y-3 mb-12 sm:mb-16">
                    <h1 className="text-2xl sm:text-3xl font-medium tracking-tight text-foreground transition-colors duration-300">Sign In</h1>
                    <p className="text-xs sm:text-sm text-muted-foreground transition-colors duration-300">
                        Enter your credentials to manage the journal.
                    </p>
                </header>

                <form onSubmit={handleSubmit} className="space-y-8 sm:space-y-10">
                    {error && (
                        <div className="text-xs sm:text-sm text-destructive bg-destructive/10 p-3 rounded">
                            {error}
                        </div>
                    )}

                    <div className="space-y-6 sm:space-y-8">
                        <div className="space-y-2">
                            <label className="block text-[10px] text-muted-foreground font-normal uppercase tracking-[0.2em] transition-colors duration-300">
                                Email
                            </label>
                            <input
                                type="email"
                                placeholder="name@example.com"
                                required
                                disabled={loading}
                                className="w-full px-0 py-2 border-b border-border focus:border-foreground outline-none transition-colors text-sm sm:text-base placeholder:text-muted-foreground/50 disabled:opacity-50 bg-transparent text-foreground"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="block text-[10px] text-muted-foreground font-normal uppercase tracking-[0.2em] transition-colors duration-300">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    required
                                    disabled={loading}
                                    className="w-full px-0 py-2 border-b border-border focus:border-foreground outline-none transition-colors text-sm sm:text-base placeholder:text-muted-foreground/50 disabled:opacity-50 bg-transparent pr-8 text-foreground"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    disabled={loading}
                                    className="absolute right-0 bottom-2.5 pr-2 text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50"
                                    aria-label={showPassword ? "Hide password" : "Show password"}
                                >
                                    {showPassword ? (
                                        <Eye className="w-5 h-5" />
                                    ) : (
                                        <EyeOff className="w-5 h-5" />
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="pt-4">
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full text-[10px] rounded font-normal uppercase tracking-[0.2em] bg-primary text-primary-foreground px-4 sm:px-6 py-3 sm:py-4 hover:bg-primary/90 transition-colors disabled:opacity-50"
                        >
                            {loading ? "Signing In…" : "Sign In"}
                        </button>
                    </div>
                </form>

                <footer className="mt-12 sm:mt-16 pt-8 sm:pt-10 border-t border-border text-center transition-colors duration-300">
                    <Link
                        to="/"
                        className="text-[10px] text-muted-foreground hover:text-foreground transition-colors font-normal uppercase tracking-[0.2em]"
                    >
                        ← Back to Journal
                    </Link>
                </footer>
            </div>
        </div>
    )
}