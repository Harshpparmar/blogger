import { request } from "./http"

export const getAllPosts = () => request("/posts",
    {
        method: "GET"
    }
)

export const getPostBySlug = (slug) => request(`/posts/${slug}`,
    {
        method: "GET"
    }
)

export const createPost = (data) => request("/posts",
    {
        method: "POST", 
        body: JSON.stringify(data)
    }
)

export const updatePost = (id, data) => request(`/posts/${id}`,
    {
        method: "PUT", 
        body: JSON.stringify(data)
    }
)

export const deletePost = (id) => request(`/posts/${id}`,
    {
        method: "DELETE"
    }
)

export const publishPost = (id) => request(`/posts/${id}/publish`,
    {
        method: "PUT"
    }
)

export const unpublishPost = (id) => request(`/posts/${id}/unpublish`,
    {
        method: "PUT"
    }
)