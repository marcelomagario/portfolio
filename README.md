# Personal Portfolio Project

This repository contains the source code for my personal portfolio, which includes a blog and a basic Content Management System (CMS). The project is divided into a Backend (API) and a Frontend (yet to be developed).

## Current Project Status

### Backend (API)

The Backend has been developed using Node.js with TypeScript and Express. It connects to a PostgreSQL database.

**Technologies Used:**
* **Language:** TypeScript
* **Runtime:** Node.js
* **Web Framework:** Express.js
* **Database:** PostgreSQL
* **DB Client:** `pg` (Node.js PostgreSQL client)
* **Authentication:** JWT (JSON Web Tokens) with `bcryptjs` for password hashing.
* **Environment Variables:** `dotenv`
* **Email Service:** AWS SES (Simple Email Service) - **Successfully Integrated!**
* **CORS Management:** `cors` middleware

**Implemented Features:**

1.  **Environment Setup:**
    * Folder structure for Backend (`backend/src`).
    * TypeScript configuration (`tsconfig.json`) to compile from `src` to `dist`.
    * Environment variable management with `.env`. **Crucial order of `dotenv.config()` execution is ensured for proper variable loading.**

2.  **Database (PostgreSQL):**
    * Modeling and creation of `users`, `posts`, `tags`, `post_tags` tables.
    * Configuration of a dedicated user (`portfolio_user`) with appropriate permissions.
    * Stable Backend connection to the database.

3.  **Authentication Module (for CMS):**
    * **User Registration (`POST /api/auth/register`):** Allows registering a new user (admin for the CMS), with secure password hashing.
    * **User Login (`POST /api/auth/login`):** Authenticates a user and returns a JWT for access to protected routes.
    * **Authentication Middleware (`authenticateToken`):** Protects routes requiring a valid JWT.

4.  **Blog Posts Module:**
    * **List all Posts (`GET /api/posts`):** Public route to display all blog posts.
    * **Get Post by ID (`GET /api/posts/:id`):** Public route to display a specific post by its ID.
    * **Create Post (`POST /api/posts`):** Private route (requires JWT) to add new posts, including tag association.
    * **Update Post (`PUT /api/posts/:id`):** Private route (requiring JWT) to modify existing posts and their tags.
    * **Delete Post (`DELETE /api/posts/:id`):** Private route (requiring JWT) to remove posts.

5.  **Contact Module (AWS SES):**
    * **Send Contact Email (`POST /api/contact`):** Allows users to send messages via a contact form, utilizing AWS SES for email delivery. Includes robust error handling and validation.

6.  **Tag Listing Module:**
    * **List all Tags (`GET /api/tags`):** Public route to retrieve all available tags from the database, ordered alphabetically.

7.  **Global Error Handling:**
    * **Centralized Middleware:** Implemented a global error handling middleware to gracefully manage and format API responses for unexpected errors.

8.  **CORS Configuration:**
    * **Cross-Origin Resource Sharing:** Configured middleware to enable secure communication between the backend and a frontend application potentially hosted on a different origin.

---

## Next Steps

### Frontend Development (Main Focus)

1.  **Project Structure:**
    * Set up a React.js project (or framework of your choice) for the Frontend.

2.  **Main Pages:**
    * Home Page.
    * About Me Page.
    * Portfolio/Projetos Page.
    * Blog Page (listing of posts).
    * Post Detail Page.
    * Contact Page (form).

3.  **Backend Integration:**
    * Consume the Backend APIs to display posts, list tags, send data from the contact form, and handle CMS interactions.

4.  **CMS (Content Management System):**
    * Login Interface.
    * Dashboard to manage posts (create, edit, delete).
    * Potentially manage tags and users directly.

---

## How to Run the Project

### Prerequisites

* Node.js (v18+) and npm (or yarn)
* PostgreSQL (v12+)
* AWS account with SES configured and email verified (for the contact module). **Ensure your IAM credentials have SES sending permissions and are correctly placed in `.env` with `dotenv.config()` at the very top of `app.ts`.**

### Database Setup

1.  **Access PostgreSQL:**
    ```bash
    sudo -i -u postgres
    psql
    ```
2.  **Create Database and User:**
    ```sql
    CREATE DATABASE portfolio_db;
    CREATE USER portfolio_user WITH ENCRYPTED PASSWORD 'your_secret_password';
    GRANT ALL PRIVILEGES ON DATABASE portfolio_db TO portfolio_user;
    \c portfolio_db
    ```
3.  **Create Tables:**
    ```sql
    -- users table
    CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );

    -- posts table
    CREATE TABLE posts (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        content TEXT NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );

    -- tags table
    CREATE TABLE tags (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) UNIQUE NOT NULL
    );

    -- post_tags join table
    CREATE TABLE post_tags (
        post_id INTEGER NOT NULL,
        tag_id INTEGER NOT NULL,
        PRIMARY KEY (post_id, tag_id),
        FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE,
        FOREIGN KEY (tag_id) REFERENCES tags(id) ON DELETE CASCADE
    );
    ```
4.  **Grant Permissions to `portfolio_user` (inside `psql` and `\c portfolio_db`):**
    ```sql
    GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO portfolio_user;
    GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO portfolio_user;
    -- If needed, for existing tables individually:
    GRANT ALL PRIVILEGES ON TABLE users TO portfolio_user;
    GRANT ALL PRIVILEGES ON SEQUENCE users_id_seq TO portfolio_user;
    GRANT ALL PRIVILEGES ON TABLE posts TO portfolio_user;
    GRANT ALL PRIVILEGES ON SEQUENCE posts_id_seq TO portfolio_user;
    GRANT ALL PRIVILEGES ON TABLE tags TO portfolio_user;
    GRANT ALL PRIVILEGES ON SEQUENCE tags_id_seq TO portfolio_user;
    GRANT ALL PRIVILEGES ON TABLE post_tags TO portfolio_user;