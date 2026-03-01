# Language Switching Implementation

## Overview
The app supports multi-language functionality with English, Hindi, and Telugu. Language changes are applied instantly across all screens.

## How It Works

### 1. Language Context (`src/contexts/LanguageContext.js`)
- Manages the current language state globally
- Persists language preference using AsyncStorage
- Provides `changeLanguage()` function to update language
- All screens wrapped in `<LanguageProvider>` have access to language state

### 2. Translation Hook (`src/hooks/useTranslation.js`)
- Custom hook that provides the `t()` function for translations
- Automatically re-renders components when language changes
- Usage: `const { t } = useTranslation();`

### 3. Language Switcher Component (`src/components/LanguageSwitcher.js`)
- Modal-based language selector
- Shows current language in header
- Allows users to switch between English, Hindi, and Telugu
- Changes are applied immediately

### 4. Translation Files (`src/locales/`)
- `en.js` - English translations
- `hi.js` - Hindi translations  
- `te.js` - Telugu translations
- `index.js` - Exports translation getter function

## Usage in Screens

```javascript
import { useTranslation } from '../hooks/useTranslation';

const MyScreen = () => {
  const { t } = useTranslation();
  
  return (
    <Text>{t('dashboard.welcome')}</Text>
  );
};
```

## Adding New Translations

1. Add the key-value pair to all language files:
   - `src/locales/en.js`
   - `src/locales/hi.js`
   - `src/locales/te.js`

2. Use the translation in your component:
   ```javascript
   <Text>{t('your.new.key')}</Text>
   ```

## Language Persistence

- Language preference is saved to AsyncStorage
- Automatically loaded when app starts
- Persists across app restarts

## Instant Updates

When a user changes the language:
1. `changeLanguage()` updates the context state immediately
2. All components using `useTranslation()` re-render automatically
3. New translations are displayed instantly
4. No app restart required

## Supported Languages

- English (en)
- Hindi (hi) - हिंदी
- Telugu (te) - తెలుగు
