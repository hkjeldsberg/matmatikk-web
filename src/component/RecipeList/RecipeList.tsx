import React, {useEffect, useState} from 'react';
import {Recipe} from "../../model/Recipe";
import {fetchRecipes} from "../../service/RecipeService";
import './RecipeList.scss'
import {useAuth} from "../AuthProvider/AuthProvider";

export const RecipeList: React.FC = () => {
    const {token} = useAuth()
    const [recipes, setRecipes] = useState<Recipe[]>()

    useEffect(() => {
        const loadRecipes = async () => {
            try {
                const recipeData = await fetchRecipes(token)
                setRecipes(recipeData)
            } catch (error) {
                console.error(error)
            }
        }
        loadRecipes()
    }, [token]);

    return (<div className="container-center">
        <h2 className="heading-matmatikk">Tilgjenglige oppskrifter</h2>
        <div className="recipe-list">
            {recipes ? recipes.map(recipe =>
                <div key={recipe.id} className="recipe-card">
                    <div className="recipe-col">
                        <div className="recipe-name">
                            {recipe.name}
                        </div>
                        <div className="recipe-description">
                            {recipe.description}
                        </div>
                    </div>
                </div>
            ) : 'Ingen oppskrifter tilgjengelig.'}
        </div>
    </div>)
}

