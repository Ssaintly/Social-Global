# Social Media App

A full-stack social media application with user authentication, friend requests, and profile management.

![App Screenshot](https://via.placeholder.com/800x400.png?text=Social+Media+App+Screenshot)

## Features

### Backend
- JWT-based authentication
- User registration/login
- Profile management
- Search users by username/email
- Send/accept/reject friend requests
- View friends list

### Frontend
- Responsive UI with Tailwind CSS
- User registration/login forms
- Editable profile page
- Friend search functionality
- Friend requests management
- Friends list display

## Technologies

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- Bcrypt Password Hashing
- CORS

### Frontend
- React.js
- React Router
- Axios (API calls)
- Tailwind CSS
- Heroicons
- React Hot Toast (Notifications)

## Installation

### Prerequisites
- Node.js (v18+)
- MongoDB (local or MongoDB Atlas)
- Git

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/social-media-app.git
   cd social-media-app
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   ```

3. **Frontend Setup**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Environment Variables (Backend)**
   Create `.env` file in `/backend`:
   ```env
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   PORT=4000
   ```

## Running the App

1. **Start Backend**
   ```bash
   cd backend
   npm start
   ```

2. **Start Frontend**
   ```bash
   cd frontend
   npm start
   ```

The app will be available at:
- Backend: `http://localhost:4000`
- Frontend: `http://localhost:3000`

## API Documentation

### Authentication
| Method | Endpoint       | Description          |
|--------|----------------|----------------------|
| POST   | /api/auth/register | User registration |
| POST   | /api/auth/login    | User login      |

### User Profile
| Method | Endpoint       | Description          |
|--------|----------------|----------------------|
| GET    | /api/user/profile | Get user profile |
| PUT    | /api/user/profile | Update profile  |
| GET    | /api/user/search?query= | Search users |

### Friend Requests
| Method | Endpoint       | Description          |
|--------|----------------|----------------------|
| POST   | /api/friend/request | Send friend request |
| POST   | /api/friend/accept | Accept request    |
| POST   | /api/friend/reject | Reject request    |
| GET    | /api/friend/requests | Get requests    |
| GET    | /api/friend/friends | Get friends list |

## Environment Variables

| Variable     | Description                     | Example                      |
|--------------|---------------------------------|------------------------------|
| MONGO_URI    | MongoDB connection string      | `mongodb://localhost:27017/social-app` |
| JWT_SECRET   | Secret key for JWT tokens      | `supersecretkey123`          |
| PORT         | Backend server port            | `4000`                       |

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.

---

**Thank you for using our social media app!** 🚀  
For support or feature requests, please open an issue in the repository.
```

This README includes:
1. Project overview
2. Key features
3. Technology stack
4. Installation instructions
5. API documentation
6. Environment variables
7. Contribution guidelines
8. License information

You can customize it further by:
- Adding actual screenshots
- Including deployment instructions
- Adding more detailed API documentation
- Expanding the testing section
- Adding acknowledgments

Let me know if you need any adjustments! 😊
