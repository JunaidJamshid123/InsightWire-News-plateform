import React from "react";
import "./TopNews.css"; // External CSS file for styling

const Top_News = () => {
  return (
    <div
      className="top-news-container"
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
  );
};

export default Top_News;
