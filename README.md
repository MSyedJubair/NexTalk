# NexTalk - Real-time Chat Application

A modern, full-stack real-time chat application built with **React**, **Express.js**, and **Socket.io**. This project demonstrates real-time bidirectional communication between clients and servers, featuring user authentication, message persistence, and online status tracking.

> 🎓 A learning project to master Socket.io for real-time communication

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Installation & Setup](#-installation--setup)
- [Environment Variables](#-environment-variables)
- [Running the Application](#-running-the-application)
- [Usage](#-usage)
- [Socket Events](#-socket-events)
- [API Endpoints](#-api-endpoints)

---

## ✨ Features

### Core Features
- 🔐 **User Authentication** - Secure signup/signin with JWT tokens
- 💬 **Real-time Messaging** - Instant message delivery using Socket.io
- 👥 **User Directory** - Browse and select users to chat with
- 🟢 **Online Status** - See which users are currently online
- 📝 **Message History** - All messages are persisted in the database
- 👤 **User Profiles** - Profile pictures with Cloudinary integration
- 🎨 **Responsive Design** - Beautiful UI with resizable chat panels

### Technical Highlights
- TypeScript for type-safe code
- Real-time bidirectional communication with Socket.io
- JWT-based authentication with secure cookies
- MongoDB for data persistence
- React Query for efficient data fetching
- Tailwind CSS + Shadcn UI for modern styling

---

## 🛠 Tech Stack

### Frontend
- **React** 19 - UI library
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **Socket.io-client** - Real-time communication
- **React Query** - Data fetching and caching
- **Tailwind CSS** - Utility-first CSS framework
- **Shadcn UI** - High-quality React components
- **React Hook Form** - Efficient form handling
- **Axios** - HTTP client
- **TypeScript** - Type safety

### Backend
- **Node.js** - JavaScript runtime
- **Express** - Web application framework
- **Socket.io** - Real-time event-based communication
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT (jsonwebtoken)** - Token-based authentication
- **bcryptjs** - Password hashing
- **Cloudinary** - Image storage and delivery
- **TypeScript** - Type safety
- **Nodemon** - Development server with auto-reload

---

## 📁 Project Structure

```
NexTalk/
├── Client/                          # React Frontend
│   ├── src/
│   │   ├── App.tsx                 # Main app routes
│   │   ├── main.tsx                # Entry point
│   │   ├── Auth/                   # Authentication pages
│   │   │   ├── AuthLayout.tsx
│   │   │   └── Forms/
│   │   │       ├── Signin.tsx
│   │   │       └── Signup.tsx
│   │   ├── components/
│   │   │   ├── Shared/             # Reusable components
│   │   │   │   ├── Avatar.tsx
│   │   │   │   ├── Loader.tsx
│   │   │   │   ├── SideBar.tsx    # User list sidebar
│   │   │   │   └── UserProfile.tsx
│   │   │   └── ui/                 # Shadcn UI components
│   │   ├── Root/
│   │   │   ├── RootLayout.tsx      # Main layout with resizable panels
│   │   │   └── Pages/
│   │   │       ├── Home.tsx        # Welcome/user selection
│   │   │       └── Chat.tsx        # Chat interface
│   │   ├── lib/
│   │   │   ├── socket.ts           # Socket.io client configuration
│   │   │   ├── axios.ts            # Axios instance
│   │   │   ├── api.ts              # API calls
│   │   │   ├── query.ts            # React Query hooks
│   │   │   └── utils.ts            # Utility functions
│   │   ├── Types/                  # TypeScript interfaces
│   │   └── globals.css             # Global styles
│   ├── package.json
│   ├── tsconfig.json
│   ├── vite.config.ts
│   └── index.html
│
└── Server/                          # Express Backend
    ├── src/
    │   ├── index.ts                # Server entry point & Socket.io setup
    │   ├── controllers/            # Business logic
    │   │   ├── auth.controller.ts
    │   │   ├── user.controller.ts
    │   │   └── message.controller.ts
    │   ├── models/                 # MongoDB schemas
    │   │   ├── user.model.ts
    │   │   └── message.model.ts
    │   ├── routes/                 # API routes
    │   │   ├── auth.route.ts
    │   │   ├── user.route.ts
    │   │   └── message.route.ts
    │   ├── middleware/
    │   │   └── auth.middleware.ts  # JWT verification
    │   ├── lib/
    │   │   ├── db.ts               # MongoDB connection
    │   │   ├── cloudinary.ts       # Image upload configuration
    │   │   └── utils.ts            # Utility functions
    │   └── types/
    │       └── express.d.ts        # Express type extensions
    ├── package.json
    ├── tsconfig.json
    ├── .env
    └── .gitignore
```

---

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- MongoDB instance (local or cloud - MongoDB Atlas)
- Cloudinary account (for image uploads)

### Step 1: Clone the Repository

```bash
git clone <repository-url>
cd NexTalk
```

### Step 2: Install Backend Dependencies

```bash
cd Server
npm install
```

### Step 3: Install Frontend Dependencies

```bash
cd ../Client
npm install
```

---

## 🔐 Environment Variables

### Backend (.env)

Create a `.env` file in the `Server` directory:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>

# JWT
JWT_SECRET=your_jwt_secret_key_here

# Client URL (for CORS)
CLIENT_URL=http://localhost:5173

# Cloudinary (for image uploads)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### Frontend (.env.local)

Create a `.env.local` file in the `Client` directory:

```env
# Backend API
VITE_API_URL=http://localhost:5000/api
VITE_SOCKET_BACKEND_URI=http://localhost:5000
```

---

## ▶️ Running the Application

### Development Mode

**Terminal 1 - Start Backend Server:**

```bash
cd Server
npm run dev
```

Server will run on `http://localhost:5000`

**Terminal 2 - Start Frontend Development Server:**

```bash
cd Client
npm run dev
```

Frontend will run on `http://localhost:5173`

### Production Build

**Backend:**

```bash
cd Server
npm run build
npm start
```

**Frontend:**

```bash
cd Client
npm run build
npm run preview
```

---

## 📱 Usage

1. **Open the application** at `http://localhost:5173`
2. **Create an account** - Sign up with email and password
3. **Set a profile picture** - Upload your avatar via Cloudinary
4. **Browse users** - View all registered users in the sidebar
5. **Start chatting** - Click on any user to open chat and send messages
6. **See online status** - Online users are highlighted and see real-time updates

### Chat Features
- **Send messages** - Type and hit enter or click send
- **View message history** - All past messages load when opening a chat
- **Real-time notifications** - Receive messages instantly with Socket.io
- **Auto-scroll** - Chat automatically scrolls to latest message
- **Responsive layout** - Resize the sidebar and chat panels as needed

---

## 🔌 Socket Events

### Client → Server

| Event | Data | Description |
|-------|------|-------------|
| `join` | `userId: string` | User joins their room when logging in |
| `sendMessage` | `{ senderId, receiverId, text, image }` | Send a message to another user |

### Server → Client

| Event | Data | Description |
|-------|------|-------------|
| `onlineUsers` | `string[]` | List of currently online user IDs |
| `receiveMessage` | `{ senderId, receiverId, text, image, timestamp, _id }` | Receive a message |

---

## 📡 API Endpoints

### Authentication Routes (`/api/auth`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---|
| POST | `/signup` | Create new user account | ❌ |
| POST | `/signin` | Login with credentials | ❌ |
| POST | `/logout` | Logout user | ✅ |
| PUT | `/update-profile` | Update user profile/avatar | ✅ |
| GET | `/check` | Check authentication status | ✅ |

### User Routes (`/api/users`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---|
| GET | `/` | Get all users | ✅ |
| GET | `/:id` | Get specific user details | ✅ |

### Message Routes (`/api/message`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---|
| GET | `/:userId` | Get message history with user | ✅ |
| POST | `/send` | Send a message (REST fallback) | ✅ |

---

## 🎯 Key Learning Points (Socket.io)

This project demonstrates:

1. **Socket.io Fundamentals**
   - Creating WebSocket connections
   - Emitting and listening to events
   - Using rooms for private messaging

2. **Real-time Features**
   - Broadcasting online status to all users
   - Sending messages to specific users using rooms
   - Handling disconnections gracefully

3. **Message Flow**
   - Client emits `sendMessage` → Server saves to DB → Server emits to both sender and receiver
   - User authentication tied to Socket.io connections
   - Real-time updates without page refresh

4. **Best Practices**
   - Error handling for disconnections
   - CORS configuration for cross-origin requests
   - Type-safe Socket.io events with TypeScript declarations

---

## 🐛 Troubleshooting

### Connection refused / Cannot connect to server
- Ensure backend is running on the correct port
- Check `VITE_SOCKET_BACKEND_URI` matches backend URL
- Verify CORS is properly configured

### Messages not sending
- Check browser console for errors
- Verify user is authenticated (JWT token in cookies)
- Ensure Socket.io connection is active

### MongoDB connection errors
- Verify `MONGODB_URI` is correct
- Check network access in MongoDB Atlas
- Ensure database username and password are correct

### Image upload issues
- Verify Cloudinary credentials in `.env`
- Check image file size limits
- Ensure Cloudinary API key has upload permissions

---

## 📝 License

ISC

---

## 🤝 Contributing

This is a learning project. Feel free to fork, modify, and improve!

---

## 📞 Support

For questions or issues, please open an issue in the repository or refer to the documentation for Socket.io at [socket.io/docs](https://socket.io/docs/v4/client-api/).

---

**Happy Coding! 🚀**
