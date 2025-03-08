// src/components/StoryComparison/StoryComparison.js
import React from "react";
import { newsData } from "../News/data"; // Adjust the path as needed
import "./StoryComparision.css"; // Import the CSS file
import { useNavigate } from "react-router-dom";

const StoryComparison = () => {
  const navigate = useNavigate();
  
  return (
    <div className="story-comparison-container">
      <div className="story-comparison-header">
        <h1>Story Comparison</h1>
        <p>Compare multiple perspectives on the same news events</p>
      </div>
      
      <div className="comparison-grid">
        {newsData.map((article) => (
          <div 
            key={article.id}
            className="comparison-card"
            onClick={() => navigate(`/story-details/${article.id}`)}
            style={{ cursor: "pointer" }}
          >
            <div className="comparison-image-container">
              <img
                src={article.imageUrl}
                alt={article.title}
                className="comparison-image"
              />
              <div className="comparison-category">{article.category}</div>
            </div>
            
            <div className="comparison-content">
              <h2 className="comparison-title">{article.title}</h2>
              
              <div className="perspective-indicator">
                <div className={`perspective-bar ${article.biasType === "L" ? "perspective-left" : article.biasType === "R" ? "perspective-right" : "perspective-center"}`}></div>
                <div className="perspective-meter"></div>
                <span className="perspective-text">
                  {article.centerCoverage || "37%"} Balanced coverage: {article.sources || "11"} sources
                </span>
              </div>
              
              <p className="comparison-excerpt">{article.content}</p>
              
              <div className="comparison-footer">
                <span className="comparison-date">{article.publicationDate}</span>
                <a href={article.url || "#"} className="comparison-link">
                  Compare Narratives
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StoryComparison;