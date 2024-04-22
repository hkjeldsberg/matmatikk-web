import React, {useEffect, useState} from 'react';
import {Recipe} from "../../model/Recipe";
import {fetchRecipes} from "../../service/RecipeService";
import './RecipeList.scss'

export const RecipeList: React.FC = () => {
    const [recipes, setRecipes] = useState<Recipe[]>()

    useEffect(() => {
        const loadRecipes = async () => {
            try {
                const recipieData = await fetchRecipes()
                setRecipes(recipieData)
            } catch (error) {
                console.error(error)
            }
        }
        loadRecipes()
    }, []);

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

