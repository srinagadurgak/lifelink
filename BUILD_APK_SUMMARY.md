# Build APK - Quick Start Guide

## ✅ Your App is Ready to Build!

You're using **Expo**, which makes building APKs much easier than traditional React Native.

---

## 🚀 Build Your APK in 3 Steps

### Step 1: Install EAS CLI (One Time Only)
```bash
npm install -g eas-cli
```

### Step 2: Login to Expo
```bash
eas login
```
(Create a free account at expo.dev if you don't have one)

### Step 3: Build APK
```bash
cd mobile
eas build --platform android --profile preview
```

**That's it!** ✨

---

## ⏱️ What Happens Next?

1. ✅ Your code uploads to Expo servers (1-2 minutes)
2. ✅ Expo builds your APK in the cloud (10-20 minutes)
3. ✅ You get a download link in the terminal
4. ✅ Download the APK and share it!

---

## 📱 Testing Your APK

1. Download the APK from the link
2. Transfer to your Android phone
3. Install it (enable "Install from Unknown Sources" if needed)
4. Test all features
5. Share with others!

---

## 🔄 Updating Your App

### Before building a new version:

**Edit `mobile/app.json`:**
```json
{
  "expo": {
    "version": "1.1.0",     // Change: 1.0.0 → 1.1.0 → 1.2.0
    "android": {
      "versionCode": 2      // Change: 1 → 2 → 3 → 4
    }
  }
}
```

**Then build again:**
```bash
cd mobile
eas build --platform android --profile preview
```

**Users can install the new APK over the old one** - no need to uninstall!

---

## 📋 Version Number Rules

| Update Type | Version | Version Code | Example |
|-------------|---------|--------------|---------|
| First Release | 1.0.0 | 1 | Initial launch |
| Bug Fix | 1.0.1 | 2 | Fixed login issue |
| New Feature | 1.1.0 | 3 | Added Hindi support |
| Major Update | 2.0.0 | 4 | Complete redesign |

**Important:**
- ✅ `versionCode` must ALWAYS increase (1, 2, 3, 4...)
- ✅ `version` follows semantic versioning (major.minor.patch)

---

## 🎯 Build Profiles

### Preview (Recommended for Testing)
```bash
eas build --platform android --profile preview
```
- ✅ Faster build
- ✅ Good for testing
- ✅ Easy to share

### Production (For Final Release)
```bash
eas build --platform android --profile production
```
- ✅ Optimized
- ✅ Smaller file size
- ✅ Ready for Play Store

---

## 💡 Pro Tips

### 1. Always Test First
Build with `preview` profile first, test thoroughly, then build `production`.

### 2. Keep Track of Versions
Document what changed in each version:
```
v1.0.0 - Initial release
v1.0.1 - Fixed translation bug
v1.1.0 - Added Telugu language support
```

### 3. Test on Real Device
Always test the APK on a real Android device before sharing.

### 4. Share Easily
Upload to Google Drive or Dropbox and share the link.

---

## 🆘 Troubleshooting

### "eas: command not found"
```bash
npm install -g eas-cli
```

### "Not logged in"
```bash
eas login
```

### "Build failed"
```bash
# Check the logs
eas build:view [build-id]

# Try again
eas build --platform android --profile preview
```

### "Can't install APK"
Enable "Install from Unknown Sources" in Android settings.

---

## 📚 Documentation

- **Full Guide:** See `BUILD_APK_GUIDE.md`
- **Quick Commands:** See `mobile/BUILD_COMMANDS.md`
- **Expo Docs:** https://docs.expo.dev/build/setup/

---

## ✅ Ready to Build?

Run these commands now:

```bash
# 1. Install EAS CLI (if not already installed)
npm install -g eas-cli

# 2. Login
eas login

# 3. Build
cd mobile
eas build --platform android --profile preview
```

Then wait for your APK! 🎉

---

## 🎊 What You Get

After the build completes:
- ✅ A download link in your terminal
- ✅ APK file (~50-100 MB)
- ✅ Ready to install on any Android device
- ✅ Can be shared with anyone
- ✅ No Play Store needed

---

## 🚀 Next Steps After Building

1. Download the APK
2. Install on your phone
3. Test all features:
   - ✅ Login/Signup
   - ✅ Language switching (English, Hindi, Telugu)
   - ✅ Patient dashboard
   - ✅ Doctor dashboard
   - ✅ Emergency features
4. Share with your team
5. Get feedback
6. Make improvements
7. Build new version

---

**Your app is ready to build! Just run the commands above.** 🚀

Need help? Check the detailed guides or ask me!
