# 🚀 Day 4: Deployment - GitHub → Render → Vercel

**Goal:** Deploy backend to Render, frontend to Vercel, verify both live.

**Duration:** 5 hours | **Status:** Starting now

---

## 📋 Prerequisites

Before deploying, verify:
- [ ] Backend running locally (`npm run dev` in server folder)
- [ ] Frontend running locally (`npm run dev` in client folder)
- [ ] MongoDB running (Atlas URI in .env or local MongoDB)
- [ ] All Day 3 tests passing
- [ ] No `console.log()` in production code
- [ ] `.env` file with all secrets ready

---

## 🚀 Hour 1-2: GitHub Setup

### Step 1: Create GitHub Repository

1. Go to **github.com** (sign in or create account)
2. Click **"+"** → **"New repository"**
3. **Repository name:** `week16-health-ai-mvp`
4. **Description:** "Health AI MVP with Gemini integration"
5. **Visibility:** Public
6. Click **"Create repository"**

✅ You now have an empty GitHub repo!

### Step 2: Create .gitignore

In your project root (`week16-health-ai-mvp/`), create a new file called `.gitignore`:

```
# Dependencies
node_modules/
package-lock.json
yarn.lock

# Environment variables
.env
.env.local
.env.*.local

# Build outputs
dist/
build/
.next/

# IDE
.vscode/
.idea/
*.swp
*.swo

# OS
.DS_Store
Thumbs.db

# Logs
*.log
npm-debug.log*
yarn-debug.log*
```

**Why?** This prevents secrets (.env), node_modules, and build files from being committed.

### Step 3: Initialize Git & Push to GitHub

Open PowerShell in your project root (`week16-health-ai-mvp/`) and run:

```bash
# Initialize git
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: Health AI MVP with Gemini integration and Sonner notifications"

# Rename branch to main
git branch -M main

# Add remote (replace USERNAME with your GitHub username)
git remote add origin https://github.com/USERNAME/week16-health-ai-mvp.git

# Push to GitHub
git push -u origin main
```

✅ Your code is now on GitHub!

**⏱️ Time Checkpoint: 2 hours**

---

## 🚀 Hour 2-3: Deploy Backend to Render

### Step 1: Create Render Account

1. Go to **render.com**
2. Click **"Sign up"** (use GitHub account for fastest setup)
3. Authorize GitHub connection
4. You're logged in!

### Step 2: Create Backend Web Service

1. In Render dashboard, click **"New +"** → **"Web Service"**
2. Click **"Connect a repository"**
3. Search for **`week16-health-ai-mvp`** and connect it

### Step 3: Configure Deploy Settings

Fill in:
- **Name:** `health-ai-mvp-backend`
- **Environment:** `Node`
- **Build Command:** `cd server && npm install`
- **Start Command:** `cd server && npm start`
- **Region:** Choose closest to you (e.g., Singapore if in Asia)

### Step 4: Add Environment Variables

Click **"Advanced"** → **"Environment"**

Add these variables (copy from your local `.env`):

```
KEY                 VALUE
MONGO_URI           mongodb+srv://user:pass@cluster.mongodb.net/health-ai?retryWrites=true
GEMINI_API_KEY      your_actual_gemini_key_here
JWT_SECRET          your_jwt_secret_here
CLIENT_URL          https://your-frontend.vercel.app
PORT                5000
```

⚠️ **Get these values:**
- **MONGO_URI:** From MongoDB Atlas (your cluster connection string)
- **GEMINI_API_KEY:** From aistudio.google.com/apikey
- **JWT_SECRET:** Any random string (e.g., `super_secret_key_2024`)
- **CLIENT_URL:** Will update after frontend deployed

### Step 5: Deploy!

Click **"Create Web Service"**

Render will:
- Build your backend
- Install dependencies
- Start the server
- Give you a live URL

⏳ Wait 2-5 minutes for deployment...

### Step 6: Verify Backend is Live

Once deployed, you'll see a URL like: `https://health-ai-mvp-backend.onrender.com`

Test it:
```bash
# In PowerShell, run:
curl https://health-ai-mvp-backend.onrender.com/api/health

# Should return:
# {"status":"Server running ✅"}
```

✅ **Backend is live!**

📝 **Save this URL:** You need it for frontend deployment

**⏱️ Time Checkpoint: 3.5 hours**

---

## 🚀 Hour 3-4: Deploy Frontend to Vercel

### Step 1: Create Vercel Account

1. Go to **vercel.com**
2. Click **"Sign Up"** (use GitHub for fastest)
3. Authorize Vercel to access your GitHub
4. You're logged in!

### Step 2: Import Frontend Project

1. In Vercel dashboard, click **"New Project"**
2. Click **"Continue with GitHub"**
3. Select **`week16-health-ai-mvp`** repository
4. Click **"Import"**

### Step 3: Configure Build Settings

Vercel will auto-detect, but verify:
- **Root Directory:** `./client`
- **Framework Preset:** `Vite`
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Install Command:** `npm install`

### Step 4: Add Environment Variables

Before deploying, add:

**Environment Variables:**

```
KEY              VALUE
VITE_API_URL     https://health-ai-mvp-backend.onrender.com/api
```

This tells your frontend where the backend is!

### Step 5: Deploy!

Click **"Deploy"**

Vercel will:
- Build your React + Vite app
- Optimize for production
- Deploy to CDN
- Give you a live URL

⏳ Wait 2-3 minutes...

### Step 6: Verify Frontend is Live

You'll get a URL like: `https://week16-health-ai-mvp.vercel.app`

Visit it in browser - you should see the **Login page** ✅

**⏱️ Time Checkpoint: 4.5 hours**

---

## 🚀 Hour 4-5: Verify Both Deployments

### Test Backend API

```bash
# Test health check
curl https://health-ai-mvp-backend.onrender.com/api/health

# Expected: {"status":"Server running ✅"}
```

### Test Frontend (Manual Testing)

1. Visit your live frontend: `https://your-app.vercel.app`
2. **Test Registration:**
   - Click "Sign up"
   - Fill: Name, Email, Password (8+ chars), Age
   - Click "Sign Up"
   - Should see: "✅ Account created!"
   
3. **Test Login:**
   - Use registered credentials
   - Should redirect to Dashboard
   
4. **Test Add Metric:**
   - Add health metric (e.g., Weight: 75kg)
   - Should see: "✅ Metric recorded!"
   
5. **Test AI Assistant:**
   - Type prompt: "How is my health based on my metrics?"
   - Click "Get Suggestion"
   - Should show AI response with actionable steps
   
6. **Test Mobile:**
   - Open DevTools (F12)
   - Click device toolbar (📱 icon)
   - Select iPhone 14
   - Navigate entire app
   - Should be fully responsive ✅

### Troubleshooting

**Problem: Frontend showing 500 error**
- Solution: Check VITE_API_URL is correct in Vercel
- Go to Vercel → Settings → Environment Variables
- Verify URL points to your Render backend

**Problem: Backend returning 500**
- Solution: Check environment variables in Render
- Go to Render → Settings → Environment
- Verify MONGO_URI and GEMINI_API_KEY are correct

**Problem: MongoDB connection failing**
- Solution: MongoDB Atlas URI might be wrong
- Get correct URI from MongoDB Atlas cluster
- Update MONGO_URI in Render environment variables

**Problem: Login returns 401**
- Solution: JWT_SECRET might be different
- Make sure same JWT_SECRET in both local and Render .env
- Or re-register with new account on live site

### Update Backend CLIENT_URL (if needed)

If frontend URL changed:

1. Go to Render dashboard
2. Select your backend service
3. Go to **Settings** → **Environment**
4. Update `CLIENT_URL` to your new Vercel URL
5. Backend auto-redeploys ✅

**⏱️ Time Checkpoint: 5 hours (DONE)**

---

## 📊 Day 4 Completion Checklist

### ✅ GitHub (Hour 1-2)
- [ ] Created GitHub repository
- [ ] Created .gitignore file
- [ ] Code pushed to GitHub
- [ ] Can see code at github.com/USERNAME/week16-health-ai-mvp

### ✅ Backend Deployed (Hour 2-3)
- [ ] Created Render account
- [ ] Connected GitHub to Render
- [ ] Set environment variables (MONGO_URI, GEMINI_API_KEY, JWT_SECRET)
- [ ] Backend deployed successfully
- [ ] Live backend URL: ________________________

### ✅ Frontend Deployed (Hour 3-4)
- [ ] Created Vercel account
- [ ] Imported GitHub repository
- [ ] Set VITE_API_URL environment variable
- [ ] Frontend deployed successfully
- [ ] Live frontend URL: ________________________

### ✅ Testing & Verification (Hour 4-5)
- [ ] Backend health check returns ✅
- [ ] Frontend loads login page
- [ ] Registration works
- [ ] Login works
- [ ] Can add metrics
- [ ] AI assistant responds
- [ ] Mobile responsive on live site

---

## 🎯 Important URLs to Save

```
GITHUB:    https://github.com/USERNAME/week16-health-ai-mvp
BACKEND:   https://your-backend.onrender.com
FRONTEND:  https://your-frontend.vercel.app
```

You'll need these for:
- Day 5 submission
- Portfolio/resume
- Future reference

---

## 🎬 Next: Day 5 (Recording & Submission)

After Day 4 is complete:
- [ ] Record 3-minute demo video
- [ ] Show AI feature working
- [ ] Show mobile responsiveness
- [ ] Upload to YouTube or Google Drive
- [ ] Submit all links to Google Form

---

## 💡 Pro Tips

1. **Render:** Takes 2-5 min to deploy. Don't refresh yet if showing loading.
2. **Vercel:** Usually faster, 1-2 minutes.
3. **Free tier:** Both have free tier that's perfect for this project.
4. **Auto-deploy:** Changes pushed to GitHub will auto-deploy! (no manual redeploy needed)
5. **Logs:** Check logs in Render/Vercel dashboard if something fails.

---

**Ready to deploy? Let's go! 🚀**
