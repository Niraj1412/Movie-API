import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const CreateMoviePage = () => {
  const initialFormData = {
    title: '',
    genre: [], // Use an array to store selected genres
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

  useEffect(() => {
    // Fetch the list of genres when the component mounts
    axios
      .get('http://localhost:3000/api/genres')
      .then((response) => {
        setGenres(response.data);
      })
      .catch((error) => {
        console.error('Error fetching genres:', error);
      });
  }, []);

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

  const handleGenreChange = (e) => {
    const selectedGenres = Array.from(e.target.selectedOptions, (option) => option.value);
    setFormData({ ...formData, genre: selectedGenres });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (submitting) {
      return;
    }
    setSubmitting(true);

    try {
      let imageData = formData.imageUrl;

      if (formData.imageType === 'file' && formData.imageFile) {
        const formDataImage = new FormData();
        formDataImage.append('image', formData.imageFile);

        const response = await axios.post('http://localhost:3000/api/upload', formDataImage);

        if (response.status === 200) {
          imageData = response.data.imageUrl;
        } else {
          throw new Error('Failed to upload image.');
        }
      }

      const movieData = {
        name: formData.title,
        director: formData.director,
        actors: formData.actors.split(',').map((actor) => actor.trim()),
        imbdrating: formData.imbdrating,
        image: imageData,
        genres: formData.genre, // Include the selected genres
      };

      // Send a POST request to create a new movie
      const response = await axios.post('http://localhost:3000/api/movies', movieData);

      if (response.status === 201) {
        toast.success('Movie created successfully', {
          duration: 3000,
        });
        setFormData(initialFormData);
      } else {
        throw new Error('Failed to create movie.');
      }
    } catch (error) {
      toast.error('Error creating movie');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-gray-100 py-10">
      <div className="container mx-auto max-w-lg">
        <h1 className="text-3xl font-semibold mb-4">Create Movie</h1>
        <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded-lg">
          {/* Title */}
          <div className="mb-4">
            <label className="block text-gray-800 font-semibold mb-2" htmlFor="title">
              Title:
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="Enter the movie title"
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
              onChange={handleGenreChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              multiple  // Allow multiple selections
              required
            >
              {genres.map((genre) => (
                <option key={genre._id} value={genre._id}>
                  {genre.name}
                </option>
              ))}
            </select>
          </div>

          {/* ... (Other form fields) */}
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
                        <label className="block text-gray-800 font-semibold mb-2">
                            Image Source:
                        </label>
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
              Create Movie
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateMoviePage;
