import { useTheme } from "../hooks/useTheme"
import { Sun, Moon } from "lucide-react"

export default function Footer() {
    const { theme, toggleTheme } = useTheme()

    return (
        <footer className="border-t border-border transition-colors duration-300">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
                <div className="flex flex-row justify-between items-center gap-4 text-[11px] text-muted-foreground font-normal uppercase tracking-wide transition-colors duration-300">
                    <p>© 2026 Harsh Parmar. All rights reserved.</p>
                    <div className="flex items-center gap-2">
                        <button 
                            onClick={toggleTheme}
                            className="cursor-pointer hover:text-foreground transition-colors"
                            aria-label="Toggle theme"
                        >
                            {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
                        </button>
                    </div>
                </div>
            </div>
        </footer>
    )
}