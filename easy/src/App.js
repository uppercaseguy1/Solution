import React, { useState } from 'react';

const CatImages = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [images, setImages] = useState([]);

  const fetchImages = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('https://api.thecatapi.com/v1/images/search?limit=5&page=10&order=Desc');
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

  return (
    <div>
      <button onClick={fetchImages}>Fetch Cat Images</button>

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
    </div>
  );
};

export default CatImages;
