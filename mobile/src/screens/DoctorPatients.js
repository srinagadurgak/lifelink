import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTranslation } from '../hooks/useTranslation';

export default function DoctorPatients({ navigation }) {
  const { t } = useTranslation();
  const patients = [
    { name: 'Sarah Jenkins', age: 45, condition: 'Post-Op Recovery', lastVisit: '2 days ago', status: 'stable' },
    { name: 'Michael Chen', age: 62, condition: 'Hypertension', lastVisit: '1 week ago', status: 'monitoring' },
    { name: 'Elena Rodriguez', age: 38, condition: 'Emergency Care', lastVisit: 'Today', status: 'critical' },
    { name: 'David Wilson', age: 55, condition: 'Cardiac Checkup', lastVisit: '3 days ago', status: 'stable' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Patients</Text>
        <TouchableOpacity style={styles.addBtn}>
          <MaterialCommunityIcons name="plus" size={24} color="#1963eb" />
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <MaterialCommunityIcons name="magnify" size={20} color="#94a3b8" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search patients..."
          placeholderTextColor="#64748b"
        />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {patients.map((patient, index) => (
          <TouchableOpacity key={index} style={styles.patientCard}>
            <View style={styles.patientAvatar}>
              <MaterialCommunityIcons name="account" size={24} color="#1963eb" />
            </View>
            <View style={styles.patientInfo}>
              <Text style={styles.patientName}>{patient.name}</Text>
              <Text style={styles.patientAge}>{patient.age} years old</Text>
              <Text style={styles.patientCondition}>{patient.condition}</Text>
              <Text style={styles.lastVisit}>Last visit: {patient.lastVisit}</Text>
            </View>
            <View style={[
              styles.statusIndicator,
              patient.status === 'stable' && styles.statusStable,
              patient.status === 'monitoring' && styles.statusMonitoring,
              patient.status === 'critical' && styles.statusCritical,
            ]} />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#101622',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 48,
    paddingBottom: 16,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#1e293b',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  addBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(25,99,235,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e293b',
    borderRadius: 12,
    paddingHorizontal: 16,
    marginHorizontal: 16,
    marginBottom: 16,
    height: 48,
    borderWidth: 1,
    borderColor: '#334155',
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    color: '#fff',
    fontSize: 14,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  patientCard: {
    flexDirection: 'row',
    backgroundColor: '#1e293b',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#334155',
  },
  patientAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(25,99,235,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  patientInfo: {
    flex: 1,
    marginLeft: 12,
  },
  patientName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  patientAge: {
    fontSize: 12,
    color: '#94a3b8',
    marginTop: 2,
  },
  patientCondition: {
    fontSize: 14,
    color: '#1963eb',
    marginTop: 4,
  },
  lastVisit: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 4,
  },
  statusIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    alignSelf: 'center',
  },
  statusStable: {
    backgroundColor: '#10b981',
  },
  statusMonitoring: {
    backgroundColor: '#fbbf24',
  },
  statusCritical: {
    backgroundColor: '#ef4444',
  },
});
