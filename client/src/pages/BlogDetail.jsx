import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { getPostBySlug } from "../api/posts.api.js"

export default function BlogDetail() {
    const { slug } = useParams()
    const [post, setPost] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const res = await getPostBySlug(slug)
                setPost(res.data)
            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }
        fetchPost()
    }, [slug])

    if (loading) {
        return (
            <main className="flex items-center justify-center min-h-[50vh]">
                <div className="text-[10px] text-muted-foreground font-mono uppercase tracking-[0.2em] transition-colors duration-300">
                    Loading...
                </div>
            </main>
        )
    }

    if (error || !post) {
        return (
            <main className="flex items-center justify-center min-h-[50vh]">
                <div className="text-center space-y-4">
                    <p className="text-muted-foreground mb-4 transition-colors duration-300">Post not found</p>
                    <Link 
                        to="/" 
                        className="text-xs text-muted-foreground hover:text-foreground transition-colors font-mono uppercase tracking-[0.2em] duration-300"
                    >
                        ← Journal
                    </Link>
                </div>
            </main>
        )
    }

    return (
        <main className="min-h-screen max-w-3xl mx-auto px-6 pt-10 md:pt-14">
            <nav className="border-b border-border pb-7 mb-14 transition-colors duration-300">
                <div className="flex justify-between items-center">
                    <Link
                        to="/"
                        className="text-[12px] text-muted-foreground font-normal uppercase tracking-[0.2em] hover:text-foreground transition-colors duration-300"
                    >
                        ← Journal
                    </Link>
                </div>
            </nav>

            <article className="max-w-2xl mx-auto pb-28">
                <header className="space-y-7 mb-14">
                    <time className="block text-[11px] text-muted-foreground font-normal uppercase tracking-[0.22em] transition-colors duration-300">
                        {new Date(post.createdAt).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                        }).toUpperCase()}
                    </time>
                    <h1 className="text-4xl md:text-[44px] font-semibold tracking-tight leading-[1.15] text-foreground transition-colors duration-300">
                        {post.title}
                    </h1>
                </header>

                <div className="prose max-w-none">
                    <div
                        className="space-y-7 text-lg leading-[1.9] text-foreground transition-colors duration-300"
                        dangerouslySetInnerHTML={{ __html: post.content }}
                    />
                </div>

                <footer className="mt-24 pt-12 border-t border-border transition-colors duration-300">
                    <Link
                        to="/"
                        className="inline-flex items-center text-[12px] text-muted-foreground font-normal uppercase tracking-[0.2em] hover:text-foreground transition-colors duration-300"
                    >
                        ← Back to Index
                    </Link>
                </footer>
            </article>
        </main>
    )
}