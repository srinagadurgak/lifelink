import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTranslation } from '../hooks/useTranslation';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function AppointmentBooking({ navigation }) {
  const { t } = useTranslation();
  const [selectedDate, setSelectedDate] = useState(13);
  const [selectedTime, setSelectedTime] = useState('09:30 AM');

  const dates = [
    { day: 'Mon', date: 12 },
    { day: 'Tue', date: 13 },
    { day: 'Wed', date: 14 },
    { day: 'Thu', date: 15 },
    { day: 'Fri', date: 16 },
    { day: 'Sat', date: 17 },
  ];

  const morningSlots = ['09:00 AM', '09:30 AM', '10:00 AM', '10:45 AM', '11:15 AM', '11:30 AM'];
  const afternoonSlots = ['01:00 PM', '01:30 PM', '02:15 PM', '03:00 PM', '03:45 PM', '04:30 PM'];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t('appointments.bookAppointment')}</Text>
        <TouchableOpacity style={styles.moreBtn}>
          <MaterialCommunityIcons name="dots-horizontal" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.doctorCard}>
          <View style={styles.doctorImage}>
            <MaterialCommunityIcons name="doctor" size={40} color="#1963eb" />
          </View>
          <View style={styles.doctorInfo}>
            <View style={styles.availableBadge}>
              <View style={styles.availableDot} />
              <Text style={styles.availableText}>AVAILABLE NOW</Text>
            </View>
            <Text style={styles.doctorName}>Dr. Julian Thorne</Text>
            <Text style={styles.doctorSpecialty}>Cardiology Specialist • 15y exp.</Text>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Select Date</Text>
            <TouchableOpacity>
              <Text style={styles.monthText}>October</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.datesList}>
            {dates.map((item) => (
              <TouchableOpacity
                key={item.date}
                style={[styles.dateCard, selectedDate === item.date && styles.dateCardActive]}
                onPress={() => setSelectedDate(item.date)}
              >
                <Text style={[styles.dateDay, selectedDate === item.date && styles.dateDayActive]}>
                  {item.day}
                </Text>
                <Text style={[styles.dateNumber, selectedDate === item.date && styles.dateNumberActive]}>
                  {item.date}
                </Text>
                {selectedDate === item.date && <View style={styles.dateDot} />}
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Available Time Slots</Text>
          
          <View style={styles.timeSection}>
            <View style={styles.timeSectionHeader}>
              <MaterialCommunityIcons name="weather-sunset-up" size={16} color="#94a3b8" />
              <Text style={styles.timeSectionLabel}>MORNING</Text>
            </View>
            <View style={styles.timeGrid}>
              {morningSlots.map((time) => (
                <TouchableOpacity
                  key={time}
                  style={[
                    styles.timeSlot,
                    selectedTime === time && styles.timeSlotActive,
                    time === '11:15 AM' && styles.timeSlotDisabled,
                  ]}
                  onPress={() => time !== '11:15 AM' && setSelectedTime(time)}
                  disabled={time === '11:15 AM'}
                >
                  <Text style={[
                    styles.timeSlotText,
                    selectedTime === time && styles.timeSlotTextActive,
                    time === '11:15 AM' && styles.timeSlotTextDisabled,
                  ]}>
                    {time}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.timeSection}>
            <View style={styles.timeSectionHeader}>
              <MaterialCommunityIcons name="white-balance-sunny" size={16} color="#94a3b8" />
              <Text style={styles.timeSectionLabel}>AFTERNOON</Text>
            </View>
            <View style={styles.timeGrid}>
              {afternoonSlots.map((time) => (
                <TouchableOpacity
                  key={time}
                  style={[styles.timeSlot, selectedTime === time && styles.timeSlotActive]}
                  onPress={() => setSelectedTime(time)}
                >
                  <Text style={[styles.timeSlotText, selectedTime === time && styles.timeSlotTextActive]}>
                    {time}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>

        <View style={styles.aiCard}>
          <View style={styles.aiIcon}>
            <MaterialCommunityIcons name="brain" size={18} color="#1963eb" />
          </View>
          <View style={styles.aiContent}>
            <Text style={styles.aiLabel}>LIFELINK AI INSIGHTS</Text>
            <Text style={styles.aiText}>
              Based on your heart rate logs from your wearable, this 9:30 AM slot is recommended for better symptom observation.
            </Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.priceRow}>
          <View>
            <Text style={styles.priceLabel}>Total Price</Text>
            <Text style={styles.priceAmount}>$120.00</Text>
          </View>
          <View style={styles.paymentIcons}>
            <View style={styles.paymentIcon}>
              <MaterialCommunityIcons name="credit-card" size={12} color="#64748b" />
            </View>
            <View style={[styles.paymentIcon, styles.paymentIconActive]}>
              <MaterialCommunityIcons name="wallet" size={12} color="#fff" />
            </View>
          </View>
        </View>
        <TouchableOpacity style={styles.confirmBtn}>
          <Text style={styles.confirmBtnText}>Confirm & Pay</Text>
          <MaterialCommunityIcons name="arrow-right" size={20} color="#fff" />
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
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 48,
    paddingBottom: 16,
    backgroundColor: 'rgba(16,22,34,0.8)',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  moreBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#1e293b',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    paddingBottom: 200,
  },
  doctorCard: {
    flexDirection: 'row',
    backgroundColor: 'rgba(30,41,59,0.5)',
    borderRadius: 16,
    padding: 16,
    margin: 16,
    gap: 16,
    borderWidth: 1,
    borderColor: '#334155',
  },
  doctorImage: {
    width: 80,
    height: 80,
    borderRadius: 16,
    backgroundColor: 'rgba(25,99,235,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  doctorInfo: {
    flex: 1,
    gap: 4,
  },
  availableBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  availableDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#10b981',
  },
  availableText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#10b981',
    letterSpacing: 1,
  },
  doctorName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  doctorSpecialty: {
    fontSize: 14,
    color: '#94a3b8',
  },
  section: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  monthText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1963eb',
  },
  datesList: {
    marginLeft: -16,
    paddingLeft: 16,
  },
  dateCard: {
    width: SCREEN_WIDTH * 0.16,
    minWidth: 60,
    height: 96,
    backgroundColor: '#1e293b',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#334155',
  },
  dateCardActive: {
    backgroundColor: '#1963eb',
    borderColor: '#1963eb',
  },
  dateDay: {
    fontSize: 12,
    fontWeight: '500',
    color: '#94a3b8',
  },
  dateDayActive: {
    color: 'rgba(255,255,255,0.8)',
  },
  dateNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 4,
  },
  dateNumberActive: {
    fontSize: 20,
  },
  dateDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#fff',
    marginTop: 4,
  },
  timeSection: {
    marginBottom: 24,
  },
  timeSectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  timeSectionLabel: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#94a3b8',
    letterSpacing: 2,
  },
  timeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  timeSlot: {
    width: '30%',
    minWidth: 90,
    paddingVertical: 12,
    backgroundColor: '#1e293b',
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#334155',
  },
  timeSlotActive: {
    backgroundColor: 'rgba(25,99,235,0.1)',
    borderColor: '#1963eb',
  },
  timeSlotDisabled: {
    opacity: 0.4,
  },
  timeSlotText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
  },
  timeSlotTextActive: {
    color: '#1963eb',
    fontWeight: 'bold',
  },
  timeSlotTextDisabled: {
    color: '#64748b',
  },
  aiCard: {
    flexDirection: 'row',
    backgroundColor: 'rgba(25,99,235,0.1)',
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 16,
    marginTop: 8,
    gap: 12,
    borderWidth: 1,
    borderColor: 'rgba(25,99,235,0.2)',
  },
  aiIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(25,99,235,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  aiContent: {
    flex: 1,
    gap: 4,
  },
  aiLabel: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#94a3b8',
    letterSpacing: 1,
  },
  aiText: {
    fontSize: 12,
    color: '#cbd5e1',
    lineHeight: 18,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 24,
    paddingTop: 40,
    backgroundColor: 'linear-gradient(to top, #101622, transparent)',
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  priceLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: '#94a3b8',
  },
  priceAmount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  paymentIcons: {
    flexDirection: 'row',
    marginLeft: -8,
  },
  paymentIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#cbd5e1',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#101622',
  },
  paymentIconActive: {
    backgroundColor: '#1963eb',
  },
  confirmBtn: {
    flexDirection: 'row',
    backgroundColor: '#1963eb',
    borderRadius: 16,
    height: 64,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    shadowColor: '#1963eb',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 16,
  },
  confirmBtnText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
});
