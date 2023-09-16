import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const CreateGenrePage = () => {
  const initialFormData = {
    name: '',
  };

  const [formData, setFormData] = useState(initialFormData);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null); // Track the selected genre for update/delete
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
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleGenreSelect = (genre) => {
    setSelectedGenre(genre); // Set the selected genre for update/delete
    setFormData({ ...formData, name: genre.name });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (submitting) {
      return;
    }
    setSubmitting(true);

    try {
      if (selectedGenre) {
        // If a genre is selected, update it
        const response = await axios.put(
          `http://localhost:3000/api/genres/${selectedGenre._id}`,
          formData
        );

        if (response.status === 200) {
          toast.success('Genre updated successfully', {
            duration: 3000,
          });
          setSelectedGenre(null); // Clear the selected genre
          setFormData(initialFormData);
        } else {
          throw new Error('Failed to update genre.');
        }
      } else {
        // Otherwise, create a new genre
        const response = await axios.post('http://localhost:3000/api/genres', formData);

        if (response.status === 201) {
          toast.success('Genre created successfully', {
            duration: 3000,
          });
          setFormData(initialFormData);
        } else {
          throw new Error('Failed to create genre.');
        }
      }
    } catch (error) {
      toast.error('Error updating/creating genre');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (selectedGenre) {
      try {
        // Send a DELETE request to remove the selected genre
        const response = await axios.delete(
          `http://localhost:3000/api/genres/${selectedGenre._id}`
        );

        if (response.status === 200) {
          toast.success('Genre deleted successfully', {
            duration: 3000,
          });
          setSelectedGenre(null); // Clear the selected genre
          setFormData(initialFormData);
        } else {
          throw new Error('Failed to delete genre.');
        }
      } catch (error) {
        toast.error('Error deleting genre');
      }
    }
  };

  return (
    <div className="bg-gray-100 py-10">
      <div className="container mx-auto max-w-lg">
        <h1 className="text-3xl font-semibold mb-4">Manage Genres</h1>
        <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded-lg">
          {/* Genre Name */}
          <div className="mb-4">
            <label className="block text-gray-800 font-semibold mb-2" htmlFor="name">
              Genre Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="Enter the genre name"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-full font-semibold focus:outline-none"
            >
              {selectedGenre ? 'Update Genre' : 'Create Genre'}
            </button>
            {selectedGenre && (
              <button
                type="button"
                onClick={handleDelete}
                className="ml-2 bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-full font-semibold focus:outline-none"
              >
                Delete Genre
              </button>
            )}
          </div>
        </form>

        {/* List of Genres */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Genres</h2>
          <ul>
            {genres.map((genre) => (
              <li
                key={genre._id}
                onClick={() => handleGenreSelect(genre)}
                className={`cursor-pointer p-2 ${
                  selectedGenre?._id === genre._id
                    ? 'bg-blue-100 font-semibold'
                    : 'hover:bg-gray-100'
                }`}
              >
                {genre.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CreateGenrePage;
