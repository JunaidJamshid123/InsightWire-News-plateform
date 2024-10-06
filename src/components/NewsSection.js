import React from 'react';
import NewsCard from './NewsCard';
import TopStories from './TopStories';
import demo1 from './Images/demo1.jpeg';
import demo2 from './Images/demo2.jpeg';
import demo3 from './Images/local1.jpg';
import demo4 from './Images/local2.png';

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
        {
            image: demo3,
            title: 'PTI protests hit public life in Pindi, Islamabad...',
            time: '15 hours ago'
        },
        {
            image: demo4,
            title: 'Murree Road sit-in: Jamaat-e-Islami refuses to back down on...',
            time: '10 hours ago'
        },
         {
            image: demo4,
            title: 'Murree Road sit-in: Jamaat-e-Islami refuses to back down on...',
            time: '10 hours ago'
        },
         {
            image: demo3,
            title: 'PTI protests hit public life in Pindi, Islamabad...',
            time: '15 hours ago'
        },
         {
            image: demo4,
            title: 'Murree Road sit-in: Jamaat-e-Islami refuses to back down on...',
            time: '10 hours ago'
        },
         {
            image: demo3,
            title: 'PTI protests hit public life in Pindi, Islamabad...',
            time: '15 hours ago'
        },
    ]
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
            <div className="news-section-container">
            {/* Right section for top stories */}
            <div className="top-stories">
                <h2>Local News</h2>
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
        </div>
    );
};

export default NewsSection;
