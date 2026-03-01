import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  ActivityIndicator
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Contacts from 'expo-contacts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../config/api';

export default function EmergencyContactsSetup({ navigation, route }) {
  const { userData } = route.params || {};
  const [contacts, setContacts] = useState([
    { name: '', phone: '', relation: '' },
    { name: '', phone: '', relation: '' },
    { name: '', phone: '', relation: '' },
    { name: '', phone: '', relation: '' }
  ]);
  const [loading, setLoading] = useState(false);

  const requestContactsPermission = async () => {
    const { status } = await Contacts.requestPermissionsAsync();
    return status === 'granted';
  };

  const pickContact = async (index) => {
    const hasPermission = await requestContactsPermission();
    if (!hasPermission) {
      Alert.alert('Permission Required', 'Please grant contacts permission to select emergency contacts');
      return;
    }

    try {
      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.PhoneNumbers, Contacts.Fields.Name],
      });

      if (data.length > 0) {
        // For simplicity, pick first contact. In production, show a picker
        const contact = data[0];
        const phone = contact.phoneNumbers?.[0]?.number || '';
        
        const newContacts = [...contacts];
        newContacts[index] = {
          ...newContacts[index],
          name: contact.name || '',
          phone: phone.replace(/[^0-9+]/g, '')
        };
        setContacts(newContacts);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to access contacts');
    }
  };

  const updateContact = (index, field, value) => {
    const newContacts = [...contacts];
    newContacts[index][field] = value;
    setContacts(newContacts);
  };

  const removeContact = (index) => {
    const newContacts = [...contacts];
    newContacts[index] = { name: '', phone: '', relation: '' };
    setContacts(newContacts);
  };

  const handleSave = async () => {
    // Filter out empty contacts
    const validContacts = contacts.filter(c => c.name && c.phone);
    
    if (validContacts.length === 0) {
      Alert.alert('Required', 'Please add at least one emergency contact');
      return;
    }

    setLoading(true);
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await fetch(`${API_URL}/api/users/emergency-contacts`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ emergencyContacts: validContacts })
      });

      if (!response.ok) {
        throw new Error('Failed to save emergency contacts');
      }

      Alert.alert('Success', 'Emergency contacts saved successfully');
      
      // Navigate to appropriate dashboard
      const dashboardMap = {
        patient: 'PatientDashboard',
        doctor: 'DoctorDashboard',
        hospital: 'HospitalDashboard',
        superadmin: 'SuperAdminDashboard'
      };
      
      const dashboardScreen = dashboardMap[userData?.role] || 'PatientDashboard';
      navigation.replace(dashboardScreen);
    } catch (error) {
      Alert.alert('Error', error.message || 'Failed to save emergency contacts');
    } finally {
      setLoading(false);
    }
  };

  const handleSkip = () => {
    Alert.alert(
      'Skip Setup?',
      'Emergency contacts are important for your safety. You can add them later in your profile.',
      [
        { text: 'Go Back', style: 'cancel' },
        {
          text: 'Skip',
          style: 'destructive',
          onPress: () => {
            const dashboardMap = {
              patient: 'PatientDashboard',
              doctor: 'DoctorDashboard',
              hospital: 'HospitalDashboard',
              superadmin: 'SuperAdminDashboard'
            };
            const dashboardScreen = dashboardMap[userData?.role] || 'PatientDashboard';
            navigation.replace(dashboardScreen);
          }
        }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <MaterialCommunityIcons name="account-multiple-plus" size={48} color="#ef4444" />
          <Text style={styles.title}>Emergency Contacts</Text>
          <Text style={styles.subtitle}>
            Add 3-4 family members or friends who will be notified during emergencies
          </Text>
        </View>

        <View style={styles.infoCard}>
          <MaterialCommunityIcons name="information" size={20} color="#1963eb" />
          <Text style={styles.infoText}>
            These contacts will receive call recordings and alerts when you use the emergency button
          </Text>
        </View>

        {contacts.map((contact, index) => (
          <View key={index} style={styles.contactCard}>
            <View style={styles.contactHeader}>
              <Text style={styles.contactNumber}>Contact {index + 1}</Text>
              {contact.name && (
                <TouchableOpacity onPress={() => removeContact(index)}>
                  <MaterialCommunityIcons name="close-circle" size={20} color="#ef4444" />
                </TouchableOpacity>
              )}
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Name</Text>
              <View style={styles.inputContainer}>
                <MaterialCommunityIcons name="account-outline" size={20} color="#94a3b8" />
                <TextInput
                  style={styles.input}
                  placeholder="Enter name"
                  placeholderTextColor="#94a3b8"
                  value={contact.name}
                  onChangeText={(value) => updateContact(index, 'name', value)}
                />
                <TouchableOpacity onPress={() => pickContact(index)}>
                  <MaterialCommunityIcons name="contacts" size={20} color="#1963eb" />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Phone Number</Text>
              <View style={styles.inputContainer}>
                <MaterialCommunityIcons name="phone-outline" size={20} color="#94a3b8" />
                <TextInput
                  style={styles.input}
                  placeholder="+91 XXXXX XXXXX"
                  placeholderTextColor="#94a3b8"
                  value={contact.phone}
                  onChangeText={(value) => updateContact(index, 'phone', value)}
                  keyboardType="phone-pad"
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Relation</Text>
              <View style={styles.inputContainer}>
                <MaterialCommunityIcons name="heart-outline" size={20} color="#94a3b8" />
                <TextInput
                  style={styles.input}
                  placeholder="e.g., Father, Mother, Spouse"
                  placeholderTextColor="#94a3b8"
                  value={contact.relation}
                  onChangeText={(value) => updateContact(index, 'relation', value)}
                />
              </View>
            </View>
          </View>
        ))}

        <TouchableOpacity
          style={[styles.saveButton, loading && styles.buttonDisabled]}
          onPress={handleSave}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <>
              <MaterialCommunityIcons name="check-circle" size={20} color="#fff" />
              <Text style={styles.saveButtonText}>Save Emergency Contacts</Text>
            </>
          )}
        </TouchableOpacity>

        <TouchableOpacity style={styles.skipButton} onPress={handleSkip} disabled={loading}>
          <Text style={styles.skipButtonText}>Skip for Now</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#101622',
  },
  content: {
    flex: 1,
    padding: 24,
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 16,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#94a3b8',
    textAlign: 'center',
    lineHeight: 20,
  },
  infoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(25,99,235,0.1)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    gap: 12,
    borderWidth: 1,
    borderColor: 'rgba(25,99,235,0.2)',
  },
  infoText: {
    flex: 1,
    fontSize: 12,
    color: '#94a3b8',
    lineHeight: 18,
  },
  contactCard: {
    backgroundColor: 'rgba(30,41,59,0.5)',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#334155',
  },
  contactHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  contactNumber: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1963eb',
  },
  inputGroup: {
    marginBottom: 12,
  },
  inputLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: '#94a3b8',
    marginBottom: 8,
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
    gap: 12,
  },
  input: {
    flex: 1,
    color: '#fff',
    fontSize: 14,
  },
  saveButton: {
    flexDirection: 'row',
    backgroundColor: '#1963eb',
    borderRadius: 12,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
    gap: 8,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  skipButton: {
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 32,
  },
  skipButtonText: {
    fontSize: 14,
    color: '#94a3b8',
    fontWeight: '500',
  },
});
