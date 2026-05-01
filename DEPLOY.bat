@echo off
REM ============================================
REM Health AI MVP - Deployment Setup Script
REM ============================================

echo.
echo ========== HEALTH AI MVP DEPLOYMENT ==========
echo.

REM Step 1: Push latest code to GitHub
echo [1/5] Pushing code to GitHub...
cd /d "a:\company projects\week16-health-ai-mvp"
git add .
git commit -m "Ready for deployment" 2>nul
git push
echo ✓ Code pushed to GitHub
echo.

REM Step 2: Information for user
echo [2/5] NEXT STEPS - Manual Deployment:
echo.
echo *** BACKEND DEPLOYMENT ON RENDER ***
echo 1. Go to: https://render.com/dashboard
echo 2. Click "New" → "Web Service"
echo 3. Connect GitHub repo: week16-health-ai-mvp
echo.
echo 4. Fill these settings:
echo    Name: health-ai-backend
echo    Build: cd server ^&^& npm install
echo    Start: cd server ^&^& npm start
echo.
echo 5. Add Environment Variables:
echo    - PORT: 5000
echo    - MONGO_URI: [Get from mongodb.com/cloud/atlas]
echo    - GEMINI_API_KEY: [Get from aistudio.google.com/apikey]
echo    - JWT_SECRET: your_super_secret_jwt_key_2024
echo.
echo 6. Deploy and copy backend URL
echo.

echo *** FRONTEND DEPLOYMENT ON VERCEL ***
echo 1. Go to: https://vercel.com/dashboard
echo 2. Click "Add New" → "Project"
echo 3. Import GitHub repo: week16-health-ai-mvp
echo.
echo 4. Settings:
echo    Root: ./client
echo    Build: npm run build
echo    Output: dist
echo.
echo 5. Add Environment Variable:
echo    VITE_API_URL: https://your-backend.onrender.com/api
echo.
echo 6. Deploy and copy frontend URL
echo.

echo [3/5] IMPORTANT LINKS:
echo ─────────────────────
echo GitHub:    https://github.com/akv828894/week16-health-ai-mvp
echo Render:    https://render.com
echo Vercel:    https://vercel.com
echo MongoDB:   https://mongodb.com/cloud/atlas
echo Gemini:    https://aistudio.google.com/apikey
echo.

echo [4/5] LOCAL TESTING:
echo ──────────────────
echo Frontend: http://localhost:5173
echo Backend:  http://localhost:5000
echo.

echo [5/5] SUBMISSION (Friday before 11:59 PM):
echo ─────────────────────────────────────────
echo 1. Deploy on Render + Vercel
echo 2. Test live URLs
echo 3. Record 3-minute demo video
echo 4. Submit to: https://forms.gle/i6SvuiS7YrZqRT1w6
echo.

echo ========== DEPLOYMENT SCRIPT COMPLETE ==========
pause
