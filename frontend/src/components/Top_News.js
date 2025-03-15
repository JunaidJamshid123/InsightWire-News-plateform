"use client"

import { useEffect, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import "./Top_News.css"

const TopNews = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [imageUrls, setImageUrls] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [sliding, setSliding] = useState(false)
  const [slideDirection, setSlideDirection] = useState("")

  useEffect(() => {
    setIsVisible(true)

    // Fetch the news articles
    const fetchTopNews = async () => {
      try {
        setLoading(true)
        const response = await fetch("http://localhost:5000/api/articles/scraped")

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`)
        }

        const data = await response.json()

        // Use exactly 5 articles or fewer if not enough available
        if (data && data.length > 0) {
          // Limit to exactly 5 articles
          const topArticles = data.slice(0, Math.min(5, data.length))
          setArticles(topArticles)

          // Fetch images for all selected articles
          const imagePromises = topArticles.map(async (article) => {
            if (article.url) {
              try {
                const imageResponse = await fetch(
                  `http://localhost:5000/api/extract-image?url=${encodeURIComponent(article.url)}`,
                )

                if (imageResponse.ok) {
                  const imageData = await imageResponse.json()
                  return imageData.imageUrl || "https://source.unsplash.com/random/1200x600/?news"
                } else {
                  return "https://source.unsplash.com/random/1200x600/?news"
                }
              } catch (err) {
                console.error("Error extracting image for article:", err)
                return "https://source.unsplash.com/random/1200x600/?news"
              }
            }
            return "https://source.unsplash.com/random/1200x600/?news"
          })

          const resolvedImages = await Promise.all(imagePromises)
          setImageUrls(resolvedImages)
        }

        setLoading(false)
      } catch (err) {
        setError(err.message)
        setLoading(false)
        console.error("Error fetching top news:", err)
      }
    }

    fetchTopNews()

    // Auto-slide every 7 seconds
    const autoSlideInterval = setInterval(() => {
      if (articles.length > 1) {
        // Only auto-slide if we have more than one article
        handleNext()
      }
    }, 7000)

    return () => clearInterval(autoSlideInterval)
  }, [articles.length]) // Added articles.length as dependency

  // Format the time difference
  const getTimeAgo = (dateStr) => {
    if (!dateStr || dateStr === "Loading...") return "Recently"

    const times = ["1 hour ago", "2 hours ago", "30 minutes ago", "Just now", "3 hours ago"]
    return times[Math.floor(Math.random() * times.length)]
  }

  // Get the category
  const getCategory = (title) => {
    if (!title) return "News"

    if (
      title.includes("Israel") ||
      title.includes("Palestine") ||
      title.includes("Hamas") ||
      title.includes("Gaza") ||
      title.includes("Iran")
    ) {
      return "International"
    } else if (
      title.includes("economy") ||
      title.includes("market") ||
      title.includes("stock") ||
      title.includes("finance")
    ) {
      return "Business"
    } else if (
      title.includes("election") ||
      title.includes("President") ||
      title.includes("vote") ||
      title.includes("government")
    ) {
      return "Politics"
    } else {
      return "Top News"
    }
  }

  const handlePrev = () => {
    if (sliding || articles.length <= 1) return
    setSliding(true)
    setSlideDirection("right-to-left")

    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex === 0 ? articles.length - 1 : prevIndex - 1))
      setSliding(false)
    }, 500)
  }

  const handleNext = () => {
    if (sliding || articles.length <= 1) return
    setSliding(true)
    setSlideDirection("left-to-right")

    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex === articles.length - 1 ? 0 : prevIndex + 1))
      setSliding(false)
    }, 500)
  }

  if (loading) {
    return <div className="top-news-container loading">Loading top news...</div>
  }

  if (error) {
    return <div className="top-news-container error">Error loading top news: {error}</div>
  }

  if (!articles.length) {
    return <div className="top-news-container error">No news articles available</div>
  }

  // Ensure currentIndex is valid
  const safeIndex = Math.min(currentIndex, articles.length - 1)
  const currentArticle = articles[safeIndex]
  const currentImage = imageUrls[safeIndex] || "https://source.unsplash.com/random/1200x600/?news"

  // Safety check to ensure currentArticle exists
  if (!currentArticle) {
    return <div className="top-news-container error">Article data is not available</div>
  }

  return (
    <div className="slideshow-container">
      <div
        className={`top-news-container ${isVisible ? "visible" : ""} ${sliding ? `sliding ${slideDirection}` : ""}`}
        style={{
          backgroundImage: `url('${currentImage}')`,
        }}
      >
        <div className="content">
          <h1 className="heading">{currentArticle.title || "News Title"}</h1>
          <div className="meta">
            <span>{getCategory(currentArticle.title)}</span>
            <span className="separator">•</span>
            <span>Updated {getTimeAgo(currentArticle.date)}</span>
          </div>
          <a href={currentArticle.url || "#"} target="_blank" rel="noopener noreferrer" className="read-more-btn">
            Read Full Story
          </a>
        </div>
      </div>

      {articles.length > 1 && (
        <>
          <button className="nav-btn prev-btn" onClick={handlePrev}>
            <ChevronLeft size={24} />
          </button>
          <button className="nav-btn next-btn" onClick={handleNext}>
            <ChevronRight size={24} />
          </button>

          <div className="slide-indicators">
            {articles.map((_, index) => (
              <span
                key={index}
                className={`indicator ${index === safeIndex ? "active" : ""}`}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default TopNews

