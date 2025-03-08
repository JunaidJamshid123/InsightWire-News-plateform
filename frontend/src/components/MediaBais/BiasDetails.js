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

  const getBiasClass = () => {
    if (!article) return '';
    
    if (article.biasType === 'L') return 'bias-left';
    if (article.biasType === 'R') return 'bias-right';
    return 'bias-center';
  };

  const getBiasText = () => {
    if (!article) return '';
    
    if (article.biasType === 'L') return 'Left-leaning';
    if (article.biasType === 'R') return 'Right-leaning';
    return 'Balanced / Center';
  };

  const getBiasColor = () => {
    if (!article) return '#4caf50';
    
    if (article.biasType === 'L') return '#3b5bdb';
    if (article.biasType === 'R') return '#e53935';
    return '#4caf50';
  };

  const getBiasPosition = () => {
    if (!article) return 50;
    
    if (article.biasType === 'L') return article.biasStrength ? 15 + (35 - article.biasStrength) : 25;
    if (article.biasType === 'R') return article.biasStrength ? 85 - (35 - article.biasStrength) : 75;
    return 50;
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  if (loading) {
    return (
      <div className="bias-loading-container">
        <div className="bias-loading-spinner"></div>
        <p>Loading article analysis...</p>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="bias-error-container">
        <div className="bias-error-icon">!</div>
        <h2>Article Not Found</h2>
        <p>We couldn't find the article you're looking for. It may have been removed or the URL might be incorrect.</p>
        <button onClick={handleGoBack} className="bias-back-button">Return to News Feed</button>
      </div>
    );
  }

  const biasPosition = getBiasPosition();
  
  return (
    <div className="bias-container">
      <header className="bias-header">
        <button onClick={handleGoBack} className="bias-back-button">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          Back
        </button>
        <div className="bias-category-tag">{article.category}</div>
      </header>

      <div className="bias-content">
        <h1 className="bias-title">{article.title}</h1>
        
        <div className="bias-meta">
          <span className="bias-date">Published on {article.publicationDate}</span>
          <span className="bias-sources-count">{article.sources || "11"} sources analyzed</span>
        </div>

        <div className="bias-image-wrapper">
          <img 
            src={article.imageUrl} 
            alt={article.title} 
            className="bias-hero-image" 
          />
          <div className={`bias-badge ${getBiasClass()}`}>
            {getBiasText()}
          </div>
        </div>

        <section className="bias-verdict-section">
          <h2>Media Bias Analysis</h2>
          
          <div className="bias-gauge-container">
            <div className="bias-gauge">
              <div className="bias-spectrum-gradient"></div>
              <div 
                className="bias-indicator" 
                style={{
                  left: `${biasPosition}%`,
                  backgroundColor: getBiasColor()
                }}
              >
                <span className="bias-indicator-label">{getBiasText()}</span>
              </div>
            </div>
            <div className="bias-labels">
              <span>Left</span>
              <span>Center</span>
              <span>Right</span>
            </div>
          </div>

          <div className="bias-stats">
            <div className="bias-stat-item">
              <h3>Center Coverage</h3>
              <div className="bias-stat-value">{article.centerCoverage || "37%"}</div>
              <p>Neutral, fact-based reporting</p>
            </div>
            <div className="bias-stat-item">
              <h3>Source Diversity</h3>
              <div className="bias-stat-value">{article.sources || "11"}</div>
              <p>Different sources analyzed</p>
            </div>
            <div className="bias-stat-item">
              <h3>Confidence</h3>
              <div className="bias-stat-value">{article.confidence || "High"}</div>
              <p>Rating reliability</p>
            </div>
          </div>
        </section>

        <section className="bias-content-section">
          <h2>Content Analysis</h2>
          <div className="bias-article-content">
            <p>{article.fullContent || article.content}</p>
          </div>
          
          {article.biasDetails && (
            <div className="bias-indicators">
              <h3>Bias Indicators Found</h3>
              <ul className="bias-indicators-list">
                {article.biasDetails.map((detail, index) => (
                  <li key={index} className={`bias-indicator-item ${detail.type.toLowerCase()}-indicator`}>
                    <div className="indicator-header">
                      <span className="indicator-badge">{detail.type}</span>
                      <span className="indicator-impact">{detail.impact || "Moderate"} impact</span>
                    </div>
                    <p className="indicator-description">{detail.description}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>

        <section className="source-section">
          <h2>Source Distribution</h2>
          <div className="source-visual">
            <div className="source-chart">
              <div className="source-bar">
                <div 
                  className="source-segment left-segment" 
                  style={{width: `${article.leftSources || 30}%`}}
                >
                  <span>{article.leftSources || 30}%</span>
                </div>
                <div 
                  className="source-segment center-segment" 
                  style={{width: `${article.centerCoverage || 37}%`}}
                >
                  <span>{article.centerCoverage || 37}%</span>
                </div>
                <div 
                  className="source-segment right-segment" 
                  style={{width: `${article.rightSources || 33}%`}}
                >
                  <span>{article.rightSources || 33}%</span>
                </div>
              </div>
              <div className="source-labels">
                <span>Left sources</span>
                <span>Center sources</span>
                <span>Right sources</span>
              </div>
            </div>
          </div>
          
          <div className="methodology-box">
            <h3>Analysis Methodology</h3>
            <p>
              Our bias analysis examines language use, source diversity, factual accuracy, 
              and context presentation across {article.sources || "11"} different news sources 
              covering this story. The center coverage percentage indicates how much of the 
              reporting maintained neutral, fact-based coverage without political slant.
            </p>
          </div>
        </section>

        <section className="related-section">
          <h2>Related Articles</h2>
          <div className="related-grid">
            {newsData
              .filter(item => item.id !== article.id && item.category === article.category)
              .slice(0, 3)
              .map(relatedArticle => (
                <div 
                  key={relatedArticle.id} 
                  className="related-card" 
                  onClick={() => navigate(`/bias-details/${relatedArticle.id}`)}
                >
                  <div className="related-image-container">
                    <img 
                      src={relatedArticle.imageUrl} 
                      alt={relatedArticle.title} 
                    />
                    <div className={`related-bias-tag bias-${relatedArticle.biasType?.toLowerCase()}`}>
                      {relatedArticle.biasType === 'L' ? 'Left' : 
                       relatedArticle.biasType === 'R' ? 'Right' : 'Center'}
                    </div>
                  </div>
                  <h3>{relatedArticle.title}</h3>
                  <span className="related-date">{relatedArticle.publicationDate}</span>
                </div>
              ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default BiasDetails;