🛍️ Dani Store — Full-Stack eCommerce Platform Powered by Chapa

Dani Store is a full-featured eCommerce web application built using React + Vite on the frontend and Node.js + Express + MongoDB on the backend. It offers a smooth, secure, and responsive shopping experience for users, and powerful management tools for admins. This project is designed to demonstrate scalable architecture, modular design, and seamless payment integration using the Chapa payment gateway.

🚀 Live Demo

Access the deployed frontend here: 👉 https://dani-store-ecommerce-uylc.vercel.app/

📦 Key Features

🧑‍💻 Frontend (React + Vite + Tailwind CSS)

Responsive UI: Fully responsive design optimized for desktop and mobile

Custom Branding: Styled using dark black and dark orange, aligned with Dani Store’s brand identity

Dynamic Routing: Handles protected routes for admin pages and dynamic redirects post-payment

Success Receipt Page: Branded /orders/success page verifies transactions and displays user-friendly confirmation

🛠️ Backend (Node.js + Express + MongoDB)

RESTful APIs: Handles authentication, product CRUD operations, orders, and payment initiation

Chapa Integration: Secure payment gateway setup using Chapa, with real-time verification and callback redirection

Email Notifications: Nodemailer setup for notifying subscribers and confirming actions

Admin Dashboard: Enables tracking and managing products, orders, unread messages, and timestamps

💳 Payment Flow (Chapa)

User initiates payment via Chapa

Chapa redirects to /orders/success?status=success&trx_ref=...

Frontend calls backend to verify transaction via Chapa API

Verified receipt is shown with transaction details and thank-you message

🧠 Tech Stack

Layer	Technologies

Frontend:	React, Vite, Tailwind CSS, React Router

Backend:	Node.js, Express, MongoDB, Nodemailer

Payment:	Chapa Gateway (Callback + Verification API)

Deployment:	Vercel (Frontend), Vercel (Backend deployment)

📂 Folder Structure Highlights
bash
├── Frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   │   └── OrdersSuccess.jsx
│   │   └── App.jsx
│
├── Backend/
│   ├── controllers/
│   │   └── paymentController.js
│   │   └── paymentVerifyController.js
│   ├── routes/
│   │   └── paymentRoutes.js
│   └── .env

🙌 Author

Made with resilience and precision by Alazar, a developer passionate about scalable design, intuitive UX, and seamless payment architecture.
