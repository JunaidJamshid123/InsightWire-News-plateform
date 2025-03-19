"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import "./BiasDetails.css"

const BiasDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [article, setArticle] = useState(null)
  const [loading, setLoading] = useState(true)
  const [imageUrl, setImageUrl] = useState(null)
  // Add state for speech functionality
  const [isSpeaking, setIsSpeaking] = useState(false)

  useEffect(() => {
    const fetchArticleData = async () => {
      try {
        // Fetch articles from API
        const response = await fetch("http://localhost:5000/api/articles/scraped")
        if (response.ok) {
          const articlesData = await response.json()
          // Find the article with the matching ID
          const foundArticle = articlesData.find((item) => item._id === id)

          if (foundArticle) {
            setArticle(foundArticle)

            // Fetch the image for the article
            if (foundArticle.url) {
              try {
                const controller = new AbortController()
                const timeoutId = setTimeout(() => controller.abort(), 5000)

                const imageResponse = await fetch(
                  `http://localhost:5000/api/extract-image?url=${encodeURIComponent(foundArticle.url)}`,
                  { signal: controller.signal },
                )

                clearTimeout(timeoutId)

                if (imageResponse.ok) {
                  const imageData = await imageResponse.json()
                  setImageUrl(
                    imageData.imageUrl ||
                      `https://source.unsplash.com/random/1200x600/?news,${foundArticle.publication?.replace(/\s+/g, "")}${id}`,
                  )
                } else {
                  setImageUrl(`https://source.unsplash.com/random/1200x600/?news,${id}`)
                }
              } catch (err) {
                console.error("Error extracting image for article:", err)
                setImageUrl(`https://source.unsplash.com/random/1200x600/?news,${id}`)
              }
            } else {
              setImageUrl(`https://source.unsplash.com/random/1200x600/?news,${id}`)
            }
          }
        }
        setLoading(false)
      } catch (error) {
        console.error("Error fetching article data:", error)
        setLoading(false)
      }
    }

    fetchArticleData()
  }, [id])

  const getBiasClass = () => {
    if (!article) return ""

    if (article.biasType === "L") return "bias-left"
    if (article.biasType === "R") return "bias-right"
    return "bias-center"
  }

  const getBiasText = () => {
    if (!article) return ""

    if (article.biasType === "L") return "Left-leaning"
    if (article.biasType === "R") return "Right-leaning"
    return "Balanced / Center"
  }

  const getBiasColor = () => {
    if (!article) return "#4caf50"

    if (article.biasType === "L") return "#3b5bdb"
    if (article.biasType === "R") return "#e53935"
    return "#4caf50"
  }

  const getBiasPosition = () => {
    if (!article) return 50

    if (article.biasType === "L") return article.biasStrength ? 15 + (35 - article.biasStrength) : 25
    if (article.biasType === "R") return article.biasStrength ? 85 - (35 - article.biasStrength) : 75
    return 50
  }

  const handleGoBack = () => {
    navigate(-1)
  }

  // Add text-to-speech functionality
  const speakArticle = (text) => {
    if ("speechSynthesis" in window) {
      // If already speaking, stop it
      if (isSpeaking) {
        window.speechSynthesis.cancel()
        setIsSpeaking(false)
        return
      }

      const speech = new SpeechSynthesisUtterance(text)
      speech.lang = "en-US" // Set language
      speech.rate = 1 // Speed of speech
      speech.pitch = 1 // Pitch of voice

      // Add event listener for when speech ends
      speech.onend = () => {
        setIsSpeaking(false)
      }

      // Add event listener for when speech is stopped
      speech.onpause = speech.onend
      speech.oncancel = speech.onend
      speech.onerror = speech.onend

      setIsSpeaking(true)
      speechSynthesis.speak(speech)
    } else {
      alert("Text-to-Speech not supported in this browser.")
    }
  }

  // Get article content for text-to-speech
  const getArticleContent = () => {
    if (!article) return ""

    // Use fullContent if available, otherwise use content
    const content = article.fullContent || article.content || ""

    // If content is an array, join all paragraphs
    if (Array.isArray(content)) {
      return content.filter((item) => item && item.trim().length > 0).join(" ")
    }

    // If content is a string
    if (typeof content === "string") {
      // Remove any HTML tags that might be present
      return content.replace(/<\/?[^>]+(>|$)/g, " ")
    }

    return ""
  }

  if (loading) {
    return (
      <div className="bias-loading-container">
        <div className="bias-loading-spinner"></div>
        <p>Loading article analysis...</p>
      </div>
    )
  }

  if (!article) {
    return (
      <div className="bias-error-container">
        <div className="bias-error-icon">!</div>
        <h2>Article Not Found</h2>
        <p>We couldn't find the article you're looking for. It may have been removed or the URL might be incorrect.</p>
        <button onClick={handleGoBack} className="bias-back-button">
          Return to News Feed
        </button>
      </div>
    )
  }

  const biasPosition = getBiasPosition()

  return (
    <div className="bias-container">
      <header className="bias-header">
        <button onClick={handleGoBack} className="bias-back-button">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Back
        </button>
        <div className="bias-category-tag">{article.category}</div>
      </header>

      <div className="bias-content">
        <h1 className="bias-title">{article.title}</h1>

        {/* Add text-to-speech button */}
        <button
          onClick={() => speakArticle(getArticleContent())}
          className="bias-read-aloud-button"
          aria-label={isSpeaking ? "Stop reading" : "Read article aloud"}
        >
          {isSpeaking ? "🔊 Stop Reading" : "🔊 Read Aloud"}
        </button>

        <div className="bias-meta">
          <span className="bias-date">Published on {article.publicationDate}</span>
          <span className="bias-sources-count">{article.sources || "5"} sources analyzed</span>
        </div>

        <div className="bias-image-wrapper">
          <img src={imageUrl || article.imageUrl} alt={article.title} className="bias-hero-image" />
          <div className={`bias-badge ${getBiasClass()}`}>{getBiasText()}</div>
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
                  backgroundColor: getBiasColor(),
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
              <h3>Confidence Score</h3>
              <div className="bias-stat-value">{article.confidenceScore || "85%"}</div>
              <p>Analysis accuracy</p>
            </div>
            <div className="bias-stat-item">
              <h3>Bias Strength</h3>
              <div className="bias-stat-value">{article.biasStrength || "Medium"}</div>
              <p>Intensity of bias</p>
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
                    {detail.example && (
                      <div className="indicator-example">
                        <span className="example-label">Example:</span>
                        <q className="example-text">{detail.example}</q>
                      </div>
                    )}
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
                <div className="source-segment left-segment" style={{ width: `${article.leftSources || 30}%` }}>
                  <span>{article.leftSources || 30}%</span>
                </div>
                <div className="source-segment center-segment" style={{ width: `${article.centerSources || 37}%` }}>
                  <span>{article.centerSources || 37}%</span>
                </div>
                <div className="source-segment right-segment" style={{ width: `${article.rightSources || 33}%` }}>
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
              Our AI-powered bias detection system analyzes multiple factors including language patterns, framing
              techniques, source selection, and content omissions. We examine coverage from
              {article.sources || " 5"} different sources to provide a comprehensive political bias assessment.
            </p>
          </div>
        </section>
      </div>
    </div>
  )
}

export default BiasDetails

