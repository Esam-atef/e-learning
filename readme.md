# Courses API

## Description
This is a RESTful API for managing courses and user authentication. The API is built using Node.js, Express, and MongoDB. It supports user authentication using JWT and role-based access control.

## Features
- User authentication (Register, Login)
- Role-based access control (Admin, Manager, User)
- CRUD operations for courses
- Middleware for error handling and authentication
- File upload functionality using Multer

## Technologies Used
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- bcrypt for password hashing
- multer for file uploads
- dotenv for environment variable management

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/your-repo/courses-api.git
   ```

2. Navigate to the project directory:
   ```sh
   cd courses-api
   ```

3. Install dependencies:
   ```sh
   npm install
   ```

4. Create a `.env` file in the root directory and add the following variables:
   ```env
   PORT=5070
   MONGO_URL=your_mongodb_connection_string
   JWT_SECRET_KEY=your_secret_key
   ```

5. Start the server:
   ```sh
   npm start
   ```

## API Endpoints

### Authentication Routes
#### Register a new user
```http
POST /api/user/register
```
- **Body Parameters:** `{ firstname, lastname, email, password, role, avatar }`

#### Login
```http
POST /api/user/login
```
- **Body Parameters:** `{ email, password }`

### Course Routes
#### Get all courses
```http
GET /api/course
```
- **Headers:** `{ Authorization: Bearer <token> }`

#### Get a course by ID
```http
GET /api/course/:id
```
- **Headers:** `{ Authorization: Bearer <token> }`

#### Add a new course (Admin/Manager only)
```http
POST /api/course
```
- **Headers:** `{ Authorization: Bearer <token> }`
- **Body Parameters:** `{ title, price }`

#### Update a course (Admin/Manager only)
```http
PATCH /api/course/:id
```
- **Headers:** `{ Authorization: Bearer <token> }`
- **Body Parameters:** `{ title, price }`

#### Delete a course (Admin/Manager only)
```http
DELETE /api/course/:id
```
- **Headers:** `{ Authorization: Bearer <token> }`

## Middleware
- **verifyToken**: Ensures the request has a valid JWT token.
- **allowedTo**: Restricts access based on user roles.
- **asyncWrapper**: Handles async functions to avoid try-catch blocks.

## Error Handling
All errors are handled globally using a middleware that returns standardized error responses.

## License
This project is open-source and available for modification and use.

