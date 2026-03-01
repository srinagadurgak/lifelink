# Building APK for LifeLink App

## Your App Uses Expo - Easier Process! 🎉

Since you're using Expo, you have **3 options** to build an APK:

---

## Option 1: EAS Build (Recommended - Cloud Build) ✅

This is the **easiest and most professional** method. Expo builds your APK in the cloud.

### Prerequisites
```bash
# Install EAS CLI globally (one time only)
npm install -g eas-cli

# Login to Expo account
eas login
```

### Step 1: Build APK for Preview/Testing
```bash
cd mobile
eas build --platform android --profile preview
```

### Step 2: Build APK for Production
```bash
cd mobile
eas build --platform android --profile production
```

### What Happens:
1. ✅ Expo uploads your code to their servers
2. ✅ Builds the APK in the cloud (takes 10-20 minutes)
3. ✅ Gives you a download link
4. ✅ APK is signed and ready to share

### Download Your APK:
- Check your terminal for the download link
- Or visit: https://expo.dev/accounts/[your-account]/projects/lifelink-app/builds

---

## Option 2: Local Build with EAS (Free, No Cloud)

Build locally on your computer without uploading to Expo servers.

### Prerequisites
```bash
# Install EAS CLI
npm install -g eas-cli

# Install Android Studio and Android SDK
# Download from: https://developer.android.com/studio
```

### Build Command:
```bash
cd mobile
eas build --platform android --profile preview --local
```

### Advantages:
- ✅ Free (no cloud build minutes used)
- ✅ Faster if you have a good computer
- ✅ Full control over the build process

### Disadvantages:
- ❌ Requires Android Studio installed
- ❌ Requires more disk space (~10GB)
- ❌ First build takes longer to set up

---

## Option 3: Expo Go (Quick Testing Only)

**Note:** This is NOT an APK, but useful for quick testing.

### For Testing on Your Phone:
```bash
cd mobile
npm start
```

Then:
1. Install "Expo Go" app from Play Store
2. Scan the QR code
3. App runs instantly

**Limitation:** This only works for testing. You can't share this with others.

---

## Updating Your App Version

Before building a new version, update these files:

### 1. Update `mobile/app.json`:
```json
{
  "expo": {
    "version": "1.1.0",  // Change this (1.0.0 → 1.1.0 → 1.2.0)
    "android": {
      "versionCode": 2,  // Increment this (1 → 2 → 3 → 4)
      ...
    }
  }
}
```

### Version Rules:
- **versionCode**: Must always increase (1, 2, 3, 4...)
- **version**: Semantic versioning (1.0.0, 1.1.0, 1.2.0)

### Example Updates:
```
First Release:  versionCode: 1, version: "1.0.0"
Bug Fix:        versionCode: 2, version: "1.0.1"
New Feature:    versionCode: 3, version: "1.1.0"
Major Update:   versionCode: 4, version: "2.0.0"
```

---

## Recommended Workflow

### For Development/Testing:
```bash
cd mobile
eas build --platform android --profile preview
```

### For Production/Release:
```bash
cd mobile
eas build --platform android --profile production
```

---

## Build Profiles Explained

Your `eas.json` has 3 profiles:

### 1. **development**
- For internal testing with development features
- Includes debugging tools

### 2. **preview** ✅ (Recommended for Testing)
- Builds APK file
- Good for sharing with testers
- Faster build time

### 3. **production** ✅ (Recommended for Release)
- Optimized for Play Store
- Smaller file size
- Better performance

---

## Step-by-Step: First Time Build

### 1. Install EAS CLI
```bash
npm install -g eas-cli
```

### 2. Login to Expo
```bash
eas login
```
(Create account at expo.dev if you don't have one)

### 3. Configure Build
```bash
cd mobile
eas build:configure
```

### 4. Build APK
```bash
eas build --platform android --profile preview
```

### 5. Wait for Build
- Takes 10-20 minutes
- You'll get a download link

### 6. Download APK
- Click the link in terminal
- Or visit expo.dev dashboard

### 7. Share APK
- Send the APK file to users
- They can install directly

---

## Troubleshooting

### Error: "Not logged in"
```bash
eas login
```

### Error: "Project not configured"
```bash
eas build:configure
```

### Error: "Android SDK not found" (Local build only)
- Install Android Studio
- Set ANDROID_HOME environment variable

### Build Failed
- Check your app.json for errors
- Make sure all dependencies are installed
- Check EAS build logs for details

---

## APK Location

### Cloud Build:
- Download from the link provided in terminal
- Or from: https://expo.dev/accounts/[your-account]/projects/lifelink-app/builds

### Local Build:
- APK will be in the mobile directory
- Look for: `build-[timestamp].apk`

---

## Sharing Your APK

### Method 1: Direct Share
1. Upload APK to Google Drive / Dropbox
2. Share the link
3. Users download and install

### Method 2: QR Code
1. Upload APK to a hosting service
2. Generate QR code for the download link
3. Users scan and install

### Method 3: Play Store (Professional)
1. Build with production profile
2. Create Google Play Developer account ($25 one-time)
3. Upload APK to Play Store
4. Users install from Play Store

---

## Important Notes

### ✅ Advantages of EAS Build:
- No need for Android Studio
- No need for signing keys (handled automatically)
- Works on any computer (Windows, Mac, Linux)
- Professional build process
- Automatic updates support

### ⚠️ Important:
- First build takes longer (15-20 minutes)
- Subsequent builds are faster (5-10 minutes)
- Free tier has limited build minutes
- Keep your Expo account credentials safe

### 💡 Pro Tips:
1. Always test with `preview` profile first
2. Use `production` profile for final release
3. Keep track of version numbers
4. Test APK on real device before sharing
5. Document what changed in each version

---

## Quick Commands Reference

```bash
# Install EAS CLI
npm install -g eas-cli

# Login
eas login

# Build Preview APK
cd mobile
eas build --platform android --profile preview

# Build Production APK
cd mobile
eas build --platform android --profile production

# Build Locally
eas build --platform android --profile preview --local

# Check Build Status
eas build:list

# View Build Details
eas build:view [build-id]
```

---

## Next Steps

1. ✅ Install EAS CLI: `npm install -g eas-cli`
2. ✅ Login: `eas login`
3. ✅ Build: `eas build --platform android --profile preview`
4. ✅ Download APK from the link
5. ✅ Test on your device
6. ✅ Share with others

---

**Need Help?**
- Expo Docs: https://docs.expo.dev/build/setup/
- EAS Build: https://docs.expo.dev/build/introduction/
- Support: https://forums.expo.dev/
