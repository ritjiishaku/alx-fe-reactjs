// src/components/DeleteRecipeButton.jsx
import { useNavigate } from 'react-router-dom';
import useRecipeStore from '../store/recipeStore';

const DeleteRecipeButton = ({ recipeId }) => {
  const deleteRecipe = useRecipeStore(state => state.deleteRecipe);
  const navigate = useNavigate(); // Import useNavigate

  const handleDelete = () => {
    deleteRecipe(recipeId);
    navigate('/'); // Redirect to home after deleting
  };

  return <button onClick={handleDelete}>Delete Recipe</button>;
};

export default DeleteRecipeButton;
