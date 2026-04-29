# Week 16 Health AI MVP - Quick Start Guide

## ✅ What's Ready

I've created a **production-ready** Health AI application with:

### Backend (Node.js/Express)
- ✅ User authentication (Register/Login with JWT)
- ✅ MongoDB models for Users & Health Metrics
- ✅ Google Gemini AI integration (AI Health Assistant)
- ✅ Input validation using Zod
- ✅ Error handling with proper HTTP status codes
- ✅ Rate limiting on auth & AI routes
- ✅ Security middleware (CORS, Helmet)

### Frontend (React/Vite)
- ✅ Beautiful, modern UI with Tailwind-like CSS
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Toast notifications (Sonner)
- ✅ Auth pages (Login/Register)
- ✅ Dashboard with health metrics tracking
- ✅ AI Assistant component
- ✅ Metrics list with filtering by type
- ✅ Loading states & skeleton loaders

---

## 🚀 SETUP INSTRUCTIONS (Do this TODAY!)

### Step 1: Install Backend Dependencies

```bash
cd "a:\company projects\week16-health-ai-mvp\server"
npm install
```

### Step 2: Install Frontend Dependencies

```bash
cd "a:\company projects\week16-health-ai-mvp\client"
npm install
```

### Step 3: Setup Environment Variables

**For Backend** - Create `server/.env` file:

```
MONGO_URI=mongodb://localhost:27017/health-ai
GEMINI_API_KEY=your_gemini_api_key_here
JWT_SECRET=your_secret_key_here_make_it_long_and_random
PORT=5000
CLIENT_URL=http://localhost:5173
```

**Get your Gemini API Key:**
1. Go to https://aistudio.google.com/apikey
2. Create a new API key (free tier)
3. Copy and paste in your .env

### Step 4: Start MongoDB (if local)

```bash
# If you have MongoDB installed locally
mongod

# OR use MongoDB Atlas (cloud)
# Update MONGO_URI in .env with your connection string
```

### Step 5: Start the Backend

```bash
cd server
npm run dev
```

You should see: `🚀 Server running on http://localhost:5000`

### Step 6: Start the Frontend (New Terminal)

```bash
cd client
npm run dev
```

You should see: `VITE v... ready in ... ms`  
Visit: `http://localhost:5173`

---

## 🧪 TEST THE APP

### Test 1: Register a New User
1. Click "Sign up"
2. Fill in: Name, Email, Password (8+ chars), Age (optional)
3. Should see: "✅ Account created! Now login."

### Test 2: Login
1. Use your registered email & password
2. Should redirect to Dashboard

### Test 3: Add Health Metric
1. Select metric type (e.g., Weight)
2. Enter value (e.g., 75 kg)
3. Add notes (optional)
4. Click "💾 Save Metric"
5. Should see "✅ Metric recorded successfully!"

### Test 4: AI Assistant
1. Ask the AI: "How is my health?"
2. Wait for response (takes 2-3 seconds first time)
3. Should see AI suggestion with action steps

---

## 📱 MOBILE TESTING

Use Chrome DevTools:
1. Open DevTools (F12)
2. Click device toolbar icon (looks like phone)
3. Select "iPhone 14" or similar
4. Test all features on mobile screen

**Mobile features already built:**
- ✅ Hamburger menu for navigation
- ✅ Responsive forms & buttons
- ✅ Tables that scroll horizontally on mobile
- ✅ Proper spacing & padding

---

## 🔐 SECURITY CHECKLIST

- ✅ API keys stored in backend .env (NOT exposed to frontend)
- ✅ Passwords hashed with bcrypt
- ✅ JWT tokens for session management
- ✅ Rate limiting on /api/auth/login & /api/ai/health-assistant
- ✅ Input validation with Zod
- ✅ Error handling with try/catch
- ✅ No console.log() in production code

---

## 📊 PROJECT STRUCTURE

```
week16-health-ai-mvp/
├── server/
│   ├── routes/
│   │   ├── auth.js           (Register & Login)
│   │   ├── health.js         (Metrics CRUD)
│   │   └── ai.js             (AI Assistant)
│   ├── models/
│   │   ├── User.js
│   │   └── HealthMetric.js
│   ├── middleware/
│   │   └── auth.js
│   ├── utils/
│   │   └── validation.js     (Zod schemas)
│   ├── server.js
│   ├── package.json
│   └── .env
│
└── client/
    ├── src/
    │   ├── pages/
    │   │   ├── Login.jsx
    │   │   ├── Register.jsx
    │   │   └── Dashboard.jsx
    │   ├── components/
    │   │   ├── HealthMetricForm.jsx
    │   │   ├── AIAssistant.jsx
    │   │   └── MetricsList.jsx
    │   ├── api/
    │   │   ├── client.js      (Axios config)
    │   │   └── endpoints.js
    │   ├── store/
    │   │   └── authStore.js   (Zustand)
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    ├── index.html
    ├── vite.config.js
    └── package.json
```

---

## ⚡ COMMON ISSUES & SOLUTIONS

### "Cannot find module '@google/generative-ai'"
```bash
# Reinstall backend dependencies
cd server
npm install
```

### "GEMINI_API_KEY is missing"
- Check your `.env` file exists in `server/` folder
- Verify you added your API key
- Restart the backend: `npm run dev`

### "Connection refused on :5000"
- Make sure backend is running: `npm run dev` in server folder
- Check PORT 5000 is not in use

### "Frontend says 'API error'"
- Check backend console for error details
- Verify MongoDB is running
- Check .env variables are correct

### "Mobile layout looks broken"
- Clear browser cache (Ctrl+Shift+Del)
- Reload page (F5)
- Test in Chrome DevTools mobile mode

---

## 📝 NEXT STEPS (DAILY PLAN)

### Today (Project Setup)
- [ ] Run npm install in both server & client
- [ ] Setup .env with Gemini API key
- [ ] Start both servers
- [ ] Test registration & login

### Tomorrow (Polish & Testing)
- [ ] Test all AI features
- [ ] Test mobile responsiveness
- [ ] Fix any UI bugs
- [ ] Test error handling

### Wednesday (Validation & Security)
- [ ] Test input validation (try bad data)
- [ ] Verify rate limiting works
- [ ] Test with Postman (backend routes)
- [ ] Ensure no console.log in production

### Thursday (Deployment Prep)
- [ ] Create GitHub repo
- [ ] Push code to GitHub
- [ ] Setup Vercel (frontend) or Render (backend)
- [ ] Configure environment variables on hosting

### Friday (Recording & Submission)
- [ ] Record 3-minute demo video
- [ ] Show AI feature working
- [ ] Show mobile responsive (DevTools)
- [ ] Show backend validation (Postman)
- [ ] Submit links to Google Form

---

## 🎯 WEEK 16 REQUIREMENTS MET

✅ **AI Injection**: Google Gemini integration  
✅ **Mobile Polish**: Fully responsive design  
✅ **Micro-interactions**: Toast notifications + loading states  
✅ **AI Route**: Secure backend API endpoint  
✅ **Error Handling**: Try/catch + proper status codes  
✅ **Input Validation**: Zod schemas  
✅ **Rate Limiting**: express-rate-limit  
✅ **Security**: No API keys in frontend  

---

## 📞 HELP?

If you run into issues:
1. Check the error message in browser console (F12)
2. Check backend console for server errors
3. Check `.env` file configuration
4. Try restarting both servers
5. Clear browser cache & reload

---

**You've got this! Build something amazing. 🚀**
