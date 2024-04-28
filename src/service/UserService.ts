import {User} from "../model/User";

export const fetchUser = async (token?: String): Promise<User> => {
    if (!token) throw new Error("No access token found")

    const endpoint = "/users/current"
    const response = await fetch(endpoint,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }

        })
    if (!response.ok) {
        throw new Error(`Failed to fetch user: ${response.status} ${response.statusText}`)
    }
    return response.json()
}
