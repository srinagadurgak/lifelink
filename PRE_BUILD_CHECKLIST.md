# Pre-Build Checklist ✅

Before building your APK, make sure everything is ready:

---

## 📋 Essential Checks

### 1. ✅ App Configuration
- [x] App name set: "LifeLink"
- [x] Package name: com.lifelink.app
- [x] Version: 1.0.0
- [x] Version code: 1
- [x] Permissions configured

### 2. ✅ Translation Support
- [x] English translations complete
- [x] Hindi translations complete
- [x] Telugu translations complete
- [x] Language switcher working
- [x] AuthScreen translated

### 3. ✅ Backend Configuration
- [ ] Backend server running
- [ ] API URL configured in `mobile/src/config/api.js`
- [ ] Database seeded with test data

### 4. ✅ Features Working
- [ ] Login/Signup
- [ ] Patient Dashboard
- [ ] Doctor Dashboard
- [ ] Hospital Dashboard
- [ ] Emergency features
- [ ] Language switching

---

## 🔧 Pre-Build Setup

### Install EAS CLI
```bash
npm install -g eas-cli
```

### Login to Expo
```bash
eas login
```

### Check Dependencies
```bash
cd mobile
npm install
```

---

## 🎯 Build Commands

### For Testing (First Build)
```bash
cd mobile
eas build --platform android --profile preview
```

### For Production (Final Release)
```bash
cd mobile
eas build --platform android --profile production
```

---

## ⚠️ Important Notes

### Backend API URL
Make sure your API URL in `mobile/src/config/api.js` is accessible:

**Current:**
```javascript
export const API_URL = 'http://localhost:5000';
```

**For APK, change to:**
```javascript
// Option 1: Use your computer's local IP
export const API_URL = 'http://192.168.1.XXX:5000';

// Option 2: Use a deployed backend
export const API_URL = 'https://your-backend.com';

// Option 3: Use ngrok for testing
export const API_URL = 'https://xxxx.ngrok.io';
```

### Why This Matters:
- ❌ `localhost` won't work on a phone
- ✅ Use your computer's IP address on the same WiFi
- ✅ Or deploy your backend to a server

---

## 🌐 Backend Options

### Option 1: Local Network (Testing)
1. Find your computer's IP address:
   ```bash
   # Windows
   ipconfig
   
   # Look for IPv4 Address (e.g., 192.168.1.5)
   ```

2. Update API URL:
   ```javascript
   export const API_URL = 'http://192.168.1.5:5000';
   ```

3. Make sure phone and computer are on same WiFi

### Option 2: Deploy Backend (Production)
Deploy to:
- Heroku (free tier)
- Railway
- Render
- DigitalOcean
- AWS

### Option 3: Use ngrok (Quick Testing)
```bash
# In backend folder
ngrok http 5000

# Copy the https URL and use in API_URL
```

---

## 📱 Testing Checklist

After building APK:

### Installation
- [ ] APK downloads successfully
- [ ] APK installs on Android device
- [ ] App opens without crashing

### Features
- [ ] Login works
- [ ] Signup works
- [ ] Language switching works (EN, HI, TE)
- [ ] Patient dashboard loads
- [ ] Doctor dashboard loads
- [ ] Emergency features work
- [ ] Navigation works

### Backend Connection
- [ ] API calls work
- [ ] Data loads from backend
- [ ] Authentication works
- [ ] No network errors

---

## 🚀 Build Process

### Step 1: Update API URL (if needed)
```javascript
// mobile/src/config/api.js
export const API_URL = 'http://YOUR_IP:5000';
```

### Step 2: Test Locally First
```bash
cd mobile
npm start
```
Test on Expo Go app to make sure everything works.

### Step 3: Build APK
```bash
cd mobile
eas build --platform android --profile preview
```

### Step 4: Wait for Build
- Takes 10-20 minutes
- Watch the terminal for progress
- Get download link when done

### Step 5: Download & Test
- Download APK from link
- Install on Android device
- Test all features
- Check backend connectivity

### Step 6: Share
- Upload to Google Drive
- Share link with team
- Get feedback

---

## 📊 Version Management

### Current Version
```json
{
  "version": "1.0.0",
  "versionCode": 1
}
```

### Next Update
```json
{
  "version": "1.0.1",  // Bug fixes
  "versionCode": 2
}
```

### Future Updates
```json
{
  "version": "1.1.0",  // New features
  "versionCode": 3
}
```

---

## ✅ Ready to Build?

If all checks pass, run:

```bash
# 1. Make sure backend is accessible
# 2. Update API_URL if needed
# 3. Build APK
cd mobile
eas build --platform android --profile preview
```

---

## 🆘 Common Issues

### Issue: "localhost not accessible"
**Solution:** Change API_URL to your computer's IP address

### Issue: "Build failed"
**Solution:** Check logs with `eas build:view [build-id]`

### Issue: "Can't install APK"
**Solution:** Enable "Install from Unknown Sources" in Android settings

### Issue: "App crashes on open"
**Solution:** Check if API_URL is correct and backend is running

---

## 📞 Need Help?

- Check `BUILD_APK_GUIDE.md` for detailed instructions
- Check `BUILD_APK_SUMMARY.md` for quick start
- Check Expo docs: https://docs.expo.dev/build/setup/

---

**Everything ready? Let's build! 🚀**

```bash
cd mobile
eas build --platform android --profile preview
```
