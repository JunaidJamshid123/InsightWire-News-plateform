import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./StoryDetails.css";

const StoryDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [story, setStory] = useState(null);
  const [activeTab, setActiveTab] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // First, try to get the story from sessionStorage (set by StoryComparison)
    const storedArticle = sessionStorage.getItem('selectedArticle');
    
    if (storedArticle) {
      try {
        const parsedArticle = JSON.parse(storedArticle);
        
        // Verify this is the correct article by checking ID
        if (parsedArticle.id === id) {
          setStory(parsedArticle);
          setLoading(false);
          return;
        }
      } catch (err) {
        console.error("Error parsing stored article:", err);
      }
    }
    
    // If we don't have the story in storage or it's not the one we're looking for,
    // fetch it from the API
    const fetchStory = async () => {
      try {
        setLoading(true);
        
        // Fetch the specific article by ID
        const response = await fetch(`http://localhost:5000/api/articles/${id}`);
        
        if (!response.ok) {
          throw new Error(`API call failed with status: ${response.status}`);
        }
        
        const articleData = await response.json();
        
        // Generate sample perspective data
        // In a real app, this would come from your backend
        const perspectives = {
          left: {
            title: articleData.title,
            content: "This is the left-leaning perspective on the story...",
            sources: 67,
            keyPoints: [
              "Emphasis on social impacts",
              "Focus on affected communities",
              "Concerns about long-term implications",
              "Historical context of similar situations"
            ]
          },
          center: {
            title: articleData.title,
            content: "This is the centrist perspective on the story...",
            sources: 98,
            keyPoints: [
              "Balanced reporting of key facts",
              "Equal coverage of multiple viewpoints",
              "Context about broader implications",
              "Focus on verified information"
            ]
          },
          right: {
            title: articleData.title,
            content: "This is the right-leaning perspective on the story...",
            sources: 51,
            keyPoints: [
              "Focus on economic impacts",
              "Individual liberty considerations",
              "Traditional values perspective",
              "National security implications"
            ]
          }
        };
        
        // Sample coverage data
        const coverageData = {
          total: 216,
          left: 67,
          right: 51,
          center: 98,
          lastUpdated: "1 hour ago",
          biasDistribution: "45% Center"
        };
        
        // Set the story with perspectives and coverage data
        setStory({
          ...articleData,
          id: articleData._id || id,
          perspectives,
          coverageData,
          category: articleData.category || "News",
          publicationDate: formatDate(articleData.date)
        });
        
      } catch (err) {
        console.error("Error fetching story:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStory();
  }, [id]);
  
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

  if (loading) {
    return (
      <div className="loading-container">
        <div className="pulse-loader"></div>
        <p>Loading story details...</p>
      </div>
    );
  }

  if (error || !story) {
    return (<div className="error-container">
        <div className="error-icon">!</div>
        <h2>Oops! We couldn't find that story</h2>
        <p>{error || "The requested story could not be found"}</p>
        <button onClick={() => navigate("/")}>Back to All Stories</button>
      </div>
    );
  }

  // Extract perspectives and coverage data from the story
  const { perspectives, coverageData } = story;

  return (
    <div className="story-details-container">
      <div className="story-details-header">
        <button className="back-button" onClick={() => navigate(-1)}>
          ← Back to Stories
        </button>
        <h1>{story.title}</h1>
        <div className="story-meta">
          <span className="story-category">{story.category}</span>
          <span className="story-date">Published: {story.publicationDate}</span>
        </div>
      </div>

      <div className="story-coverage-summary">
        <div className="coverage-card">
          <h3>Coverage Details</h3>
          <div className="coverage-stats">
            <div className="stat-row">
              <span className="stat-label">Total News Sources</span>
              <span className="stat-value">{coverageData.total}</span>
            </div>
            <div className="stat-row">
              <span className="stat-label">Leaning Left</span>
              <span className="stat-value">{coverageData.left}</span>
            </div>
            <div className="stat-row">
              <span className="stat-label">Leaning Right</span>
              <span className="stat-value">{coverageData.right}</span>
            </div>
            <div className="stat-row">
              <span className="stat-label">Center</span>
              <span className="stat-value">{coverageData.center}</span>
            </div>
            <div className="stat-row">
              <span className="stat-label">Last Updated</span>
              <span className="stat-value">{coverageData.lastUpdated}</span>
            </div>
            <div className="stat-row">
              <span className="stat-label">Bias Distribution</span>
              <span className="stat-value">{coverageData.biasDistribution}</span>
            </div>
          </div>
        </div>

        <div className="bias-visualization">
          <h3>Coverage Distribution</h3>
          <div className="bias-chart">
            <div 
              className="bias-bar left-bar" 
              style={{ width: `${(coverageData.left / coverageData.total) * 100}%` }}
            >
              <span className="bias-label">Left</span>
              <span className="bias-percentage">{Math.round((coverageData.left / coverageData.total) * 100)}%</span>
            </div>
            <div 
              className="bias-bar center-bar" 
              style={{ width: `${(coverageData.center / coverageData.total) * 100}%` }}
            >
              <span className="bias-label">Center</span>
              <span className="bias-percentage">{Math.round((coverageData.center / coverageData.total) * 100)}%</span>
            </div>
            <div 
              className="bias-bar right-bar" 
              style={{ width: `${(coverageData.right / coverageData.total) * 100}%` }}
            >
              <span className="bias-label">Right</span>
              <span className="bias-percentage">{Math.round((coverageData.right / coverageData.total) * 100)}%</span>
            </div>
          </div>
        </div>
      </div>

      <div className="perspective-tabs">
        <button 
          className={`tab-button ${activeTab === 'all' ? 'active' : ''}`} 
          onClick={() => setActiveTab('all')}
        >
          All Perspectives
        </button>
        <button 
          className={`tab-button ${activeTab === 'left' ? 'active' : ''}`} 
          onClick={() => setActiveTab('left')}
        >
          <div className="tab-indicator left-indicator"></div>
          Left-Leaning
        </button>
        <button 
          className={`tab-button ${activeTab === 'center' ? 'active' : ''}`} 
          onClick={() => setActiveTab('center')}
        >
          <div className="tab-indicator center-indicator"></div>
          Center
        </button>
        <button 
          className={`tab-button ${activeTab === 'right' ? 'active' : ''}`} 
          onClick={() => setActiveTab('right')}
        >
          <div className="tab-indicator right-indicator"></div>
          Right-Leaning
        </button>
      </div>

      {activeTab === 'all' ? (
        <div className="all-perspectives">
          <div className="perspective-grid">
            <div className="perspective-card left-perspective">
              <div className="perspective-header">
                <div className="perspective-indicator left-indicator"></div>
                <h3>Left-Leaning Perspective</h3>
                <span className="source-count">{perspectives.left.sources} sources</span>
              </div>
              <h4>{perspectives.left.title}</h4>
              <p>{perspectives.left.content}</p>
              <div className="key-points">
                <h5>Key Focus Points:</h5>
                <ul>
                  {perspectives.left.keyPoints.map((point, index) => (
                    <li key={index}>{point}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="perspective-card center-perspective">
              <div className="perspective-header">
                <div className="perspective-indicator center-indicator"></div>
                <h3>Center Perspective</h3>
                <span className="source-count">{perspectives.center.sources} sources</span>
              </div>
              <h4>{perspectives.center.title}</h4>
              <p>{perspectives.center.content}</p>
              <div className="key-points">
                <h5>Key Focus Points:</h5>
                <ul>
                  {perspectives.center.keyPoints.map((point, index) => (
                    <li key={index}>{point}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="perspective-card right-perspective">
              <div className="perspective-header">
                <div className="perspective-indicator right-indicator"></div>
                <h3>Right-Leaning Perspective</h3>
                <span className="source-count">{perspectives.right.sources} sources</span>
              </div>
              <h4>{perspectives.right.title}</h4>
              <p>{perspectives.right.content}</p>
              <div className="key-points">
                <h5>Key Focus Points:</h5>
                <ul>
                  {perspectives.right.keyPoints.map((point, index) => (
                    <li key={index}>{point}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="narrative-comparison">
            <h3>Key Narrative Differences</h3>
            <div className="comparison-table-container">
              <table className="comparison-table">
                <thead>
                  <tr>
                    <th>Topic</th>
                    <th>
                      <div className="th-content">
                        <div className="perspective-indicator left-indicator"></div>
                        Left-Leaning
                      </div>
                    </th>
                    <th>
                      <div className="th-content">
                        <div className="perspective-indicator center-indicator"></div>
                        Center
                      </div>
                    </th>
                    <th>
                      <div className="th-content">
                        <div className="perspective-indicator right-indicator"></div>
                        Right-Leaning
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Primary Focus</td>
                    <td>Social impact and affected communities</td>
                    <td>Balanced reporting of verified facts</td>
                    <td>Economic implications and traditional values</td>
                  </tr>
                  <tr>
                    <td>Framing</td>
                    <td>Systemic and historical context</td>
                    <td>Multiple perspectives presented equally</td>
                    <td>Individual responsibility and security</td>
                  </tr>
                  <tr>
                    <td>Solutions Emphasized</td>
                    <td>Collective action and policy change</td>
                    <td>Evidence-based approaches from various viewpoints</td>
                    <td>Market-based solutions and traditional institutions</td>
                  </tr>
                  <tr>
                    <td>Key Concerns</td>
                    <td>Equality and social justice</td>
                    <td>Accuracy and comprehensive context</td>
                    <td>Freedom, security, and economic impact</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <div className="single-perspective">
          <div className={`perspective-detail ${activeTab}-perspective-detail`}>
            <div className="perspective-header">
              <div className={`perspective-indicator ${activeTab}-indicator`}></div>
              <h3>{activeTab === 'left' ? 'Left-Leaning' : activeTab === 'right' ? 'Right-Leaning' : 'Center'} Perspective</h3>
              <span className="source-count">{perspectives[activeTab].sources} sources</span>
            </div>
            <h4>{perspectives[activeTab].title}</h4>
            <div className="perspective-content">
              <p>{perspectives[activeTab].content}</p>
              <div className="key-points">
                <h5>Key Focus Points:</h5>
                <ul>
                  {perspectives[activeTab].keyPoints.map((point, index) => (
                    <li key={index}>{point}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="representative-sources">
              <h4>Representative Sources</h4>
              <div className="sources-list">
                {activeTab === 'left' ? (
                  <>
                    <span className="source-badge">Washington Post</span>
                    <span className="source-badge">MSNBC</span>
                    <span className="source-badge">CNN</span>
                    <span className="source-badge">New York Times</span>
                    <span className="source-badge">Vox</span>
                  </>
                ) : activeTab === 'right' ? (
                  <>
                    <span className="source-badge">Fox News</span>
                    <span className="source-badge">New York Post</span>
                    <span className="source-badge">The Daily Wire</span>
                    <span className="source-badge">Washington Times</span>
                    <span className="source-badge">National Review</span>
                  </>
                ) : (
                  <>
                    <span className="source-badge">Reuters</span>
                    <span className="source-badge">Associated Press</span>
                    <span className="source-badge">PBS</span>
                    <span className="source-badge">BBC</span>
                    <span className="source-badge">Bloomberg</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StoryDetails;