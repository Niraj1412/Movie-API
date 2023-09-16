import React, { useState, useEffect } from 'react';
import MovieCard from '../components/MovieCard';
import axios from 'axios';

const HomePage = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:3000/api/movies')
      .then((response) => {
        setMovies(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching movies:', error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="bg-gray-100 py-8">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-4">Movie Collection</h1>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {movies.map((movie) => (
              <MovieCard key={movie._id} movie={movie} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
