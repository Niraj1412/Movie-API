import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-blue-500 p-4 flex flex-row">
      <div className="container mx-auto">
        <Link to="/">
        <h1 className="text-3xl text-white font-semibold">My Movie App</h1>
        </Link>
      </div>
      <Link to={"/create-movie"}>
        <button className='bg-white p-2 rounded-full font-bold text-sm mr-4'>
          Create Movie
        </button>
      </Link>
      <Link to={"/create-genre"}>
        <button className='bg-white p-2 rounded-full font-bold text-sm'>
          Create Genre
        </button>
      </Link>
    </header>
  );
};

export default Header;