import React from 'react';

const NewsCard = ({ image, title, description }) => {
    return (
        <div className="news-card">
            <img src={image} alt={title} className="news-image" />
            <div className="news-content">
                <h3>{title}</h3>
                <p className="news-description">{description}</p> {/* Updated class */}
            </div>
        </div>
    );
};

export default NewsCard;
