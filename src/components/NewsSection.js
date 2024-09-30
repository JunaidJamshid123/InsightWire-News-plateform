import React from 'react';
import NewsCard from './NewsCard';
import TopStories from './TopStories';

const NewsSection = () => {
    const newsCards = [
        {
            image: 'image-url', // replace with actual URLs
            title: 'The Significance of Polish American Voters...',
            description: 'In the recent ABC news...'
        },
        // Add more news cards here
    ];

    const topStories = [
        'U.S. kills dozens of ISIS fighters...',
        'Another top story headline here...',
        // Add more top stories here
    ];

    return (
        <div className="news-section-container">
            {/* Left section for balanced news */}
            <div className="balanced-news">
                <h2>Balanced News from the Left, Center and Right</h2>
                <div className="news-cards">
                    {newsCards.map((news, index) => (
                        <NewsCard
                            key={index}
                            image={news.image}
                            title={news.title}
                            description={news.description}
                        />
                    ))}
                </div>
            </div>

            {/* Right section for top stories */}
            <div className="top-stories">
                <h2>Top Stories</h2>
                <div className="top-stories-list">
                    {topStories.map((story, index) => (
                        <TopStories key={index} title={story} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default NewsSection;
