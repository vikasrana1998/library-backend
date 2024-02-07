# library-backend
<h2>Library Backend API Setup Guide</h2>
<h4>Introduction</h4>
<p>This guide provides instructions for setting up and running the Library Backend API project. The project is built using Node.js, Express.js, and MongoDB.<p>

<h4>Prerequisites</h4>
Before you begin, ensure you have the following installed on your system:

Node.js
MongoDB

<h4>Installation</h4>

Clone the repository:
git clone https://github.com/vikasrana1998/library-backend.git

Navigate to the project directory:
cd library-backend-api

Install dependencies:
npm install

You can use the provided .env file.

Running the Server
Start MongoDB on the default port (27017).

Run the project:
node server.js

The server will start running on port 8000 by default.

Testing the API
You can use tools like Postman to test the API endpoints. Here's how to test:

Open Postman.

Make requests to the API endpoints using the base URL: https://localhost:8000/api/<routeName>

Send requests using appropriate HTTP methods (GET, POST) and provide necessary request data.

Available Endpoints

POST /api/books: Add a new book to the library.
Sample Body:
{
  "title": "Harry Potter 2",
  "author": "J K Rowling",
  "ISBN": "57807432735215",
  "quantityAvailable": 10
}

GET /api/books: Retrieve a list of all available books.

GET /api/books/:id: Retrieve a specific book by its ID.


POST /api/users: Register a new user.
Sample Body:
{
    "username": "Vikash Rana",
    "email": "vikas@test.com",
    "password": "123456"
}

POST /api/users/login: Login with username/email and password.
Sample Body:
{
    "email":"vikas@test.com",
    "password":"123456"
}

POST /api/borrow/:bookId/:userId: Borrow a book.

POST /api/return/:bookId/:userId: Return a book.

GET /api/users/:userId/books: Retrieve books borrowed by a specific user.

Environment Variables
PORT: The port on which the server will run (default: 8000).
JWT_SECRET: Secret key for JWT token generation.

Troubleshooting
If you encounter any issues during setup or while running the server, Please ping me on my contact number.