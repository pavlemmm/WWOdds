# WWOdds – Sports Odds Viewer

## Project Description

**WWOdds** is a web application that allows users to view live sports betting odds for events worldwide. Odds are fetched from the **OddsAPI** service. The app features user registration and login, while administrators can manage users (delete and update them).

## ⚙️ Technologies

### Frontend:
- **React**
- **JavaScript (no TypeScript)**
- **Tailwind CSS** – for full styling

### Backend:
- **Node.js + ExpressJS**
- **MongoDB** with Mongoose
- **JWT** – for authentication
- **Fetch API** – for frontend-backend communication

### External API:
- **[OddsAPI](https://the-odds-api.com/)** – for retrieving sports odds

---

## 👥 Features

### Users:
- ✅ Register and log in
- ✅ View sports odds by sport and league

### Administrator:
- ✅ View all users
- ✅ Delete users
- ✅ Edit users

---

## 📦 Running the project locally

### 1. Clone the repository
```bash
git clone https://github.com/pavlemmm/WWOdds.git
cd WWOdds
```

### 2. Start the frontend
```bash
cd client
npm install
npm run dev
```

### 3. Start the backend server
```bash
cd server
npm install
npm run dev
```

> 🔐 Don’t forget to set up a `.env` file with the following content:
```
PORT=5000
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret
ODDS_API_KEY=your_oddsapi_key
CORS_ORIGIN=your_cors_origin
```

> 🔐 Set up a `.env` file in the /frontend with the following content:
```
VITE_API_URL=your_api_url
```

---

## 🌐 API Endpoints (Backend)

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/auth/register` | Register a new user |
| `POST` | `/api/auth/login` | Log in a user |
| `GET`  | `/api/odds` | Fetch sports odds from OddsAPI |
| `GET`  | `/api/users?page=1&limit=5` | Get users (admin only) |
| `DELETE` | `/api/users/:id` | Delete a user |
| `PUT` | `/api/users/:id` | Update a user |

---

## 🔗 Connecting Frontend and Backend

### Registration:
```js
fetch('/api/auth/register', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email, password })
});
```

### Fetching odds:
```js
fetch('/api/odds', {
  headers: {
    'Authorization': `Bearer ${token}`
  }
});
```

---

## 📄 Project Structure

```
WWOdds/
├── frontend/              # React frontend
│   ├── src/
│   └── ...
├── backend/               # Express backend
│   ├── routes/
│   ├── controllers/
│   ├── models/
│   └── ...
└── README.md
```

---

## 🔐 Authentication

The system uses **JWT (JSON Web Token)** for user authentication and authorization. The token is stored in `localStorage` and included in the `Authorization` header of HTTP requests.

---

## Testing

- Register or log in a user
- View sports odds
- Log in as an admin to delete or update users

---

## Links

- 🧠 [OddsAPI](https://the-odds-api.com/)

---

## Author

- **Name:** Pavle M.
- **Project:** WWOdds
- **Year:** 2025
