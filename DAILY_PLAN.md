# Week 16 - Daily Work Plan (5 Hours/Day)

## 🎯 Week Goal
Build a professional Health AI MVP with AI features, mobile polish, and production-ready backend by Friday 11:59 PM.

---

## 📅 DAY 1 - MONDAY (5 Hours)
**Goal: Project Setup & Validation**

### Hour 1-2: Backend Setup
- [ ] `npm install` in server folder
- [ ] Verify all dependencies installed
- [ ] Create `.env` file with MongoDB URI & Gemini API key
- [ ] Test: `npm run dev` (should start without errors)
- [ ] Test: Hit `http://localhost:5000/api/health` (should return 401 unauthorized)

**Time Check: 1-2 hours**

### Hour 2-3: Frontend Setup
- [ ] `npm install` in client folder
- [ ] Verify all dependencies installed
- [ ] Test: `npm run dev` (should compile without errors)
- [ ] Test: Visit `http://localhost:5173` (should see login page)

**Time Check: 3 hours total**

### Hour 3-4: E2E Testing
- [ ] Register new user with: name, email, password (8+ chars), age
- [ ] Should see "✅ Account created! Now login."
- [ ] Login with registered credentials
- [ ] Should redirect to Dashboard
- [ ] See "Welcome, [Name]!" in header

**Time Check: 4 hours total**

### Hour 4-5: AI Feature Testing
- [ ] Add a health metric (e.g., Weight: 75 kg)
- [ ] Should see "✅ Metric recorded successfully!"
- [ ] Click "Get AI Suggestion" button
- [ ] Ask: "How is my health based on my metrics?"
- [ ] Wait for AI response (should show suggestion + action steps)
- [ ] Verify response is formatted correctly

**Time Check: 5 hours total**

**Deliverables for Day 1:**
- ✅ Backend running on :5000
- ✅ Frontend running on :5173
- ✅ User can register & login
- ✅ Can add health metrics
- ✅ AI assistant responds to queries

---

## 📅 DAY 2 - TUESDAY (5 Hours)
**Goal: Mobile Polish & UI Refinement**

### Hour 1-2: Mobile Testing
- [ ] Open DevTools (F12)
- [ ] Click device toolbar (phone icon)
- [ ] Select "iPhone 14" preset
- [ ] Navigate entire app on mobile:
  - [ ] Login page responsive?
  - [ ] Dashboard readable?
  - [ ] Forms full width?
  - [ ] Hamburger menu works?
  - [ ] Metrics table scrollable?
  - [ ] AI section visible?

**Issues to fix:**
- [ ] Any overlapping text?
- [ ] Any buttons cut off?
- [ ] Any horizontal scrolling (except tables)?
- [ ] Navigation working on mobile?

**Time Check: 2 hours**

### Hour 2-3: UI Polish
- [ ] Test toast notifications:
  - [ ] Register success
  - [ ] Login success
  - [ ] Metric saved success
  - [ ] Error messages display correctly
- [ ] Test loading states:
  - [ ] Login button shows "🔄 Logging in..." when clicked
  - [ ] Metric button shows "⏳ Saving..." when saving
  - [ ] AI button shows "⏳ Asking AI..." when requesting
- [ ] Test empty states:
  - [ ] New user sees "No metrics yet" message
  - [ ] Message suggests what to do next

**Time Check: 3.5 hours**

### Hour 3-4: Responsive CSS Fixes
- [ ] Check all breakpoints:
  - [ ] 480px (mobile)
  - [ ] 768px (tablet)
  - [ ] 1024px (laptop)
- [ ] Fix any layout issues
- [ ] Ensure buttons are touchable (min 44px height on mobile)
- [ ] Test form inputs are large enough on mobile

**Time Check: 4.5 hours**

### Hour 4-5: Screenshot & Testing
- [ ] Take screenshots of:
  - [ ] Desktop view (Dashboard full page)
  - [ ] Mobile view (iPhone 14)
  - [ ] AI suggestion example
  - [ ] Error message example
- [ ] Test on 2+ real devices if possible
- [ ] Record notes on issues found

**Time Check: 5 hours total**

**Deliverables for Day 2:**
- ✅ App looks perfect on mobile
- ✅ All toast notifications working
- ✅ Loading states visible
- ✅ Empty states helpful
- ✅ No horizontal overflow (except tables)

---

## 📅 DAY 3 - WEDNESDAY (5 Hours)
**Goal: Backend Security & Validation**

### Hour 1-2: Test Input Validation
Use Postman to send bad data:

- [ ] Test Register endpoint (`POST /api/auth/register`):
  - [ ] No email → should return 400 error
  - [ ] Invalid email format → should return 400
  - [ ] Password < 8 chars → should return 400
  - [ ] Good data → should return 201 success

- [ ] Test Login endpoint (`POST /api/auth/login`):
  - [ ] Wrong password → should return 401
  - [ ] Non-existent email → should return 401
  - [ ] Good data → should return 200 with token

**Time Check: 2 hours**

### Hour 2-3: Test Health Metrics Validation
- [ ] Test Add Metric endpoint (`POST /api/health/metrics`):
  - [ ] Missing token → should return 401
  - [ ] Invalid metric type → should return 400
  - [ ] Negative value → should return 400
  - [ ] Valid data → should return 201
  
- [ ] Test Get Metrics endpoint (`GET /api/health/metrics`):
  - [ ] Missing token → should return 401
  - [ ] With valid token → should return 200 with array

**Time Check: 3.5 hours**

### Hour 3-4: Test AI Rate Limiting
- [ ] In Postman, send 12 rapid requests to `POST /api/ai/health-assistant`
- [ ] Should fail after 10 requests with rate limit message
- [ ] Wait 60 seconds
- [ ] Should work again

Test Auth Rate Limiting:
- [ ] Send 6 login attempts with wrong password
- [ ] Should fail after 5 attempts
- [ ] Try again → rate limit message
- [ ] Wait 15 minutes (or check code)

**Time Check: 4.5 hours**

### Hour 4-5: Verify Production Readiness
- [ ] Check backend code has NO `console.log()` in production routes
- [ ] All error messages are descriptive (not stack traces)
- [ ] All routes return proper HTTP status codes:
  - [ ] 400 for bad request
  - [ ] 401 for unauthorized
  - [ ] 404 for not found
  - [ ] 500 for server error
- [ ] API keys NOT visible in error messages
- [ ] Sensitive data (passwords) NOT in responses

**Time Check: 5 hours total**

**Deliverables for Day 3:**
- ✅ Input validation working
- ✅ Rate limiting active
- ✅ Error messages helpful
- ✅ Proper HTTP status codes
- ✅ No API keys exposed

---

## 📅 DAY 4 - THURSDAY (5 Hours)
**Goal: Deployment & Testing**

### Hour 1-2: GitHub Setup
- [ ] Create GitHub repo: `week16-health-ai-mvp`
- [ ] Create `.gitignore`:
  ```
  node_modules/
  .env
  .env.local
  .DS_Store
  dist/
  build/
  ```
- [ ] Add README.md
- [ ] Push code to GitHub:
  ```bash
  git init
  git add .
  git commit -m "Initial commit: Health AI MVP with Gemini integration"
  git branch -M main
  git remote add origin https://github.com/YOUR_USERNAME/week16-health-ai-mvp.git
  git push -u origin main
  ```

**Time Check: 2 hours**

### Hour 2-3: Deploy Backend (Choose One)

**Option A: Render (Recommended for Node.js)**
- [ ] Go to render.com
- [ ] Connect GitHub account
- [ ] Create new Web Service from repository
- [ ] Set start command: `npm install && npm start`
- [ ] Add environment variables:
  - [ ] MONGO_URI (MongoDB Atlas URI)
  - [ ] GEMINI_API_KEY
  - [ ] JWT_SECRET
  - [ ] CLIENT_URL (your frontend URL)
- [ ] Deploy
- [ ] Copy backend URL: `https://your-app.onrender.com`

**Option B: Vercel (if using serverless)**
- [ ] Go to vercel.com
- [ ] Import GitHub repository
- [ ] Add environment variables
- [ ] Deploy

**Time Check: 3.5 hours**

### Hour 3-4: Deploy Frontend

**Deploy to Vercel (Recommended)**
- [ ] Update `client` folder only
- [ ] Go to vercel.com
- [ ] Import `client` from GitHub
- [ ] Set build command: `npm run build`
- [ ] Set output directory: `dist`
- [ ] Add environment variable:
  - [ ] `VITE_API_URL=https://your-backend.onrender.com`
- [ ] Deploy
- [ ] Copy frontend URL: `https://your-app.vercel.app`

**Time Check: 4.5 hours**

### Hour 4-5: Verify Deployments
- [ ] Test live backend:
  ```bash
  curl https://your-backend.onrender.com/api/health
  ```
  Should return: `{"status":"Server running ✅"}`

- [ ] Test live frontend:
  - [ ] Visit `https://your-app.vercel.app`
  - [ ] Should see login page
  - [ ] Register new user
  - [ ] Login
  - [ ] Test all features
  - [ ] Test on mobile (DevTools)

**Time Check: 5 hours total**

**Deliverables for Day 4:**
- ✅ Code on GitHub
- ✅ Backend deployed (live URL)
- ✅ Frontend deployed (live URL)
- ✅ Both live sites working
- ✅ Mobile responsive on live site

---

## 📅 DAY 5 - FRIDAY (5 Hours)
**Goal: Recording & Submission**

### Hour 1-2: Prepare Demo Script
Write down what you'll show in the video:
```
1. Login to the app
2. Show Dashboard
3. Add a health metric
4. Use AI Assistant feature
5. Show AI suggestion
6. Open DevTools mobile view
7. Navigate app on mobile
8. Show form submission
9. Show error handling
```

**Time Check: 1 hour**

### Hour 2-3: Record Demo Video (3 minutes)
Record using OBS Studio or Loom:
- [ ] Show live frontend running
- [ ] Register & login
- [ ] Add health metric
- [ ] Click "Get AI Suggestion"
- [ ] Show AI response
- [ ] Open Chrome DevTools (F12)
- [ ] Click device toolbar
- [ ] Select iPhone 14
- [ ] Navigate entire app on mobile
- [ ] Show it's fully responsive

**Tips:**
- Speak clearly
- Go slowly (viewers need to understand)
- Highlight the AI feature (that's the main requirement)
- Show mobile view clearly

**Time Check: 3 hours total**

### Hour 3-4: Test & Export Video
- [ ] Watch video once (check audio, video quality)
- [ ] Export as MP4 (1080p if possible)
- [ ] Upload to YouTube (private) or Google Drive
- [ ] Get shareable link

**Time Check: 4 hours**

### Hour 4-5: Submit
- [ ] Gather links:
  - [ ] Live frontend URL
  - [ ] Live backend URL (optional, for testing)
  - [ ] GitHub repo URL
  - [ ] Video link

- [ ] Go to Google Form: https://forms.gle/i6SvuiS7YrZqRT1w6
- [ ] Fill in all required fields
- [ ] Submit
- [ ] Screenshot confirmation

**Time Check: 5 hours total**

**Deliverables for Day 5:**
- ✅ 3-minute demo video recorded
- ✅ Video shows AI feature working
- ✅ Video shows mobile responsiveness
- ✅ All links submitted to Google Form
- ✅ Confirmation received

---

## 📊 PROGRESS TRACKER

| Day | Task | Status | Notes |
|-----|------|--------|-------|
| Mon | Setup & E2E Test | ⬜ | |
| Tue | Mobile Polish | ⬜ | |
| Wed | Security & Validation | ⬜ | |
| Thu | Deployment | ⬜ | |
| Fri | Recording & Submit | ⬜ | |

---

## 🚨 COMMON MISTAKES TO AVOID

❌ Spending too much time on small features  
✅ Focus on making ONE AI feature work perfectly

❌ Not testing on mobile  
✅ Always test in DevTools mobile view

❌ Pushing API keys to GitHub  
✅ Use .env and .gitignore

❌ Forget to add env vars on hosting  
✅ Add all .env variables to Vercel/Render dashboard

❌ Forgetting to update client API URL  
✅ Set `VITE_API_URL` to your live backend in Vercel

❌ Recording video at 240p  
✅ Record at 1080p minimum

---

## 🎯 SUCCESS CHECKLIST

- [ ] App works locally (both frontend & backend)
- [ ] Can register & login
- [ ] Can add health metrics
- [ ] AI assistant works (Gemini API)
- [ ] Mobile fully responsive
- [ ] No console.log() in backend
- [ ] Input validation working
- [ ] Rate limiting active
- [ ] Error messages are helpful
- [ ] Code on GitHub
- [ ] Frontend deployed
- [ ] Backend deployed
- [ ] Demo video recorded (3 min)
- [ ] All links submitted

---

**You've got this! 5 hours/day for 5 days = DONE! 🚀**
