import React from 'react';
import './headline.css'; // Import the CSS file

const Headline = ({ imageSrc, headlineText, link }) => {
    return (
        <div className="headline-component">
            <a href={link} className="headline-link">
                <img src={imageSrc} alt="Headline" className="headline-image" />
                <u><div className="headline-text">
                    {headlineText}
                </div></u>
            </a>
        </div>
    );
};

export default Headline;
