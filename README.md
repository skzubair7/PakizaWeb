# Pakiza Collection - Ethnic Wear E-Commerce Platform

## 🎨 Project Overview
A beautiful, mobile-first e-commerce platform for ethnic wear (Palazzo, Lehenga, Nakab, etc.) with admin dashboard and user features.

### 🎯 Brand Theme
- **Colors**: White (#FFFFFF), Pastel Pink (#F8E8E8), Rose Gold (#B76E79), Soft Gold (#E8D7C3)
- **Design**: Aesthetic, elegant, mobile-first approach
- **Feel**: App-like experience on mobile devices

## 📋 Features

### 👥 User Features
- Smart Search (filter by price, category, style)
- Dynamic Categories (Palazzo, Lehenga, Nakab)
- Product Gallery with zoom
- Size Chart & Color Options
- Cart Management
- Multi-step Checkout
- Razorpay & COD Payment
- Order Tracking
- User Profile & Order History

### 👨‍💼 Admin Features
- Dynamic Category Management
- Product Management (Create, Edit, Delete)
- Image Upload (Multiple)
- Analytics Dashboard
- Order Management

## 🛠️ Tech Stack
- **Frontend**: React.js + CSS (Mobile-First)
- **Backend**: Node.js + Express.js
- **Database**: MongoDB
- **Payment**: Razorpay + COD
- **Authentication**: JWT (Email/Password)

## 📁 Project Structure
```
PakizaWeb/
├── client/                 # React Frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── styles/
│   │   └── App.js
│   └── package.json
├── server/                 # Node.js Backend
│   ├── models/             # MongoDB Models
│   ├── routes/             # API Routes
│   ├── controllers/        # Business Logic
│   ├── middleware/         # Auth, Validation
│   ├── config/             # Database, Payment
│   └── server.js
├── .gitignore
└── README.md
```

## 🚀 Installation & Setup

### Backend Setup
```bash
cd server
npm install
npm start
```

### Frontend Setup
```bash
cd client
npm install
npm start
```
