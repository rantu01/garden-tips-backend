
# 🌱 Garden Tips - Backend

This is the **backend API** for the [Garden Tips](https://github.com/rantu01/garden-tips) full-stack project. It handles user authentication, tip management (CRUD), and secure data operations using **Node.js**, **Express**, and **MongoDB**.

> 🔗 **Frontend Repository:** [garden-tips (Frontend)](https://github.com/rantu01/garden-tips)

---

## ⚙️ Features

- 🔐 JWT-based user authentication
- ✍️ Create, read, update, and delete gardening tips
- 🔎 Filter and search tips
- 🛡️ Protected routes for user-specific actions
- 📅 Automatic date assignment for each tip
- 📧 Associate tips with user emails

---

## 📦 Tech Stack

- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)
- [CORS](https://www.npmjs.com/package/cors)
- [JWT](https://jwt.io/)
- [dotenv](https://www.npmjs.com/package/dotenv)

---

## 📁 Folder Structure

```

garden-tips-backend/
├── controllers/
│   ├── authController.js
│   └── tipController.js
├── middlewares/
│   └── verifyToken.js
├── models/
│   ├── Tip.js
│   └── User.js
├── routes/
│   ├── authRoutes.js
│   └── tipRoutes.js
├── .env
├── index.js
├── package.json
└── README.md

````

---

## 🛠️ Getting Started

### Prerequisites

- **Node.js** installed
- **MongoDB** database (local or cloud via MongoDB Atlas)

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/rantu01/garden-tips-backend.git
cd garden-tips-backend
````

2. **Install dependencies**

```bash
npm install
```

3. **Create a `.env` file**

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

4. **Run the server**

```bash
npm start
```

The server will start at `http://localhost:5000`.

---

## 🔐 Authentication

* **JWT Token** is issued during login/register.
* The token must be sent in the request header as:

  ```http
  Authorization: Bearer <token>
  ```

---

## 🔄 API Endpoints

### ✅ Auth Routes

| Method | Endpoint        | Description         |
| ------ | --------------- | ------------------- |
| POST   | `/api/register` | Register a new user |
| POST   | `/api/login`    | Login and get JWT   |

### 🌿 Tip Routes

| Method | Endpoint        | Description                   |
| ------ | --------------- | ----------------------------- |
| GET    | `/api/tips`     | Get all tips                  |
| POST   | `/api/tips`     | Add a new tip (auth required) |
| PATCH  | `/api/tips/:id` | Update a tip (auth required)  |
| DELETE | `/api/tips/:id` | Delete a tip (auth required)  |

---

## 🙋‍♂️ Author

**Rantu Mondal**
🔗 [LinkedIn](https://www.linkedin.com/in/rantubytes)
📧 [rantumondal06@gmail.com](mailto:rantumondal06@gmail.com)

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

## 🧑‍💻 Contributing

Contributions are welcome! Please fork the repo and open a pull request.

---

## 🪴 Related

* Frontend: [garden-tips](https://github.com/rantu01/garden-tips)

```

---

Let me know if you'd like to auto-generate Swagger docs, Postman collections, or deployment instructions for this backend (e.g., Render or Railway).
```
