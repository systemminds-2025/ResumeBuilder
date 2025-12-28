# MySQL Login Troubleshooting Guide

## Quick Checklist

If MySQL users cannot login to the resume-builder, check these items:

### 1. ✅ Verify .env Configuration

The `.env` file must have MySQL credentials (file is gitignored):

```bash
# Check if .env exists
ls -la /Users/ifocus/Downloads/KareerGrowth/resume-builder/server/.env

# If it doesn't exist, create it with:
cat > /Users/ifocus/Downloads/KareerGrowth/resume-builder/server/.env << 'EOF'
# MongoDB Configuration
MONGODB_URI=mongodb+srv://infosystemminds_db_user:admin123@test-portal.qziuxqn.mongodb.net/resume-builder?appName=resume-builder&retryWrites=true&w=majority

# JWT Configuration
JWT_SECRET=VGhpcyBpcyBhIHNlY3VyZSByYW5kb20gc2VjcmV0IGtleSBmb3IgSldUIGF1dGhlbnRpY2F0aW9uLiBJdCBzaG91bGQgYmUgYXQgbGVhc3QgNjQgY2hhcmFjdGVycyBsb25nIGZvciBzZWN1cml0eS4=
ACCESS_TOKEN_EXPIRY=15m
REFRESH_TOKEN_EXPIRY=14d

# MySQL Configuration (REQUIRED for candidate authentication)
MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_DATABASE=candidates
MYSQL_USER=root
MYSQL_PASSWORD=radhe123

# Server Configuration
PORT=5000
CLIENT_URL=http://localhost:5173
EOF
```

### 2. ✅ Restart the Server

After adding .env, restart the resume-builder server:

```bash
cd /Users/ifocus/Downloads/KareerGrowth/resume-builder/server
npm start
```

**Expected output:**
```
Database connected successfully
MySQL connection pool created
MySQL connection successful
Server is running on port 5000
```

### 3. ✅ Check Server Logs

The server now has detailed logging. When a MySQL user tries to login, you'll see:

```
[LOGIN] Attempting login for email: user@example.com
[LOGIN] Checking MySQL database...
[LOGIN] MySQL available: true
[MySQL Auth] Authenticating candidate: user@example.com
[MySQL Auth] Candidate found: user@example.com
[MySQL Auth] Comparing password for: user@example.com
[MySQL Auth] Authentication successful for: user@example.com
[LOGIN] MySQL authentication result: SUCCESS
[LOGIN] MySQL user authenticated: user@example.com, userId: abc123...
[LOGIN] Login successful for user@example.com from mysql
```

### 4. ✅ Test MySQL Login

```bash
# Test with a MySQL candidate
curl -X POST http://localhost:5000/api/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "candidate@example.com",
    "password": "their-password"
  }' \
  -c cookies.txt -v
```

**Expected response:**
```json
{
  "message": "Login successful",
  "user": {
    "name": "Candidate Name",
    "email": "candidate@example.com",
    "_id": "..."
  },
  "source": "mysql"
}
```

## Common Issues

### Issue 1: MySQL not available
**Log:** `[LOGIN] MySQL available: false`

**Solution:** Check .env file has correct MySQL credentials

### Issue 2: Candidate not found
**Log:** `[MySQL Auth] Candidate not found: email@example.com`

**Solution:** Email doesn't exist in candidates database

### Issue 3: Invalid password
**Log:** `[MySQL Auth] Invalid password for: email@example.com`

**Solution:** Password is incorrect

### Issue 4: No password set
**Log:** `[MySQL Auth] Candidate has no password set`

**Solution:** Candidate exists but password_hash is NULL in database

## Verify MySQL Data

Check if candidate exists in MySQL:

```bash
mysql -u root -p
# Enter password: radhe123

USE candidates;
SELECT email, name, password_hash FROM candidates WHERE email = 'test@example.com';
```

The `password_hash` column should have a bcrypt hash (starts with `$2b$` or `$2a$`).

## Next Steps

1. Add MySQL credentials to `.env` file
2. Restart the server
3. Check server logs when attempting login
4. Share the logs if issue persists
