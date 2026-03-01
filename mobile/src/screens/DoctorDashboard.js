import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTranslation } from '../hooks/useTranslation';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function DoctorDashboard({ navigation }) {
  const { t } = useTranslation();
  const [dutyStatus, setDutyStatus] = useState(true);

  const appointments = [
    { id: 1, time: '09:30', period: 'AM', patient: 'Sarah Jenkins', type: 'Post-Op Checkup', location: 'Room 402' },
    { id: 2, time: '10:45', period: 'AM', patient: 'Michael Chen', type: 'Hypertension Review', location: 'Virtual', isVirtual: true },
    { id: 3, time: '11:15', period: 'AM', patient: 'Elena Rodriguez', type: 'Emergency AI Referral', location: 'Room 101', isUrgent: true },
    { id: 4, time: '01:30', period: 'PM', patient: 'David Wilson', type: 'Routine ECG', location: 'Lab A' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.userInfo}>
          <View style={styles.avatar}>
            <MaterialCommunityIcons name="doctor" size={24} color="#1963eb" />
          </View>
          <View>
            <Text style={styles.userName}>Dr. Julian Vance</Text>
            <Text style={styles.userRole}>Cardiologist • LifeLink AI</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.notificationBtn}>
          <MaterialCommunityIcons name="bell-outline" size={24} color="#64748b" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.dutyCard}>
          <View style={styles.dutyInfo}>
            <Text style={styles.dutyLabel}>DUTY STATUS</Text>
            <Text style={styles.dutyTitle}>Emergency Availability</Text>
            <Text style={styles.dutySubtitle}>Receive urgent ambulance alerts</Text>
          </View>
          <TouchableOpacity
            style={[styles.toggle, dutyStatus && styles.toggleActive]}
            onPress={() => setDutyStatus(!dutyStatus)}
          >
            <View style={[styles.toggleThumb, dutyStatus && styles.toggleThumbActive]} />
          </TouchableOpacity>
        </View>

        <View style={styles.facilitySection}>
          <Text style={styles.inputLabel}>Current Facility</Text>
          <View style={styles.selectContainer}>
            <Text style={styles.selectText}>St. Mary's General Hospital</Text>
            <MaterialCommunityIcons name="chevron-down" size={20} color="#94a3b8" />
          </View>
        </View>

        <TouchableOpacity style={styles.uploadBtn}>
          <MaterialCommunityIcons name="cloud-upload" size={20} color="#fff" />
          <Text style={styles.uploadBtnText}>Upload Digital Prescription</Text>
        </TouchableOpacity>

        <View style={styles.scheduleSection}>
          <View style={styles.scheduleHeader}>
            <Text style={styles.sectionTitle}>Today's Schedule</Text>
            <View style={styles.pendingBadge}>
              <Text style={styles.pendingText}>4 Pending</Text>
            </View>
          </View>

          {appointments.map((apt) => (
            <View key={apt.id} style={[styles.appointmentCard, apt.isUrgent && { opacity: 0.7 }]}>
              <View style={styles.timeBox}>
                <Text style={styles.timeNumber}>{apt.time}</Text>
                <Text style={styles.timePeriod}>{apt.period}</Text>
              </View>
              <View style={styles.appointmentInfo}>
                <Text style={styles.patientName}>{apt.patient}</Text>
                <Text style={styles.appointmentType}>{apt.type} • {apt.location}</Text>
              </View>
              {apt.isVirtual && (
                <View style={styles.virtualBadge}>
                  <MaterialCommunityIcons name="video" size={14} color="#10b981" />
                </View>
              )}
              {apt.isUrgent && (
                <View style={styles.urgentBadge}>
                  <Text style={styles.urgentText}>URGENT</Text>
                </View>
              )}
              {!apt.isVirtual && !apt.isUrgent && (
                <MaterialCommunityIcons name="chevron-right" size={20} color="#1963eb" />
              )}
            </View>
          ))}
        </View>
      </ScrollView>

      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItemActive}>
          <MaterialCommunityIcons name="view-dashboard" size={24} color="#1963eb" />
          <Text style={styles.navTextActive}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('DoctorSchedule')}>
          <MaterialCommunityIcons name="calendar-today" size={24} color="#94a3b8" />
          <Text style={styles.navText}>Schedule</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('DoctorPatients')}>
          <MaterialCommunityIcons name="account-group" size={24} color="#94a3b8" />
          <Text style={styles.navText}>Patients</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('DoctorStats')}>
          <MaterialCommunityIcons name="chart-line" size={24} color="#94a3b8" />
          <Text style={styles.navText}>Stats</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('ProfileScreen')}>
          <MaterialCommunityIcons name="account-outline" size={24} color="#94a3b8" />
          <Text style={styles.navText}>Profile</Text>
        </TouchableOpacity>
      </View>
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
    paddingHorizontal: 24,
    paddingTop: 48,
    paddingBottom: 16,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(25,99,235,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(25,99,235,0.3)',
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  userRole: {
    fontSize: 12,
    color: '#94a3b8',
  },
  notificationBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#1e293b',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingBottom: 100,
  },
  dutyCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(30,41,59,0.5)',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#334155',
  },
  dutyInfo: {
    flex: 1,
    gap: 4,
  },
  dutyLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#1963eb',
    letterSpacing: 1,
  },
  dutyTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  dutySubtitle: {
    fontSize: 12,
    color: '#94a3b8',
  },
  toggle: {
    width: 56,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#334155',
    padding: 4,
    justifyContent: 'center',
  },
  toggleActive: {
    backgroundColor: '#1963eb',
  },
  toggleThumb: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#fff',
  },
  toggleThumbActive: {
    alignSelf: 'flex-end',
  },
  facilitySection: {
    marginBottom: 16,
    gap: 8,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#64748b',
    marginLeft: 4,
  },
  selectContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#334155',
  },
  selectText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#fff',
  },
  uploadBtn: {
    flexDirection: 'row',
    backgroundColor: '#1963eb',
    borderRadius: 12,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    marginBottom: 24,
    shadowColor: '#1963eb',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  uploadBtnText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  scheduleSection: {
    gap: 12,
  },
  scheduleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  pendingBadge: {
    backgroundColor: 'rgba(25,99,235,0.1)',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  pendingText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1963eb',
  },
  appointmentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(30,41,59,0.3)',
    borderRadius: 16,
    padding: 16,
    gap: 16,
    borderWidth: 1,
    borderColor: '#334155',
  },
  timeBox: {
    width: 56,
    backgroundColor: '#1e293b',
    borderRadius: 12,
    paddingVertical: 8,
    alignItems: 'center',
  },
  timeNumber: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#94a3b8',
  },
  timePeriod: {
    fontSize: 12,
    fontWeight: '500',
    color: '#94a3b8',
  },
  appointmentInfo: {
    flex: 1,
  },
  patientName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  appointmentType: {
    fontSize: 12,
    color: '#94a3b8',
  },
  virtualBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(16,185,129,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  urgentBadge: {
    borderWidth: 1,
    borderColor: 'rgba(239,68,68,0.3)',
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  urgentText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#ef4444',
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    backgroundColor: 'rgba(30,41,59,0.8)',
    borderTopWidth: 1,
    borderTopColor: '#334155',
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 32,
    justifyContent: 'space-between',
  },
  navItem: {
    alignItems: 'center',
    gap: 4,
  },
  navItemActive: {
    alignItems: 'center',
    gap: 4,
  },
  navText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#94a3b8',
  },
  navTextActive: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#1963eb',
  },
});
