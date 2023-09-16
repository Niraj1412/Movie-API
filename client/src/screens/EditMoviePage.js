import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useParams } from 'react-router-dom';

const EditMoviePage = () => {
  const initialFormData = {
    name: '',
    genre: '',
    director: '',
    actors: '',
    imbdrating: '',
    imageType: 'url',
    imageUrl: '',
    imageFile: null,
  };

  const [formData, setFormData] = useState(initialFormData);
  const [genres, setGenres] = useState([]); // Add a state for storing genres
  const [submitting, setSubmitting] = useState(false);
  const [movieNotFound, setMovieNotFound] = useState(false); // Track if the movie is not found
  const { id } = useParams();

  useEffect(() => {
    axios
      .get('http://localhost:3000/api/genres')
      .then((response) => {
        setGenres(response.data);
      })
      .catch((error) => {
        console.error('Error fetching genres:', error);
      });
  
    axios
      .get(`http://localhost:3000/api/movies/${id}`)
      .then((response) => {
        const { name, image, genre, director, actors, imbdrating } = response.data;
        const genreId = genre && genre._id ? genre._id : ''; // Check if genre and _id exist, otherwise set to an empty string
        setFormData({
          name: name,
          imageType: image.startsWith('data:image') ? 'file' : 'url',
          imageUrl: image.startsWith('data:image') ? '' : image,
          imageFile: null,
          genre: genreId, // Use genreId here
          director,
          actors: actors.join(', '),
          imbdrating,
        });
      })
      .catch((error) => {
        console.error('Error fetching movie:', error);
        setMovieNotFound(true); // Set movieNotFound to true when the movie is not found
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === 'file') {
      setFormData({
        ...formData,
        [name]: files[0],
        imageType: 'file',
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (submitting) {
      return;
    }
    setSubmitting(true);

    if (formData.imageType === 'file' && formData.imageFile) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64Image = event.target.result;
        sendMovieData(base64Image);
      };
      reader.readAsDataURL(formData.imageFile);
    } else {
      sendMovieData(formData.imageUrl);
    }
  };

  const sendMovieData = (imageData) => {
    const movieData = {
      name: formData.name,
      director: formData.director,
      actors: formData.actors.split(',').map((actor) => actor.trim()),
      imbdrating: formData.imbdrating,
      image: imageData,
      genres: [formData.genre], // Wrap the genre ID in an array
    };

    // Send a PUT request to update the movie
    axios
      .put(`http://localhost:3000/api/movies/${id}`, movieData)
      .then(() => {
        console.log('Movie updated');
        toast.success('Movie updated successfully', {
          duration: 3000,
        });
        setSubmitting(false);
      })
      .catch((error) => {
        console.error('Error updating movie:', error);
        setSubmitting(false);
      });
  };

  if (movieNotFound) {
    // Render an error message if the movie is not found
    return (
      <div className="bg-gray-100 py-10">
        <div className="container mx-auto max-w-lg">
          <h1 className="text-3xl font-semibold mb-4">Movie Not Found</h1>
          <p>The requested movie could not be found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 py-10">
      <div className="container mx-auto max-w-lg">
        <h1 className="text-3xl font-semibold mb-4">Edit Movie</h1>
        <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded-lg">
          {/* Title */}
          <div className="mb-4">
            <label className="block text-gray-800 font-semibold mb-2" htmlFor="name">
              Title:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="Enter the movie name"
              required
            />
          </div>

          {/* Genre Selection */}
          <div className="mb-4">
            <label className="block text-gray-800 font-semibold mb-2" htmlFor="genre">
              Genre:
            </label>
            <select
              id="genre"
              name="genre"
              value={formData.genre}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              required
            >
              <option value="" disabled>
                Select a genre
              </option>
              {genres.map((genre) => (
                <option key={genre._id} value={genre._id}>
                  {genre.name}
                </option>
              ))}
            </select>
          </div>

          {/* Director */}
          <div className="mb-4">
            <label className="block text-gray-800 font-semibold mb-2" htmlFor="director">
              Director:
            </label>
            <input
              type="text"
              id="director"
              name="director"
              value={formData.director}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="Enter the movie director"
              required
            />
          </div>

          {/* Actors */}
          <div className="mb-4">
            <label className="block text-gray-800 font-semibold mb-2" htmlFor="actors">
              Actors (comma-separated):
            </label>
            <input
              type="text"
              id="actors"
              name="actors"
              value={formData.actors}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="e.g., Actor 1, Actor 2, Actor 3"
              required
            />
          </div>

          {/* IMDb Rating */}
          <div className="mb-4">
            <label className="block text-gray-800 font-semibold mb-2" htmlFor="imbdrating">
              IMDb Rating:
            </label>
            <input
              type="text"
              id="imbdrating"
              name="imbdrating"
              value={formData.imbdrating}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="Enter the IMDb rating"
              required
            />
          </div>

          {/* Toggle between image URL and file upload */}
          <div className="mb-4">
            <label className="block text-gray-800 font-semibold mb-2">Image Source:</label>
            <div className="flex space-x-4">
              <label>
                <input
                  type="radio"
                  name="imageType"
                  value="url"
                  checked={formData.imageType === 'url'}
                  onChange={handleChange}
                  className="mr-1"
                />
                URL
              </label>
              <label>
                <input
                  type="radio"
                  name="imageType"
                  value="file"
                  checked={formData.imageType === 'file'}
                  onChange={handleChange}
                  className="mr-1"
                />
                Upload Image
              </label>
            </div>
          </div>

          {/* Conditional rendering based on imageType */}
          {formData.imageType === 'url' && (
            <div className="mb-4">
              <label className="block text-gray-800 font-semibold mb-2" htmlFor="imageUrl">
                Image URL:
              </label>
              <input
                type="text"
                id="imageUrl"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                placeholder="Enter the image URL (optional)"
              />
            </div>
          )}

          {formData.imageType === 'file' && (
            <div className="mb-4">
              <label className="block text-gray-800 font-semibold mb-2" htmlFor="imageFile">
                Upload Image:
              </label>
              <input
                type="file"
                id="imageFile"
                name="imageFile"
                accept="image/*"
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>
          )}

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-full font-semibold focus:outline-none"
            >
              Update Movie
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditMoviePage;
