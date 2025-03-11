import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const NewsAPI = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const API_KEY = process.env.REACT_APP_NEWS_API_KEY;
        const response = await axios.get(
          `https://gnews.io/api/v4/top-headlines?category=general&lang=en&country=us&max=10&apikey=${API_KEY}`
        );
        setNews(response.data.articles);
      } catch (err) {
        console.error("Error fetching news:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  return (
    <div className="news-container">
      <div className="header">
        <Link to="/" className="back-button"> Back to Home</Link>
        <h1>Trending News Today</h1>
      </div>

      {loading ? (
        <h2 className="loading">Loading news...</h2>
      ) : error ? (
        <h2 className="error-message">Failed to load news. Please try again later.</h2>
      ) : (
        <div className="news-grid">
          {news.map((article, index) => (
            <div key={index} className="news-card">
              <a href={article.url} target="_blank" rel="noopener noreferrer">
                <img
                  src={article.image || "https://via.placeholder.com/300x200?text=No+Image"}
                  alt={article.title}
                  className="news-image"
                />
                <h2 className="news-title">{article.title}</h2>
                <p className="news-date">
                   {new Date(article.publishedAt).toLocaleDateString()}
                </p>
              </a>
            </div>
          ))}
        </div>
      )}

      <style>
        {`
          .news-container {
            max-width: 1200px;
            margin: auto;
            padding: 20px;
            font-family: Arial, sans-serif;
            text-align: center;
          }

          .header {
            display: flex;
            flex-direction: column;
            align-items: center;
          }

          .back-button {
            margin: 10px 0;
            padding: 10px 20px;
            font-size: 1.2rem;
            background-color: #4caf50;
            color: white;
            text-decoration: none;
            border-radius: 25px;
            display: inline-block;
          }

          .news-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 20px;
            margin-top: 20px;
          }

          .news-card {
            background: white;
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            overflow: hidden;
            transition: transform 0.3s ease-in-out;
            padding-bottom: 10px;
          }

          .news-card:hover {
            transform: translateY(-5px);
          }

          .news-image {
            width: 100%;
            height: 200px;
            object-fit: cover;
          }

          .news-title {
            padding: 10px;
            font-size: 1.2em;
            text-align: center;
          }

          .news-title a {
            text-decoration: none;
            color: #007bff;
            font-weight: bold;
            transition: color 0.3s ease;
          }

          .news-title a:hover {
            color: #0056b3;
          }

          .news-date {
            font-size: 0.9rem;
            color: #666;
            margin-bottom: 10px;
          }

          .loading, .error-message {
            font-size: 1.5rem;
            color: #ff5733;
          }
        `}
      </style>
    </div>
  );
};

export default NewsAPI;
