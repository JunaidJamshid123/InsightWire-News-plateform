"use client"

import { useEffect, useState } from "react"
import "./TopNews.css"

const TopNews = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div
      className={`top-news-container ${isVisible ? "visible" : ""}`}
      style={{
        backgroundImage:
          "url('/headlineImage.jpg')",
      }}
    >
      <div className="content">
        <h1 className="heading">Iran Poised To Strike Israel Amid Rising Tensions</h1>
        <div className="meta">
          <span>International</span>
          <span className="separator">•</span>
          <span>Updated 2 hours ago</span>
        </div>
        <button className="read-more-btn">Read Full Story</button>
      </div>
    </div>
  )
}

export default TopNews

