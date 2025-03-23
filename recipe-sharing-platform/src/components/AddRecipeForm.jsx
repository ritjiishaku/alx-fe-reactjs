import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddRecipeForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    ingredients: "",
    steps: "",
  });

  const [errors, setErrors] = useState({});

  // Validation Function
  const validate = () => {
    let tempErrors = {};

    if (!formData.title.trim()) {
      tempErrors.title = "Recipe title is required.";
    }

    if (!formData.ingredients.trim()) {
      tempErrors.ingredients = "Please list at least two ingredients.";
    } else {
      const ingredientList = formData.ingredients.split(",").map((item) => item.trim());
      if (ingredientList.length < 2) {
        tempErrors.ingredients = "Please provide at least two ingredients.";
      }
    }

    if (!formData.steps.trim()) {
      tempErrors.steps = "Please provide preparation steps.";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  // Handle Input Changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    // Clear the specific error when user starts typing
    setErrors({ ...errors, [e.target.name]: "" });
  };

  // Handle Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      console.log("Submitted Recipe:", formData);

      // Navigate back to home after submission (replace with API call)
      navigate("/");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-6">
      <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">
        Add a New Recipe
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Recipe Title */}
        <div>
          <label className="block text-gray-700 font-medium">Recipe Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border p-2 rounded-lg focus:ring focus:ring-blue-300"
            placeholder="Enter recipe title"
          />
          {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
        </div>

        {/* Ingredients */}
        <div>
          <label className="block text-gray-700 font-medium">Ingredients</label>
          <textarea
            name="ingredients"
            value={formData.ingredients}
            onChange={handleChange}
            rows="3"
            className="w-full border p-2 rounded-lg focus:ring focus:ring-blue-300"
            placeholder="List ingredients separated by commas (e.g., eggs, flour, sugar)"
          ></textarea>
          {errors.ingredients && <p className="text-red-500 text-sm">{errors.ingredients}</p>}
        </div>

        {/* Preparation Steps */}
        <div>
          <label className="block text-gray-700 font-medium">Preparation Steps</label>
          <textarea
            name="steps"
            value={formData.steps}
            onChange={handleChange}
            rows="4"
            className="w-full border p-2 rounded-lg focus:ring focus:ring-blue-300"
            placeholder="Describe the preparation steps"
          ></textarea>
          {errors.steps && <p className="text-red-500 text-sm">{errors.steps}</p>}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition"
        >
          Submit Recipe
        </button>
      </form>
    </div>
  );
};

export default AddRecipeForm;
