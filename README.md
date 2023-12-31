# Top IMDb Movies RESTful API

This RESTful API is designed to provide access to the top IMDb movies, allowing users to perform CRUD (Create, Read, Update, Delete) operations. The API is built using Node.js and Express.js, with MongoDB as the database for storing movie information. Additionally, Swagger is used for clear and comprehensive API documentation.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [API Endpoints](#api-endpoints)
- [Client (Frontend)](#client-frontend)
- [Contributing](#contributing)
- [License](#license)

## Overview

The Top IMDb Movies RESTful API focuses on providing access to a collection of top-rated movies based on IMDb ratings. Users can perform various operations such as creating new movie entries, retrieving movie details, updating movie information, and deleting movies from the database. This API is intended to serve as the backend for a movie-related application, with a separate React-based client (frontend) for a complete user experience.

## Features

- **CRUD Operations:** Perform Create, Read, Update, and Delete operations on movie entries.
- **Access Top IMDb Movies:** Retrieve a list of top-rated IMDb movies.
- **Comprehensive Documentation:** Utilizes Swagger for clear and interactive API documentation.
- **Scalable and Efficient:** Built with Node.js and Express.js for scalability and performance.
- **Database Integration:** Utilizes MongoDB for storing and managing movie data.
- **Separate Client:** Includes a separate React-based client for frontend interaction.

## Technologies Used

- **Node.js:** For server-side JavaScript runtime.
- **Express.js:** A popular web application framework for Node.js.
- **MongoDB:** A NoSQL database for storing movie information.
- **Swagger:** For API documentation and exploration.
- **React:** For building the frontend client.
- **Other NPM Packages:** Various NPM packages are used for routing, validation, and more.

## Getting Started

To run the Top IMDb Movies RESTful API and the associated client, follow these steps:

1. Clone this repository to your local machine:

   ```bash
   git clone https://github.com/Niraj1412/Movie-API
   ```

2. Navigate to the project directory:

   ```bash
   cd Movie-API
   ```

3. Install the API dependencies:

   ```bash
   npm install
   ```

4. Install the client dependencies:

   ```bash
   cd client
   npm install
   ```

5. Start the API server:

   ```bash
   npm start
   ```

6. Start the client (in a separate terminal):

   ```bash
   cd client
   npm start
   ```

The API will be available at `http://localhost:3000`, and the client will be accessible at `http://localhost:3001`. You can access the API documentation at `http://localhost:3000/api-docs`.

## API Endpoints

For detailed API documentation and available endpoints, refer to the [Swagger API Documentation](http://localhost:3000/api-docs) after starting the API server.

## Client (Frontend)

The client (frontend) for this API is built using React. It allows users to interact with the API, view and manage movie information. The client is available in the `client` directory of this repository.

## Contributing

Contributions to this project are welcome. If you have ideas for improvements or new features, please feel free to open an issue or submit a pull request. Please follow our [contributing guidelines](CONTRIBUTING.md) for more information.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

Thank you for using the Top IMDb Movies RESTful API. Enjoy exploring and working with top-rated IMDb movies!
