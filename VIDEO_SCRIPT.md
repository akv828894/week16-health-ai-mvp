# 🎬 VIDEO RECORDING SCRIPT - Health AI MVP Demo (3 Minutes)

**Duration:** Exactly 3 minutes  
**Tool:** OBS Studio, Loom, or screen recorder  
**Quality:** 1080p if possible  

---

## 📝 SCRIPT BREAKDOWN

### **INTRO (0:00-0:15) - 15 seconds**

```
"Hi! I'm showing you Health AI MVP - a full-stack health tracking app 
with AI-powered suggestions. 

Built with Node.js, React, MongoDB, and Google Gemini AI.

Let me walk you through the features."
```

✅ **Action:** Show desktop, open browser to localhost:5173

---

### **PART 1: Authentication (0:15-0:45) - 30 seconds**

**NARRATE:**
```
"First, let's create an account. The app has secure authentication 
with JWT tokens and password hashing."
```

✅ **Actions:**
1. Click "Sign up" button
2. Fill in form:
   - Name: "Demo User"
   - Email: "demo@health.com"
   - Password: "DemoPass123"
   - Age: "28"
3. Click "Sign Up"
4. **Wait** for success message "✅ Account created!"
5. Click "Already have an account? Login"
6. Enter credentials and login

**Expected:** Dashboard appears with "Welcome, Demo User!"

---

### **PART 2: Dashboard Overview (0:45-1:30) - 45 seconds**

**NARRATE:**
```
"Great! Here's the main dashboard. On the left, we have:
- A form to add health metrics
- The AI Assistant for personalized suggestions

On the right, we can see all recorded metrics with their history."
```

✅ **Actions:**
1. **Point** to form section on left
2. **Point** to AI section
3. **Point** to metrics list on right (should show "No metrics yet")

**Narrate:**
```
"Let's add a health metric to get started."
```

---

### **PART 3: Add Health Metric (1:30-2:00) - 30 seconds**

**NARRATE:**
```
"I'll add a weight measurement. The app supports multiple metric types:
weight, blood pressure, heart rate, calories, steps, and water intake."
```

✅ **Actions:**
1. Click metric type dropdown
2. Select "weight"
3. Enter value: "75"
4. Enter unit: "kg"
5. Add note: "Morning measurement after workout"
6. Click "Save Metric" button
7. **Wait** for spinner and success toast "✅ Metric recorded!"

**See:** Metric appears in the list on the right with timestamp

---

### **PART 4: AI Assistant Feature (2:00-2:45) - 45 seconds**

**NARRATE:**
```
"Now for the star feature - the AI Assistant powered by Google Gemini!

This analyzes your health metrics and gives personalized suggestions 
with actionable steps."
```

✅ **Actions:**
1. Click on AI Assistant textarea
2. Type prompt: "Based on my metrics, what should I do to improve my health?"
3. Click "Get AI Suggestion" button
4. **Wait** for loading spinner (show it working)
5. **Wait** for AI response to appear

**Expected:** Shows suggestion card with:
- Type badge (general/warning/tip)
- Suggestion text
- Actionable steps list

**Narrate while waiting:**
```
"The AI is analyzing your health data and generating personalized recommendations.
This uses Google's latest Gemini 1.5 Flash model for fast, accurate suggestions."
```

---

### **PART 5: Mobile Responsiveness (2:45-3:00) - 15 seconds**

**NARRATE:**
```
"The app is fully responsive and works great on mobile devices too. 
Let me show you the mobile view."
```

✅ **Actions:**
1. Press F12 to open DevTools
2. Click device toolbar (📱 icon)
3. Select "iPhone 14" preset
4. **Show** login form on mobile (full width)
5. Rotate to landscape
6. Show it adapts

**Narrate:**
```
"As you can see, it automatically adapts to different screen sizes - 
perfect for tracking health on the go!"
```

---

### **OUTRO (3:00 exactly) - Wrap up**

**NARRATE:**
```
"That's Health AI MVP! A production-ready full-stack app with:
- Secure authentication
- Health metric tracking
- AI-powered suggestions
- Mobile-responsive design

Built with Node.js, React, MongoDB, and Google Gemini.

Thank you for watching!"
```

---

## 🎥 RECORDING SETUP

### **Before Recording:**

1. **Close all distractions:**
   ```
   - Notifications off
   - Slack/Discord muted
   - Only show this app
   ```

2. **Set up recording:**
   ```
   - Use OBS Studio or Loom
   - 1080p resolution
   - 60fps
   - System audio + microphone
   ```

3. **Test audio:**
   ```
   - Speak clearly and slowly
   - Test microphone volume
   - No background noise
   ```

4. **Prepare browser:**
   ```
   - Clear cache (Ctrl+Shift+Del)
   - Reload page (Ctrl+R)
   - Make sure both servers running
   - Test everything works
   ```

---

## ⏱️ TIMING BREAKDOWN

```
0:00  - 0:15  INTRO (15 sec)
       ↓
0:15  - 0:45  Sign up & Login (30 sec)
       ↓
0:45  - 1:30  Dashboard Overview (45 sec)
       ↓
1:30  - 2:00  Add Health Metric (30 sec)
       ↓
2:00  - 2:45  AI Assistant Demo (45 sec)
       ↓
2:45  - 3:00  Mobile View (15 sec)
       ↓
3:00          TOTAL DURATION
```

---

## 🎙️ VOICE TIPS

- **Speak slowly:** Video is 3 minutes, not rushed
- **Be clear:** Each feature explained simply
- **Use pauses:** Between sections (let actions load)
- **Show enthusiasm:** This is cool tech!
- **Avoid ums/ahs:** Use pauses instead

---

## 📹 RECORDING CHECKLIST

- [ ] Both servers running (backend :5000, frontend :5173)
- [ ] Browser at localhost:5173
- [ ] OBS/Loom open and recording
- [ ] Microphone tested and working
- [ ] No notifications visible
- [ ] Browser in fullscreen
- [ ] Font size readable
- [ ] Internet connection stable

---

## 🎬 RECOMMENDED TOOLS

**Option 1: OBS Studio (FREE)**
```
Download: obsproject.com
Quality: Excellent
Recording: Local file
Export: MP4 1080p
```

**Option 2: Loom (FREE)**
```
Website: loom.com
Quality: Good
Recording: Cloud
Export: Auto-saved link
```

**Option 3: Windows Game Bar (Built-in)**
```
Press: Windows + G
Quality: Good
Recording: Local file
```

---

## 📤 AFTER RECORDING

1. **Watch back:**
   - Check audio quality
   - Verify all features shown
   - Confirm 3-minute length

2. **Export:**
   - Format: MP4
   - Resolution: 1080p
   - Bitrate: 5-8 Mbps

3. **Upload:**
   - YouTube (private/unlisted)
   - Google Drive
   - Loom link
   - Any video platform

4. **Get shareable link:**
   - YouTube: youtube.com/watch?v=...
   - Google Drive: drive.google.com/...
   - Loom: loom.com/share/...

---

## ✅ FINAL CHECKLIST BEFORE SUBMISSION

- [ ] Video recorded (3 minutes exactly)
- [ ] All features demonstrated
- [ ] Audio clear and understandable
- [ ] Mobile view shown
- [ ] Video uploaded to shareable platform
- [ ] Link works (test in incognito)
- [ ] Ready to submit to Google Form

---

## 📋 SUBMISSION FORM FIELDS

When submitting to Google Form (before Friday 11:59 PM):

```
1. Frontend URL:
   https://your-app.vercel.app

2. Backend URL:
   https://your-backend.onrender.com

3. GitHub URL:
   https://github.com/akv828894/week16-health-ai-mvp

4. Video Link:
   [Your video URL]

5. Notes:
   "Health AI MVP - Full-stack app with AI-powered 
    health suggestions. Built with Node.js, React, 
    MongoDB, and Google Gemini."
```

---

## 💡 PRO TIPS

**Timing:**
- Don't rush - speak clearly
- Use loading time to explain features
- Pauses make it easier to follow

**Visuals:**
- Keep mouse movements smooth
- Highlight buttons before clicking
- Pan across UI slowly so viewers see everything

**Audio:**
- Avoid typing sounds
- Silence notifications
- Use professional tone

**Content:**
- Show errors gracefully (if any)
- Explain what each button does
- Highlight the AI feature (it's the coolest!)

---

## 🎯 WHAT JUDGES WANT TO SEE

✅ **Authentication:**
- Working registration form
- Secure login

✅ **Health Tracking:**
- Add metrics form
- Metric display
- Data persistence

✅ **AI Feature (MOST IMPORTANT):**
- Google Gemini integration working
- Real AI suggestions displayed
- Actionable steps shown

✅ **UI/UX:**
- Professional design
- Mobile responsive
- Error handling

✅ **Code Quality:**
- GitHub repo organized
- Proper deployment
- Documentation

---

**Ready? Let's record! 🎬**

Remember:
1. Speak clearly
2. Don't rush
3. Show every feature
4. Highlight the AI
5. Submit on time

Good luck! 🚀
