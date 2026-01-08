import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { getAllPosts } from "../api/posts.api.js"
import { AdminTrigger } from "../components/admin-trigger"

export default function BlogPage() {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [currentPage, setCurrentPage] = useState(1)
    const postsPerPage = 10

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await getAllPosts()
                const publishedPosts = response.data.filter(post => post.published)
                setPosts(publishedPosts)
            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }
        fetchPosts()
    }, [])

    // Calculate pagination
    const indexOfLastPost = currentPage * postsPerPage
    const indexOfFirstPost = indexOfLastPost - postsPerPage
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost)
    const totalPages = Math.ceil(posts.length / postsPerPage)

    return (
        <main className="min-h-screen max-w-3xl mx-auto px-6">
            <section className="border-b border-border py-12 transition-colors duration-300">
                <div className="flex items-start justify-between gap-8">
                    <div className="flex-1 space-y-4">
                        <div className="space-y-2">
                            <h1 className="text-2xl md:text-3xl font-medium tracking-tight">
                                Harsh Parmar
                            </h1>
                            <p className="text-base text-muted-foreground transition-colors duration-300">
                                Software Developer
                            </p>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed max-w-xl transition-colors duration-300">
                            Thoughts on software development, technology and also some curiosity pieces.
                        </p>
                        <div className="flex gap-6 text-sm">
                            <a 
                                href="https://github.com/Harshpparmar" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-muted-foreground hover:text-foreground transition-colors duration-300"
                            >
                                GitHub
                            </a>
                            <a 
                                href="mailto:parmarharsh213@gmail.com"
                                className="text-muted-foreground hover:text-foreground transition-colors duration-300"
                            >
                                Email
                            </a>
                        </div>
                    </div>
                    <AdminTrigger />
                </div>
            </section>

            <section className="py-12">
                <div className="mb-8">
                    <h2 className="text-xs uppercase tracking-widest text-muted-foreground font-medium transition-colors duration-300">
                        Journal
                    </h2>
                </div>

                {loading && <p className="text-muted-foreground text-sm transition-colors duration-300">Loading posts…</p>}
                {error && <p className="text-destructive text-sm">{error}</p>}
                {!loading && posts.length === 0 && (
                    <p className="text-muted-foreground text-sm transition-colors duration-300">No posts yet.</p>
                )}

                <div className="space-y-12">
                    {currentPosts.map((post) => (
                        <article key={post.id} className="group">
                            <Link to={`/posts/${post.slug}`} className="block space-y-2">
                                <time className="text-xs text-muted-foreground font-mono uppercase tracking-widest transition-colors duration-300">
                                    {
                                        new Date(post.createdAt).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'short',
                                            day: 'numeric'
                                        })
                                    }
                                </time>
                                <h3 className="text-xl md:text-2xl font-normal tracking-tight group-hover:underline underline-offset-2 transition-colors">
                                    {post.title}
                                </h3>
                            </Link>
                        </article>
                    ))}
                </div>

                {/* Minimal Pagination */}
                {totalPages > 1 && (
                    <nav className="mt-16 pt-12 border-t border-border transition-colors duration-300">
                        <div className="flex items-center justify-between">
                            <button
                                onClick={() => {
                                    setCurrentPage(p => Math.max(1, p - 1))
                                    window.scrollTo({ top: 0, behavior: 'smooth' })
                                }}
                                disabled={currentPage === 1}
                                className="text-xs text-muted-foreground hover:text-foreground disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300"
                            >
                                ← Previous
                            </button>
                            
                            <div className="flex items-center gap-3">
                                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                    <button
                                        key={page}
                                        onClick={() => {
                                            setCurrentPage(page)
                                            window.scrollTo({ top: 0, behavior: 'smooth' })
                                        }}
                                        className={`text-xs font-mono transition-colors duration-300 ${
                                            currentPage === page
                                                ? 'text-foreground'
                                                : 'text-muted-foreground hover:text-foreground'
                                        }`}
                                    >
                                        {page}
                                    </button>
                                ))}
                            </div>

                            <button
                                onClick={() => {
                                    setCurrentPage(p => Math.min(totalPages, p + 1))
                                    window.scrollTo({ top: 0, behavior: 'smooth' })
                                }}
                                disabled={currentPage === totalPages}
                                className="text-xs text-muted-foreground hover:text-foreground disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300"
                            >
                                Next →
                            </button>
                        </div>
                    </nav>
                )}
            </section>
        </main>
    )
}