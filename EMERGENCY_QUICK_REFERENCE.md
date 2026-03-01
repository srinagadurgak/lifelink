# Emergency Feature - Quick Reference

## User Experience Flow

### 1. Emergency Button Press
```
User presses red emergency button → IMMEDIATE ACTION (no confirmation)
```

### 2. Automatic Call Sequence
```
0 seconds:  📞 Call 108 (Ambulance)
            🔴 Bot recording starts
            📍 Location captured
            
2 seconds:  📞 Call 100 (Police)

4 seconds:  📞 Call Emergency Contact 1
6 seconds:  📞 Call Emergency Contact 2
8 seconds:  📞 Call Emergency Contact 3
10 seconds: 📞 Call Emergency Contact 4

Parallel:   📧 SMS sent to all emergency contacts
            💾 Emergency record created
            🗺️ Location shared
```

### 3. Emergency Screen Display
```
┌─────────────────────────────────┐
│     🚨 EMERGENCY CALL 🚨        │
│     🔴 RECORDING                │
├─────────────────────────────────┤
│                                 │
│         [Phone Icon]            │
│      (Pulsing Animation)        │
│                                 │
│   Emergency calls in progress   │
│                                 │
│          00:45                  │
│                                 │
├─────────────────────────────────┤
│ ✅ 108 (Ambulance) - Connected  │
│ ✅ 100 (Police) - Connected     │
│ 📞 Emergency Contacts - Calling │
│ 🔴 Bot Recording - Active       │
├─────────────────────────────────┤
│   [Mute] [Speaker] [Location]   │
│                                 │
│      [END CALL BUTTON]          │
│                                 │
│ Recording will be sent to       │
│ emergency contacts              │
└─────────────────────────────────┘
```

## Technical Implementation

### Frontend (Mobile App)

#### PatientDashboard.js
```javascript
const handleEmergencyPress = () => {
  // NO confirmation - immediate action
  navigation.navigate('EmergencyCall');
};
```

#### EmergencyCallScreen.js
```javascript
// Automatic call sequence
1. Call 108 immediately
2. Call 100 after 2s
3. Call emergency contacts after 4s (2s between each)
4. Bot recording active throughout
5. Real-time status updates
```

### Backend API

#### POST /api/emergency/initiate
- Creates emergency record
- Returns emergencyId
- Stores location and timestamp

#### POST /api/emergency/notify-contacts
- Sends SMS to all emergency contacts
- Message includes: user name, location, timestamp
- Marks notifications as sent

#### POST /api/emergency/end
- Marks emergency as completed
- Records duration
- Triggers recording upload

#### POST /api/emergency/upload-recording
- Uploads call recording to cloud
- Sends recording link to emergency contacts

## Status Indicators

| Icon | Color | Status | Meaning |
|------|-------|--------|---------|
| ⏱️ | Gray | Pending | Waiting to initiate |
| 📞 | Yellow | Calling | Call being placed |
| 🔴 | Red | Active | Recording in progress |
| ✅ | Green | Connected | Call successful |
| ❌ | Red | Failed | Call failed |

## Emergency Contact Notification

### SMS Message Format:
```
🚨 EMERGENCY ALERT 🚨

[User Name] has activated emergency services.

Location: [Latitude], [Longitude]
Time: [Timestamp]

Emergency services (108 & 100) have been contacted.

Call recording will be shared shortly.

- LifeLink Emergency System
```

## Safety Features

1. **No Confirmation Required** - Every second counts in emergencies
2. **Multiple Call Attempts** - Calls 108, 100, and all emergency contacts
3. **Automatic Recording** - Bot records entire emergency session
4. **Location Sharing** - GPS coordinates sent to all parties
5. **SMS Backup** - Text notifications in case calls don't connect
6. **Recording Distribution** - All emergency contacts receive call recording

## Testing Checklist

- [ ] Emergency button press (no confirmation)
- [ ] 108 call initiated immediately
- [ ] 100 call initiated after 2s
- [ ] Emergency contacts called sequentially
- [ ] Bot recording indicator shows active
- [ ] Timer counts up correctly
- [ ] Status indicators update in real-time
- [ ] SMS notifications sent
- [ ] Location captured and shared
- [ ] End call functionality works
- [ ] Recording uploaded after call ends

## Production Requirements

### Must Integrate:
1. **Twilio Voice API** - For actual call recording
2. **SMS Service** - Twilio/AWS SNS for notifications
3. **Cloud Storage** - AWS S3 for recording storage
4. **Location Services** - expo-location for GPS
5. **Push Notifications** - For emergency contact alerts

### Security:
- Encrypt all emergency data
- Secure recording storage
- Audit logging for all emergency calls
- HIPAA compliance for medical data
- Rate limiting on emergency endpoints

## Important Notes

⚠️ **NO CONFIRMATION DIALOGS** - Emergency button triggers immediate action
⚠️ **AUTOMATIC CALLS** - All calls placed automatically without user interaction
⚠️ **RECORDING ALWAYS ON** - Bot recording starts immediately
⚠️ **LOCATION REQUIRED** - GPS must be enabled for emergency services
⚠️ **CONTACTS REQUIRED** - Users should set up emergency contacts during signup
