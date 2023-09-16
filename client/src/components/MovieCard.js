import React from 'react';
import { Link } from 'react-router-dom';

const MovieCard = ({ movie }) => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <img
        src={movie.image || '/placeholder-image.png'}
        alt={movie.name}
        className="w-full h-48 object-cover rounded-t-lg"
      />
      <div className="p-6">
        <h2 className="text-2xl font-semibold mb-2">{movie.name}</h2> {/* Use "name" */}
        <div className="text-gray-700 mb-4">
          <p className="mb-2">Genre: {movie.genre}</p> {/* Display genre */}
          <p className="mb-2">Director: {movie.director}</p> {/* Display director */}
          <p className="mb-2">Actors:</p>
          <div className="flex flex-wrap gap-2">
            {movie.actors.map((actor, index) => (
              <div
                key={index}
                className="bg-blue-200 text-blue-800 py-1 px-3 rounded-full text-sm"
              >
                {actor}
              </div>
            ))}
          </div>
          <p className="mb-2">IMDb Rating: {movie.imbdrating}</p> {/* Display IMDb rating */}
        </div>
        <div className="mt-4">
          <Link to={`/movie/${movie._id}`}>
            <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-full font-semibold focus:outline-none">
              View Movie
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
