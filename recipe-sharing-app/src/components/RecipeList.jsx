import { Link } from 'react-router-dom';
import useRecipeStore from '../store/recipeStore';

const RecipeList = () => {
  const { filteredRecipes, searchTerm, recipes, favorites, addFavorite, removeFavorite } = useRecipeStore(state => ({
    filteredRecipes: state.filteredRecipes,
    searchTerm: state.searchTerm,
    recipes: state.recipes,
    favorites: state.favorites,
    addFavorite: state.addFavorite,
    removeFavorite: state.removeFavorite
  }));
  
  const displayedRecipes = searchTerm ? filteredRecipes : recipes;

  return (
    <div>
      <h2>Recipe List</h2>
      {displayedRecipes.length === 0 ? <p>No recipes found!</p> : (
        displayedRecipes.map(recipe => (
          <div key={recipe.id}>
            <h3>{recipe.title}</h3>
            <p>{recipe.description}</p>
            <Link to={`/recipe/${recipe.id}`}>View Details</Link>
            <button onClick={() => favorites.includes(recipe.id) ? removeFavorite(recipe.id) : addFavorite(recipe.id)}>
              {favorites.includes(recipe.id) ? 'Remove from Favorites' : 'Add to Favorites'}
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default RecipeList;