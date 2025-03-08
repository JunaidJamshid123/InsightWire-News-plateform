// src/components/StoryDetails/StoryDetails.js
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { newsData } from "../News/data"; // Adjust path as needed
import "./StoryDetails.css";

const StoryDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [story, setStory] = useState(null);
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    // In a real app, you would fetch the story by ID from an API
    // For now, we'll simulate this by finding it in the newsData array
    const foundStory = newsData.find(item => item.id === parseInt(id) || item.id === id);
    
    if (foundStory) {
      setStory(foundStory);
    } else {
      // Handle story not found
      console.error("Story not found");
    }
  }, [id]);

  if (!story) {
    return <div className="loading">Loading story details...</div>;
  }

  // Sample data for different perspectives (in a real app, this would come from the API)
  const perspectives = {
    left: {
      title: "Trump Threatens New Sanctions on Russia Amid Escalating Ukraine Crisis",
      content: "President Trump has announced potential wide-ranging banking sanctions against Russia as Ukraine continues to face devastating attacks on civilian infrastructure. Critics argue this represents a significant shift in Trump's previously more conciliatory tone toward Putin, potentially indicating growing pressure from NATO allies and defense officials. Ukrainian President Zelenskyy cautiously welcomed the statement while emphasizing the immediate need for additional military support.",
      sources: 67,
      keyPoints: [
        "Emphasis on Russian aggression against civilian targets",
        "Focus on humanitarian impact of the conflict",
        "Questions about Trump's previous stance on Russia",
        "Concerns about enforcement of potential sanctions"
      ]
    },
    center: {
      title: "Trump Considers Banking Sanctions Against Russia Until Ukraine Ceasefire Reached",
      content: "U.S. President Donald Trump announced he is weighing significant banking sanctions and tariffs on Russia until a ceasefire with Ukraine is achieved. The statement follows intensified Russian attacks on Ukrainian infrastructure. Russian President Putin has rejected making concessions, while Ukrainian President Zelenskyy expressed willingness to work with Trump toward peace despite strained relations.",
      sources: 98,
      keyPoints: [
        "Balanced reporting of Trump's announcement",
        "Equal coverage of all parties' positions",
        "Context about current battlefield situation",
        "Focus on diplomatic implications"
      ]
    },
    right: {
      title: "Trump Takes Strong Stance on Russia, Promises 'Large Scale' Sanctions to End Ukraine War",
      content: "President Trump demonstrated decisive leadership by announcing potential significant banking sanctions against Russia until a peace agreement is reached with Ukraine. This tough stance aims to bring Putin to the negotiating table while supporting Ukraine's sovereignty. President Zelenskyy acknowledged Trump's 'strong leadership' as crucial for achieving lasting peace in the region.",
      sources: 51,
      keyPoints: [
        "Emphasis on Trump's strong leadership",
        "Focus on the peace objective of the sanctions",
        "Highlighting Zelenskyy's positive response",
        "Support for sovereignty and national security"
      ]
    }
  };

  const coverageData = {
    total: 415,
    left: 67,
    right: 51,
    center: 98,
    lastUpdated: "1 hour ago",
    biasDistribution: "45% Center"
  };

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
                    <td>Trump's Stance</td>
                    <td>Shift from previous Russia-friendly position</td>
                    <td>Diplomatic response to current situation</td>
                    <td>Strong, decisive leadership</td>
                  </tr>
                  <tr>
                    <td>Motivation</td>
                    <td>Pressure from allies and officials</td>
                    <td>Response to escalating conflict</td>
                    <td>Commitment to peace and sovereignty</td>
                  </tr>
                  <tr>
                    <td>Ukraine's Position</td>
                    <td>Desperate for more immediate support</td>
                    <td>Working toward diplomatic solution</td>
                    <td>Grateful for strong U.S. leadership</td>
                  </tr>
                  <tr>
                    <td>Russia's Actions</td>
                    <td>Aggressive attacks on civilians</td>
                    <td>Military operations affecting infrastructure</td>
                    <td>Unwillingness to negotiate</td>
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