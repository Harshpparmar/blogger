import { request } from "./http"

export const loginUser = (data) => request("/auth/login",
    {
        method: "POST",
        body: JSON.stringify(data)
    }
)

export const logoutUser = () => request("/auth/logout",
    {
        method: "POST"
    }
)

export const getCurrentUser = () => request("/auth/current-user",
    {
        method: "GET"
    }
)

export const registerUser = (data) => request("/auth/register",
    {
        method: "POST",
        body: JSON.stringify(data)
    }
)