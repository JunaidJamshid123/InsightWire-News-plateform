"use client"
import { useEffect, useState } from "react"
import "./Top_News.css"

const TopNews = () => {
  const [isVisible, setIsVisible] = useState(false)
  
  useEffect(() => {
    setIsVisible(true)
  }, [])
  
  return (
    <div
      className={`top-news-container ${isVisible ? "visible" : ""}`}
      style={{
        backgroundImage: "url('https://www.thenews.com.pk/assets/uploads/updates/2025-02-13/1282347_3935302_trump_updates.jpg')",
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