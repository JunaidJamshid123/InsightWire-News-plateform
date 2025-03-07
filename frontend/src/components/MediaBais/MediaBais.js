// src/components/MediaBias/MediaBias.js
import React from "react";
import { newsData } from "../News/data"; // Adjust the path as needed
import "./MediaBais.css"; // Import the CSS file

const MediaBias = () => {
  return (
    <div className="media-bias-container">
      <div className="media-bias-header">
        <h1>Media Bias News Monitor</h1>
        <p>Analyzing media bias across different sources</p>
      </div>

      <div className="news-grid">
        {newsData.map((article) => (
          <div key={article.id} className="news-card">
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
              
              <div className="bias-indicator">
                <div className={`bias-bar ${article.biasType === "L" ? "bias-left" : article.biasType === "R" ? "bias-right" : "bias-center"}`}></div>
                <div className="bias-empty"></div>
                <span className="bias-text">
                  {article.centerCoverage || "37%"} Center coverage: {article.sources || "11"} sources
                </span>
              </div>

              <p className="news-excerpt">{article.content}</p>
              
              <div className="news-footer">
                <span className="news-date">{article.publicationDate}</span>
                <a href={article.url || "#"} className="news-link">
                  See the Story
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MediaBias;