import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import NewsCard from './NewsCard';
import TopStories from './TopStories';
import demo1 from './Images/defaultImage.png'; // Default image if no image is found
import demo2 from './Images/demo2.jpeg'; // Default image if no image is found
import demo3 from './Images/local1.jpg'; // Default image if no image is found
import demo4 from './Images/local2.png'; // Default image if no image is found
import './NewsSection.css';

const NewsSection = () => {
  const [newsCards, setNewsCards] = useState([]);

  // Function to fetch and extract image URL from article URL
  const fetchImageFromUrl = async (url) => {
    try {
      const response = await fetch(url);
      const text = await response.text();
      const regex = /<meta property="og:image" content="(.*?)"/;
      const match = text.match(regex);
      return match ? match[1] : demo1; // Return the image URL or fallback image if not found
    } catch (error) {
      console.error('Error fetching image:', error);
      return demo1; // Return a default image in case of error
    }
  };

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/articles');
        const data = await response.json();
        if (data.success) {
          // For each article, extract the image URL from its URL
          const articlesWithImages = await Promise.all(data.data.map(async (article) => {
            const image = article.url ? await fetchImageFromUrl(article.url) : '/InsightWire-News-plateform/public/defaultImage.png';
            return {
              ...article,
              image, // Add image to the article data
            };
          }));
          setNewsCards(articlesWithImages);
        }
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    };

    fetchArticles();
  }, []);

  const topStories = [
    {
      image: demo3,
      title: 'PTI protests hit public life in Pindi, Islamabad...',
      time: '15 hours ago',
    },
    {
      image: demo4,
      title: 'Murree Road sit-in: Jamaat-e-Islami refuses to back down...',
      time: '10 hours ago',
    },
    {
      image: demo4,
      title: 'Local News Updates: Weather and Events...',
      time: '8 hours ago',
    },
    {
      image: demo3,
      title: 'Breaking: International Conference Highlights...',
      time: '5 hours ago',
    },
  ];

  return (
    <div className="news-section-container">
      <div className="balanced-news">
        <h2>Balanced News from the Left, Center, and Right</h2>
        <div className="news-cards-grid">
          {newsCards.length > 0 ? (
            newsCards.map((news, index) => (
              <Link key={index} to={`/article/${news._id}`} style={{ textDecoration: 'none' }}>
                <NewsCard
                  image={news.image || demo1}  // Use the fetched image or fallback image
                  title={news.title}
                  description={news.content?.[0] || 'No description available'}  // Using the first paragraph as the description
                />
              </Link>
            ))
          ) : (
            <p>Loading articles...</p>
          )}
        </div>
      </div>

      <div className="top-stories">
        <h2>Top Stories</h2>
        <div className="top-stories-list">
          {topStories.map((story, index) => (
            <TopStories
              key={index}
              title={story.title}
              image={story.image}
              time={story.time}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewsSection;
