import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, Dimensions, Alert, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../config/api';
import LanguageSwitcher from '../components/LanguageSwitcher';
import { useTranslation } from '../hooks/useTranslation';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function AuthScreen({ navigation }) {
  const { t } = useTranslation();
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('patient');
  // Doctor-specific fields
  const [qualification, setQualification] = useState('');
  const [nmcCode, setNmcCode] = useState('');
  const [stateMedicalCouncil, setStateMedicalCouncil] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Email and password are required');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Login failed');
      }

      await AsyncStorage.setItem('token', data.token);
      await AsyncStorage.setItem('user', JSON.stringify(data.user));

      // Role-based dashboard redirection
      const dashboardMap = {
        patient: 'PatientDashboard',
        doctor: 'DoctorDashboard',
        hospital: 'HospitalDashboard',
        superadmin: 'SuperAdminDashboard'
      };

      const dashboardScreen = dashboardMap[data.user.role] || 'PatientDashboard';
      
      navigation.replace(dashboardScreen);
    } catch (error) {
      Alert.alert('Error', error.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async () => {
    if (!email || !password || !name) {
      Alert.alert('Error', 'Name, email and password are required');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters');
      return;
    }

    if (role === 'doctor') {
      if (!qualification || !nmcCode || !stateMedicalCouncil) {
        Alert.alert('Error', 'All doctor fields are required: Qualification, NMC Code, and State Medical Council');
        return;
      }
    }

    setLoading(true);
    try {
      const requestBody = { email, password, name, role };
      
      if (role === 'doctor') {
        requestBody.qualification = qualification;
        requestBody.nmcCode = nmcCode;
        requestBody.stateMedicalCouncil = stateMedicalCouncil;
      }

      const response = await fetch(`${API_URL}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Signup failed');
      }

      await AsyncStorage.setItem('token', data.token);
      await AsyncStorage.setItem('user', JSON.stringify(data.user));

      // Show verification message for doctors
      if (role === 'doctor') {
        Alert.alert(
          'Registration Successful',
          'Your account has been created. Your NMC credentials are pending verification. You will be notified once verified.',
          [{ text: 'OK' }]
        );
      }

      // For patients, navigate to emergency contacts setup
      if (role === 'patient') {
        navigation.replace('EmergencyContactsSetup', { userData: data.user });
        return;
      }

      // Role-based dashboard redirection for non-patients
      const dashboardMap = {
        doctor: 'DoctorDashboard',
        hospital: 'HospitalDashboard',
        superadmin: 'SuperAdminDashboard'
      };

      const dashboardScreen = dashboardMap[data.user.role] || 'PatientDashboard';
      
      navigation.replace(dashboardScreen);
    } catch (error) {
      Alert.alert('Error', error.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  const quickLogin = (userEmail, userPassword) => {
    setEmail(userEmail);
    setPassword(userPassword);
    setIsSignup(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <MaterialCommunityIcons name="heart-pulse" size={28} color="#1963eb" />
          <Text style={styles.headerTitle}>LifeLink</Text>
        </View>
        <LanguageSwitcher iconColor="#fff" iconSize={22} />
      </View>

      <View style={styles.hero}>
        <Text style={styles.title}>{isSignup ? t('auth.signup') : t('auth.login')}</Text>
        <Text style={styles.subtitle}>{isSignup ? t('auth.dontHaveAccount') : t('dashboard.welcome')}</Text>
      </View>

      <View style={styles.formSection}>
        {isSignup && (
          <>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>{t('auth.selectRole')}</Text>
              <View style={styles.roleGrid}>
                <TouchableOpacity 
                  style={[styles.roleCard, role === 'patient' && styles.roleCardActive]}
                  onPress={() => setRole('patient')}
                  disabled={loading}
                >
                  <MaterialCommunityIcons name="account" size={20} color={role === 'patient' ? '#1963eb' : '#94a3b8'} />
                  <Text style={[styles.roleText, role === 'patient' && styles.roleTextActive]}>{t('auth.patient')}</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  style={[styles.roleCard, role === 'doctor' && styles.roleCardActive]}
                  onPress={() => setRole('doctor')}
                  disabled={loading}
                >
                  <MaterialCommunityIcons name="doctor" size={20} color={role === 'doctor' ? '#10b981' : '#94a3b8'} />
                  <Text style={[styles.roleText, role === 'doctor' && styles.roleTextActive]}>{t('auth.doctor')}</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>{t('auth.name')}</Text>
              <View style={styles.inputContainer}>
                <MaterialCommunityIcons name="account-outline" size={20} color="#94a3b8" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder={t('auth.name')}
                  placeholderTextColor="#94a3b8"
                  value={name}
                  onChangeText={setName}
                  autoCapitalize="words"
                  editable={!loading}
                />
              </View>
            </View>

            {role === 'doctor' && (
              <>
                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Qualification</Text>
                  <View style={styles.inputContainer}>
                    <MaterialCommunityIcons name="school-outline" size={20} color="#94a3b8" style={styles.inputIcon} />
                    <TextInput
                      style={styles.input}
                      placeholder="e.g., MBBS, MD, MS"
                      placeholderTextColor="#94a3b8"
                      value={qualification}
                      onChangeText={setQualification}
                      autoCapitalize="characters"
                      editable={!loading}
                    />
                  </View>
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>NMC Registration Number</Text>
                  <View style={styles.inputContainer}>
                    <MaterialCommunityIcons name="card-account-details-outline" size={20} color="#94a3b8" style={styles.inputIcon} />
                    <TextInput
                      style={styles.input}
                      placeholder="Enter your NMC registration number"
                      placeholderTextColor="#94a3b8"
                      value={nmcCode}
                      onChangeText={setNmcCode}
                      autoCapitalize="characters"
                      editable={!loading}
                    />
                  </View>
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>State Medical Council</Text>
                  <View style={styles.inputContainer}>
                    <MaterialCommunityIcons name="map-marker-outline" size={20} color="#94a3b8" style={styles.inputIcon} />
                    <TextInput
                      style={styles.input}
                      placeholder="e.g., Maharashtra Medical Council"
                      placeholderTextColor="#94a3b8"
                      value={stateMedicalCouncil}
                      onChangeText={setStateMedicalCouncil}
                      editable={!loading}
                    />
                  </View>
                </View>
              </>
            )}
          </>
        )}

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>{t('auth.email')}</Text>
          <View style={styles.inputContainer}>
            <MaterialCommunityIcons name="email-outline" size={20} color="#94a3b8" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder={t('auth.email')}
              placeholderTextColor="#94a3b8"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              editable={!loading}
            />
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>{t('auth.password')}</Text>
          <View style={styles.inputContainer}>
            <MaterialCommunityIcons name="lock-outline" size={20} color="#94a3b8" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder={t('auth.password')}
              placeholderTextColor="#94a3b8"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              autoCapitalize="none"
              editable={!loading}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <MaterialCommunityIcons 
                name={showPassword ? "eye-off" : "eye"} 
                size={20} 
                color="#94a3b8" 
              />
            </TouchableOpacity>
          </View>
        </View>

        {isSignup && (
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>{t('auth.confirmPassword')}</Text>
            <View style={styles.inputContainer}>
              <MaterialCommunityIcons name="lock-check-outline" size={20} color="#94a3b8" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder={t('auth.confirmPassword')}
                placeholderTextColor="#94a3b8"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={!showConfirmPassword}
                autoCapitalize="none"
                editable={!loading}
              />
              <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                <MaterialCommunityIcons 
                  name={showConfirmPassword ? "eye-off" : "eye"} 
                  size={20} 
                  color="#94a3b8" 
                />
              </TouchableOpacity>
            </View>
          </View>
        )}

        <TouchableOpacity 
          style={[styles.button, loading && styles.buttonDisabled]} 
          onPress={isSignup ? handleSignup : handleLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>{isSignup ? t('auth.signup') : t('auth.login')}</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.switchModeBtn}
          onPress={() => setIsSignup(!isSignup)}
          disabled={loading}
        >
          <Text style={styles.switchModeText}>
            {isSignup ? t('auth.alreadyHaveAccount') : t('auth.dontHaveAccount')}
            {' '}
            <Text style={styles.switchModeLink}>{isSignup ? t('auth.login') : t('auth.signup')}</Text>
          </Text>
        </TouchableOpacity>

        {!isSignup && (
          <View style={styles.quickLoginSection}>
            <Text style={styles.quickLoginTitle}>Quick Login (Demo)</Text>
            <View style={styles.quickLoginGrid}>
              <TouchableOpacity 
                style={styles.quickLoginBtn}
                onPress={() => quickLogin('patient@life.app', 'password123')}
                disabled={loading}
              >
                <MaterialCommunityIcons name="account" size={18} color="#1963eb" />
                <Text style={styles.quickLoginText}>{t('auth.patient')}</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.quickLoginBtn}
                onPress={() => quickLogin('doctor@life.app', 'password123')}
                disabled={loading}
              >
                <MaterialCommunityIcons name="doctor" size={18} color="#10b981" />
                <Text style={styles.quickLoginText}>{t('auth.doctor')}</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.quickLoginBtn}
                onPress={() => quickLogin('hospital@life.app', 'password123')}
                disabled={loading}
              >
                <MaterialCommunityIcons name="hospital-building" size={18} color="#f59e0b" />
                <Text style={styles.quickLoginText}>{t('auth.hospital')}</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.quickLoginBtn}
                onPress={() => quickLogin('superadmin@life.app', 'password123')}
                disabled={loading}
              >
                <MaterialCommunityIcons name="shield-crown" size={18} color="#fbbf24" />
                <Text style={styles.quickLoginText}>{t('auth.admin')}</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          By {isSignup ? 'signing up' : 'signing in'}, you agree to our{'\n'}
          <Text 
            style={styles.link}
            onPress={() => navigation.navigate('TermsOfService')}
          >
            Terms of Service
          </Text> and{' '}
          <Text 
            style={styles.link}
            onPress={() => navigation.navigate('PrivacyPolicy')}
          >
            Privacy Policy
          </Text>
        </Text>
      </View>
      </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#101622',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: SCREEN_WIDTH * 0.06,
    paddingTop: 20,
    maxWidth: 600,
    width: '100%',
    alignSelf: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  hero: {
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    fontSize: SCREEN_WIDTH * 0.08,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: SCREEN_WIDTH * 0.04,
    color: '#94a3b8',
  },
  roleSection: {
    marginBottom: 24,
  },
  formSection: {
    gap: 16,
  },
  inputGroup: {
    gap: 8,
  },
  inputLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: '#94a3b8',
    marginLeft: 4,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e293b',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#334155',
    paddingHorizontal: 16,
    height: 48,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    color: '#fff',
    fontSize: 16,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  button: {
    backgroundColor: '#1963eb',
    borderRadius: 12,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  quickLoginSection: {
    marginTop: 24,
    padding: 16,
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  quickLoginTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#94a3b8',
    marginBottom: 12,
    textAlign: 'center',
  },
  quickLoginGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  quickLoginBtn: {
    flex: 1,
    minWidth: '45%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 8,
    padding: 12,
    gap: 6,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  quickLoginText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  switchModeBtn: {
    marginTop: 16,
    alignItems: 'center',
  },
  switchModeText: {
    fontSize: 14,
    color: '#94a3b8',
  },
  switchModeLink: {
    color: '#1963eb',
    fontWeight: '600',
  },
  roleGrid: {
    flexDirection: 'row',
    gap: 8,
  },
  roleCard: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 8,
    padding: 10,
    gap: 6,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  roleCardActive: {
    borderColor: '#1963eb',
    borderWidth: 2,
    backgroundColor: 'rgba(25,99,235,0.1)',
  },
  roleText: {
    fontSize: 12,
    color: '#94a3b8',
    fontWeight: '600',
  },
  roleTextActive: {
    color: '#1963eb',
  },
  verificationNote: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    backgroundColor: 'rgba(251,191,36,0.1)',
    padding: 12,
    borderRadius: 8,
    borderLeftWidth: 3,
    borderLeftColor: '#fbbf24',
  },
  verificationNoteText: {
    flex: 1,
    fontSize: 12,
    color: '#fbbf24',
    lineHeight: 18,
  },
  footer: {
    marginTop: 32,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: '#94a3b8',
    textAlign: 'center',
  },
  link: {
    color: '#1963eb',
    fontWeight: '500',
  },
});
