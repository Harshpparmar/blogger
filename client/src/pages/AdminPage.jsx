import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"
import { getAllPosts, deletePost, publishPost, unpublishPost } from "../api/posts.api"

export default function AdminPage() {
    const { logout } = useAuth()
    const navigate = useNavigate()
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)
    const [deleteModal, setDeleteModal] = useState({ show: false, post: null })

    useEffect(() => {
        fetchPosts()
    }, [])

    const fetchPosts = async () => {
        try {
            const res = await getAllPosts()
            setPosts(res.data)
        } catch (err) {
            console.error("Failed to fetch posts:", err)
        } finally {
            setLoading(false)
        }
    }

    const handleNewPost = () => {
        navigate("/admin/posts/new")
    }

    const handleEditPost = (post) => {
        navigate(`/admin/posts/edit/${post.slug}`)
    }

    const handleDeletePost = async (id) => {
        try {
            await deletePost(id)
            setPosts(posts.filter(p => p.id !== id))
            setDeleteModal({ show: false, post: null })
        } catch (err) {
            alert("Failed to delete post: " + err.message)
        }
    }

    const handleTogglePublish = async (post) => {
        try {
            if (post.published) {
                await unpublishPost(post.id)
            } else {
                await publishPost(post.id)
            }
            fetchPosts()
        } catch (err) {
            alert("Failed to publish/unpublish: " + err.message)
        }
    }

    return (
        <main className="min-h-screen max-w-4xl mx-auto px-6 pt-10 md:pt-14 pb-24">
            <header className="flex justify-between items-baseline border-b border-border pb-7 mb-14 transition-colors duration-300">
                <h1 className="text-3xl md:text-4xl font-medium tracking-tight text-foreground transition-colors duration-300">Admin</h1>
                <nav>
                    <button
                        onClick={() => navigate("/")}
                        className="text-[10px] font-normal rounded uppercase tracking-[0.2em] border border-border text-foreground px-3 py-2 hover:bg-muted transition-colors duration-300"
                    >
                        Exit
                    </button>
                </nav>
            </header>

            <div className="space-y-12">
                <div className="flex justify-between items-end">
                    <h2 className="text-[10px] text-muted-foreground font-normal uppercase tracking-[0.2em] transition-colors duration-300">
                        Entries ({posts.length})
                    </h2>
                    <button
                        onClick={handleNewPost}
                        className="text-[10px] rounded font-normal uppercase tracking-[0.2em] bg-primary text-primary-foreground px-4 py-2 hover:bg-primary/90 transition-colors duration-300"
                    >
                        New Entry
                    </button>
                </div>

                {loading ? (
                    <p className="text-muted-foreground text-sm transition-colors duration-300">Loading…</p>
                ) : posts.length === 0 ? (
                    <p className="text-muted-foreground text-sm transition-colors duration-300">No posts yet. Create your first post!</p>
                ) : (
                    <div className="space-y-8">
                        {posts.map((post) => (
                            <div key={post.id} className="border-b border-border pb-8 transition-colors duration-300">
                                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                                    {/* Post Info */}
                                    <div className="flex-1 min-w-0 space-y-2">
                                        <h3 className="text-lg md:text-xl font-normal text-foreground wrap-break-word transition-colors duration-300">
                                            {post.title}
                                        </h3>
                                        <div className="flex flex-wrap gap-3 text-[11px] text-muted-foreground font-normal uppercase tracking-[0.15em] transition-colors duration-300">
                                            <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                                            <span>—</span>
                                            <span className={post.published ? "text-muted-foreground" : "text-amber-500"}>
                                                {post.published ? "Published" : "Draft"}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex flex-wrap gap-3 md:justify-end">
                                        <button
                                            onClick={() => handleEditPost(post)}
                                            className="text-[10px] rounded font-normal uppercase tracking-[0.2em] border border-border text-foreground px-3 py-2 hover:bg-muted transition-colors duration-300"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleTogglePublish(post)}
                                            className={`text-[10px] rounded font-normal uppercase tracking-[0.2em] border px-3 py-2 transition-colors duration-300 ${post.published
                                                    ? "border-border text-foreground hover:bg-muted"
                                                    : "border-green-500 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20"
                                                }`}
                                        >
                                            {post.published ? "Unpublish" : "Publish"}
                                        </button>
                                        <button
                                            onClick={() => setDeleteModal({ show: true, post })}
                                            className="text-[10px] rounded font-normal uppercase tracking-[0.2em] border border-red-300 text-red-600 px-3 py-2 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors duration-300"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Delete Confirmation Modal */}
            {deleteModal.show && (
                <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4 z-50 transition-colors duration-300">
                    <div className="bg-card border border-border rounded-lg max-w-md w-full p-6 space-y-4 shadow-lg transition-colors duration-300">
                        <h3 className="text-xl font-medium text-foreground transition-colors duration-300">Delete Post?</h3>
                        <p className="text-sm text-muted-foreground transition-colors duration-300">
                            Are you sure you want to delete "{deleteModal.post?.title}"? This action cannot be undone.
                        </p>
                        <div className="flex gap-3 justify-end pt-2">
                            <button
                                onClick={() => setDeleteModal({ show: false, post: null })}
                                className="text-[10px] rounded font-normal uppercase tracking-[0.2em] border border-border text-foreground px-4 py-2 hover:bg-muted transition-colors duration-300"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => handleDeletePost(deleteModal.post.id)}
                                className="text-[10px] rounded font-normal uppercase tracking-[0.2em] bg-destructive text-destructive-foreground px-4 py-2 hover:bg-destructive/90 transition-colors duration-300"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <footer className="pt-24 text-center">
                <button
                    onClick={logout}
                    className="text-[10px] font-normal rounded uppercase tracking-[0.2em] bg-primary text-primary-foreground px-4 py-2 hover:bg-primary/90 transition-colors duration-300"
                >
                    Sign Out
                </button>
            </footer>
        </main>
    )
}