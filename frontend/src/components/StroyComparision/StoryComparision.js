import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./StoryComparision.css";

const StoryComparison = () => {
  const navigate = useNavigate();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visibleArticles, setVisibleArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        
        // Fetch articles from the API
        const response = await fetch("http://localhost:5000/api/articles/scraped");
        
        if (!response.ok) {
          throw new Error(`API call failed with status: ${response.status}`);
        }
        
        const articlesData = await response.json();
        
        // Fetch images for all articles
        const articlesWithImages = await Promise.all(
          articlesData.map(async (article) => {
            let imageUrl = "https://source.unsplash.com/random/1200x600/?news";
            
            if (article.url) {
              try {
                const imageResponse = await fetch(
                  `http://localhost:5000/api/extract-image?url=${encodeURIComponent(article.url)}`
                );
                
                if (imageResponse.ok) {
                  const imageData = await imageResponse.json();
                  imageUrl = imageData.imageUrl || imageUrl;
                }
              } catch (err) {
                console.error("Error extracting image for article:", err);
              }
            }
            
            // Generate perspective data for each article
            // This would come from your backend in a real application
            const biasTypes = ["L", "R", "C"];
            const randomBias = biasTypes[Math.floor(Math.random() * biasTypes.length)];
            
            // Create sample perspective data for each article
            const perspectives = {
              left: {
                title: article.title,
                content: Array.isArray(article.content) ? article.content.join(" ") : article.content,
                sources: Math.floor(Math.random() * 30 + 40), // Random number between 40-70
                keyPoints: [
                  "Focus on social impact",
                  "Emphasis on affected communities",
                  "Discussion of systemic factors",
                  "Historical context of the issue"
                ]
              },
              center: {
                title: article.title,
                content: Array.isArray(article.content) ? article.content.join(" ") : article.content,
                sources: Math.floor(Math.random() * 30 + 60), // Random number between 60-90
                keyPoints: [
                  "Balanced reporting of facts",
                  "Multiple viewpoints presented",
                  "Context about broader implications",
                  "Focus on verified information"
                ]
              },
              right: {
                title: article.title,
                content: Array.isArray(article.content) ? article.content.join(" ") : article.content,
                sources: Math.floor(Math.random() * 30 + 35), // Random number between 35-65
                keyPoints: [
                  "Focus on individual responsibility",
                  "Economic implications highlighted",
                  "Traditional values perspective",
                  "National security considerations"
                ]
              }
            };
            
            // Coverage data for the bias visualization
            const totalSources = perspectives.left.sources + perspectives.center.sources + perspectives.right.sources;
            const coverageData = {
              total: totalSources,
              left: perspectives.left.sources,
              right: perspectives.right.sources,
              center: perspectives.center.sources,
              lastUpdated: "1 hour ago",
              biasDistribution: `${Math.round((perspectives.center.sources / totalSources) * 100)}% Center`
            };
            
            return {
              ...article,
              id: article._id || `article-${Math.random().toString(36).substr(2, 9)}`,
              imageUrl,
              biasType: randomBias,
              centerCoverage: `${Math.floor(Math.random() * 60 + 20)}%`, // Random percentage between 20-80%
              sources: Math.floor(Math.random() * 15 + 5), // Random number between 5-20
              publicationDate: formatDate(article.date),
              // Add perspective data to be used in StoryDetails
              perspectives,
              coverageData
            };
          })
        );
        
        setArticles(articlesWithImages);
        
        // Randomly select and shuffle the first 30 articles
        const shuffledArticles = articlesWithImages
          .sort(() => 0.5 - Math.random())
          .slice(0, 30);
          
        // Stagger the appearance of articles for a smoother effect
        setVisibleArticles([]);
        
        // Add articles with a delay for staggered appearance
        shuffledArticles.forEach((article, index) => {
          setTimeout(() => {
            setVisibleArticles(prev => [...prev, article]);
          }, index * 50); // 50ms delay between each article appearing
        });
        
      } catch (err) {
        console.error("Error fetching articles:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);
  
  // Format date nicely
  const formatDate = (dateString) => {
    if (!dateString || dateString === "Loading...") {
      return "Recently published";
    }
    
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return "Recently published";
      }
      
      return new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      }).format(date);
    } catch (err) {
      return "Recently published";
    }
  };
  
  // Extract excerpt from content
  const getExcerpt = (content, maxLength = 150) => {
    if (!content) return "No content available";
    
    if (Array.isArray(content)) {
      // Join the first few array items
      const joinedContent = content.slice(0, 2).join(" ");
      return joinedContent.length > maxLength 
        ? joinedContent.substring(0, maxLength) + "..." 
        : joinedContent;
    }
    
    if (typeof content === 'string') {
      return content.length > maxLength 
        ? content.substring(0, maxLength) + "..." 
        : content;
    }
    
    return "No content available";
  };

  // Handle navigation to the story details page
  const handleStoryClick = (article) => {
    // Store the selected article in sessionStorage to access it in the StoryDetails component
    sessionStorage.setItem('selectedArticle', JSON.stringify(article));
    
    // Navigate to the story details page with the article ID
    navigate(`/story-details/${article.id}`);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="pulse-loader"></div>
        <p>Loading stories from across the web...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <div className="error-icon">!</div>
        <h2>Oops! We hit a snag</h2>
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Try Again</button>
      </div>
    );
  }

  return (
    <div className="story-comparison-container">
      <div className="story-comparison-header">
        <h1>Perspective Lens</h1>
        <p>Explore multiple viewpoints on today's trending stories</p>
        <div className="header-divider"></div>
      </div>
      
      <div className="comparison-grid">
        {visibleArticles.map((article, index) => (
          <div
            key={article.id}
            className="comparison-card"
            onClick={() => handleStoryClick(article)}
            style={{ 
              cursor: "pointer",
              animationDelay: `${index * 0.05}s`
            }}
          >
            <div className="comparison-image-container">
              <div className="image-overlay"></div>
              <img
                src={article.imageUrl}
                alt={article.title}
                className="comparison-image"
                loading="lazy"
              />
              <div className="comparison-category">
                <span className="publication-dot"></span>
                {article.publication || "News"}
              </div>
            </div>
            
            <div className="comparison-content">
              <h2 className="comparison-title">{article.title}</h2>
              
              <div className="perspective-indicator">
                <div className={`perspective-bar ${
                  article.biasType === "L" ? "perspective-left" : 
                  article.biasType === "R" ? "perspective-right" : 
                  "perspective-center"
                }`}>
                  <span className="perspective-label">
                    {article.biasType === "L" ? "Left" : 
                     article.biasType === "R" ? "Right" : 
                     "Center"}
                  </span>
                </div>
                <div className="perspective-meter">
                  <div className="meter-fill" style={{ 
                    width: article.centerCoverage 
                  }}></div>
                </div>
                <span className="perspective-text">
                  <span className="balanced-text">{article.centerCoverage}</span> balanced from <span className="sources-text">{article.sources}</span> sources
                </span>
              </div>
              
              <p className="comparison-excerpt">
                {getExcerpt(article.content)}
              </p>
              
              <div className="comparison-footer">
                <span className="comparison-date">
                  <span className="date-icon">📅</span>
                  {article.publicationDate}
                </span>
                <button 
                  className="comparison-link"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleStoryClick(article);
                  }}
                >
                  <span className="link-text">Compare Views</span>
                  <span className="link-arrow">→</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {visibleArticles.length === 0 && !loading && (
        <div className="no-articles">
          <p>No articles found to display. Please check back later.</p>
        </div>
      )}
    </div>
  );
};

export default StoryComparison;