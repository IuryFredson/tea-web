# Tea-Web

Tea-Web is a fullstack web application built to provide a safe and structured online forum environment.  
The project was designed as a real-world MVP to demonstrate modern fullstack development skills using Java + Spring Boot + React.

This repository contains both the backend API and the frontend client.

---

## 🚀 Tech Stack

### Backend
- Java 17
- Spring Boot
- Spring Web
- Spring Data JPA
- Spring Security (JWT Authentication)
- PostgreSQL
- Flyway (database migrations)
- Maven

### Frontend
- React
- TailwindCSS
- React Router
- Fetch API

### Infrastructure (local dev)
- Docker
- Docker Compose

---

## 📦 Features

### Authentication
- User registration
- Login with JWT
- Stateless authentication
- Protected endpoints
- Password hashing with BCrypt

### Forum System
- Create posts (authenticated)
- List posts (public)
- Create comments (authenticated)
- List comments (public)
- Pagination support
- UUID-based entities

### Security
- JWT-based stateless authentication
- Role-based structure ready for expansion
- Secure password storage
- Protected write operations

---

## 🌱 About the Project

TeaWeb is a community-driven platform designed to support and connect people around the autism spectrum (TEA).

The idea is to create a safe digital space where people can:
- Share experiences
- Ask questions
- Learn from each other
- Access curated content
- Participate in discussions

This repository contains the MVP version focused on the Forum module, which serves as the foundation for the full ecosystem.

---

## 🧠 Project Goals

TeaWeb was created with a dual purpose:

### 🌍 Real-world purpose
To build a digital ecosystem focused on the autism community (TEA – Transtorno do Espectro Autista), connecting:

- Autistic individuals
- Families
- Professionals
- People interested in learning and supporting

The platform aims to provide:
- A safe discussion space (forum)
- Educational resources
- Community interaction
- Future support tools and games

### 💻 Technical purpose
At the same time, the project is designed to demonstrate:

- Clean backend architecture (modular monolith)
- REST API design with Spring Boot
- Authentication & authorization with JWT
- Database versioning with Flyway
- Fullstack integration (React + Spring)
- Production-oriented development mindset
- MVP-first engineering approach

---

## 📁 Project Structure

```txt
tea-web/
│
├── backend/              # Spring Boot API
│   ├── auth/             # Authentication domain (JWT, users)
│   ├── forum/            # Forum domain (posts, comments)
│   └── config/           # Security and infrastructure
│
├── frontend/             # React application
│   ├── pages/
│   ├── components/
│
├── docker-compose.yml    # Local PostgreSQL + pgAdmin
│
└── README.md

```

---

## 🔐 Authentication Flow

1. **Register**: `POST /api/auth/register`
    
2. **Login**: `POST /api/auth/login` → Returns `{ "token": "JWT_TOKEN" }`
    
3. **Authorized Requests**: Use the token in the header: `Authorization: Bearer <TOKEN>`
    
4. **Identity**: `GET /api/auth/me` to retrieve current user data.
    

## 📝 API Endpoints

### Posts

- `GET /api/posts` - List all posts
    
- `GET /api/posts/{id}` - Get post details
    
- `POST /api/posts` - Create new post (Auth required)
    

### Comments

- `GET /api/posts/{id}/comments` - List comments for a post
    
- `POST /api/posts/{id}/comments` - Add comment (Auth required)
    

## 🛠️ Running Locally

### 1) Start Database

```
docker compose up -d
```

### 2) Run Backend

```
cd backend
./mvnw spring-boot:run
```

### 3) Run Frontend

```
cd frontend
npm install
npm start
```

- **Frontend**: `http://localhost:3000`
    
- **Backend**: `http://localhost:8080`

---

## 🏗️ Current Stage & Roadmap

Tea-Web is currently in the **MVP stage**, focused on validating the core idea and building a solid technical foundation.

### ✅ Implemented (Sprint 1 & 2)

- [x] JWT-based authentication system
- [x] Forum core (Posts & Comments)
- [x] Fullstack integration (React + Spring Boot)
- [x] PostgreSQL persistence with Flyway migrations
- [x] Stateless security architecture
- [x] Basic user identity from token (author ownership ready)

### 📈 Planned Improvements (Sprint 3)

Focus: evolve from MVP → production-ready platform

- [ ] **Edit/Delete permissions**
  - Full CRUD restricted to resource owners
  - Authorization checks at service layer

- [ ] **Role-Based Access Control (RBAC)**
  - USER / MODERATOR / ADMIN roles
  - Moderation capabilities

- [ ] **User Profiles**
  - Public profile pages
  - User activity history (posts/comments)

- [ ] **Search & Discovery**
  - Global post search
  - Future support for tags/categories

- [ ] **CI/CD Pipeline**
  - Automated builds & deploy
  - Environment-based configuration

### 🧭 Long-Term Vision

- Real-time interactions (WebSockets)
- Notification system
- Moderation tools
- Scalable infrastructure (Docker/Kubernetes ready)

---
    

## 👨‍💻 Author

**Iury Fredson** _Fullstack Developer (Java + React)_ This project represents my evolution in building production-ready, secure, and scalable web applications.

## 📄 License

This project is licensed under the MIT License.

