import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Recipe Sharing Platform</h1>

      <div className="text-center mt-6">
        <Link to="/add-recipe" className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600">
          Add New Recipe
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
