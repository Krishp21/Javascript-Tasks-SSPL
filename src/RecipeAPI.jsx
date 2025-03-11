import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const RecipeAPI = () => {
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchDefaultRecipes();
  }, []);

  const fetchDefaultRecipes = async () => {
    setLoading(true);
    setError("");
    try {
      const API_URL =
        "https://www.themealdb.com/api/json/v1/1/filter.php?c=Vegetarian";
      const response = await axios.get(API_URL);
      setRecipes(response.data.meals || []);
    } catch (error) {
      setError("Error fetching recipes. Please try again.");
      console.error(error);
    }
    setLoading(false);
  };

  const fetchSearchResults = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setError("");
    try {
      const API_URL = `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`;
      const response = await axios.get(API_URL);
      setRecipes(response.data.meals || []);
      if (!response.data.meals) {
        setError("No matching recipes found.");
      }
    } catch (error) {
      setError("Error fetching recipes. Please try again.");
      console.error(error);
    }
    setLoading(false);
  };

  const handleSearch = () => {
    fetchSearchResults();
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      fetchSearchResults();
    }
  };

  return (
    <div
      style={{
        width: "100vw",
        minHeight: "100vh",
        background: "#f8f9fa",
        paddingBottom: "20px",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          fontSize: "28px",
          fontWeight: "bold",
          padding: "20px 0",
          color: "#333",
        }}
      >
        Vegetarian Recipes
      </h1>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: "20px",
          gap: "10px",
        }}
      >
        <input
          type="text"
          placeholder="Search for a recipe..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyPress}
          style={{
            width: "40%",
            maxWidth: "500px",
            padding: "12px",
            fontSize: "16px",
            border: "1px solid #aaa",
            outline: "none",
          }}
        />
        <button
          onClick={handleSearch}
          style={{
            padding: "12px 18px",
            background: "#ff9800",
            color: "white",
            fontSize: "16px",
            border: "none",
            borderRadius: "15px",
            cursor: "pointer",
          }}
        >
          Search
        </button>
        <Link
          to="/"
          style={{
            padding: "10px 20px",
            fontSize: "1.2rem",
            backgroundColor: "#4caf50",
            color: "white",
            textDecoration: "none",
            borderRadius: "25px",
            display: "inline-block",
          }}
        >
          Back to Home
        </Link>
      </div>

      {query && (
        <button
          onClick={fetchDefaultRecipes}
          style={{
            padding: "10px 16px",
            margin: "10px auto",
            display: "block",
            background: "#FF9800",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          Back to Main Menu
        </button>
      )}

      {loading ? (
        <p style={{ textAlign: "center", color: "#555" }}>Loading recipes...</p>
      ) : error ? (
        <p style={{ textAlign: "center", color: "red" }}>{error}</p>
      ) : recipes.length === 0 ? (
        <p style={{ textAlign: "center", color: "#555" }}>No recipes found.</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "20px",
            padding: "0 5%",
          }}
        >
          {recipes.map((recipe) => (
            <div
              key={recipe.idMeal}
              style={{
                background: "white",
                borderRadius: "15px",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                padding: "15px",
                textAlign: "center",
                transition: "0.3s",
              }}
            >
              <h2
                style={{
                  fontSize: "18px",
                  color: "#333",
                  marginBottom: "10px",
                }}
              >
                {recipe.strMeal}
              </h2>
              <img
                src={recipe.strMealThumb}
                alt={recipe.strMeal}
                style={{
                  width: "100%",
                  maxWidth: "250px",
                  height: "auto",
                  borderRadius: "8px",
                  display: "block",
                  margin: "0 auto",
                }}
              />
              <button
                style={{
                  marginTop: "12px",
                  background: "#ff9800",
                  border: "none",
                  padding: "10px 15px",
                  borderRadius: "5px",
                  cursor: "pointer",
                  fontSize: "14px",
                  fontWeight: "bold",
                }}
              >
                <a
                  href={`https://www.themealdb.com/meal/${recipe.idMeal}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: "none", color: "white" }}
                >
                  View Full Recipe
                </a>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecipeAPI;
