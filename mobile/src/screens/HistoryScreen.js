import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTranslation } from '../hooks/useTranslation';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function HistoryScreen({ navigation }) {
  const { t } = useTranslation();
  const appointments = [
    { id: 1, doctor: 'Dr. Sarah James', specialty: 'Cardiologist', date: 'Oct 15, 2024', time: '10:30 AM', status: 'Completed' },
    { id: 2, doctor: 'Dr. Michael Chen', specialty: 'Dermatologist', date: 'Sep 28, 2024', time: '02:15 PM', status: 'Completed' },
    { id: 3, doctor: 'Dr. Emily Williams', specialty: 'Neurologist', date: 'Sep 10, 2024', time: '11:00 AM', status: 'Cancelled' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Appointment History</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {appointments.map((appointment) => (
          <View key={appointment.id} style={styles.appointmentCard}>
            <View style={styles.appointmentHeader}>
              <View style={styles.doctorIcon}>
                <MaterialCommunityIcons name="doctor" size={24} color="#1963eb" />
              </View>
              <View style={styles.appointmentInfo}>
                <Text style={styles.doctorName}>{appointment.doctor}</Text>
                <Text style={styles.specialty}>{appointment.specialty}</Text>
              </View>
              <View style={[
                styles.statusBadge,
                appointment.status === 'Completed' ? styles.statusCompleted : styles.statusCancelled
              ]}>
                <Text style={styles.statusText}>{appointment.status}</Text>
              </View>
            </View>
            <View style={styles.appointmentDetails}>
              <View style={styles.detailRow}>
                <MaterialCommunityIcons name="calendar" size={16} color="#94a3b8" />
                <Text style={styles.detailText}>{appointment.date}</Text>
              </View>
              <View style={styles.detailRow}>
                <MaterialCommunityIcons name="clock-outline" size={16} color="#94a3b8" />
                <Text style={styles.detailText}>{appointment.time}</Text>
              </View>
            </View>
          </View>
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
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  appointmentCard: {
    backgroundColor: 'rgba(30,41,59,0.5)',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#334155',
  },
  appointmentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  doctorIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(25,99,235,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  appointmentInfo: {
    flex: 1,
  },
  doctorName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  specialty: {
    fontSize: 12,
    color: '#94a3b8',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusCompleted: {
    backgroundColor: 'rgba(16,185,129,0.1)',
  },
  statusCancelled: {
    backgroundColor: 'rgba(239,68,68,0.1)',
  },
  statusText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#10b981',
  },
  appointmentDetails: {
    flexDirection: 'row',
    gap: 24,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  detailText: {
    fontSize: 14,
    color: '#cbd5e1',
  },
});
