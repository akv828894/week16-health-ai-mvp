# 🔐 Day 3: Backend Security & Validation Testing

**Goal:** Test all API endpoints with bad data, verify validation, test rate limiting, ensure production readiness.

**Duration:** 5 hours | **Status:** Ready to execute

---

## 📋 Prerequisites

### Before Starting: MongoDB Setup ⚠️
**CRITICAL:** You need MongoDB running first!

Choose ONE (5-15 minutes):

**A) MongoDB Atlas (Recommended):**
```
1. mongodb.com/cloud/atlas
2. Create FREE account
3. Create cluster
4. Get connection string
5. Update server/.env → MONGO_URI=your_string
6. Restart backend: npm run dev
```

**B) Docker:**
```
docker run -d -p 27017:27017 --name health-mongodb mongo
```

**C) Local MongoDB:**
```
Download from mongodb.com/try/download/community
Start: mongod
```

---

## 🚀 Hour 1-2: Input Validation Testing

### Setup Postman

**Create Collection:** "Health AI Testing"

#### Test 1: Register - No Email
```
POST http://localhost:5000/api/auth/register
Body (JSON):
{
  "name": "John Doe",
  "password": "SecurePass123",
  "age": 30
}

Expected Response:
- Status: 400
- Message: "Email is required" or validation error
```

#### Test 2: Register - Invalid Email
```
POST http://localhost:5000/api/auth/register
Body:
{
  "name": "John Doe",
  "email": "not-an-email",
  "password": "SecurePass123",
  "age": 30
}

Expected Response:
- Status: 400
- Message: "Invalid email format"
```

#### Test 3: Register - Short Password
```
POST http://localhost:5000/api/auth/register
Body:
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "Pass12",
  "age": 30
}

Expected Response:
- Status: 400
- Message: "Password must be at least 8 characters"
```

#### Test 4: Register - Valid Data
```
POST http://localhost:5000/api/auth/register
Body:
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePass123",
  "age": 30
}

Expected Response:
- Status: 201
- Message: "User registered successfully"
- Contains: userId
```

#### Test 5: Register - Duplicate Email
```
POST http://localhost:5000/api/auth/register
Body:
{
  "name": "Jane Doe",
  "email": "john@example.com",
  "password": "SecurePass456",
  "age": 25
}

Expected Response:
- Status: 400
- Message: "Email already registered"
```

#### Test 6: Login - Wrong Password
```
POST http://localhost:5000/api/auth/login
Body:
{
  "email": "john@example.com",
  "password": "WrongPassword"
}

Expected Response:
- Status: 401
- Message: "Invalid credentials"
```

#### Test 7: Login - Non-existent Email
```
POST http://localhost:5000/api/auth/login
Body:
{
  "email": "nonexistent@example.com",
  "password": "SecurePass123"
}

Expected Response:
- Status: 401
- Message: "Invalid credentials"
```

#### Test 8: Login - Valid Credentials
```
POST http://localhost:5000/api/auth/login
Body:
{
  "email": "john@example.com",
  "password": "SecurePass123"
}

Expected Response:
- Status: 200
- Contains: token (JWT)
- Contains: user (name, email, id)

⚠️ SAVE THIS TOKEN FOR NEXT TESTS ⚠️
Copy the token value for testing authenticated endpoints
```

**⏱️ Time Checkpoint: 2 hours**

---

## 🚀 Hour 2-3: Health Metrics Validation

#### Test 9: Get Metrics - No Token
```
GET http://localhost:5000/api/health/metrics

Expected Response:
- Status: 401
- Message: "No authorization token"
```

#### Test 10: Get Metrics - Invalid Token
```
GET http://localhost:5000/api/health/metrics
Header: Authorization: Bearer invalid_token_here

Expected Response:
- Status: 401
- Message: "Invalid token"
```

#### Test 11: Get Metrics - Valid Token
```
GET http://localhost:5000/api/health/metrics
Header: Authorization: Bearer <TOKEN_FROM_TEST_8>

Expected Response:
- Status: 200
- Body: Array of metrics (empty array if no metrics yet)
```

#### Test 12: Add Metric - No Token
```
POST http://localhost:5000/api/health/metrics
Body:
{
  "type": "weight",
  "value": 75,
  "unit": "kg"
}

Expected Response:
- Status: 401
- Message: "No authorization token"
```

#### Test 13: Add Metric - Invalid Type
```
POST http://localhost:5000/api/health/metrics
Header: Authorization: Bearer <TOKEN_FROM_TEST_8>
Body:
{
  "type": "invalid_type",
  "value": 75,
  "unit": "kg"
}

Expected Response:
- Status: 400
- Message: "Invalid metric type" or validation error
```

#### Test 14: Add Metric - Negative Value
```
POST http://localhost:5000/api/health/metrics
Header: Authorization: Bearer <TOKEN_FROM_TEST_8>
Body:
{
  "type": "weight",
  "value": -75,
  "unit": "kg"
}

Expected Response:
- Status: 400
- Message: "Value must be positive"
```

#### Test 15: Add Metric - Valid Data
```
POST http://localhost:5000/api/health/metrics
Header: Authorization: Bearer <TOKEN_FROM_TEST_8>
Body:
{
  "type": "weight",
  "value": 75,
  "unit": "kg",
  "notes": "Morning measurement"
}

Expected Response:
- Status: 201
- Message: "Metric recorded successfully"
- Contains: metric object with id, timestamp
```

#### Test 16: Get Summary (Valid Token)
```
GET http://localhost:5000/api/health/summary
Header: Authorization: Bearer <TOKEN_FROM_TEST_8>

Expected Response:
- Status: 200
- Body: Object with metric types as keys
- Example:
{
  "weight": [75, 74.5, 76],
  "heart_rate": [72, 75, 78]
}
```

**⏱️ Time Checkpoint: 3.5 hours**

---

## 🚀 Hour 3-4: Rate Limiting Testing

### Test AI Rate Limiting (10 requests/60 seconds)

#### Setup for Rate Limit Test:

First, add a metric so AI has data:
```
POST http://localhost:5000/api/health/metrics
Header: Authorization: Bearer <TOKEN>
Body:
{
  "type": "weight",
  "value": 75,
  "unit": "kg"
}
```

#### Test 17: Rapid AI Requests (Test Rate Limiting)

**In Postman, create a test script:**

```javascript
// Run this 12 times rapidly
POST http://localhost:5000/api/ai/health-assistant
Header: Authorization: Bearer <TOKEN>
Body:
{
  "prompt": "How is my health?"
}

// Expected:
// Requests 1-10: Status 200 (OK)
// Request 11: Status 429 (Too Many Requests)
// Message: "Too many requests, please try again later"

// Wait 60 seconds, then:
// Request 12: Status 200 (OK)
```

**How to do this in Postman:**
1. Create the endpoint
2. Click "Runner"
3. Select collection
4. Set iterations: 12
5. Set delay: 100ms
6. Run
7. Check which request fails (should be #11)
8. Wait 60 seconds
9. Run again - should succeed

**Or manually:** Click Send 12 times in rapid succession

**Results to Document:**
- [ ] Requests 1-10 succeed (200 OK)
- [ ] Request 11 fails (429 Too Many Requests)
- [ ] After 60 second wait, works again (200 OK)

### Test Auth Rate Limiting (5 attempts/15 minutes)

#### Test 18: Rapid Login Attempts (Test Rate Limiting)

```
POST http://localhost:5000/api/auth/login
Body:
{
  "email": "john@example.com",
  "password": "WrongPassword"
}

// Run 6 times with wrong password
// Expected:
// Attempts 1-5: Status 401 (Invalid credentials)
// Attempt 6: Status 429 (Too many login attempts)
// Message: "Too many login attempts, please try again later"
```

**Results to Document:**
- [ ] Attempts 1-5 return 401 (Invalid credentials)
- [ ] Attempt 6 returns 429 (Rate limited)
- [ ] Message clearly indicates rate limit

**⏱️ Time Checkpoint: 4.5 hours**

---

## 🚀 Hour 4-5: Production Readiness Check

### Code Review Checklist

#### Security Checks:

- [ ] **No Console Logs in Routes**
  - Check: `server/routes/*.js`
  - Should NOT have: `console.log()`, `console.error()`
  - OK to have: `console.log()` in server startup

- [ ] **No API Keys in Error Messages**
  - Test by sending bad request
  - Response should NOT contain GEMINI_API_KEY, JWT_SECRET
  - Example BAD: `{ "error": "GEMINI_API_KEY not found" }`
  - Example GOOD: `{ "error": "AI service unavailable" }`

- [ ] **No Stack Traces in Responses**
  - Test by causing error (send invalid JSON)
  - Response should show user-friendly message
  - Should NOT show line numbers or file paths
  - Example BAD: Error at /api/auth.js:45
  - Example GOOD: `{ "error": "Invalid request format" }`

- [ ] **Passwords Never in Response**
  - Check Login response
  - Should NOT contain `password` field
  - Should only have: `token`, `user` (without password)

#### HTTP Status Codes:

Test each status code is correct:

```
✓ 400 Bad Request:
  POST /auth/register with missing email

✓ 401 Unauthorized:
  GET /health/metrics without token

✓ 404 Not Found:
  GET /api/nonexistent/endpoint

✓ 429 Too Many Requests:
  Send 6 login attempts rapidly

✓ 500 Server Error:
  Should be rare, only on unexpected failures
```

### Verification Tests:

#### Test 19: Invalid JSON Body
```
POST http://localhost:5000/api/auth/register
Body: {invalid json

Expected Response:
- Status: 400
- Message: User-friendly error (not stack trace)
- Should NOT show file path or line number
```

#### Test 20: Nonexistent Endpoint
```
GET http://localhost:5000/api/nonexistent/endpoint

Expected Response:
- Status: 404
- Message: "Not found" or "Endpoint not found"
```

#### Test 21: Check Login Response Format
```
POST http://localhost:5000/api/auth/login
Body:
{
  "email": "john@example.com",
  "password": "SecurePass123"
}

Response Check:
- [ ] Contains `token` field
- [ ] Contains `user` object
- [ ] `user` has: name, email, id
- [ ] `user` does NOT have: password
- [ ] No API keys visible
- [ ] No sensitive data exposed
```

**⏱️ Time Checkpoint: 5 hours (DONE)**

---

## 📊 Day 3 Completion Checklist

### ✅ Tests Completed (20 total)

**Auth Tests (8):**
- [ ] Test 1: Register - No email (400)
- [ ] Test 2: Register - Invalid email (400)
- [ ] Test 3: Register - Short password (400)
- [ ] Test 4: Register - Valid (201)
- [ ] Test 5: Register - Duplicate email (400)
- [ ] Test 6: Login - Wrong password (401)
- [ ] Test 7: Login - Non-existent email (401)
- [ ] Test 8: Login - Valid (200 + token)

**Metrics Tests (8):**
- [ ] Test 9: Get metrics - No token (401)
- [ ] Test 10: Get metrics - Invalid token (401)
- [ ] Test 11: Get metrics - Valid token (200)
- [ ] Test 12: Add metric - No token (401)
- [ ] Test 13: Add metric - Invalid type (400)
- [ ] Test 14: Add metric - Negative value (400)
- [ ] Test 15: Add metric - Valid (201)
- [ ] Test 16: Get summary - Valid (200)

**Rate Limiting Tests (2):**
- [ ] Test 17: AI rate limiting (429 after 10 requests)
- [ ] Test 18: Auth rate limiting (429 after 5 attempts)

**Production Tests (2):**
- [ ] Test 19: Invalid JSON (400, no stack trace)
- [ ] Test 20: Nonexistent endpoint (404)
- [ ] Test 21: Login response secure (no passwords exposed)

### 🎯 Deliverables:

1. **Postman Collection:**
   - [ ] Saved as `Health-AI-Testing.postman_collection.json`
   - [ ] All 21 tests documented
   - [ ] Token variables saved

2. **Test Report:**
   - [ ] Screenshot of successful tests
   - [ ] Screenshot of rate limiting (request #11 blocked)
   - [ ] Notes on any validation issues

3. **Security Verification:**
   - [ ] Confirmed: No passwords in responses
   - [ ] Confirmed: No API keys in error messages
   - [ ] Confirmed: Proper HTTP status codes
   - [ ] Confirmed: No stack traces exposed

---

## 🆘 Troubleshooting

**Problem: Getting 500 on all requests**
- Solution: Check MongoDB is running
- Or use MongoDB Atlas (in .env)

**Problem: Token is invalid after restart**
- Solution: Normal! JWT_SECRET in .env needs to be same
- Get new token from login endpoint

**Problem: Rate limiting not working**
- Solution: Check `express-rate-limit` is installed
- Run: `npm list express-rate-limit` in server folder

**Problem: Getting stack traces in errors**
- Solution: This means error handler needs fixing
- Check server/server.js error handler

---

## 🎬 Next: Day 4 (Deployment)

After Day 3 is complete:
- [ ] Push code to GitHub
- [ ] Deploy backend to Render
- [ ] Deploy frontend to Vercel
- [ ] Update .env on hosting platforms

---

**Ready? Let's start Day 3! 🚀**
