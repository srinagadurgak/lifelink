import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTranslation } from '../hooks/useTranslation';

export default function InventoryManagement({ navigation }) {
  const { t } = useTranslation();
  const bloodInventory = [
    { type: 'O+', units: 24, expiring: 2, status: 'normal' },
    { type: 'A+', units: 18, expiring: 0, status: 'normal' },
    { type: 'B+', units: 15, expiring: 1, status: 'normal' },
    { type: 'AB+', units: 12, expiring: 0, status: 'normal' },
    { type: 'O-', units: 8, expiring: 0, status: 'low' },
    { type: 'A-', units: 3, expiring: 1, status: 'critical' },
    { type: 'B-', units: 6, expiring: 0, status: 'low' },
    { type: 'AB-', units: 4, expiring: 0, status: 'low' },
  ];

  const supplies = [
    { name: 'Surgical Masks', quantity: 2400, unit: 'pcs', status: 'normal' },
    { name: 'Gloves', quantity: 1800, unit: 'pairs', status: 'normal' },
    { name: 'Syringes', quantity: 450, unit: 'pcs', status: 'low' },
    { name: 'IV Bags', quantity: 120, unit: 'pcs', status: 'critical' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Inventory</Text>
        <TouchableOpacity style={styles.addBtn}>
          <MaterialCommunityIcons name="plus" size={24} color="#1963eb" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Blood Bank</Text>
          <View style={styles.bloodGrid}>
            {bloodInventory.map((blood) => (
              <View key={blood.type} style={styles.bloodCard}>
                <Text style={styles.bloodType}>{blood.type}</Text>
                <Text style={[
                  styles.bloodUnits,
                  blood.status === 'critical' && styles.bloodCritical,
                  blood.status === 'low' && styles.bloodLow,
                ]}>
                  {blood.units}
                </Text>
                <Text style={styles.bloodLabel}>UNITS</Text>
                {blood.expiring > 0 && (
                  <Text style={styles.expiringText}>{blood.expiring} expiring</Text>
                )}
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Medical Supplies</Text>
          {supplies.map((supply, index) => (
            <View key={index} style={styles.supplyCard}>
              <View style={styles.supplyIcon}>
                <MaterialCommunityIcons name="package-variant" size={24} color="#1963eb" />
              </View>
              <View style={styles.supplyInfo}>
                <Text style={styles.supplyName}>{supply.name}</Text>
                <Text style={styles.supplyQuantity}>
                  {supply.quantity} {supply.unit}
                </Text>
              </View>
              <View style={[
                styles.supplyStatus,
                supply.status === 'normal' && styles.statusNormal,
                supply.status === 'low' && styles.statusLow,
                supply.status === 'critical' && styles.statusCritical,
              ]}>
                <Text style={styles.statusText}>{supply.status.toUpperCase()}</Text>
              </View>
            </View>
          ))}
        </View>
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
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 16,
  },
  bloodGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  bloodCard: {
    width: '23%',
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#334155',
  },
  bloodType: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ef4444',
  },
  bloodUnits: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginVertical: 4,
  },
  bloodCritical: {
    color: '#ef4444',
  },
  bloodLow: {
    color: '#fbbf24',
  },
  bloodLabel: {
    fontSize: 8,
    fontWeight: 'bold',
    color: '#94a3b8',
    letterSpacing: 1,
  },
  expiringText: {
    fontSize: 8,
    color: '#ef4444',
    marginTop: 4,
  },
  supplyCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#334155',
  },
  supplyIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(25,99,235,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  supplyInfo: {
    flex: 1,
    marginLeft: 12,
  },
  supplyName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  supplyQuantity: {
    fontSize: 12,
    color: '#94a3b8',
    marginTop: 2,
  },
  supplyStatus: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusNormal: {
    backgroundColor: 'rgba(16,185,129,0.1)',
  },
  statusLow: {
    backgroundColor: 'rgba(251,191,36,0.1)',
  },
  statusCritical: {
    backgroundColor: 'rgba(239,68,68,0.1)',
  },
  statusText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#fff',
  },
});
