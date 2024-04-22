import React from 'react';
import './HomePage.scss';
import {RecipeList} from "../RecipeList/RecipeList";

export const HomePage: React.FC = () =>
    <div className="container-matmatikk">
        <div className="container-top">
            <h2 className="heading-matmatikk">Velkommen til MatMatikk!</h2>
            <p>Oppdag de beste oppskriftene for enhver anledning! Utforsk nye smaker, lær å lage eksotiske retter,
                og
                del dine kulinariske suksesser med venner og familie. La oss bringe kreativitet og glede inn i
                kjøkkenet
                ditt!</p>
        </div>
        <RecipeList/>
    </div>

