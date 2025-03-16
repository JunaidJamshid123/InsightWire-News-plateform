import React, { useState, useEffect } from "react"; 
import { CalendarDays, User, Globe, Tag, ArrowLeft } from "lucide-react"; 
import { useParams, Link } from "react-router-dom"; 
import Chatbot from "../chatbot/chatbot"; 
import "./Detail.css";

export default function NewsDetails() {
  const { id } = useParams();
  const [newsItem, setNewsItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageUrl, setImageUrl] = useState("/placeholder.svg");
  const [imageLoading, setImageLoading] = useState(true);

  useEffect(() => {
    const fetchNewsDetails = async () => {
      try {
        setLoading(true);
        // Fetch the specific article by ID from your API
        const response = await fetch(`http://localhost:5000/api/articles/scraped/${id}`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data = await response.json();
        setNewsItem(data);
        
        // Handle image extraction if needed
        if (data.url && (!data.imageUrl || data.imageUrl === "/placeholder.svg")) {
          fetchImageFromUrl(data.url, data.title);
        } else if (data.imageUrl) {
          setImageUrl(data.imageUrl);
          setImageLoading(false);
        } else {
          generateTitleImage(data.title);
          setImageLoading(false);
        }
        
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
        console.error("Error fetching article details:", err);
      }
    };

    fetchNewsDetails();
  }, [id]);

  const fetchImageFromUrl = async (url, title) => {
    if (!url) {
      generateTitleImage(title);
      setImageLoading(false);
      return;
    }
    
    try {
      // Call backend proxy to fetch the HTML content
      const response = await fetch(`http://localhost:5000/api/extract-image?url=${encodeURIComponent(url)}`);
      
      if (response.ok) {
        const data = await response.json();
        if (data.imageUrl) {
          setImageUrl(data.imageUrl);
        } else {
          generateTitleImage(title);
        }
      } else {
        generateTitleImage(title);
      }
    } catch (error) {
      console.error("Error extracting image:", error);
      generateTitleImage(title);
    } finally {
      setImageLoading(false);
    }
  };

  // Generate title-based image as fallback
  const generateTitleImage = (title) => {
    if (!title) {
      setImageUrl("/placeholder.svg");
      return;
    }
    
    // Create a canvas element
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    // Set canvas dimensions
    canvas.width = 800;
    canvas.height = 450;
    
    // Fill background with red (matching your design)
    ctx.fillStyle = '#FF0000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Add text (first letter of title)
    const firstLetter = title.charAt(0).toUpperCase();
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 200px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(firstLetter, canvas.width / 2, canvas.height / 2);
    
    // Convert to data URL
    const dataUrl = canvas.toDataURL('image/png');
    setImageUrl(dataUrl);
  };

  // Show loading state
  if (loading) {
    return (
      <div className="container loading-container">
        <div className="loading-spinner">Loading article...</div>
      </div>
    );
  }

  // Show error state
  if (error || !newsItem) {
    return (
      <div className="container error-container">
        <h1>Article not found</h1>
        <p>{error || "Could not retrieve the requested article"}</p>
        <Link to="/" className="back-link">
          <ArrowLeft size={16} />
          <span>Back to News</span>
        </Link>
      </div>
    );
  }

  // Process content to handle different content formats
  const renderContent = () => {
    if (Array.isArray(newsItem.content)) {
      // If content is an array of paragraphs
      return newsItem.content.map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ));
    } else if (typeof newsItem.content === 'string') {
      // If content is a string with newlines
      return newsItem.content.split('\n\n').map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ));
    }
    return <p>No content available</p>;
  };

  return (
    <>
      <article className="news-details">
        <div className="container">
          <div className="article-header">
            <Link to="/" className="back-link">
              <ArrowLeft size={16} />
              <span>Back to News</span>
            </Link>
            <h1 className="article-title">{newsItem.title}</h1>
            
            <div className="article-meta">
              <div className="meta-item">
                <CalendarDays size={18} />
                <span>{newsItem.date || "Recent"}</span>
              </div>
              <div className="meta-item">
                <User size={18} />
                <span>BY {newsItem.author || newsItem.publication || "Unknown"}</span>
              </div>
              {newsItem.publication && (
                <div className="meta-item">
                  <Globe size={18} />
                  <span>{newsItem.publication}</span>
                </div>
              )}
              {newsItem.category && (
                <div className="meta-item">
                  <Tag size={18} />
                  <span>{newsItem.category}</span>
                </div>
              )}
            </div>
          </div>
          
          <div className="article-image-container">
            {imageLoading ? (
              <div className="loading-image">Loading image...</div>
            ) : (
              <img
                src={imageUrl}
                alt={newsItem.title}
                className="article-image"
                onError={(e) => {
                  if (e.target.src !== "/placeholder.svg") {
                    e.target.src = "/placeholder.svg";
                  }
                }}
              />
            )}
          </div>
          
          <div className="article-content">
            {renderContent()}
          </div>
          
          <div className="article-footer">
            {(newsItem.tags && newsItem.tags.length > 0 || newsItem.category) && (
              <div className="related-tags">
                <span className="tag-label">Related Topics:</span>
                <div className="tags-container">
                  {newsItem.category && (
                    <span className="category-tag">{newsItem.category}</span>
                  )}
                  {newsItem.tags && newsItem.tags.map((tag, index) => (
                    <span key={index} className="category-tag">{tag}</span>
                  ))}
                </div>
              </div>
            )}
            
            <div className="article-source">
              {newsItem.url && (
                <>
                  <span>Source: </span>
                  <a href={newsItem.url} target="_blank" rel="noopener noreferrer">
                    {newsItem.publication || "Original Article"}
                  </a>
                </>
              )}
            </div>
          </div>
          
          {/* This section will only show if your API returns related articles */}
          {newsItem.relatedArticles && newsItem.relatedArticles.length > 0 && (
            <div className="related-articles">
              <h3>Related Articles</h3>
              <div className="related-articles-grid">
                {newsItem.relatedArticles.map((article, index) => (
                  <Link key={index} to={`/news/${article._id}`} className="related-article-card">
                    <div className="related-article-image">
                      <img src={article.imageUrl || "/placeholder.svg"} alt={article.title} />
                    </div>
                    <h4>{article.title}</h4>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </article>
      
      <Chatbot />
    </>
  );
}