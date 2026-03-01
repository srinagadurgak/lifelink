# Emergency Call Feature - Immediate Response System

## Overview
This feature implements an immediate emergency response system with:
- **INSTANT** calls to 108 (Ambulance) and 100 (Police) - NO confirmations
- **AUTOMATIC** calls to all emergency contacts
- **SIMULTANEOUS** bot voice recording
- **REAL-TIME** call status tracking
- **AUTOMATIC** notification to emergency contacts with location

## How It Works

### When User Presses Emergency Button:

1. **IMMEDIATE ACTION** - No confirmation dialogs
2. **Automatic Call Sequence**:
   - 0s: Call 108 (Ambulance) initiated
   - 2s: Call 100 (Police) initiated  
   - 4s: Start calling emergency contacts (one by one, 2s apart)
   - 0s: Bot recording starts immediately
3. **Parallel Actions**:
   - Location captured and shared
   - Emergency record created in database
   - SMS notifications sent to all emergency contacts
   - Call recording initiated

### Call Sequence Display:
The emergency screen shows real-time status:
- ⏱️ Pending (gray) - Waiting to call
- 📞 Calling (yellow) - Call being initiated
- 🔴 Active (red) - Recording in progress
- ✅ Connected (green) - Call completed
- ❌ Failed (red) - Call failed

## Installation Steps

### 1. Install Required Dependencies

```bash
cd mobile
npx expo install expo-contacts expo-location
```

### 2. Update App Navigation

Add the new screens to your navigation stack in `mobile/App.js` or your navigation file:

```javascript
import EmergencyContactsSetup from './src/screens/EmergencyContactsSetup';
import EmergencyCallScreen from './src/screens/EmergencyCallScreen';

// In your Stack.Navigator:
<Stack.Screen 
  name="EmergencyContactsSetup" 
  component={EmergencyContactsSetup}
  options={{ headerShown: false }}
/>
<Stack.Screen 
  name="EmergencyCall" 
  component={EmergencyCallScreen}
  options={{ headerShown: false }}
/>
```

### 3. Update app.json Permissions

Add required permissions to `mobile/app.json`:

```json
{
  "expo": {
    "plugins": [
      [
        "expo-contacts",
        {
          "contactsPermission": "Allow LifeLink to access your contacts for emergency contact setup."
        }
      ],
      [
        "expo-location",
        {
          "locationAlwaysAndWhenInUsePermission": "Allow LifeLink to access your location for emergency services."
        }
      ]
    ],
    "android": {
      "permissions": [
        "READ_CONTACTS",
        "ACCESS_FINE_LOCATION",
        "ACCESS_COARSE_LOCATION",
        "CALL_PHONE"
      ]
    },
    "ios": {
      "infoPlist": {
        "NSContactsUsageDescription": "We need access to your contacts to set up emergency contacts.",
        "NSLocationWhenInUseUsageDescription": "We need your location for emergency services.",
        "NSLocationAlwaysUsageDescription": "We need your location for emergency services."
      }
    }
  }
}
```

### 4. Backend Setup

The backend routes are already created. Make sure your backend server is running:

```bash
cd backend
npm install
npm start
```

## Features Implemented

### 1. Emergency Contacts Setup (EmergencyContactsSetup.js)
- Shown after patient signup
- Allows adding 3-4 emergency contacts
- Can pick from device contacts
- Stores contacts in user profile

### 2. Emergency Call Screen (EmergencyCallScreen.js)
- **INSTANT** emergency call initiation - NO confirmations
- Automatically calls in sequence:
  - 108 (Ambulance) - immediately
  - 100 (Police) - after 2 seconds
  - All emergency contacts - after 4 seconds (2s between each)
- Bot recording starts immediately
- Real-time call status display with color-coded indicators
- Shows call timer and recording status
- Notifies emergency contacts with SMS
- Shares location automatically

### 3. Backend API Endpoints

#### POST /api/emergency/initiate
Initiates an emergency call and creates a record.

#### POST /api/emergency/notify-contacts
Sends notifications to all emergency contacts with location and details.

#### POST /api/emergency/end
Ends the emergency call and processes recording.

#### POST /api/emergency/upload-recording
Uploads call recording and sends to emergency contacts.

#### GET /api/emergency/history
Retrieves emergency call history for the user.

#### PUT /api/users/emergency-contacts
Updates user's emergency contacts.

#### GET /api/users/emergency-contacts
Retrieves user's emergency contacts.

## Production Considerations

### Call Recording
In production, integrate with:
- Twilio Voice Recording API
- AWS Transcribe for call transcription
- S3 for recording storage

### SMS/Call Notifications
Integrate with:
- Twilio SMS API
- AWS SNS
- Firebase Cloud Messaging

### Location Services
- Use expo-location to get accurate GPS coordinates
- Send location to emergency services
- Track location during emergency

### Bot Integration
For AI bot call recording:
- Integrate with Twilio Programmable Voice
- Use speech-to-text services (Google Cloud Speech, AWS Transcribe)
- Implement call analysis and emergency detection

## Testing

1. Sign up as a new patient
2. Add emergency contacts during setup
3. Navigate to Patient Dashboard
4. Click the emergency button (red button in bottom nav)
5. Confirm emergency call
6. Test call recording and notifications

## Security Notes

- All emergency data should be encrypted
- Call recordings should be stored securely
- Emergency contacts should only be accessible by the user
- Implement rate limiting on emergency endpoints
- Add audit logging for all emergency calls

## Future Enhancements

- Real-time location tracking during emergency
- Video call support
- Integration with local emergency services APIs
- Automatic medical history sharing with emergency responders
- Multi-language support for emergency calls
- Offline emergency mode
