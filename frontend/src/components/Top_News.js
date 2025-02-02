'use client'

import React, { useEffect, useState } from "react"
import "./TopNews.css"

const TopNews = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div
      className={`top-news-container ${isVisible ? 'visible' : ''}`}
      style={{
        backgroundImage: "url('/headlineImage.jpg')", // Replace with your image path
      }}
    >
      <div className="content">
        <span className="label">Read More</span>
        <h1 className="heading">
          Iran Poised To Strike Israel Amid Rising Tensions
        </h1>
      </div>
    </div>
  )
}

export default TopNews

