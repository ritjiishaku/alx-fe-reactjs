import { useState } from 'react';
import AddRecipeForm from './AddRecipeForm';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const [recipes, setRecipes] = useState([]);

  const addRecipe = (newRecipe) => {
    setRecipes([...recipes, newRecipe]);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Recipe Sharing Platform</h1>
      <AddRecipeForm onAddRecipe={addRecipe} />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {recipes.map((recipe) => (
          <div key={recipe.id} className="bg-white shadow-md rounded-lg p-4">
            <h2 className="text-xl font-semibold">{recipe.title}</h2>
            <Link to={`/recipe/${recipe.id}`} className="text-blue-500">View Recipe</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
