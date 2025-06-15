
<h1 align="center">🩺 CureMate – Online Doctor Consultation Booking System</h1>

<p align="center"><strong>CureMate</strong> is a modern platform for <em>online doctor consultation booking</em>. It bridges patients and certified healthcare professionals via a seamless, intuitive web interface.</p>

---

## 🌐 Live Preview

- 🔵 [Frontend App](https://curemate.vercel.app/)
- 🔴 [Admin Panel](https://curemate-admin.vercel.app/)
- ⚙️ Backend: Deployed on Vercel (API-first serverless deployment)

---

## 📸 Screenshots

| Home | Doctor | Booking | Admin |
|------|--------|---------|-------|
| ![Home](https://github.com/user-attachments/assets/4ff0f34c-c9d6-4cf2-9001-5ed68e9f436f) | ![Doctor](https://github.com/user-attachments/assets/5ccb78fb-273c-4428-9c5a-a3e920f12968) | ![Booking](https://github.com/user-attachments/assets/eddb75c0-1873-4e12-ae72-4c9ef328989e) | ![Admin](https://github.com/user-attachments/assets/d88b7fdd-641f-4488-8256-21641dc9ee9a) |

---

## 📁 Project Structure

```bash
CureMate/
├── frontend/    # Patient-facing application (React + Vite)
├── admin/       # Admin dashboard (React + Vite)
├── backend/     # Node.js Express server (MongoDB)
└── README.md
```

---

## 🧰 Tech Stack Overview

### 🖥 Frontend (`/frontend`)
| Feature          | Technology |
|------------------|------------|
| UI Framework     | React 18 |
| Styling          | Tailwind CSS, PostCSS, Autoprefixer |
| Routing          | React Router DOM |
| HTTP Client      | Axios |
| Icons            | Lucide-React, React-Icons |
| Notifications    | React-Toastify |
| Tooling          | Vite |

---

### 🛠 Admin Panel (`/admin`)
| Feature          | Technology |
|------------------|------------|
| Framework        | React 18 |
| Build Tool       | Vite |
| Styling          | Tailwind CSS |
| API & State      | Axios |
| Notifications    | React-Toastify |

---

### 🔙 Backend API (`/backend`)
| Feature              | Technology |
|----------------------|------------|
| Server Framework     | Express.js |
| Database             | MongoDB + Mongoose |
| Authentication       | JWT, bcrypt, validator |
| File Handling        | Multer, Cloudinary |
| Payments             | Razorpay |
| Middleware           | CORS, dotenv |
| Deployment           | Serverless (Vercel) |

---

## 🔐 Authentication & Access Control

- 🔑 JWT for token-based sessions
- 🔒 Bcrypt for password hashing
- 🛡 Role-based middleware access (`user`, `admin`)

---

## 🚀 Features

- 🔐 Secure User Authentication
- 📅 Online Booking System
- 👨‍⚕️ Doctor Directory & Filtering
- 📤 Upload Medical Reports
- 💳 Razorpay Payment Integration
- 🧑‍💼 Admin Panel for Doctor/User Management
- ☁️ Cloudinary for Media Storage
- 🧩 Fully Componentized React Architecture

---

## ⚙️ Local Development Setup

### Requirements
- Node.js v18+
- MongoDB (Atlas or local)
- Vercel CLI (optional)
- Razorpay & Cloudinary accounts for API credentials

### Setup Instructions

```bash
# Clone the project
git clone https://github.com/snehasismedda/CureMate.git
cd CureMate

# Setup backend
cd backend
npm install
touch .env  # Add environment variables below
npm run server

# Setup frontend
cd ../frontend
npm install
npm run dev

# Setup admin
cd ../admin
npm install
npm run dev
```

---

## 🔑 Environment Variables (`/backend/.env`)

```env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
RAZORPAY_KEY_ID=your_key_id
RAZORPAY_KEY_SECRET=your_key_secret
```

---

## 🛳 Deployment

- Frontend and Admin: Vercel (Static hosting via Vite)
- Backend: Deployed on Vercel 

---

## 👨‍💻 Contributor

| Name              | Contact |
|-------------------|---------|
| Snehasis Medda    | [LinkedIn](https://www.linkedin.com/in/snehasis-medda/) |

---

<p align="center"><strong>© 2025 CureMate – Made with care for better healthcare 💙</strong></p>
