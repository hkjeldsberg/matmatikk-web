import {Recipe} from "../model/Recipe";
import {RecipeFormState} from "../component/AddRecipePage/AddRecipePage";
import {RecipeRequest} from "../model/RecipeRequest";

export const fetchRecipes = async (token?: string): Promise<Recipe[]> => {
    if (!token) throw new Error("No access token found")

    const endpoint = "/recipe"
    const response = await fetch(endpoint,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }

        })
    if (!response.ok) {
        throw new Error(`Failed to fetch recipes: ${response.status} ${response.statusText}`)

    }
    return response.json()
}
export const createRecipe = async (recipeState: RecipeFormState, token?:string): Promise<Recipe> => {
    if (!token) throw new Error("No access token found")

    const endpoint = "/recipe"
    const requestBody: RecipeRequest = recipeState

    const response = await fetch(endpoint,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`

            },
            body: JSON.stringify(requestBody)
        }
    )

    if (!response.ok) {
        throw new Error(`Failed to create recipe: ${response.status} ${response.statusText}`)

    }
    return response.json()
}
