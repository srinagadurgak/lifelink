import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTranslation } from '../hooks/useTranslation';

export default function DoctorSchedule({ navigation }) {
  const { t } = useTranslation();
  const [selectedDate, setSelectedDate] = useState(26);

  const dates = [24, 25, 26, 27, 28];
  const appointments = [
    { time: '09:00', patient: 'Sarah Jenkins', type: 'Post-Op Checkup', duration: '30 min' },
    { time: '10:00', patient: 'Michael Chen', type: 'Consultation', duration: '45 min' },
    { time: '11:30', patient: 'Elena Rodriguez', type: 'Emergency', duration: '60 min', urgent: true },
    { time: '14:00', patient: 'David Wilson', type: 'Routine ECG', duration: '30 min' },
    { time: '15:30', patient: 'Lisa Anderson', type: 'Follow-up', duration: '30 min' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Schedule</Text>
        <TouchableOpacity style={styles.addBtn}>
          <MaterialCommunityIcons name="plus" size={24} color="#1963eb" />
        </TouchableOpacity>
      </View>

      <View style={styles.calendar}>
        <Text style={styles.monthText}>February 2026</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.dateScroll}>
          {dates.map((date) => (
            <TouchableOpacity
              key={date}
              style={[styles.dateCard, selectedDate === date && styles.dateCardActive]}
              onPress={() => setSelectedDate(date)}
            >
              <Text style={[styles.dateDay, selectedDate === date && styles.dateDayActive]}>
                {date === 24 ? 'Mon' : date === 25 ? 'Tue' : date === 26 ? 'Wed' : date === 27 ? 'Thu' : 'Fri'}
              </Text>
              <Text style={[styles.dateNumber, selectedDate === date && styles.dateNumberActive]}>{date}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>5</Text>
            <Text style={styles.statLabel}>Appointments</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={[styles.statNumber, { color: '#10b981' }]}>3</Text>
            <Text style={styles.statLabel}>Completed</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={[styles.statNumber, { color: '#ef4444' }]}>1</Text>
            <Text style={styles.statLabel}>Urgent</Text>
          </View>
        </View>

        {appointments.map((apt, index) => (
          <View key={index} style={[styles.appointmentCard, apt.urgent && styles.appointmentUrgent]}>
            <View style={styles.timeIndicator}>
              <Text style={styles.timeText}>{apt.time}</Text>
            </View>
            <View style={styles.appointmentInfo}>
              <Text style={styles.patientName}>{apt.patient}</Text>
              <Text style={styles.appointmentType}>{apt.type}</Text>
              <View style={styles.durationRow}>
                <MaterialCommunityIcons name="clock-outline" size={14} color="#94a3b8" />
                <Text style={styles.durationText}>{apt.duration}</Text>
              </View>
            </View>
            {apt.urgent && (
              <View style={styles.urgentBadge}>
                <Text style={styles.urgentText}>URGENT</Text>
              </View>
            )}
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 48,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#334155',
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
  calendar: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#334155',
  },
  monthText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 12,
  },
  dateScroll: {
    marginHorizontal: -16,
    paddingHorizontal: 16,
  },
  dateCard: {
    width: 60,
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 12,
    marginRight: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#334155',
  },
  dateCardActive: {
    backgroundColor: '#1963eb',
    borderColor: '#1963eb',
  },
  dateDay: {
    fontSize: 12,
    color: '#94a3b8',
    marginBottom: 4,
  },
  dateDayActive: {
    color: '#fff',
  },
  dateNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  dateNumberActive: {
    color: '#fff',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  statBox: {
    flex: 1,
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#334155',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1963eb',
  },
  statLabel: {
    fontSize: 12,
    color: '#94a3b8',
    marginTop: 4,
  },
  appointmentCard: {
    flexDirection: 'row',
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#334155',
  },
  appointmentUrgent: {
    borderColor: '#ef4444',
    borderWidth: 2,
  },
  timeIndicator: {
    width: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderRightWidth: 1,
    borderRightColor: '#334155',
    marginRight: 12,
  },
  timeText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1963eb',
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
    fontSize: 14,
    color: '#94a3b8',
    marginBottom: 8,
  },
  durationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  durationText: {
    fontSize: 12,
    color: '#94a3b8',
  },
  urgentBadge: {
    backgroundColor: 'rgba(239,68,68,0.1)',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    alignSelf: 'flex-start',
  },
  urgentText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#ef4444',
  },
});
