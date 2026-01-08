import Footer from "./Footer"

export default function Layout({ children }) {
    return (
        <div className="font-sans antialiased bg-background text-foreground selection:bg-primary selection:text-primary-foreground min-h-screen flex flex-col transition-colors duration-300">
            <main className="flex-1">
                {children}
            </main>
            <Footer />
        </div>
    )
}