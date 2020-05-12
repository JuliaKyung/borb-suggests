import React from 'react'

const Recipe = ({recipe}) => {
    const {title, image, sourceUrl} = recipe;
    const imgStart = "https://spoonacular.com/recipeImages/"
    return (
        <div className="recipe">
            <h2>{title}</h2>
            <img src={imgStart+image}></img>
            <a href={sourceUrl} target="_blank" rel="noopener noreferrer">
                Take me to the recipe, Borb!
            </a>
        </div>
    )
}

export default Recipe
