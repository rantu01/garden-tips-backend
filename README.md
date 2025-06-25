🌱 Gardeners & Tips API
🌐 Live URL: https://garden-tips.surge.sh/
(Replace with your actual deployment URL – e.g., Render, Vercel, or Railway)

📦 Project Name
Gardeners & Tips API

🧾 Project Description
This is a backend API built with Node.js, Express.js, and MongoDB Atlas, tailored for a community gardening tips platform. It allows users to post, update, like, and manage gardening tips while tracking top contributors ("gardeners") based on activity. Designed with scalability and real-time data usage in mind, it's perfect for integrating with a frontend UI for social interaction, learning, and sharing green thumb wisdom.

🚀 Key Features
🔐 Authentication-Ready API – Includes user-specific data access via query parameters (e.g., email).

🌿 Gardeners Endpoints – Fetch all or top 6 "Active" gardeners to promote community engagement.

💡 Tips API – Add, update, delete, and fetch gardening tips with public/private visibility.

❤️ Like Feature – Increment totalLiked on tips to promote trending content.

📈 Trending Tips – Get the top 6 tips based on the number of likes.

🌍 CORS Enabled – Fully accessible to frontend apps across domains.

🛠️ Robust Error Handling – Returns meaningful status codes and messages for all routes.

⚡ MongoDB Atlas Integration – Secure and scalable cloud database with .env credential handling.

📂 API Endpoints Overview
👨‍🌾 Gardeners
GET /gardeners – Get top 6 gardeners with status "Active"

GET /gardeners-all – Fetch all gardeners without filtering

🌼 Tips
GET /tips-show?limit=6 – Get top tips sorted by likes (default: 6)

POST /tips – Add a new tip

GET /tips/public – View all public gardening tips

GET /tips/:id – Get a specific tip by its ID

PATCH /tips/like/:id – Like a tip (increment totalLiked)

GET /api/tips?email=user@example.com – Get all tips created by a specific user

DELETE /my-tips/:id – Delete a tip by its ID

PUT /api/tips/:id – Update a tip's content