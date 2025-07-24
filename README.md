# 📦 Personal Portfolio

![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)
![Node.js](https://img.shields.io/badge/Node.js-18.x-brightgreen)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-DB-blue)
![Docker](https://img.shields.io/badge/Docker-Containerized-lightblue)
![AWS SES](https://img.shields.io/badge/AWS-SES-orange)
![React](https://img.shields.io/badge/Frontend-React-61dafb)


This is a full-stack portfolio project designed to showcase my backend and frontend development skills.  
It includes a blog, a CMS, user management, and authentication — all fully functional and containerized.

---

## 🚀 Tech Stack

### Backend
- Node.js + Express.js
- TypeScript
- PostgreSQL + Redis
- JWT Authentication (with Bcrypt)
- AWS SES (email sending)
- Jest (unit tests)
- Docker & Docker Compose

### Frontend
- React + TypeScript
- Vite
- React Router
- CSS Modules
- ESLint & Prettier
- Axios
- Unit Testing (pending)
- CI/CD with GitHub Actions (pending)

---

## 🛠️ Main Features

- ✅ Authentication with JWT + Email via AWS SES
- ✅ Full CRUD for users, blog posts, and projects
- ✅ Tagging, categorization, and comments
- ✅ Protected admin dashboard (CMS)
- ✅ Dockerized and cloud-ready

---

## 📦 How to Run Locally

### Requirements
- Docker and Docker Compose installed

### Steps

```bash
git clone https://github.com/marcelomagario/portfolio.git
cd portfolio
cp .env.example .env
docker-compose up --build
```

The backend runs on `http://localhost:3000`  
The frontend runs on `http://localhost:5173`

---

## 📫 Contact

- [LinkedIn](https://www.linkedin.com/in/marcelomagario)
- [Email](mailto:marcelomagario@gmail.com)
