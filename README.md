# Personal Portfolio Project

This repository contains the source code for my personal portfolio, which includes a blog and a Content Management System (CMS). The project is divided into a Node.js Backend (API) and a React Frontend.

## Current Project Status

The project is functional, with a complete backend API and a partially developed frontend that already consumes several backend endpoints.

### Backend (API) - Complete

The Backend was developed using Node.js with TypeScript and Express, connecting to a PostgreSQL database.

**Technologies Used:**
* **Language:** TypeScript
* **Runtime:** Node.js
* **Web Framework:** Express.js
* **Database:** PostgreSQL
* **Authentication:** JWT (JSON Web Tokens) with `bcryptjs`
* **Email Service:** AWS SES (Simple Email Service)
* **CORS Management:** `cors` middleware

**Implemented Features:**
* **Authentication Module:** Secure user registration and login for the CMS.
* **Blog Posts CRUD:** Full API for creating, reading, updating, and deleting blog posts and their associated tags.
* **Contact Form Endpoint:** An endpoint (`/api/contact`) that uses AWS SES to forward messages from the portfolio's contact form.
* **Public Endpoints:** Routes to list all posts and tags for the public-facing site.
* **Global Error Handling:** Centralized middleware for consistent error responses.

### Frontend (React + TypeScript) - In Progress

The frontend is built with React and TypeScript, using Vite as the build tool. It features a modern, responsive dark theme.

**Technologies Used:**
* **Library:** React.js
* **Language:** TypeScript
* **Routing:** `react-router-dom`
* **Styling:** Global CSS with CSS Variables

**Implemented Features:**
1.  **Project Setup:**
    * React + TypeScript project initialized with Vite.
    * Clear folder structure for pages and components.

2.  **Core Pages & Components:**
    * **Home Page (`/`):** Displays a professional summary and a preview of the three most recent blog posts fetched from the API.
    * **Contact Page (`/contact`):** Contains a fully functional contact form that sends messages through the backend API. Includes loading and success/error status feedback for the user.
    * **Navigation:** A persistent navigation bar for easy routing between pages.

3.  **Backend Integration:**
    * Successfully fetching and displaying blog posts on the Home Page.
    * Successful integration of the Contact Form with the `/api/contact` endpoint.
    * Robust handling of API states (loading, success, error) during data fetching.

---

## Next Steps

### Frontend Development (Main Focus)

1.  **Blog Functionality:**
    * Build the main Blog page (`/blog`) to list *all* posts.
    * Implement pagination and a search/filter by tag feature.
    * Create the detailed Post view (`/blog/:id`) to display a single post's full content.

2.  **Portfolio Section:**
    * Develop a dedicated page (`/portfolio`) to showcase projects.

3.  **CMS (Content Management System):**
    * Create the CMS login interface.
    * Build the admin dashboard to manage blog posts (create, edit, delete) by consuming the protected API routes.

4.  **UI/UX Refinements:**
    * Enhance mobile responsiveness across all pages.
    * Refine styles and add subtle animations or transitions.

---

## How to Run the Project

### Prerequisites

* Node.js (v18+) and npm
* PostgreSQL (v12+)
* An AWS account with SES configured (for the contact module).

### Backend Setup

1.  **Navigate to the backend directory:**
    ```bash
    cd backend
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Setup Database:** Follow the SQL instructions in the "Database Setup" section below to create the database, user, and tables.
4.  **Environment Variables:** Create a `.env` file in the `/backend` root and populate it with your database credentials and AWS SES keys.
5.  **Run the server:**
    ```bash
    npm run dev
    ```
    The API will be running on `http://localhost:3001`.

### Frontend Setup

1.  **Navigate to the frontend directory:**
    ```bash
    cd frontend
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Run the development server:**
    ```bash
    npm run dev
    ```
    The React application will be available at `http://localhost:5173` (or another port if 5173 is busy).

---

### Database Setup (SQL)

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
    CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE posts (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        content TEXT NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE tags (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) UNIQUE NOT NULL
    );

    CREATE TABLE post_tags (
        post_id INTEGER NOT NULL,
        tag_id INTEGER NOT NULL,
        PRIMARY KEY (post_id, tag_id),
        FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE,
        FOREIGN KEY (tag_id) REFERENCES tags(id) ON DELETE CASCADE
    );
    ```
4.  **Grant Table Permissions:**
    ```sql
    GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO portfolio_user;
    GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO portfolio_user;
    ```