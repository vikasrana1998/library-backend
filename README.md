# library-backend
<h2>Library Backend API Setup Guide</h2>
<h3>Introduction</h3>
This guide provides instructions for setting up and running the Library Backend API project. The project is built using Node.js, Express.js, and MongoDB.

<h3>Prerequisites</h3>
Before you begin, ensure you have the following installed on your system:

Node.js
MongoDB

<h3>Installation</h3>

Clone the repository:
git clone https://github.com/vikasrana1998/library-backend.git
<br>
Navigate to the project directory:
cd library-backend-api
<br>
Install dependencies:
npm install
<br><br>
You can use the provided .env file.
<br>
Running the Server
Start MongoDB on the default port (27017).
<br>
Run the project:
node server.js
<br>
The server will start running on port 8000 by default.
<br><br>
<h3>Testing the API</h3>
You can use tools like Postman to test the API endpoints. Here's how to test:

Open Postman.

Make requests to the API endpoints using the base URL: https://localhost:8000/api/<routeName>

Send requests using appropriate HTTP methods (GET, POST) and provide necessary request data.

Available Endpoints
<br>
POST /api/books: Add a new book to the library.
Sample Body:
{
  "title": "Harry Potter 2",
  "author": "J K Rowling",
  "ISBN": "57807432735215",
  "quantityAvailable": 10
}
<br>
GET /api/books: Retrieve a list of all available books.
<br>
GET /api/books/:id: Retrieve a specific book by its ID.

<br>
POST /api/users: Register a new user.
Sample Body:
{
    "username": "Vikash Rana",
    "email": "vikas@test.com",
    "password": "123456"
}
<br>
POST /api/users/login: Login with username/email and password.
Sample Body:
{
    "email":"vikas@test.com",
    "password":"123456"
}
<br>
POST /api/borrow/:bookId/:userId: Borrow a book.
<br>
POST /api/return/:bookId/:userId: Return a book.
<br>
GET /api/users/:userId/books: Retrieve books borrowed by a specific user.
<br>
Environment Variables
PORT: The port on which the server will run (default: 8000).
JWT_SECRET: Secret key for JWT token generation.
<br><br>
<h3>Troubleshooting</h3>
If you encounter any issues during setup or while running the server, Please ping me on my contact number.