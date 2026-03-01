# Fix Icon Issues

## ⚠️ Current Problem

Your icons are **519x480 pixels** but they need to be **square** (same width and height).

**Required:**
- icon.png: 1024x1024 pixels (square)
- adaptive-icon.png: 1024x1024 pixels (square)

**Current:**
- icon.png: 519x480 pixels ❌
- adaptive-icon.png: 519x480 pixels ❌

---

## 🔧 Quick Fix Options

### Option 1: Resize to Square (Recommended)

Use an image editor to resize to 1024x1024:

**Online Tools:**
- https://www.iloveimg.com/resize-image
- https://www.img2go.com/resize-image
- https://imageresizer.com/

**Steps:**
1. Upload your icon
2. Resize to 1024x1024 pixels
3. Choose "Stretch" or add padding to make square
4. Download and replace in `mobile/assets/`

### Option 2: Use Image Editing Software

**Photoshop/GIMP:**
1. Open icon.png
2. Image → Canvas Size → 1024x1024
3. Center the image
4. Fill background with #1963eb (blue)
5. Save as PNG

**Canva (Free):**
1. Create 1024x1024 design
2. Upload your icon
3. Center it
4. Set background to #1963eb
5. Download as PNG

### Option 3: Crop to Square

If your icon has extra space:
1. Crop to 519x519 (remove 39 pixels from width)
2. Then resize to 1024x1024

---

## 🚀 After Fixing Icons

1. Replace files in `mobile/assets/`:
   - icon.png (1024x1024)
   - adaptive-icon.png (1024x1024)

2. Rebuild with EAS:
```bash
cd mobile
eas build --platform android --profile preview
```

---

## 🎨 Icon Design Tips

For best results:
- Use 1024x1024 pixels
- Keep important content in center (safe zone)
- Use transparent background for adaptive-icon.png
- Use #1963eb background for icon.png
- Test on different Android launchers

---

## ⚡ Temporary Workaround

If you need to build NOW without fixing icons, you can temporarily remove icon references:

**Edit app.json:**
```json
{
  "expo": {
    "icon": null,
    "android": {
      "icon": null,
      "adaptiveIcon": null
    }
  }
}
```

Then build. The app will use default Expo icon.

**Note:** This is NOT recommended for production!

---

## 📏 Correct Dimensions

| File | Required Size | Current Size | Status |
|------|---------------|--------------|--------|
| icon.png | 1024x1024 | 519x480 | ❌ Fix needed |
| adaptive-icon.png | 1024x1024 | 519x480 | ❌ Fix needed |

---

## ✅ Verification

After fixing, verify with:
```bash
npx expo-doctor
```

Should show: "All checks passed"
