# NoteMate

## 1. Project Overview

**NoteMate** is a full-stack application built using the **MERN stack** (MongoDB, Express.js, React.js, Node.js) that enables users to securely sign up, log in, and manage their notes. The platform allows users to create, edit, update, and delete notes with ease, offering rich text formatting and categorization options. 

The app features a dynamic, responsive front-end built with React.js, leveraging React Router for smooth navigation and Context API for global state management. The backend is powered by Express.js, with RESTful API routes to handle authentication (using JWT tokens for secure login), CRUD operations for notes, and user session management.

MongoDB serves as the database for persistent storage of user credentials and notes data, utilizing Mongoose for schema validation and efficient query handling. NoteMate also includes functionality to pin important notes to the homepage for quick access, ensuring a streamlined and personalized user experience.

Key Features:
- **User Authentication**: Secure sign-up and login using JWT tokens for authentication.
- **Note Management**: Create, edit, update, and delete notes with rich text formatting and categorization.
- **Pin Notes**: Users can pin important notes to the homepage for easy access.
- **Responsive UI**: Built with React.js and styled with TailwindCSS for a dynamic and mobile-responsive front-end.
- **Global State Management**: Uses React Context API for managing the global state across the app.

The backend is powered by **Express.js**, offering RESTful API routes for user authentication, CRUD operations on notes, and session management. **MongoDB** serves as the database for storing user credentials and note data, with **Mongoose** handling schema validation and efficient querying.

## 2. Tech Stack

- **Frontend**: 
  - React.js
  - Axios (for API requests)
  - React Router (for navigation)
  - TailwindCSS (for styling)

- **Backend**:
  - Express.js (RESTful API server)
  - Node.js
  - Mongoose (MongoDB ODM)

- **Database**:
  - MongoDB Atlas (cloud database)

- **Authentication**:
  - JSON Web Tokens (JWT)

## 3. API Endpoints

### Authentication Routes:
- `POST /api/create-account`: Register a new user
- `POST /api/login`: Login user & return JWT token
- `GET /api/get-user`: Get logged-in user details (Protected)

### Notes Management Routes:
- `POST /api/notes`: Create a new note
- `PUT /api/notes/:noteId`: Edit an existing note
- `GET /api/notes`: Fetch all notes
- `DELETE /api/notes/:noteId`: Delete a note
- `PUT /api/notes/:noteId/pin`: Pin/unpin a note
- `GET /api/notes/search`: Search notes

## 4. Features & Functionalities

- **User Authentication**: JWT-based login/signup for secure access.
- **CRUD Operations**: Create, read, update, and delete notes.
- **Pinning Notes**: Pin important notes to the homepage for easy access.
- **Responsive UI**: The interface is fully responsive and built with React components.
- **Search Functionality**: Quick search to find specific notes.

## 5. Authentication & Security

- **JWT-based Authentication**: Secures login and manages user sessions using JWT tokens.
- **Password Hashing**: Passwords are hashed using **bcrypt.js** before being stored in the database.
- **CORS**: Cross-origin resource sharing enabled for secure communication between frontend and backend.

## 6. Installation & Setup

### Prerequisites

Ensure you have the following installed:
- **Node.js**
- **npm** or **yarn**
- **MongoDB Atlas** account


### Cloning the Repository

1. Visit the GitHub repository at `https://github.com/sainithinkatta/note-mate`
2. Select where you want to clone the repository
3. Clone the repository:
   ```bash
   git clone https://github.com/sainithinkatta/note-mate
   ```

### Backend Setup
1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the backend directory with the following variables:
   ```bash
   # .env file content:
   PORT=8000
   MONGO_URI=your_mongo_db_connection_string
   ACCESS_TOKEN_SECRET=your_secret_key
   ```

4. Start the backend server:
   ```bash
   npm start
   ```

### Frontend Setup
1. Navigate to the frontend/notes-app directory:
   ```bash
   cd frontend/notes-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```


## Future Enhancements

* **Dark/Light Theme Toggle**: Implement a theme toggle allowing users to switch between dark and light modes for better usability in different lighting conditions.

* **Export Notes to PDF/DOC Formats**: Enable users to export their notes to PDF or DOC formats, making it easy to share or store notes offline. 

* **Collaborative Note Editing**: Allow multiple users to edit the same note in real-time, similar to Google Docs, by implementing WebSocket-based communication (e.g., `socket.io`).

* **Note Templates**: Provide predefined note templates (e.g., "Meeting Notes", "To-Do Lists", "Project Plans") to help users quickly create structured notes. This could include storing templates in the database or as JSON objects.

Here's a contributors section to include in your README:

## Contributors
<table>
  <tr>
    <td align="center">
      <a href="https://github.com/sainithinkatta" />
        <sub><b>Sai Nithin</b></sub>
      </a>
    </td>
  </tr>
</table>
