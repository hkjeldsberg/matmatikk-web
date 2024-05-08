import {User} from "../model/User";
import {Message} from "../model/Message";

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

export const fetchMessagesOnUser = async (token?: string, user?: User): Promise<Message[]> => {
    if (!token) throw new Error("No access token found")
    if (!user) throw new Error("No user token found")

    const endpoint = `/users/${user.id}/messages`
    const response = await fetch(endpoint,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }

        })
    if (!response.ok) {
        throw new Error(`Failed to fetch messages: ${response.status} ${response.statusText}`)

    }
    return response.json()
}
