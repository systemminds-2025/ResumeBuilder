# Cross-Database Email Uniqueness - Update

## ✅ Enhancement Implemented

Updated the registration system to **enforce email uniqueness across BOTH databases** (MongoDB and MySQL).

## 🔒 How It Works

### Registration Flow:

1. **Check MongoDB** - Looks for existing user with the email
   - If found → Returns: `"User already exists"`

2. **Check MySQL** - Looks for existing candidate with the email
   - If found → Returns: `"User already exists. This email is already registered as a candidate. Please use login instead."`

3. **Create User** - Only if email doesn't exist in either database

## 📝 Example Scenarios

### Scenario 1: Email exists in MySQL
```bash
# Try to register sharan@qwikhire.ai (already in MySQL candidates)
POST /api/users/register
{
  "name": "Sharan",
  "email": "sharan@qwikhire.ai",
  "password": "password123"
}

# Response: 400 Bad Request
{
  "message": "User already exists. This email is already registered as a candidate. Please use login instead."
}
```

### Scenario 2: Email exists in MongoDB
```bash
# Try to register test@example.com (already in MongoDB)
POST /api/users/register
{
  "name": "Test User",
  "email": "test@example.com",
  "password": "password123"
}

# Response: 400 Bad Request
{
  "message": "User already exists"
}
```

### Scenario 3: New email (not in either database)
```bash
# Register newuser@example.com
POST /api/users/register
{
  "name": "New User",
  "email": "newuser@example.com",
  "password": "password123"
}

# Response: 201 Created
{
  "message": "User created successfully",
  "user": { ... },
  "source": "mongodb"
}
```

## ⚠️ Important Notes

1. **MySQL Unavailable** - If MySQL is down/unavailable, the system will:
   - Log a warning
   - Allow registration to proceed (MongoDB only)
   - This prevents MySQL issues from blocking the entire system

2. **Login Works for Both** - Users can login regardless of which database they're in:
   - MySQL candidates → Login works
   - MongoDB users → Login works
   - System checks MySQL first, then MongoDB

## 🎯 Benefits

- ✅ No duplicate emails across databases
- ✅ Clear error messages for users
- ✅ Maintains system availability even if MySQL is down
- ✅ Consistent user experience

## 📁 Files Modified

- [userController.js](file:///Users/ifocus/Downloads/KareerGrowth/resume-builder/server/controllers/userController.js) - Updated `registerUser` function

---

**Status:** ✅ Complete and ready to use!
