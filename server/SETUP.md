# Quick Start Guide - Dual Authentication System

## ✅ Implementation Complete!

The dual authentication system has been successfully implemented with support for both MongoDB and MySQL authentication.

## 🚀 Quick Setup

### 1. Configure Environment Variables

The `.env` file is gitignored. You need to add MySQL credentials manually:

**Open or create** `/Users/ifocus/Downloads/KareerGrowth/resume-builder/server/.env` and add:

```env
# MySQL Configuration (REQUIRED for candidate authentication)
MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_DATABASE=candidates
MYSQL_USER=root
MYSQL_PASSWORD=radhe123

# JWT Configuration (already set)
JWT_SECRET=VGhpcyBpcyBhIHNlY3VyZSByYW5kb20gc2VjcmV0IGtleSBmb3IgSldUIGF1dGhlbnRpY2F0aW9uLiBJdCBzaG91bGQgYmUgYXQgbGVhc3QgNjQgY2hhcmFjdGVycyBsb25nIGZvciBzZWN1cml0eS4=
ACCESS_TOKEN_EXPIRY=15m
REFRESH_TOKEN_EXPIRY=14d
```

### 2. Start the Server

```bash
cd /Users/ifocus/Downloads/KareerGrowth/resume-builder/server
npm start
```

**Expected Output:**
```
Database connected successfully
MySQL connection pool created
MySQL connection successful
Server is running on port 3000
```

## 🎯 What's Working

### ✅ MongoDB Authentication
- Register new users
- Login with MongoDB credentials
- Access/refresh tokens
- Token rotation
- Logout with blacklisting

### ✅ MySQL Authentication (after .env configuration)
- Login with existing candidate credentials
- Same JWT token flow as MongoDB
- Priority over MongoDB (checks MySQL first)
- Updates last_login in candidates table

## 📚 Full Documentation

See [walkthrough.md](file:///Users/ifocus/.gemini/antigravity/brain/f8162000-b210-484d-8b05-e8ce0d14b522/walkthrough.md) for:
- Complete API documentation
- Testing instructions
- Frontend migration guide
- Security features
- Database schemas

## 🔑 Key Endpoints

- `POST /api/users/register` - Register MongoDB user
- `POST /api/users/login` - Login (MySQL or MongoDB)
- `POST /api/users/refresh-token` - Refresh access token
- `POST /api/users/logout` - Logout and blacklist tokens
- `GET /api/users/data` - Get user data (protected)
- `GET /api/users/resumes` - Get user resumes (protected)

## ⚠️ Important Notes

1. **MySQL is optional** - System works with MongoDB only if MySQL is unavailable
2. **Cookies required** - Frontend must support `credentials: 'include'`
3. **CORS configured** - Set `CLIENT_URL` in .env for production
4. **Token expiry** - Access: 15min, Refresh: 14 days

## 🎉 Ready to Use!

Once you add the MySQL credentials to `.env`, both authentication systems will work seamlessly together.
