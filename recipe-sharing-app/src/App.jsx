// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RecipeList from './components/RecipeList';
import FavoritesList from './components/FavoritesList';
import RecommendationsList from './components/RecommendationsList';
import SearchBar from './components/SearchBar';

const App = () => {
  return (
    <Router>
      <div>
        <h1>Recipe Sharing Application</h1>
        <SearchBar />
        <RecipeList />
        <FavoritesList />
        <RecommendationsList />
        <Routes>
          {/* Add your other routes here */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
