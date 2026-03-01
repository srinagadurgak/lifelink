# Doctor Verification System - Complete Guide

## Overview
LifeLink implements a comprehensive doctor verification system to ensure only qualified medical professionals can provide consultations. The system supports both manual admin verification and automated NMC (National Medical Commission) verification.

## Doctor Signup Process

### Required Fields
When signing up as a doctor, the following information is mandatory:

1. **Full Name** - Doctor's complete name
2. **Email Address** - Professional email
3. **Password** - Minimum 6 characters
4. **Confirm Password** - Must match password
5. **Qualification** - Medical degrees (e.g., MBBS, MD, MS)
6. **NMC Registration Number** - Official NMC registration code
7. **State Medical Council** - Registered state council (e.g., Maharashtra Medical Council)

### Signup Flow
```
1. User selects "Sign Up" on Auth Screen
2. User selects "Doctor" role
3. Additional doctor fields appear
4. User fills all required information
5. System validates all fields
6. Account created with "Pending Verification" status
7. Doctor receives confirmation message
8. Doctor can access dashboard but with limited features
```

## Verification Status

### Three Verification States

1. **Pending** (Default for new doctors)
   - Badge: Yellow clock icon with "Pending Verification"
   - Status: Awaiting admin review
   - Access: Limited dashboard features

2. **Verified** (After successful verification)
   - Badge: Green checkmark with "NMC Verified"
   - Status: Fully verified doctor
   - Access: Full consultation and prescription features

3. **Rejected** (If verification fails)
   - Badge: Red X icon with "Verification Failed"
   - Status: Credentials rejected
   - Access: Cannot provide consultations

## Admin Verification Process

### Manual Verification
Super admins can manually verify doctors through the Doctor Verification Screen:

1. Navigate to "Doctor Verification" from Super Admin Dashboard
2. View list of pending doctors
3. Review doctor credentials:
   - Full Name
   - Qualification
   - NMC Registration Number
   - State Medical Council
4. Choose action:
   - **Approve** - Marks doctor as verified
   - **Reject** - Marks verification as failed
   - **Auto Verify** - Checks NMC database automatically

### Auto Verification
The system can automatically verify doctors by cross-checking with NMC database:

1. Admin clicks "Auto Verify" button
2. System sends NMC code to verification API
3. API checks against NMC public register
4. If valid:
   - Doctor marked as verified
   - Green badge displayed
   - Full access granted
5. If invalid:
   - Verification fails
   - Admin notified

## API Endpoints

### Verification Routes

#### Get Pending Doctors
```
GET /api/verification/pending-doctors
Headers: Authorization: Bearer {token}
Response: Array of pending doctor objects
```

#### Get All Doctors
```
GET /api/verification/doctors
Headers: Authorization: Bearer {token}
Response: Array of all doctor objects with verification status
```

#### Manual Verify Doctor
```
POST /api/verification/verify-doctor/:doctorId
Headers: Authorization: Bearer {token}
Body: {
  adminId: string,
  status: 'verified' | 'rejected'
}
Response: Updated doctor object
```

#### Auto Verify Doctor
```
POST /api/verification/auto-verify-doctor/:doctorId
Headers: Authorization: Bearer {token}
Body: {
  adminId: string
}
Response: Verification result with NMC details
```

#### Check NMC Registration
```
POST /api/verification/check-nmc
Body: {
  nmcCode: string,
  name: string
}
Response: {
  valid: boolean,
  message: string,
  details: object | null
}
```

## Database Schema

### User Model (Doctor Fields)
```javascript
{
  // Basic fields
  email: String (required, unique),
  password: String (required, hashed),
  name: String (required),
  role: String (enum: ['patient', 'doctor', 'hospital', 'superadmin']),
  
  // Doctor-specific fields
  qualification: String,
  nmcCode: String,
  stateMedicalCouncil: String,
  
  // Verification fields
  isVerified: Boolean (default: false),
  verificationStatus: String (enum: ['pending', 'verified', 'rejected']),
  verifiedAt: Date,
  verifiedBy: ObjectId (ref: 'User')
}
```

## UI Components

### VerificationBadge Component
Displays verification status with appropriate styling:

```javascript
<VerificationBadge 
  isVerified={doctor.isVerified}
  verificationStatus={doctor.verificationStatus}
  size="medium" // or "small"
/>
```

**Badge Variants:**
- Pending: Yellow with clock icon
- Verified: Green with checkmark icon
- Rejected: Red with X icon

### DoctorVerificationScreen
Admin interface for managing doctor verifications:

**Features:**
- Filter by status (Pending, Verified, Rejected, All)
- View doctor credentials
- Manual approve/reject buttons
- Auto-verify with NMC check
- Pull-to-refresh functionality

## Security Considerations

1. **Password Hashing**: All passwords encrypted with bcrypt
2. **JWT Authentication**: Secure token-based auth
3. **Role-Based Access**: Only super admins can verify doctors
4. **NMC Validation**: Cross-check with official NMC database
5. **Audit Trail**: Track who verified each doctor and when

## Testing

### Sample Doctor Account
```
Email: doctor@life.app
Password: password123
Qualification: MBBS, MD
NMC Code: NMC12345
State Council: Andhra Pradesh Medical Council
Status: Verified
```

### Testing Verification Flow

1. **Create New Doctor:**
   ```
   - Sign up with doctor role
   - Fill all required fields
   - Use NMC code starting with "NMC" for auto-verify to work
   - Account created with pending status
   ```

2. **Admin Verification:**
   ```
   - Login as superadmin@life.app
   - Navigate to Doctor Verification
   - View pending doctors
   - Test manual approve/reject
   - Test auto-verify feature
   ```

3. **Verify Badge Display:**
   ```
   - Check doctor profile shows correct badge
   - Verify badge color and icon
   - Test different verification states
   ```

## Production Deployment

### NMC API Integration
For production, replace the mock NMC verification with actual NMC API:

```javascript
// In backend/routes/verification.js
router.post('/check-nmc', async (req, res) => {
  const { nmcCode, name } = req.body;
  
  // Replace with actual NMC API call
  const response = await fetch('https://nmc.org.in/api/verify', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${NMC_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ registrationNumber: nmcCode, name })
  });
  
  const data = await response.json();
  res.json(data);
});
```

### Environment Variables
Add to `.env`:
```
NMC_API_KEY=your_nmc_api_key
NMC_API_URL=https://nmc.org.in/api
```

## Troubleshooting

### Common Issues

1. **Doctor can't sign up**
   - Check all required fields are filled
   - Verify password is at least 6 characters
   - Ensure passwords match
   - Confirm NMC code is provided

2. **Auto-verify fails**
   - Check NMC code format (should start with "NMC" in demo)
   - Verify backend server is running
   - Check API endpoint is accessible
   - Review server logs for errors

3. **Badge not showing**
   - Verify user data includes verification status
   - Check VerificationBadge component is imported
   - Ensure isVerified and verificationStatus props are passed

## Future Enhancements

1. **Email Notifications**: Notify doctors when verified/rejected
2. **Document Upload**: Allow doctors to upload certificates
3. **Expiry Tracking**: Monitor NMC registration expiry dates
4. **Bulk Verification**: Verify multiple doctors at once
5. **Verification History**: Track all verification attempts
6. **Appeal Process**: Allow rejected doctors to appeal

## Support

For issues or questions:
- Email: support@lifelink.app
- Documentation: /docs/verification
- API Reference: /api/docs
