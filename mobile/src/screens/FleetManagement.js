import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTranslation } from '../hooks/useTranslation';

export default function FleetManagement({ navigation }) {
  const { t } = useTranslation();
  const vehicles = [
    { id: 'AMB-001', plate: 'NY-4522', status: 'active', driver: 'John Smith', location: 'Downtown' },
    { id: 'AMB-002', plate: 'NY-7834', status: 'maintenance', driver: 'Sarah Lee', location: 'Workshop' },
    { id: 'AMB-003', plate: 'NY-2156', status: 'active', driver: 'Mike Ross', location: 'North District' },
    { id: 'AMB-004', plate: 'NY-9012', status: 'inactive', driver: 'Emma Davis', location: 'Parking' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Fleet Management</Text>
        <TouchableOpacity style={styles.addBtn}>
          <MaterialCommunityIcons name="plus" size={24} color="#1963eb" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>12</Text>
            <Text style={styles.statLabel}>Total Fleet</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={[styles.statNumber, { color: '#10b981' }]}>8</Text>
            <Text style={styles.statLabel}>Active</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={[styles.statNumber, { color: '#ef4444' }]}>2</Text>
            <Text style={styles.statLabel}>Maintenance</Text>
          </View>
        </View>

        {vehicles.map((vehicle) => (
          <View key={vehicle.id} style={styles.vehicleCard}>
            <View style={styles.vehicleHeader}>
              <View style={styles.vehicleIcon}>
                <MaterialCommunityIcons name="ambulance" size={24} color="#1963eb" />
              </View>
              <View style={styles.vehicleInfo}>
                <Text style={styles.vehicleId}>{vehicle.id}</Text>
                <Text style={styles.vehiclePlate}>{vehicle.plate}</Text>
              </View>
              <View style={[
                styles.statusBadge,
                vehicle.status === 'active' && styles.statusActive,
                vehicle.status === 'maintenance' && styles.statusMaintenance,
                vehicle.status === 'inactive' && styles.statusInactive,
              ]}>
                <Text style={styles.statusText}>{vehicle.status.toUpperCase()}</Text>
              </View>
            </View>
            <View style={styles.vehicleDetails}>
              <View style={styles.detailRow}>
                <MaterialCommunityIcons name="account" size={16} color="#94a3b8" />
                <Text style={styles.detailText}>{vehicle.driver}</Text>
              </View>
              <View style={styles.detailRow}>
                <MaterialCommunityIcons name="map-marker" size={16} color="#94a3b8" />
                <Text style={styles.detailText}>{vehicle.location}</Text>
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
  vehicleCard: {
    backgroundColor: '#1e293b',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#334155',
  },
  vehicleHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  vehicleIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(25,99,235,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  vehicleInfo: {
    flex: 1,
    marginLeft: 12,
  },
  vehicleId: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  vehiclePlate: {
    fontSize: 12,
    color: '#94a3b8',
    marginTop: 2,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusActive: {
    backgroundColor: 'rgba(16,185,129,0.1)',
  },
  statusMaintenance: {
    backgroundColor: 'rgba(251,191,36,0.1)',
  },
  statusInactive: {
    backgroundColor: 'rgba(148,163,184,0.1)',
  },
  statusText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#fff',
  },
  vehicleDetails: {
    gap: 8,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  detailText: {
    fontSize: 14,
    color: '#94a3b8',
  },
});
