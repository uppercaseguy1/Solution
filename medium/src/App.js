import React, { useState } from 'react';

const CatImagesWithPagination = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);

  const fetchImages = async (page) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`https://api.thecatapi.com/v1/images/search?limit=5&page=${page}&order=Desc`);
      const data = await response.json();
      
      if (data.length === 0) {
        setImages([]);
      } else {
        setImages(data);
      }
    } catch (err) {
      setError('Error fetching data');
    }
    setLoading(false);
  };

  const handleFetchInitial = () => {
    fetchImages(page);
  };

  const handleNext = () => {
    setPage((prevPage) => prevPage + 1);
    fetchImages(page + 1);
  };

  const handlePrevious = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
      fetchImages(page - 1);
    }
  };

  return (
    <div>
      <button onClick={handleFetchInitial}>Fetch Cat Images</button>

      {/* Loading State */}
      {loading && <p>Loading...</p>}

      {/* Error State */}
      {error && <p>{error}</p>}

      {/* Empty State */}
      {!loading && images.length === 0 && <p>No images found</p>}

      {/* Grid Layout of Cards */}
      <div className="grid-layout">
        {images.map((image, index) => (
          <div key={index} className="card">
            <img src={image.url} alt={`cat-${index}`} />
          </div>
        ))}
      </div>

      {/* Pagination Buttons */}
      <div className="pagination">
        <button onClick={handlePrevious} disabled={page === 1}>
          Previous
        </button>
        <button onClick={handleNext}>
          Next
        </button>
      </div>
    </div>
  );
};

export default CatImagesWithPagination;
