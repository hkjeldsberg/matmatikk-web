import {Recipe} from "../model/Recipe";

export const fetchRecipes = async (): Promise<Recipe[]> => {

    const endpoint = "/recipe"
    const response = await fetch(endpoint,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }

        })
    if (!response.ok) {
        throw new Error(`Failed to fetch recipes: ${response.status} ${response.statusText}`)

    }
    return response.json()
}