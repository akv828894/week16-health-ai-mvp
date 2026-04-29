# Week 16: Health AI MVP - AI Injection & Polish

**Project**: Professional Health Tracking App with AI Assistant  
**Deadline**: Friday 11:59 PM  
**Stack**: React (Vite) + Express + MongoDB + Google Gemini API

## Features
✅ User authentication (Login/Register)  
✅ Health metrics tracking  
✅ AI Health Assistant (powered by Google Gemini)  
✅ Mobile responsive design  
✅ Error handling & validation  
✅ Rate limiting & security  
✅ Beautiful toast notifications  
✅ Loading states & skeleton loaders  

## Daily Work Plan (5 Hours/Day)
- **Monday**: Project setup + Backend structure
- **Tuesday**: Frontend setup + UI components
- **Wednesday**: AI integration + API route
- **Thursday**: Mobile polish + error handling
- **Friday**: Testing + deployment

## Setup Instructions

### Backend
```bash
cd server
npm install
cp .env.example .env
npm run dev
```

### Frontend
```bash
cd client
npm install
npm run dev
```

## Environment Variables (.env)
```
MONGO_URI=mongodb://...
GEMINI_API_KEY=your_gemini_key
JWT_SECRET=your_secret
PORT=5000
```

## API Endpoints
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user
- `GET /api/health/metrics` - Get user health data
- `POST /api/health/metrics` - Add health metric
- `POST /api/ai/health-assistant` - AI health suggestions

---

**Built with ❤️ for Week 16 Code Freeze**
