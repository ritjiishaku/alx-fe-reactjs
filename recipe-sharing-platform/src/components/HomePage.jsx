import { useState, useEffect } from 'react';

// Defining the RecipeList Component
const RecipeList = () => {

    // Declaring State for Recipes
    const [recipes, setRecipes] = useState ([]);

    // Fetching Recipe Data When Component Mounts
    useEffect(() => {fetch("../data.json")
        .then((response) => response.json())
        .then((data) => setRecipes(data))
        .catch((error) => console.error("error loading recipes.", error));
    }, []);
}

    return (
        <div>
          <h1>Recipes</h1>
          <div>
            {recipes.map((recipe, index) => (
              <div key={index}>
                <img src={recipe.image} alt={recipe.name} />
                <div>
                  <h2>{recipe.name}</h2>
                  <p>{recipe.description}</p>
                  <button>View Recipe</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
      
)