import { useEffect, useState, useCallback } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { createPost, updatePost, getPostBySlug } from "../api/posts.api"
import TiptapEditor from "../components/TextEditor"

export default function PostEditor() {
    const { slug } = useParams()
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        title: "",
        slug: "",
        content: "",
    })
    const [loading, setLoading] = useState(false)
    const [fetchingPost, setFetchingPost] = useState(!!slug)
    const [error, setError] = useState("")

    const fetchPost = useCallback(async () => {
        try {
            const res = await getPostBySlug(slug)
            setFormData({
                title: res.data.title,
                slug: res.data.slug,
                content: res.data.content,
            })
        } catch (err) {
            setError("Failed to load post: " + err.message)
        } finally {
            setFetchingPost(false)
        }
    }, [slug])

    useEffect(() => {
        if (slug) {
            fetchPost()
        }
    }, [slug, fetchPost])

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))

        if (name === "title" && !slug) {
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

    const handleContentChange = (html) => {
        setFormData((prev) => ({
            ...prev,
            content: html,
        }))
    }

    const handleSave = async (e) => {
        e.preventDefault()
        setError("")
        setLoading(true)

        try {
            if (slug) {
                const res = await getPostBySlug(slug)
                await updatePost(res.data.id, formData)
            } else {
                await createPost(formData)
            }
            navigate("/admin")
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    if (fetchingPost) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-[10px] text-muted-foreground font-normal uppercase tracking-[0.2em] animate-pulse transition-colors duration-300">Loading...</p>
            </div>
        )
    }

    return (
        <main className="min-h-screen max-w-3xl mx-auto px-6 pt-10 md:pt-14 pb-24">
            {/* Header */}
            <header className="flex justify-between items-baseline border-b border-border pb-7 mb-14 transition-colors duration-300">
                <h1 className="text-3xl md:text-4xl font-medium tracking-tight text-foreground transition-colors duration-300">
                    {slug ? "Edit" : "New"}
                </h1>
                <button
                    type="button"
                    onClick={() => navigate("/admin")}
                    className="text-[10px] font-normal rounded uppercase tracking-[0.2em] border border-border text-foreground px-3 py-2 hover:bg-muted transition-colors duration-300"
                >
                    Cancel
                </button>
            </header>

            {/* Form */}
            <form onSubmit={handleSave} className="space-y-12">
                {error && (
                    <div className="text-destructive text-sm">{error}</div>
                )}

                {/* Title */}
                <div className="space-y-4">
                    <label className="block text-[10px] text-muted-foreground font-normal uppercase tracking-[0.2em] transition-colors duration-300">
                        Title
                    </label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                        disabled={loading}
                        className="w-full px-0 py-2 border-b border-border focus:border-foreground outline-none transition-colors text-2xl md:text-3xl font-normal placeholder:text-muted-foreground/30 disabled:opacity-50 bg-transparent text-foreground"
                        placeholder="Enter title..."
                    />
                </div>

                {/* Slug */}
                <div className="space-y-4">
                    <label className="block text-[10px] text-muted-foreground font-normal uppercase tracking-[0.2em] transition-colors duration-300">
                        Slug
                    </label>
                    <input
                        type="text"
                        name="slug"
                        value={formData.slug}
                        onChange={handleChange}
                        required
                        disabled={loading}
                        className="w-full px-0 py-2 border-b border-border focus:border-foreground outline-none transition-colors text-sm font-normal text-muted-foreground placeholder:text-muted-foreground/30 disabled:opacity-50 bg-transparent"
                        placeholder="url-slug"
                    />
                </div>

                {/* Content */}
                <div className="space-y-4">
                    <label className="block text-[10px] text-muted-foreground font-normal uppercase tracking-[0.2em] transition-colors duration-300">
                        Content
                    </label>
                    <div className="prose max-w-none transition-colors duration-300">
                        <TiptapEditor
                            content={formData.content}
                            onChange={handleContentChange}
                            placeholder="Write your thoughts..."
                        />
                    </div>
                </div>

                {/* Actions */}
                <div className="flex justify-end items-center pt-12 border-t border-border transition-colors duration-300">
                    <button
                        type="submit"
                        disabled={loading}
                        className="inline-flex items-center justify-center text-[10px] font-normal uppercase tracking-[0.2em] bg-primary text-primary-foreground px-6 py-3 rounded-sm hover:bg-primary/90 transition-colors disabled:opacity-50"
                    >
                        {loading ? "Saving…" : "Save Entry"}
                    </button>
                </div>
            </form>
        </main>
    )
}