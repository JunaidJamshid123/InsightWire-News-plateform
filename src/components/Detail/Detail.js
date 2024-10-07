import React from 'react';
import './Detail.css';

const BiasVisualization = ({ biasData }) => {
  return (
    <div className="bias-visualization">
      <p className="bias-label">Political Bias Distribution:</p>
      <div className="bias-bar-container">
        <div className="bias-bar-left" style={{ width: `${biasData.left}%` }}>
          Left {biasData.left}%
        </div>
        <div className="bias-bar-center" style={{ width: `${biasData.center}%` }}>
          Center {biasData.center}%
        </div>
        <div className="bias-bar-right" style={{ width: `${biasData.right}%` }}>
          Right {biasData.right}%
        </div>
      </div>
    </div>
  );
};

const Details = () => {
  const article = {
    source: 'AllSides',
    publicationDate: 'October 1st, 2024',
    title: 'Israel Launches ‘Targeted’ Ground Offensive Into Southern Lebanon',
    detail:
      'The Israel Defense Forces (IDF) reportedly launched a “targeted and limited” ground incursion into southern Lebanon, targeting Hezbollah sites late on Monday. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages.The Israel Defense Forces (IDF) reportedly launched a “targeted and limited” ground incursion into southern Lebanon, targeting Hezbollah sites late on Monday. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages.',
    biasData: { left: 33, center: 33, right: 34 },
    titleImage:process.env.PUBLIC_URL + '/article_detail_image.jpeg', // Example title image
  };

  return (
    <div className="details-container">
      <div className="article-header">
        <span className="article-source">{article.source}</span>
        <span className="article-date"> | {article.publicationDate}</span>
      </div>
     
      {/* Title Image */}
      <img src={article.titleImage} alt="Article Title" className="article-title-image" />
       <h1 className="article-title">{article.title}</h1>
      
      <p className="article-detail">{article.detail}</p>

      {/* Political Bias Visualization */}
      <BiasVisualization biasData={article.biasData} />

      <div className="additional-section">
        <h2>Political Outcomes</h2>
        <p>
          This article provides a detailed overview of the recent military activities and
          political movements in the Middle East, focusing on the current tensions between Israel, Lebanon, and Hezbollah.
        </p>
      </div>
    </div>
  );
};

export default Details;
