import {Recipe} from "../model/Recipe";
import {RecipeFormState} from "../component/AddRecipePage/AddRecipePage";
import {RecipeRequest} from "../model/RecipeRequest";

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
export const createRecipe = async (recipeState: RecipeFormState): Promise<Recipe> => {

    const endpoint = "/recipe"
    const requestBody: RecipeRequest = recipeState
    const userToken = '1234abcd1234abcd'

    const response = await fetch(endpoint,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userToken}`
            },
            body: JSON.stringify(requestBody)
        }
    )

    if (!response.ok) {
        throw new Error(`Failed to create recipe: ${response.status} ${response.statusText}`)

    }
    return response.json()
}
