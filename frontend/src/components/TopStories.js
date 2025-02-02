import React from 'react';
import './TopStories.css';

const TopStories = ({ title, image, time }) => {
    return (
        <div className="top-story">
            <img src={image} alt={title} className="story-image" />
            <div className="story-details">
                <h4 className="story-title">{title}</h4>
                <p className="story-time">{time}</p>
            </div>
        </div>
    );
};

export default TopStories;
