# Personal Portfolio

This is a personal portfolio project that uses a microservices architecture, with a Node.js backend and React frontend.

## Project Status

### Backend
- ✅ REST API with Node.js and Express
- ✅ JWT Authentication (and Bcrypt)
- ✅ AWS SES Integration for email sending
- ⏳ Unit Tests
- ✅ Docker and Docker Compose
- ⏳ CI/CD with GitHub Actions (pending)
- ✅ Monitoring with Cloudwatch

### Frontend
- ✅ Initial setup with React + TypeScript
- ✅ Vite Configuration
- ✅ Route structure with React Router
- ⏳ ESLint Configuration
- ✅ Main pages implementation
- ✅ API Integration
- ✅ CSS Modules Styling
- ⏳ Unit Tests
- ⏳ CI/CD with GitHub Actions


## Implemented Features

### Backend
1. **Authentication**
   - User registration
   - JWT Login
   - Send email through AWS SES

2. **User Management**
   - Complete user CRUD


3. **Projects**
   - Project CRUD
   - Categorization
   - Tags

4. **Blog**
   - Post CRUD
   - Comments
   - Categories
   - Tags

5. **Contact**
   - Contact form
   - AWS SES Integration
   - Notifications


### Frontend
1. **Base Structure**
   - Development environment setup
   - TypeScript configuration
   - Route structure

2.  **CMS (Content Management System):**
    * Create the CMS login interface.
    * Build the admin dashboard to manage blog posts (create, edit, delete) by consuming the protected API routes.


3. Implement main pages:
   - Home
   - About
   - Projects
   - Blog
   - Contact
4. Add unit tests (pending)
5. Configure CI/CD (pending)

## How to Run the Project

### Prerequisites
- Docker and Docker Compose
- AWS account with SES configured

### Configuration

1. Clone the repository:
```bash
git clone https://github.com/your-username/portfolio.git
cd portfolio
```

2. Configure environment variables:
```bash
cp .env.example .env
```

Edit the `.env` file with your settings:
```env
# PostgreSQL
POSTGRES_USER=your_username
POSTGRES_PASSWORD=your_password
POSTGRES_DB=portfolio

# AWS SES
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
AWS_REGION=your_region
```

3. Start the application:
```bash
docker-compose up --build
```

