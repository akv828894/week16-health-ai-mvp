# 🔐 Manual Deployment Guide - Do These Steps Yourself

Since authentication flows are complex, follow these **exact copy-paste steps**:

---

## 📋 BEFORE YOU START - Get These 3 Values

### Value 1: MongoDB Connection String

```
Go to: mongodb.com/cloud/atlas
1. Sign in or create account
2. Click "Create a Deployment" → Free Tier
3. Create cluster
4. Click "Connect"
5. Choose "Drivers"
6. Copy the connection string

LOOKS LIKE:
mongodb+srv://username:password@cluster.mongodb.net/health-ai?retryWrites=true&w=majority

SAVE THIS: ___________________________
```

### Value 2: Gemini API Key

```
Go to: aistudio.google.com/apikey
1. Sign in with Google
2. Click "Create API Key"
3. Copy the key

LOOKS LIKE:
AIzaSyB_1234567890abcdefghijklmnopqrst

SAVE THIS: ___________________________
```

### Value 3: JWT Secret (Any Random String)

```
Just use this:
your_super_secret_jwt_key_2024

SAVE THIS: ___________________________
```

---

## 🚀 STEP 1: Deploy Backend on Render

### Open Render:
```
https://render.com/dashboard
```

### Click "+" → "Web Service"

```
(top-left corner of dashboard)
```

### Connect Your GitHub Repo:

```
1. Click "Connect a repository"
2. Search: week16-health-ai-mvp
3. Click "Connect"
```

### Fill Settings:

```
Name:                health-ai-backend
Environment:         Node
Build Command:       cd server && npm install
Start Command:       cd server && npm start
Region:              Singapore (or nearest)
```

### Click "Advanced" → Add Environment Variables:

```
KEY                VALUE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
MONGO_URI          (paste your MongoDB string)
GEMINI_API_KEY     (paste your Gemini key)
JWT_SECRET         your_super_secret_jwt_key_2024
CLIENT_URL         (leave blank for now)
PORT               5000
```

### Click "Create Web Service"

```
Wait 2-5 minutes for it to deploy...

YOU'LL SEE:
"Your service is live at: https://health-ai-backend-xxxx.onrender.com"

⭐ COPY THIS URL ⭐

SAVE THIS: ___________________________
```

---

## 🚀 STEP 2: Deploy Frontend on Vercel

### Open Vercel:
```
https://vercel.com/dashboard
```

### Click "Add New" → "Project"

### Select Your GitHub Repo:

```
1. Click "Import Git Repository"
2. Find: week16-health-ai-mvp
3. Click "Import"
```

### Settings:

```
Root Directory:      ./client
Framework:           Vite (auto-detected)
Build Command:       npm run build
Output Directory:    dist
```

### ⭐ IMPORTANT: Add Environment Variable BEFORE Deploy

```
Click: "Environment Variables"

KEY:   VITE_API_URL
VALUE: https://health-ai-backend-xxxx.onrender.com/api

(Replace xxxx with your Render URL from Step 1)
```

### Click "Deploy"

```
Wait 1-2 minutes...

YOU'LL SEE:
"Congratulations! Your project has been deployed."

⭐ YOUR LIVE FRONTEND URL ⭐

SAVE THIS: ___________________________
```

---

## 🔄 STEP 3: Update Backend with Frontend URL

### Go Back to Render:
```
https://render.com/dashboard
```

### Select Your Backend Service:
```
Click: health-ai-backend
```

### Go to Settings:
```
Click: "Environment" on left sidebar
```

### Update CLIENT_URL:
```
Find: CLIENT_URL
Change VALUE to: (your Vercel URL from Step 2)
```

### Click "Save"

```
Render auto-redeploys (takes 2 mins)
```

---

## ✅ TEST EVERYTHING

### Test 1: Backend is Live

```
Open in browser:
https://health-ai-backend-xxxx.onrender.com/api/health

SHOULD SHOW:
{"status":"Server running ✅"}
```

### Test 2: Frontend is Live

```
Open in browser:
https://your-vercel-url.vercel.app

SHOULD SHOW:
Login page with "💚 Health AI" header
```

### Test 3: Full App (Do This!)

```
1. Visit your frontend URL
2. Click "Sign up"
3. Fill:
   Name:     Test User
   Email:    test@example.com
   Password: TestPass123
   Age:      25
4. Click "Sign Up"
5. Should see: "✅ Account created!"
6. Login with same email & password
7. Should see: Dashboard
8. Try adding a metric
9. Try AI Assistant
```

---

## 📊 WHAT YOU'LL HAVE AFTER THIS

```
GitHub:   https://github.com/akv828894/week16-health-ai-mvp
Backend:  https://health-ai-backend-xxxx.onrender.com
Frontend: https://your-app.vercel.app
```

**Save all 3 URLs for Friday submission!** ✅

---

## 🆘 QUICK TROUBLESHOOTING

| Problem | Solution |
|---------|----------|
| Backend shows 500 error | Check MongoDB URI is correct in Render |
| Frontend shows blank | Check VITE_API_URL in Vercel is correct |
| Registration fails | Try different email address |
| Can't login to Render | Use GitHub OAuth login |
| Deployment takes too long | Free tier is slower, normal! |

---

**⏱️ Total Time: ~30 minutes**

Now follow these steps step-by-step! 🚀
