import { useState, useEffect } from "react";
import News from "./News/News";
import "./NewsSection.css";

function NewsSection() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:5000/api/articles/scraped');
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data = await response.json();
        // Limit to 25 news articles
        const limitedData = data.slice(0, 25);
        setNews(limitedData);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
        console.error("Error fetching news:", err);
      }
    };

    fetchNews();
  }, []);

  return (
    <section className="news-section">
      <div className="container mx-auto px-4">
        {/* Section Heading */}
        <h2 className="section-heading">NEWS AT A GLANCE</h2>
        
        {/* Loading State */}
        {loading && <p className="text-center">Loading news...</p>}
        
        {/* Error State */}
        {error && <p className="text-center text-red-500">Error: {error}</p>}
        
        {/* News Grid */}
        {!loading && !error && (
          <div className="news-grid">
            {news.map((newsItem) => (
              <News key={newsItem._id} newsItem={newsItem} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default NewsSection;