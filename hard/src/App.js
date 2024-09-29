import React, { useState, useEffect } from 'react';

const CatImages = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchImages = async (page) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`https://api.thecatapi.com/v1/images/search?limit=5&page=${page}&order=Desc`);
      const data = await response.json();
      if (data.length === 0) {
        setHasMore(false);
      } else {
        setImages((prev) => [...prev, ...data]);
      }
    } catch (err) {
      setError('Error fetching data');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchImages(page);
  }, [page]);

  const loadMoreImages = () => {
    setPage((prev) => prev + 1);
  };

  return (
    <div>
      {error && <p>{error}</p>}

      <div className="column-layout">
        {images.map((image, index) => (
          <div key={index} className="card">
            <img src={image.url} alt={`cat-${index}`} />
          </div>
        ))}
      </div>

      {loading && <p>Loading...</p>}

      {!loading && hasMore && (
        <button onClick={loadMoreImages} className="load-more-btn">
          Load More
        </button>
      )}

      {!hasMore && <p>No more images to load</p>}
    </div>
  );
};

export default CatImages;
