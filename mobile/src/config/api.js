// API Configuration
// Update this with your computer's IP address when testing on physical device

// For Android Emulator: use 10.0.2.2
// For iOS Simulator: use localhost
// For Physical Device: use your computer's IP address (e.g., 192.168.1.100)

const API_BASE_URL = __DEV__ 
  ? 'http://10.239.103.96:3000'  // Your computer's IP address
  : 'https://your-production-api.com';

export const API_ENDPOINTS = {
  // Auth
  LOGIN: `${API_BASE_URL}/api/auth/login`,
  REGISTER: `${API_BASE_URL}/api/auth/register`,
  
  // Medicines
  MEDICINE_DETECT: `${API_BASE_URL}/api/medicines/detect`,
  MEDICINE_DETECT_BATCH: `${API_BASE_URL}/api/medicines/detect-batch`,
  MEDICINE_ANALYZE_DOSAGE: `${API_BASE_URL}/api/medicines/analyze-dosage`,
  MEDICINE_SEARCH: `${API_BASE_URL}/api/medicines/search`,
  MEDICINE_SUGGESTIONS: `${API_BASE_URL}/api/medicines/suggestions`,
  
  // Appointments
  APPOINTMENTS: `${API_BASE_URL}/api/appointments`,
  
  // Doctors
  DOCTORS: `${API_BASE_URL}/api/doctors`,
  
  // Hospitals
  HOSPITALS: `${API_BASE_URL}/api/hospitals`,
  
  // Emergency
  EMERGENCY_REQUEST: `${API_BASE_URL}/api/emergency/request`,
  
  // Health Check
  HEALTH: `${API_BASE_URL}/health`,
};

export const API_URL = API_BASE_URL;
export default API_BASE_URL;
