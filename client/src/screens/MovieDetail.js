import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const MovieDetail = () => {
  const [movie, setMovie] = useState({});
  const [loading, setLoading] = useState(true);

  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/movies/${id}`)
      .then((response) => {
        setMovie(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching movie:', error);
        setLoading(false);
      });
  }, [id]);

  const handleDeleteMovie = () => {
    if (window.confirm('Are you sure you want to delete this movie?')) {
      axios
        .delete(`http://localhost:3000/api/movies/${id}`)
        .then(() => {
          toast.success('Movie deleted successfully', {
            duration: 3000,
          });
          window.location.href = '/'; // Redirect to the movie list after deletion
        })
        .catch((error) => {
          console.error('Error deleting movie:', error);
        });
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-md p-6 rounded-lg">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="mb-4">
            <img
              src={movie.image || '/placeholder-image.png'}
              alt={movie.name}
              className="w-full h-72 object-cover rounded-lg mb-4"
            />
          </div>
          <h1 className="text-3xl font-bold mb-4">{movie.name}</h1>
          <h1 className="text-xl font-bold mb-4">Directed By: {movie.director}</h1>
          {movie.genre && movie.genre.length > 0 && (
            <div className="text-md font-bold mb-4">
              Genres:{' '}
              {movie.genre.map((genre, index) => (
                <span
                  key={index}
                  className="bg-blue-200 text-blue-800 py-1 px-3 rounded-full text-sm mr-2"
                >
                  {genre}
                </span>
              ))}
            </div>
          )}
          <h1 className="text-md font-bold mb-4">IMDB Rating: {movie.imbdrating}</h1>

          <div className="text-gray-700 mb-4">
            <h2 className="text-xl font-semibold mb-2">Cast:</h2>
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
          </div>
          <div className="text-center">
            <Link
              to="/"
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-full font-semibold focus:outline-none inline-block"
            >
              Back to Movie List
            </Link>
            <button
              className="bg-red-500 hover:bg-red-600 text-white py-2 px-6 rounded-full font-semibold ml-4 focus:outline-none inline-block"
              onClick={handleDeleteMovie}
            >
              Delete Movie
            </button>
            <Link
              to={`/edit-movie/${id}`}
              className="bg-green-500 hover:bg-green-600 text-white py-2 px-6 rounded-full font-semibold ml-4 inline-block focus:outline-none"
            >
              Edit Movie
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default MovieDetail;
