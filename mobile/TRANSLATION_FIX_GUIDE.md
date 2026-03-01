# Translation Fix Guide

## Problem
Only 5 out of 23 screens are using the translation system. Most screens have hardcoded English text.

## Screens Currently Using Translations ✅
1. AuthScreen.js
2. PatientDashboard.js
3. ProfileScreen.js
4. LanguageSettingsScreen.js
5. (One more - need to verify)

## Screens That Need Translation Support ❌
1. EmergencyScreen.js
2. AmbulanceTracking.js
3. AppointmentBooking.js
4. MedicalReports.js
5. MedicineDetection.js
6. NotificationsScreen.js
7. DoctorDashboard.js
8. DoctorSchedule.js
9. DoctorPatients.js
10. DoctorStats.js
11. HospitalDashboard.js
12. FleetManagement.js
13. InventoryManagement.js
14. SuperAdminDashboard.js
15. EditProfile.js
16. HelpSupport.js
17. About.js
18. HistoryScreen.js

## How to Fix Each Screen

### Step 1: Import the translation hook
```javascript
import { useTranslation } from '../hooks/useTranslation';
```

### Step 2: Use the hook in the component
```javascript
export default function MyScreen({ navigation }) {
  const { t } = useTranslation();
  // ... rest of code
}
```

### Step 3: Replace hardcoded text with translation keys
```javascript
// Before:
<Text>Emergency Services</Text>

// After:
<Text>{t('emergency.title')}</Text>
```

## Quick Fix Template

For each screen, follow this pattern:

```javascript
// 1. Add import at top
import { useTranslation } from '../hooks/useTranslation';

// 2. Add hook in component
export default function ScreenName({ navigation }) {
  const { t } = useTranslation();
  
  // 3. Replace text
  return (
    <View>
      <Text>{t('section.key')}</Text>
    </View>
  );
}
```

## Translation Keys Available

All translation keys are defined in:
- `mobile/src/locales/en.js` (English)
- `mobile/src/locales/hi.js` (Hindi)
- `mobile/src/locales/te.js` (Telugu)

Main sections:
- `common.*` - Common UI text (loading, error, success, etc.)
- `auth.*` - Authentication related
- `dashboard.*` - Dashboard items
- `patient.*` - Patient dashboard specific
- `doctor.*` - Doctor dashboard specific
- `hospital.*` - Hospital dashboard specific
- `emergency.*` - Emergency services
- `appointments.*` - Appointment booking
- `reports.*` - Medical reports
- `medicine.*` - Medicine detection
- `profile.*` - Profile settings
- `notifications.*` - Notifications
- `help.*` - Help & support
- `about.*` - About page
- `messages.*` - System messages

## Priority Order (Fix These First)

1. **EmergencyScreen** - Critical feature
2. **AppointmentBooking** - Core functionality
3. **MedicalReports** - Important for users
4. **DoctorDashboard** - Doctor users
5. **HospitalDashboard** - Hospital users
6. **NotificationsScreen** - User engagement
7. **EditProfile** - User settings
8. **HelpSupport** - User assistance
9. **About** - App information
10. Others - Nice to have

## Testing After Fix

1. Run the app
2. Switch language using the translate icon
3. Navigate to each screen
4. Verify all text changes to the selected language
5. Check for any missing translations (will show as keys like "section.key")

## Adding Missing Translation Keys

If you find text that doesn't have a translation key:

1. Add it to all three language files:
   - `mobile/src/locales/en.js`
   - `mobile/src/locales/hi.js`
   - `mobile/src/locales/te.js`

2. Use the same structure in all files:
```javascript
section: {
  newKey: 'English text',
}
```

3. Get translations for Hindi and Telugu (use Google Translate or ask native speakers)

## Common Mistakes to Avoid

1. ❌ Forgetting to import the hook
2. ❌ Not calling the hook (missing `const { t } = useTranslation();`)
3. ❌ Using wrong translation keys
4. ❌ Hardcoding text in some places but translating in others
5. ❌ Not adding translations to all three language files

## Automated Fix Script

You can use this pattern to quickly add translation support:

```bash
# For each screen file:
# 1. Add import
# 2. Add hook usage
# 3. Find and replace hardcoded text with t() calls
```

## Verification Checklist

After fixing each screen:
- [ ] Import added
- [ ] Hook used in component
- [ ] All visible text uses t()
- [ ] Translation keys exist in all language files
- [ ] Tested in all three languages
- [ ] No console errors
- [ ] UI looks correct in all languages
