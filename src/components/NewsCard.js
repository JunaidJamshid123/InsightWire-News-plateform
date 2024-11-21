import React from 'react';
import './NewsCard.css';

const NewsCard = ({ image, title, description }) => {
    return (
        <div className="news-card">
            <div className="news-image-wrapper">
                <img src={image} alt={title} className="news-image" />
            </div>
            <div className="news-content">
                <h3 className="news-title">{title}</h3>
                <p className="news-description">{description}</p>
                <button className="read-more-btn">Read More</button>
            </div>
        </div>
    );
};

export default NewsCard;
