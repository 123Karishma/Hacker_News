import React from 'react';

const NewsCard = ({ newsArticle }) => {
  if (!newsArticle.title) return null;
  return (
    <div className='News-section'>
      <h3>{newsArticle.title}</h3>
      <a href={newsArticle.url}>Read more...</a>
    </div>
  );
};

export default NewsCard;

