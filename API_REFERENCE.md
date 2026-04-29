# API Reference & Testing Guide

## 🔗 Base URL
- Local: `http://localhost:5000/api`
- Production: `https://your-deployed-backend.onrender.com/api`

---

## 🔐 AUTHENTICATION ENDPOINTS

### 1. Register User
**POST** `/auth/register`

Request:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePass123",
  "age": 28
}
```

Response (201):
```json
{
  "message": "User registered successfully",
  "userId": "507f1f77bcf86cd799439011"
}
```

Error (400):
```json
{
  "error": "Validation failed",
  "details": [...]
}
```

---

### 2. Login User
**POST** `/auth/login`

Request:
```json
{
  "email": "john@example.com",
  "password": "SecurePass123"
}
```

Response (200):
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

Error (401):
```json
{
  "error": "Invalid credentials"
}
```

---

## 📊 HEALTH METRICS ENDPOINTS

### 3. Get All Metrics
**GET** `/health/metrics`

Headers:
```
Authorization: Bearer YOUR_JWT_TOKEN
```

Response (200):
```json
{
  "success": true,
  "count": 3,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439012",
      "userId": "507f1f77bcf86cd799439011",
      "type": "weight",
      "value": 75,
      "unit": "kg",
      "notes": "Morning weight",
      "createdAt": "2024-04-28T10:30:00Z"
    }
  ]
}
```

Error (401):
```json
{
  "error": "No token provided"
}
```

---

### 4. Add Health Metric
**POST** `/health/metrics`

Headers:
```
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json
```

Request:
```json
{
  "type": "weight",
  "value": 75.5,
  "unit": "kg",
  "notes": "After exercise"
}
```

Response (201):
```json
{
  "success": true,
  "message": "Metric recorded successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439012",
    "userId": "507f1f77bcf86cd799439011",
    "type": "weight",
    "value": 75.5,
    "unit": "kg",
    "notes": "After exercise",
    "createdAt": "2024-04-28T10:35:00Z"
  }
}
```

Allowed metric types:
- `weight`
- `blood_pressure`
- `heart_rate`
- `calories`
- `steps`
- `water_intake`

Error (400):
```json
{
  "error": "Validation failed",
  "details": [...]
}
```

---

### 5. Get Metrics Summary
**GET** `/health/summary`

Headers:
```
Authorization: Bearer YOUR_JWT_TOKEN
```

Response (200):
```json
{
  "success": true,
  "data": {
    "totalMetrics": 5,
    "byType": {
      "weight": [...],
      "heart_rate": [...]
    }
  }
}
```

---

## 🤖 AI ENDPOINTS

### 6. Get Health Assistant Suggestion
**POST** `/ai/health-assistant`

Headers:
```
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json
```

Request:
```json
{
  "prompt": "How can I improve my heart rate?"
}
```

Response (200):
```json
{
  "success": true,
  "data": {
    "suggestion": "Based on your metrics, try doing 30 minutes of cardio 3-4 times per week to improve cardiovascular health.",
    "type": "tip",
    "actionable_steps": [
      "Start with 20-30 minute walks daily",
      "Gradually increase to jogging",
      "Track your heart rate improvement"
    ]
  },
  "timestamp": "2024-04-28T10:40:00Z"
}
```

Types can be: `general`, `warning`, `tip`

Error (400 - Rate Limited):
```json
{
  "error": "Too many AI requests, please wait before trying again"
}
```

---

## ✅ HEALTH CHECK ENDPOINT

### 7. Server Status
**GET** `/health`

Response (200):
```json
{
  "status": "Server running ✅"
}
```

---

## 🧪 TESTING WITH POSTMAN

### Setup in Postman:

1. **Create Environment Variable:**
   - Variable: `baseUrl` → Value: `http://localhost:5000/api`
   - Variable: `token` → Value: (will be set after login)

2. **Create Collection: Health AI**

3. **Add Requests:**

   - **Register**
     - Method: POST
     - URL: `{{baseUrl}}/auth/register`
     - Body (JSON):
       ```json
       {
         "name": "Test User",
         "email": "test@example.com",
         "password": "TestPass123",
         "age": 25
       }
       ```

   - **Login**
     - Method: POST
     - URL: `{{baseUrl}}/auth/login`
     - Body (JSON):
       ```json
       {
         "email": "test@example.com",
         "password": "TestPass123"
       }
       ```
     - **Tests tab** (to save token):
       ```javascript
       var jsonData = pm.response.json();
       pm.environment.set("token", jsonData.token);
       ```

   - **Add Metric**
     - Method: POST
     - URL: `{{baseUrl}}/health/metrics`
     - Headers: 
       - `Authorization`: `Bearer {{token}}`
     - Body (JSON):
       ```json
       {
         "type": "weight",
         "value": 75,
         "unit": "kg",
         "notes": "Morning"
       }
       ```

   - **Get Metrics**
     - Method: GET
     - URL: `{{baseUrl}}/health/metrics`
     - Headers:
       - `Authorization`: `Bearer {{token}}`

   - **AI Assistant**
     - Method: POST
     - URL: `{{baseUrl}}/ai/health-assistant`
     - Headers:
       - `Authorization`: `Bearer {{token}}`
     - Body (JSON):
       ```json
       {
         "prompt": "What should I do to stay healthy?"
       }
       ```

---

## 🔒 ERROR CODES REFERENCE

| Code | Meaning | Example |
|------|---------|---------|
| 200 | OK | Request successful |
| 201 | Created | Resource created |
| 400 | Bad Request | Validation failed |
| 401 | Unauthorized | Missing/invalid token |
| 404 | Not Found | Route doesn't exist |
| 429 | Too Many Requests | Rate limited |
| 500 | Server Error | Database/server error |

---

## 📝 VALIDATION RULES

### Password
- Minimum 8 characters
- No special character requirements

### Email
- Must be valid email format
- Must be unique (not already registered)

### Age
- Optional
- Must be between 1-150

### Metric Value
- Must be positive number
- Cannot be negative or zero

### Prompt (AI)
- Required
- 1-500 characters
- No special validation

---

## 🧯 TROUBLESHOOTING

### "No token provided" error
- Add Authorization header: `Bearer YOUR_TOKEN`
- Make sure token is from successful login

### "Validation failed" error
- Check field requirements above
- Ensure all required fields are present
- Verify data types (string vs number)

### "Too many requests" error
- Wait before making more requests
- Rate limit: 5 requests per 15 minutes on /auth/login
- Rate limit: 10 requests per 60 seconds on /ai/health-assistant

### "Invalid credentials" error
- Double-check email & password spelling
- Verify user exists (register first if needed)
- Check password is at least 8 characters

### "GEMINI_API_KEY is missing" error
- Add GEMINI_API_KEY to server/.env
- Restart backend: `npm run dev`
- Get key from: https://aistudio.google.com/apikey

---

**Happy Testing! 🚀**
