import React from 'react';
import NewsCard from './NewsCard';
import TopStories from './TopStories';
import demo1 from './Images/demo1.jpeg';
import demo2 from './Images/demo2.jpeg';


const NewsSection = () => {
    const newsCards = [
        {
            image: demo2, // replace with actual URLs
            title: 'The Significance of Polish American Voters...',
            description: 'Many B movies of the 1940s, 50s, and 60s utilized the "spinning newspaper" effect to narrate important plot points that occurred offscreen. The effect necessitated the appearance of a realistic front page, which consisted of a main headline relevant to the plot, and several smaller headlines used as filler. A large number of these spinning newspapers included stories titled "New Petitions Against Tax" and "Building Code Under Fire'
        },
         {
            image: demo1, // replace with actual URLs
            title: 'Israil Attack on Hazbullah',
            description: 'Many B movies of the 1940s, 50s, and 60s utilized the "spinning newspaper" effect to narrate important plot points that occurred offscreen. The effect necessitated the appearance of a realistic front page, which consisted of a main headline relevant to the plot, and several smaller headlines used as filler. A large number of these spinning newspapers included stories titled "New Petitions Against Tax" and "Building Code Under Fire'
        },
        // Add more news cards here
    ];

    const topStories = [
        'U.S. kills dozens of ISIS fighters...',
        'Another top story headline here...',
        'U.S. kills dozens of ISIS fighters...',
        'U.S. kills dozens of ISIS fighters...',
        'U.S. kills dozens of ISIS fighters...',
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
