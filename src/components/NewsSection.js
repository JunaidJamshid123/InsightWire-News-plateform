import React from 'react';
import NewsCard from './NewsCard';
import TopStories from './TopStories';
import demo1 from './Images/demo1.jpeg';
import demo2 from './Images/demo2.jpeg';
import demo3 from './Images/local1.jpg';
import demo4 from './Images/local2.png';
import './NewsSection.css';

const NewsSection = () => {
    const newsCards = [
        {
            image: demo2,
            title: 'The Significance of Polish American Voters...',
            description:
                'Many B movies of the 1940s, 50s, and 60s utilized the "spinning newspaper" effect...',
        },
        {
            image: demo1,
            title: 'Israel Attack on Hezbollah',
            description:
                'Many B movies of the 1940s, 50s, and 60s utilized the "spinning newspaper" effect...',
        },
        {
            image: demo2,
            title: 'Elections Around the World',
            description:
                'An analysis of voter behavior and trends in global elections...',
        },
        {
            image: demo1,
            title: 'Conflict in the Middle East',
            description:
                'Examining the latest developments in the region and their impact...',
        },
    ];

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
            {/* Left section for balanced news */}
            <div className="balanced-news">
                <h2>Balanced News from the Left, Center, and Right</h2>
                <div className="news-cards-grid">
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
