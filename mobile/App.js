import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Platform } from 'react-native';
import { LanguageProvider } from './src/contexts/LanguageContext';
import SplashScreen from './src/screens/SplashScreen';
import AuthScreen from './src/screens/AuthScreen';
import PatientDashboard from './src/screens/PatientDashboard';
import DoctorDashboard from './src/screens/DoctorDashboard';
import HospitalDashboard from './src/screens/HospitalDashboard';
import SuperAdminDashboard from './src/screens/SuperAdminDashboard';
import EmergencyScreen from './src/screens/EmergencyScreen';
import AmbulanceTracking from './src/screens/AmbulanceTracking';
import AppointmentBooking from './src/screens/AppointmentBooking';
import MedicalReports from './src/screens/MedicalReports';
import MedicineDetection from './src/screens/MedicineDetection';
import ProfileScreen from './src/screens/ProfileScreen';
import HistoryScreen from './src/screens/HistoryScreen';
import NotificationsScreen from './src/screens/NotificationsScreen';
import DoctorSchedule from './src/screens/DoctorSchedule';
import DoctorPatients from './src/screens/DoctorPatients';
import DoctorStats from './src/screens/DoctorStats';
import FleetManagement from './src/screens/FleetManagement';
import InventoryManagement from './src/screens/InventoryManagement';
import EditProfile from './src/screens/EditProfile';
import HelpSupport from './src/screens/HelpSupport';
import About from './src/screens/About';
import LanguageSettingsScreen from './src/screens/LanguageSettingsScreen';
import TermsOfService from './src/screens/TermsOfService';
import PrivacyPolicy from './src/screens/PrivacyPolicy';
import DoctorVerificationScreen from './src/screens/DoctorVerificationScreen';

const Stack = createNativeStackNavigator();

// Custom transition configurations
const screenOptions = {
  headerShown: false,
  animation: 'default',
  animationDuration: 300,
  gestureEnabled: true,
  gestureDirection: 'horizontal',
};

const modalScreenOptions = {
  headerShown: false,
  presentation: 'modal',
  animation: 'slide_from_bottom',
  animationDuration: 300,
  gestureEnabled: true,
  gestureDirection: 'vertical',
};

const fadeScreenOptions = {
  headerShown: false,
  animation: 'fade',
  animationDuration: 200,
};

export default function App() {
  return (
    <LanguageProvider>
      <NavigationContainer>
        <Stack.Navigator 
          initialRouteName="Splash"
          screenOptions={screenOptions}
        >
          <Stack.Screen 
            name="Splash" 
            component={SplashScreen}
            options={fadeScreenOptions}
          />
          <Stack.Screen 
            name="Auth" 
            component={AuthScreen}
            options={fadeScreenOptions}
          />
          <Stack.Screen 
            name="PatientDashboard" 
            component={PatientDashboard}
            options={{
              ...screenOptions,
              animation: 'slide_from_right',
            }}
          />
          <Stack.Screen 
            name="DoctorDashboard" 
            component={DoctorDashboard}
            options={{
              ...screenOptions,
              animation: 'slide_from_right',
            }}
          />
          <Stack.Screen 
            name="HospitalDashboard" 
            component={HospitalDashboard}
            options={{
              ...screenOptions,
              animation: 'slide_from_right',
            }}
          />
          <Stack.Screen 
            name="SuperAdminDashboard" 
            component={SuperAdminDashboard}
            options={{
              ...screenOptions,
              animation: 'slide_from_right',
            }}
          />
          <Stack.Screen 
            name="Emergency" 
            component={EmergencyScreen}
            options={{
              ...modalScreenOptions,
              animation: 'slide_from_bottom',
            }}
          />
          <Stack.Screen 
            name="AmbulanceTracking" 
            component={AmbulanceTracking}
            options={{
              ...screenOptions,
              animation: 'slide_from_right',
            }}
          />
          <Stack.Screen 
            name="AppointmentBooking" 
            component={AppointmentBooking}
            options={{
              ...screenOptions,
              animation: 'slide_from_right',
            }}
          />
          <Stack.Screen 
            name="MedicalReports" 
            component={MedicalReports}
            options={{
              ...screenOptions,
              animation: 'slide_from_right',
            }}
          />
          <Stack.Screen 
            name="MedicineDetection" 
            component={MedicineDetection}
            options={{
              ...screenOptions,
              animation: 'slide_from_bottom',
            }}
          />
          <Stack.Screen 
            name="Profile" 
            component={ProfileScreen}
            options={{
              ...screenOptions,
              animation: 'slide_from_right',
            }}
          />
          <Stack.Screen 
            name="History" 
            component={HistoryScreen}
            options={{
              ...screenOptions,
              animation: 'slide_from_right',
            }}
          />
          <Stack.Screen 
            name="Notifications" 
            component={NotificationsScreen}
            options={{
              ...modalScreenOptions,
              animation: 'slide_from_bottom',
            }}
          />
          <Stack.Screen 
            name="DoctorSchedule" 
            component={DoctorSchedule}
            options={{
              ...screenOptions,
              animation: 'slide_from_right',
            }}
          />
          <Stack.Screen 
            name="DoctorPatients" 
            component={DoctorPatients}
            options={{
              ...screenOptions,
              animation: 'slide_from_right',
            }}
          />
          <Stack.Screen 
            name="DoctorStats" 
            component={DoctorStats}
            options={{
              ...screenOptions,
              animation: 'slide_from_right',
            }}
          />
          <Stack.Screen 
            name="FleetManagement" 
            component={FleetManagement}
            options={{
              ...screenOptions,
              animation: 'slide_from_right',
            }}
          />
          <Stack.Screen 
            name="InventoryManagement" 
            component={InventoryManagement}
            options={{
              ...screenOptions,
              animation: 'slide_from_right',
            }}
          />
          <Stack.Screen 
            name="ProfileScreen" 
            component={ProfileScreen}
            options={{
              ...screenOptions,
              animation: 'slide_from_right',
            }}
          />
          <Stack.Screen 
            name="EditProfile" 
            component={EditProfile}
            options={{
              ...screenOptions,
              animation: 'slide_from_right',
            }}
          />
          <Stack.Screen 
            name="HelpSupport" 
            component={HelpSupport}
            options={{
              ...screenOptions,
              animation: 'slide_from_right',
            }}
          />
          <Stack.Screen 
            name="About" 
            component={About}
            options={{
              ...screenOptions,
              animation: 'slide_from_right',
            }}
          />
          <Stack.Screen 
            name="LanguageSettings" 
            component={LanguageSettingsScreen}
            options={{
              ...screenOptions,
              animation: 'slide_from_right',
            }}
          />
          <Stack.Screen 
            name="TermsOfService" 
            component={TermsOfService}
            options={{
              ...screenOptions,
              animation: 'slide_from_right',
            }}
          />
          <Stack.Screen 
            name="PrivacyPolicy" 
            component={PrivacyPolicy}
            options={{
              ...screenOptions,
              animation: 'slide_from_right',
            }}
          />
          <Stack.Screen 
            name="DoctorVerification" 
            component={DoctorVerificationScreen}
            options={{
              ...screenOptions,
              animation: 'slide_from_right',
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </LanguageProvider>
  );
}
