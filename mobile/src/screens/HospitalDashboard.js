import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTranslation } from '../hooks/useTranslation';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function HospitalDashboard({ navigation }) {
  const { t } = useTranslation();
  const bloodTypes = [
    { type: 'O+', units: 24, status: 'normal' },
    { type: 'A-', units: 3, status: 'critical' },
    { type: 'B+', units: 15, status: 'normal' },
    { type: 'AB-', units: 8, status: 'normal' },
  ];

  const bookings = [
    { id: 1, patient: 'John Doe', type: 'Emergency', status: 'Waiting' },
    { id: 2, patient: 'Sarah Smith', type: 'ICU Transfer', status: 'Dispatched' },
    { id: 3, patient: 'Mike Ross', type: 'General', status: 'Pending' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={styles.hospitalIcon}>
            <MaterialCommunityIcons name="hospital-building" size={20} color="#1963eb" />
          </View>
          <View>
            <Text style={styles.headerTitle}>LifeLink Admin</Text>
            <Text style={styles.headerSubtitle}>City General Hospital</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.notificationBtn}>
          <MaterialCommunityIcons name="bell-outline" size={20} color="#64748b" />
          <View style={styles.notificationDot} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.statsGrid}>
          <View style={styles.statCardPrimary}>
            <MaterialCommunityIcons name="alert-circle" size={20} color="rgba(255,255,255,0.8)" />
            <Text style={styles.statLabel}>Active Dispatch</Text>
            <Text style={styles.statNumber}>12</Text>
            <View style={styles.statBadge}>
              <Text style={styles.statBadgeText}>+2 from 1h ago</Text>
            </View>
          </View>
          <View style={styles.statCard}>
            <MaterialCommunityIcons name="clock-alert-outline" size={20} color="#1963eb" />
            <Text style={styles.statLabelSecondary}>Offline Bookings</Text>
            <Text style={styles.statNumberSecondary}>08</Text>
            <Text style={styles.statAction}>REQUIRES ACTION</Text>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Facility Showcase</Text>
            <TouchableOpacity>
              <Text style={styles.manageText}>Manage</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.galleryList}>
            <TouchableOpacity style={styles.addPhotoCard}>
              <MaterialCommunityIcons name="camera-plus" size={24} color="#94a3b8" />
              <Text style={styles.addPhotoText}>Add Photo</Text>
            </TouchableOpacity>
            <View style={styles.photoCard}>
              <MaterialCommunityIcons name="hospital-box" size={40} color="#334155" />
            </View>
            <View style={styles.photoCard}>
              <MaterialCommunityIcons name="flask" size={40} color="#334155" />
            </View>
          </ScrollView>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Blood Bank Inventory</Text>
          <View style={styles.bloodGrid}>
            {bloodTypes.map((blood) => (
              <View key={blood.type} style={styles.bloodCard}>
                <Text style={styles.bloodType}>{blood.type}</Text>
                <Text style={[styles.bloodUnits, blood.status === 'critical' && styles.bloodUnitsCritical]}>
                  {blood.units}
                </Text>
                <Text style={styles.bloodLabel}>{blood.status === 'critical' ? 'Critical' : 'Units'}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.formCard}>
          <View style={styles.formHeader}>
            <MaterialCommunityIcons name="ambulance" size={20} color="#1963eb" />
            <Text style={styles.formTitle}>Register New Vehicle</Text>
          </View>
          <View style={styles.formRow}>
            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>VEHICLE PLATE</Text>
              <TextInput style={styles.formInput} placeholder="NY-4522" placeholderTextColor="#64748b" />
            </View>
            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>MODEL YEAR</Text>
              <View style={styles.formInput}>
                <Text style={styles.formInputText}>2024</Text>
              </View>
            </View>
          </View>
          <View style={styles.formGroup}>
            <Text style={styles.formLabel}>ASSIGNED CREW</Text>
            <TextInput
              style={styles.formInput}
              placeholder="Driver Name, Paramedic ID"
              placeholderTextColor="#64748b"
            />
          </View>
          <TouchableOpacity style={styles.submitBtn}>
            <Text style={styles.submitBtnText}>Add to Fleet</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Offline Bookings</Text>
            <View style={styles.pendingBadge}>
              <Text style={styles.pendingText}>8 Pending</Text>
            </View>
          </View>
          <View style={styles.tableCard}>
            <View style={styles.tableHeader}>
              <Text style={styles.tableHeaderText}>Patient</Text>
              <Text style={styles.tableHeaderText}>Type</Text>
              <Text style={[styles.tableHeaderText, { textAlign: 'right' }]}>Status</Text>
            </View>
            {bookings.map((booking) => (
              <View key={booking.id} style={styles.tableRow}>
                <Text style={styles.tableCell}>{booking.patient}</Text>
                <Text style={styles.tableCellSecondary}>{booking.type}</Text>
                <View style={styles.tableCellRight}>
                  <View style={[
                    styles.statusBadge,
                    booking.status === 'Waiting' && styles.statusWaiting,
                    booking.status === 'Dispatched' && styles.statusDispatched,
                    booking.status === 'Pending' && styles.statusPending,
                  ]}>
                    <Text style={styles.statusText}>{booking.status}</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItemActive}>
          <MaterialCommunityIcons name="view-dashboard" size={24} color="#1963eb" />
          <Text style={styles.navTextActive}>Dashboard</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('FleetManagement')}>
          <MaterialCommunityIcons name="ambulance" size={24} color="#94a3b8" />
          <Text style={styles.navText}>Fleet</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('InventoryManagement')}>
          <MaterialCommunityIcons name="package-variant" size={24} color="#94a3b8" />
          <Text style={styles.navText}>Inventory</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('ProfileScreen')}>
          <MaterialCommunityIcons name="account-circle-outline" size={24} color="#94a3b8" />
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
    paddingHorizontal: 16,
    paddingTop: 48,
    paddingBottom: 16,
    backgroundColor: 'rgba(16,22,34,0.8)',
    borderBottomWidth: 1,
    borderBottomColor: '#334155',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  hospitalIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: 'rgba(25,99,235,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#94a3b8',
  },
  notificationBtn: {
    position: 'relative',
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#1e293b',
    alignItems: 'center',
    justifyContent: 'center',
  },
  notificationDot: {
    position: 'absolute',
    top: 8,
    right: 10,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ef4444',
    borderWidth: 2,
    borderColor: '#101622',
  },
  content: {
    flex: 1,
    padding: 16,
    paddingBottom: 100,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  statCardPrimary: {
    flex: 1,
    backgroundColor: '#1963eb',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#1963eb',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  statLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: 'rgba(255,255,255,0.9)',
    marginTop: 8,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 4,
  },
  statBadge: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
    alignSelf: 'flex-start',
    marginTop: 8,
  },
  statBadgeText: {
    fontSize: 10,
    color: '#fff',
  },
  statCard: {
    flex: 1,
    backgroundColor: '#1e293b',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#334155',
  },
  statLabelSecondary: {
    fontSize: 14,
    fontWeight: '500',
    color: '#94a3b8',
    marginTop: 8,
  },
  statNumberSecondary: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 4,
  },
  statAction: {
    fontSize: 10,
    fontWeight: '600',
    color: '#ef4444',
    letterSpacing: 1,
    marginTop: 8,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  manageText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1963eb',
  },
  galleryList: {
    marginLeft: -16,
    paddingLeft: 16,
  },
  addPhotoCard: {
    width: SCREEN_WIDTH * 0.35,
    minWidth: 120,
    height: 96,
    borderRadius: 12,
    backgroundColor: '#1e293b',
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#334155',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    gap: 4,
  },
  addPhotoText: {
    fontSize: 10,
    fontWeight: '500',
    color: '#94a3b8',
  },
  photoCard: {
    width: SCREEN_WIDTH * 0.35,
    minWidth: 120,
    height: 96,
    borderRadius: 12,
    backgroundColor: '#1e293b',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  bloodGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 12,
  },
  bloodCard: {
    width: '23%',
    backgroundColor: 'rgba(239,68,68,0.05)',
    borderWidth: 1,
    borderColor: 'rgba(239,68,68,0.1)',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
  },
  bloodType: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ef4444',
  },
  bloodUnits: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginVertical: 4,
  },
  bloodUnitsCritical: {
    color: '#ef4444',
  },
  bloodLabel: {
    fontSize: 8,
    fontWeight: 'bold',
    color: '#94a3b8',
    letterSpacing: 1,
  },
  formCard: {
    backgroundColor: 'rgba(30,41,59,0.5)',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#334155',
  },
  formHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  formTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  formRow: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 16,
  },
  formGroup: {
    flex: 1,
    gap: 4,
  },
  formLabel: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#94a3b8',
    letterSpacing: 1,
    marginLeft: 4,
  },
  formInput: {
    backgroundColor: '#1e293b',
    borderWidth: 1,
    borderColor: '#334155',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 40,
    justifyContent: 'center',
    color: '#fff',
    fontSize: 14,
  },
  formInputText: {
    color: '#fff',
    fontSize: 14,
  },
  submitBtn: {
    backgroundColor: '#1963eb',
    borderRadius: 12,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
    shadowColor: '#1963eb',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  submitBtnText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  pendingBadge: {
    backgroundColor: 'rgba(25,99,235,0.1)',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  pendingText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#1963eb',
  },
  tableCard: {
    backgroundColor: '#1e293b',
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#334155',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: 'rgba(30,41,59,0.8)',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  tableHeaderText: {
    flex: 1,
    fontSize: 10,
    fontWeight: 'bold',
    color: '#94a3b8',
    letterSpacing: 1,
  },
  tableRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(51,65,85,0.5)',
  },
  tableCell: {
    flex: 1,
    fontSize: 14,
    fontWeight: '500',
    color: '#fff',
  },
  tableCellSecondary: {
    flex: 1,
    fontSize: 14,
    color: '#94a3b8',
  },
  tableCellRight: {
    flex: 1,
    alignItems: 'flex-end',
  },
  statusBadge: {
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  statusWaiting: {
    backgroundColor: 'rgba(251,191,36,0.1)',
  },
  statusDispatched: {
    backgroundColor: 'rgba(25,99,235,0.1)',
  },
  statusPending: {
    backgroundColor: 'rgba(148,163,184,0.1)',
  },
  statusText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#fff',
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    backgroundColor: '#1c1f27',
    borderTopWidth: 1,
    borderTopColor: '#334155',
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 24,
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
