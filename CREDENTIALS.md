# LifeLink Demo Credentials

## Sample User Accounts

All accounts use the password: `password123`

### Patient Account
- **Email:** patient@life.app
- **Password:** password123
- **Role:** Patient
- **Dashboard:** PatientDashboard

### Doctor Account
- **Email:** doctor@life.app
- **Password:** password123
- **Role:** Doctor
- **Dashboard:** DoctorDashboard

### Super Admin Account
- **Email:** superadmin@life.app
- **Password:** password123
- **Role:** Super Admin
- **Dashboard:** SuperAdminDashboard

## Features

### Authentication
- **Sign In:** Login with existing credentials
- **Sign Up:** Create new account with:
  - Full Name
  - Email Address
  - Password (minimum 6 characters)
  - Confirm Password (must match)
  - Role Selection (Patient or Doctor)
  - NMC Code (required for doctors only)
- **Quick Login:** Demo buttons for fast testing of all roles
- **Role-based Redirection:** Automatic navigation to appropriate dashboard
- **Terms & Privacy:** Clickable links to Terms of Service and Privacy Policy

### Splash Screen
- **Fast Loading:** Progress bar starts at 50% for emergency situations
- **Quick Access:** App loads in ~1.5 seconds instead of 3 seconds
- **Emergency Ready:** Optimized for urgent medical situations

### Profile Management
- **Edit Profile:** Update name, email, phone, blood type, age, and address
- **Save Changes:** Profile updates are saved to database and AsyncStorage
- **Real-time Updates:** Changes reflect immediately across the app

### Security & Privacy
- **Password Protection:** Bcrypt encryption for all passwords
- **Terms of Service:** Comprehensive legal terms and conditions
- **Privacy Policy:** Detailed data handling and privacy practices
- **Doctor Verification:** NMC code validation for medical professionals

## Signup Requirements

### For Patients:
- Full Name
- Email Address
- Password (min 6 characters)
- Confirm Password

### For Doctors:
- Full Name
- Email Address
- Password (min 6 characters)
- Confirm Password
- NMC Registration Code (mandatory)

## Authentication Flow

1. User chooses Sign In or Sign Up
2. For signup:
   - Enters personal information
   - Selects role (Patient/Doctor)
   - If doctor, provides NMC code
   - Confirms password matches
3. Backend validates credentials using bcrypt
4. JWT token is generated and returned
5. User data is stored in AsyncStorage
6. User is redirected to role-specific dashboard:
   - Patient → PatientDashboard
   - Doctor → DoctorDashboard
   - SuperAdmin → SuperAdminDashboard

## Profile Update Flow

1. User navigates to Edit Profile
2. Current user data is loaded from AsyncStorage
3. User modifies fields
4. On save, data is sent to backend API
5. Backend updates MongoDB
6. Updated user data is saved to AsyncStorage
7. User is redirected back with success message

## Running the Seed Script

To populate the database with sample data:

```bash
cd backend
node seed.js
```

This will create all sample users with the credentials listed above.

## Notes

- Hospital role has been removed from signup (only Patient and Doctor available)
- Splash screen optimized for emergency situations (50% start)
- Password must be at least 6 characters
- Doctors must provide valid NMC code during registration
- Terms of Service and Privacy Policy are accessible from auth screen
