// src/components/MediaBias/MediaBias.js
import React from "react";
import { newsData } from "../News/data"; // Adjust the path as needed
import "./MediaBais.css"; // Import the CSS file
import { useNavigate } from 'react-router-dom';

const MediaBias = () => {
  const navigate = useNavigate();
  
  // Function to determine bias color and text
  const getBiasInfo = (biasType) => {
    switch(biasType) {
      case 'left':
        return { class: 'bias-left', text: 'Left-Leaning' };
      case 'center':
        return { class: 'bias-center', text: 'Politically Neutral' };
      case 'right':
        return { class: 'bias-right', text: 'Right-Leaning' };
      case 'far-left':
        return { class: 'bias-far-left', text: 'Far Left' };
      case 'far-right':
        return { class: 'bias-far-right', text: 'Far Right' };
      default:
        return { class: 'bias-unknown', text: 'Bias Unknown' };
    }
  };

  return (
    <div className="media-bias-container">
      <div className="media-bias-header">
        <h1>Media Bias News Monitor</h1>
        <p>Analyzing media bias across different sources</p>
      </div>
      
      <div className="news-grid">
        {newsData.map((article) => {
          const biasInfo = getBiasInfo(article.bias || 'unknown');
          
          return (
            <div
              key={article.id}
              className="news-card"
              onClick={() => navigate(`/bias-details/${article.id}`)}
              style={{ cursor: 'pointer' }}
            >
              <div className="news-image-container">
                <img
                  src={article.imageUrl}
                  alt={article.title}
                  className="news-image"
                />
                <div className="news-category">{article.category}</div>
              </div>
              
              <div className="news-content">
                <h2 className="news-title">{article.title}</h2>
                
                {/* Bias indicator moved below title */}
                <div className="bias-tag">
                  <div className={`bias-dot ${biasInfo.class}`}></div>
                  <span>{biasInfo.text}</span>
                </div>
                
                <p className="news-excerpt">{article.content}</p>
                
                <div className="news-footer">
                  <span className="news-date">{article.publicationDate}</span>
                  <a href={`/bias-details/${article.id}`} className="news-link" onClick={(e) => e.stopPropagation()}>
                    Analyze Bias
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MediaBias;