// Details.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './Detail.css';
import Comments from '../Comments/Comments'; // Import the Comments component
import defaultImage from '../Images/defaultImage.png';

const BiasVisualization = () => {
  // Hardcoded bias data for illustration
  const biasData = {
    left: 30,
    center: 40,
    right: 30
  };

  return (
    <div className="bias-visualization">
      <p className="bias-label">Political Bias Distribution:</p>
      <div className="bias-bar-container">
        <div className="bias-bar-left" style={{ width: `${biasData.left}%` }}>
          Left {biasData.left}%
        </div>
        <div className="bias-bar-center" style={{ width: `${biasData.center}%` }}>
          Center {biasData.center}%
        </div>
        <div className="bias-bar-right" style={{ width: `${biasData.right}%` }}>
          Right {biasData.right}%
        </div>
      </div>
    </div>
  );
};

const Details = () => {
  const { id } = useParams(); // Get article ID from URL
  const [article, setArticle] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false); // State for tracking favorite status

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/articles/${id}`);
        const data = await response.json();
        if (data.success) {
          setArticle(data.data); // Assuming data is in 'data'
        } else {
          console.error('Article not found');
        }
      } catch (error) {
        console.error('Error fetching article details:', error);
      }
    };

    fetchArticle();
  }, [id]);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  if (!article) return <p>Loading article...</p>;

  return (
    <div className="details-container">
      <div className="article-header">
        <span className="article-source">{article.publication}</span>
        <span className="article-date"> | {article.date || 'Unknown Date'}</span>
      </div>

      <img src={defaultImage} alt="Article Title" className="article-title-image" />
      <h1 className="article-title">{article.title}</h1>

      <button
        onClick={toggleFavorite}
        className={`favorite-button ${isFavorite ? 'favorited' : ''}`}
      >
        {isFavorite ? 'Added to Favorite' : 'Add to Favorite'}
      </button>

      <div className="article-detail">
        {article.content.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>

      <BiasVisualization />

      <div className="additional-section">
        <h2>Political Outcomes</h2>
        <p>
          This article provides a detailed overview of the recent military activities and
          political movements in the Middle East, focusing on the current tensions between Israel, Lebanon, and Hezbollah.
        </p>
      </div>

      {/* Pass the article ID to the Comments component */}
      <Comments articleId={id} />
    </div>
  );
};

export default Details;
