import { useEffect, useState } from "react"
import { createPost, updatePost } from "../api/posts.api.js"

export default function PostModal({ isOpen, post, onClose, onSuccess }) {
    const [formData, setFormData] = useState({
        title: "",
        content: "",
        slug: "",
    })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    useEffect(() => {
        if (post) {
            setFormData({
                title: post.title,
                content: post.content,
                slug: post.slug,
            })
        } else {
            setFormData({ title: "", content: "", slug: "" })
        }
        setError("")
    }, [post, isOpen])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError("")
        setLoading(true)

        try {
            if (post) {
                await updatePost(post.id, formData)
            } else {
                await createPost(formData)
            }
            setFormData({ title: "", content: "", slug: "" })
            onSuccess()
            onClose()
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))

        // Auto-generate slug from title
        if (name === "title" && !post) {
            setFormData((prev) => ({
                ...prev,
                slug: value
                    .toLowerCase()
                    .trim()
                    .replace(/[^\w\s-]/g, "")
                    .replace(/\s+/g, "-"),
            }))
        }
    }

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-colors duration-300">
            <div className="bg-card border border-border max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8 rounded-lg space-y-6 shadow-lg transition-colors duration-300">
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-medium text-foreground transition-colors duration-300">
                        {post ? "Edit Post" : "New Post"}
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-muted-foreground hover:text-foreground text-2xl leading-none transition-colors duration-300"
                    >
                        ×
                    </button>
                </div>

                {error && <p className="text-destructive text-sm">{error}</p>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-2 text-foreground transition-colors duration-300">Title</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                            disabled={loading}
                            className="w-full px-3 py-2 border border-border rounded outline-none focus:border-foreground transition-colors disabled:opacity-50 bg-transparent text-foreground placeholder:text-muted-foreground/50"
                            placeholder="Post title"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2 text-foreground transition-colors duration-300">Slug</label>
                        <input
                            type="text"
                            name="slug"
                            value={formData.slug}
                            onChange={handleChange}
                            required
                            disabled={loading}
                            className="w-full px-3 py-2 border border-border rounded outline-none focus:border-foreground transition-colors disabled:opacity-50 bg-transparent text-foreground placeholder:text-muted-foreground/50"
                            placeholder="post-slug"
                        />
                        <p className="text-xs text-muted-foreground mt-1 transition-colors duration-300">
                            URL-friendly version of the title
                        </p>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2 text-foreground transition-colors duration-300">Content</label>
                        <textarea
                            name="content"
                            value={formData.content}
                            onChange={handleChange}
                            required
                            disabled={loading}
                            rows="12"
                            className="w-full px-3 py-2 border border-border rounded outline-none focus:border-foreground transition-colors resize-none disabled:opacity-50 bg-transparent text-foreground placeholder:text-muted-foreground/50"
                            placeholder="Post content (separate paragraphs with blank lines)"
                        />
                        <p className="text-xs text-muted-foreground mt-1 transition-colors duration-300">
                            Use double line breaks to create new paragraphs
                        </p>
                    </div>

                    <div className="flex gap-3 justify-end pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={loading}
                            className="px-4 py-2 text-sm border border-border hover:bg-muted transition-colors rounded disabled:opacity-50 text-foreground"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-4 py-2 text-sm bg-primary text-primary-foreground hover:bg-primary/90 transition-colors rounded disabled:opacity-50"
                        >
                            {loading ? "Saving…" : post ? "Update" : "Create"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}