const baseURL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api/v1"

export async function request(endpoint, options = {}) {
    const url = `${baseURL}${endpoint}`
    const token = localStorage.getItem("token")

    const config = {
        ...options,
        headers: {
            "Content-Type": "application/json",
            ...options.headers,
            ...(token && { Authorization: `Bearer ${token}` }),
        },
        credentials: "include",
    }

    try {
        const res = await fetch(url, config)

        let data 
        const text = await res.text()
        try {
            data = text ? JSON.parse(text) : {}
        } catch  {
            data = { message: text }
        }

        if (res.status === 401) {
            localStorage.removeItem("token")
            window.location.href = "/login"
            throw new Error("Session expired. Please log in again.")
        }

        if (!res.ok) {
            const errorMessage = data.message || `Request failed with status ${res.status}`
            throw new Error(errorMessage)
        }

        return data
    } catch (error) {
        console.error(`API request error: [${endpoint}]`, error.message)
        throw error
    }
}