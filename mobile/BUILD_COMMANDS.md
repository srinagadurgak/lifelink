# Quick Build Commands

## First Time Setup (One Time Only)

```bash
# 1. Install EAS CLI globally
npm install -g eas-cli

# 2. Login to Expo
eas login

# 3. Navigate to mobile folder
cd mobile
```

---

## Build APK (Every Time)

### For Testing (Recommended First)
```bash
cd mobile
eas build --platform android --profile preview
```

### For Production Release
```bash
cd mobile
eas build --platform android --profile production
```

---

## Before Each Build

### Update Version in `app.json`:
```json
{
  "expo": {
    "version": "1.1.0",     // Increment: 1.0.0 → 1.1.0 → 1.2.0
    "android": {
      "versionCode": 2      // Increment: 1 → 2 → 3 → 4
    }
  }
}
```

---

## Build Process

1. Run build command
2. Wait 10-20 minutes
3. Get download link from terminal
4. Download APK
5. Test on device
6. Share with users

---

## Check Build Status

```bash
# List all builds
eas build:list

# View specific build
eas build:view [build-id]
```

---

## Local Build (No Cloud)

```bash
# Requires Android Studio installed
cd mobile
eas build --platform android --profile preview --local
```

---

## Troubleshooting

### Not logged in?
```bash
eas login
```

### Build failed?
```bash
# Check logs
eas build:view [build-id]

# Try again
eas build --platform android --profile preview
```

### Need to cancel a build?
```bash
eas build:cancel [build-id]
```

---

## Quick Reference

| Command | Purpose |
|---------|---------|
| `eas login` | Login to Expo account |
| `eas build --platform android --profile preview` | Build test APK |
| `eas build --platform android --profile production` | Build release APK |
| `eas build:list` | View all builds |
| `eas build:view [id]` | View build details |
| `eas build:cancel [id]` | Cancel a build |

---

## Your Current Configuration

✅ App Name: LifeLink
✅ Package: com.lifelink.app
✅ Version: 1.0.0
✅ Version Code: 1
✅ EAS Project ID: 32072272-0029-4707-aaa7-9d34a3aaf391

---

## Ready to Build?

Run this now:
```bash
cd mobile
eas build --platform android --profile preview
```

Then wait for the download link! 🚀
