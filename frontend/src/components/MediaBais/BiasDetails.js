// src/components/BiasDetails/BiasDetails.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { newsData } from '../News/data';
import './BiasDetails.css';

const BiasDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Find the article with the matching ID
    const foundArticle = newsData.find(item => item.id === parseInt(id) || item.id === id);
    
    if (foundArticle) {
      setArticle(foundArticle);
    }
    setLoading(false);
  }, [id]);

  const getBiasColor = () => {
    if (!article) return '';
    
    if (article.biasType === 'L') return 'bias-left-detail';
    if (article.biasType === 'R') return 'bias-right-detail';
    return 'bias-center-detail';
  };

  const getBiasText = () => {
    if (!article) return '';
    
    if (article.biasType === 'L') return 'Left-leaning';
    if (article.biasType === 'R') return 'Right-leaning';
    return 'Center';
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  if (loading) {
    return <div className="bias-details-loading">Loading...</div>;
  }

  if (!article) {
    return (
      <div className="bias-details-error">
        <h2>Article Not Found</h2>
        <p>The article you're looking for doesn't exist or has been removed.</p>
        <button onClick={handleGoBack} className="back-button">Go Back</button>
      </div>
    );
  }

  return (
    <div className="bias-details-container">
      <div className="bias-details-header">
        <button onClick={handleGoBack} className="back-button">
          &larr; Back to News
        </button>
        <div className="bias-details-category">{article.category}</div>
      </div>

      <div className="bias-details-content">
        <h1 className="bias-details-title">{article.title}</h1>
        
        <div className="bias-details-meta">
          <span className="bias-details-date">Published: {article.publicationDate}</span>
          <span className="bias-details-sources">Sources: {article.sources || "11"}</span>
        </div>

        <div className="bias-details-image-container">
          <img 
            src={article.imageUrl} 
            alt={article.title} 
            className="bias-details-image" 
          />
        </div>

        <div className="bias-analysis-section">
          <h2>Bias Analysis</h2>
          
          <div className="bias-details-indicator">
            <div className="bias-details-spectrum">
              <span className="bias-label left">Left</span>
              <div className="bias-details-bar">
                <div className={`bias-marker ${getBiasColor()}`}></div>
              </div>
              <span className="bias-label right">Right</span>
            </div>
            <div className="bias-details-score">
              <span className="bias-type">{getBiasText()}</span>
              <span className="center-coverage">{article.centerCoverage || "37%"} Center coverage</span>
            </div>
          </div>

          <div className="bias-details-analysis">
            <h3>Content Analysis</h3>
            <p>{article.fullContent || article.content}</p>
            
            {article.biasDetails && (
              <>
                <h3>Bias Indicators</h3>
                <ul className="bias-indicators-list">
                  {article.biasDetails.map((detail, index) => (
                    <li key={index} className="bias-indicator-item">
                      <span className="indicator-type">{detail.type}:</span> {detail.description}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>

        <div className="source-analysis-section">
          <h2>Source Analysis</h2>
          <div className="source-distribution">
            <div className="source-bar">
              <div 
                className="left-sources" 
                style={{width: `${article.leftSources || 30}%`}}
              >
                <span className="source-percentage">{article.leftSources || 30}%</span>
              </div>
              <div 
                className="center-sources" 
                style={{width: `${article.centerCoverage || 37}%`}}
              >
                <span className="source-percentage">{article.centerCoverage || 37}%</span>
              </div>
              <div 
                className="right-sources" 
                style={{width: `${article.rightSources || 33}%`}}
              >
                <span className="source-percentage">{article.rightSources || 33}%</span>
              </div>
            </div>
            <div className="source-labels">
              <span>Left</span>
              <span>Center</span>
              <span>Right</span>
            </div>
          </div>
          
          <div className="methodology-note">
            <h3>Analysis Methodology</h3>
            <p>
              Our bias analysis examines language use, source diversity, factual accuracy, 
              and context presentation across {article.sources || "11"} different news sources 
              covering this story. The center coverage percentage indicates how much of the 
              reporting maintained neutral, fact-based coverage.
            </p>
          </div>
        </div>

        <div className="related-articles">
          <h2>Related Articles</h2>
          <div className="related-articles-grid">
            {newsData
              .filter(item => item.id !== article.id && item.category === article.category)
              .slice(0, 3)
              .map(relatedArticle => (
                <div key={relatedArticle.id} className="related-article-card" 
                  onClick={() => navigate(`/bias-details/${relatedArticle.id}`)}>
                  <img 
                    src={relatedArticle.imageUrl} 
                    alt={relatedArticle.title} 
                    className="related-article-image" 
                  />
                  <h3>{relatedArticle.title}</h3>
                  <span className="related-article-date">{relatedArticle.publicationDate}</span>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BiasDetails;