# Full-Stack Project: User Management System

This repository contains both the **frontend** and **backend** applications for the User Management System. The frontend is built with **Next.js**, and the backend is built with **NestJS**, using **Sequelize** for database ORM and **PostgreSQL** as the database.

---

### Frontend
- Built with **Next.js** for server-side rendering and static site generation.
- Responsive and modern user interface.
- Integration with backend API for data fetching and user management.

### Backend
- Built with **NestJS**, following the modular architecture pattern.
- **Sequelize** ORM for database management.
- **PostgreSQL** database for persistent storage.
- Secure API with authentication and authorization.

---

## Tech Stack

- **Frontend:**
  - Next.js
  - React
  - TailwindCSS
  - Axios for API communication

- **Backend:**
  - NestJS
  - Sequelize
  - PostgreSQL
  - Passport.js for authentication

- **Other Tools:**
  - Docker (optional for containerization)
  - npm (package manager)



# Project documentation

## Prerequisites

Before starting, ensure you have the following installed:

- Node.js (v16 or higher)
- pnpm (or npm/yarn)
- PostgreSQL (for backend)
- Docker (optional, for containerization)

---

## Setup

### Frontend Setup

1. Navigate to the `frontend` directory:
   cd frontend

2. Install dependencies:
    npm install

3. Rename the .env.example to .env

4. Start development server
    npm run dev

### Backend Setup

1. Navigate to the `backend` directory:
   cd backend

2. Install dependencies:
    npm install

3. Rename the .env.example to .env

4. Change Database config variables if need
    DATABASE_HOST=localhost
    DATABASE_PORT=5432
    DATABASE_USER=your_db_user
    DATABASE_PASSWORD=your_db_password
    DATABASE_NAME=your_db_name
    JWT_SECRET=your_jwt_secret

5. Config Sequelize-cli
    1. Install sequelize cli
        - npm install sequelize-cli
    2. Navigate to /src/config/config.json file.
    3. change the database access details for both development and production

6. Run migrations 
    - npx sequelize-cli db:migrate

7. Run Seeders
    - npx sequelize-cli db:seed:all

8. Run Dev server
    - npm run start:dev


### Run It With Docker
    - docker-compose up -d    

## Admin Login Credentials
    - email: admin@admin.com
    - password: 12345abc




