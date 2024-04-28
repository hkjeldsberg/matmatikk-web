import React, {useState} from 'react';
import {useForm} from "react-hook-form";
import {Recipe} from "../../model/Recipe";
import {createRecipe} from "../../service/RecipeService";
import './add-recipe-page.scss'

export interface RecipeFormState {
    name: string,
    description: string
}

export const AddRecipePage: React.FC = () => {
    const [recipe, setRecipe] = useState<Recipe>()
    const [error, setError] = useState<string>();
    const {
        register,
        handleSubmit,
        formState: {errors},
        reset,
    } = useForm<RecipeFormState>();

    const onSubmit = async (recipeState: RecipeFormState) => {
        try {
            const recipe = await createRecipe(recipeState);
            reset();
            setRecipe(recipe)
            setError('');
        } catch (error) {
            setError('Klarte ikke å legge til oppskriften');
            console.error(error);
        }
    };


    return <div className="container-matmatikk">
        <div className="container-center">
            <h2 className="heading-matmatikk">Legg til din egen oppskrift</h2>
            {recipe && (
                <div className="heading-nb">
                    Oppskriften til {recipe.name} ble lagt til
                </div>
            )}

            {error && <div className="error-message">{error}</div>}
            <form className="recipe-form" onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                    <label htmlFor="name">Navn</label>
                    <input
                        className="form-input"
                        type="text"
                        id="name"
                        {...register('name')}
                    />
                    <p className="form-error">{errors.name?.message}</p>
                </div>
                <div className="form-group">
                    <label htmlFor="description">Beskrivelse</label>
                    <input
                        className="form-input"
                        type="text"
                        id="description"
                        {...register('description')}
                    />
                    <p className="form-error">{errors.description?.message}</p>
                </div>
                <button type="submit" className="btn-matmatikk form-submit">
                    Legg til oppskrift
                </button>
            </form>
        </div>
    </div>
        ;
}

