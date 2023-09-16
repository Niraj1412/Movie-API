import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './screens/HomePage';
import CreateMoviePage from './screens/CreateMoviePage';
import { Toaster } from 'react-hot-toast';
import MovieDetail from './screens/MovieDetail';
import EditMoviePage from './screens/EditMoviePage';
import CreateGenrePage from './screens/CreateGenre';

function App() {
  return (
    <BrowserRouter>
        <Header />
        <Toaster />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movie/:id" element={<MovieDetail />} />
          <Route path="/edit-movie/:id" element={<EditMoviePage />} />
          <Route path="/create-movie" element={<CreateMoviePage />} />
          <Route path="/create-genre" element={<CreateGenrePage />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
