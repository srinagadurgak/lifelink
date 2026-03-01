# Language Switching Test Guide

## How to Test Language Switching

### Method 1: Using LanguageSwitcher Component (Recommended)

1. Open the app
2. Look for the translate icon (🌐) in the header of these screens:
   - Auth Screen (Login/Signup)
   - Patient Dashboard
   - Profile Screen
3. Tap the translate icon
4. Select your preferred language from the modal:
   - English
   - हिंदी (Hindi)
   - తెలుగు (Telugu)
5. The language will change immediately across all screens

### Method 2: Using Profile Settings

1. Navigate to Profile Screen
2. Tap on "Language" option
3. Select your preferred language
4. All screens will update instantly

## What Should Happen

✅ Language changes immediately (no app restart needed)
✅ All text on all screens updates to the selected language
✅ Language preference is saved and persists after app restart
✅ Navigation between screens maintains the selected language

## Screens with Language Support

All screens use the translation system:
- ✅ Auth Screen (Login/Signup)
- ✅ Patient Dashboard
- ✅ Doctor Dashboard
- ✅ Hospital Dashboard
- ✅ Profile Screen
- ✅ Emergency Screen
- ✅ Appointment Booking
- ✅ Medical Reports
- ✅ And all other screens...

## Technical Details

### How It Works Behind the Scenes

1. **Context Provider**: `LanguageProvider` wraps the entire app in `App.js`
2. **State Management**: Language state is managed globally via React Context
3. **Persistence**: Selected language is saved to AsyncStorage
4. **Auto Re-render**: All components using `useTranslation()` hook automatically re-render when language changes
5. **Instant Updates**: No manual refresh or app restart required

### Code Flow

```
User taps language → LanguageSwitcher calls changeLanguage() 
→ Context state updates → All screens re-render with new translations
→ Language saved to AsyncStorage for persistence
```

## Troubleshooting

If language doesn't change:
1. Make sure the screen is using `useTranslation()` hook
2. Check that text is wrapped in `t()` function: `{t('key.path')}`
3. Verify translation keys exist in all language files

## Adding More Languages

To add a new language:
1. Create new file: `src/locales/[language-code].js`
2. Add translations matching the structure of `en.js`
3. Update `src/locales/index.js` to include the new language
4. Add language to the `languages` array in `index.js`
