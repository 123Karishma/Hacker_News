
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NewsCard from './NewsCard';
import ReactPaginate from 'react-paginate';

const Newspaper = () => {
  const [newsArticles, setNewsArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  const handlePage = (even) => {
    setCurrentPage(even.selected);
  };

  useEffect(() => {
    setLoading(true);

    const fetchNewsData = async () => {
      try {
        const response = await axios.get('https://hn.algolia.com/api/v1/search?', {
          params: { page: currentPage },
        });
        const { hits, nbPages } = response.data;
        setNewsArticles(hits);
        setTotalPages(nbPages);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchNewsData();
  }, [currentPage]);

  return (
    <div className="container">
      <h1>Hacker-News</h1>
      <div className="child-container">
        {loading ? (
          <p>Loading...</p>
        ) : (
          newsArticles?.map((article) => (
            <NewsCard newsArticle={article} key={article.objectID} />
          ))
        )}
      </div>
      <ReactPaginate
        nextLabel=">>"
        previousLabel="<<"
        breakLabel="...."
        forcePage={currentPage}
        pageCount={totalPages}
        onPageChange={handlePage}
        className="pagination"
      />
    </div>
  );
};

export default Newspaper;


