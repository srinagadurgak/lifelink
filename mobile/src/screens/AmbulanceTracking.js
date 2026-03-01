import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTranslation } from '../hooks/useTranslation';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function AmbulanceTracking({ navigation }) {
  const { t } = useTranslation();
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mapContainer}>
        <View style={styles.mapPlaceholder}>
          <MaterialCommunityIcons name="map" size={48} color="#334155" />
        </View>
      </View>

      <View style={styles.header}>
        <TouchableOpacity style={styles.headerBtn} onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="#fff" />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>Tracking Ambulance</Text>
          <Text style={styles.headerSubtitle}>LifeLink AI Emergency Services</Text>
        </View>
        <TouchableOpacity style={styles.headerBtn}>
          <MaterialCommunityIcons name="share-variant" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.mapControls}>
        <TouchableOpacity style={styles.mapControlBtn}>
          <MaterialCommunityIcons name="layers" size={24} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.mapControlBtn}>
          <MaterialCommunityIcons name="crosshairs-gps" size={24} color="#1963eb" />
        </TouchableOpacity>
      </View>

      <View style={styles.detailsCard}>
        <View style={styles.handle} />

        <View style={styles.etaSection}>
          <View>
            <Text style={styles.etaLabel}>ESTIMATED ARRIVAL</Text>
            <View style={styles.etaRow}>
              <Text style={styles.etaNumber}>08</Text>
              <Text style={styles.etaUnit}>mins</Text>
            </View>
          </View>
          <View style={styles.distanceCard}>
            <Text style={styles.distanceNumber}>1.2 km</Text>
            <Text style={styles.distanceLabel}>DISTANCE</Text>
          </View>
        </View>

        <View style={styles.driverCard}>
          <View style={styles.driverInfo}>
            <View style={styles.driverImageContainer}>
              <View style={styles.driverImage}>
                <MaterialCommunityIcons name="account" size={32} color="#1963eb" />
              </View>
              <View style={styles.onlineBadge} />
            </View>
            <View>
              <Text style={styles.driverName}>Dr. Marcus Chen</Text>
              <View style={styles.driverRating}>
                <MaterialCommunityIcons name="star" size={14} color="#fbbf24" />
                <Text style={styles.ratingText}>4.9 • Senior Paramedic</Text>
              </View>
            </View>
          </View>
          <View style={styles.licensePlate}>
            <Text style={styles.licensePlateLabel}>LICENSE PLATE</Text>
            <View style={styles.licensePlateBox}>
              <Text style={styles.licensePlateText}>AMB-9922</Text>
            </View>
          </View>
        </View>

        <View style={styles.actions}>
          <TouchableOpacity style={styles.callBtn}>
            <MaterialCommunityIcons name="phone" size={20} color="#fff" />
            <Text style={styles.callBtnText}>Call Driver</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.chatBtn}>
            <MaterialCommunityIcons name="message-text" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.bottomNav}>
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => navigation.navigate('PatientDashboard')}
        >
          <MaterialCommunityIcons name="home-outline" size={24} color="#94a3b8" />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItemActive}>
          <MaterialCommunityIcons name="navigation" size={24} color="#1963eb" />
          <Text style={styles.navTextActive}>Track</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => navigation.navigate('History')}
        >
          <MaterialCommunityIcons name="history" size={24} color="#94a3b8" />
          <Text style={styles.navText}>History</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => navigation.navigate('Profile')}
        >
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
  mapContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  mapPlaceholder: {
    flex: 1,
    backgroundColor: '#1e293b',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 48,
    paddingBottom: 16,
    gap: 16,
  },
  headerBtn: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(16,22,34,0.8)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  headerSubtitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1963eb',
  },
  mapControls: {
    position: 'absolute',
    right: 24,
    bottom: 420,
    gap: 12,
  },
  mapControlBtn: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(16,22,34,0.8)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  detailsCard: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(28,31,39,0.95)',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    paddingBottom: 40,
    borderTopWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  handle: {
    width: 48,
    height: 6,
    backgroundColor: 'rgba(100,116,139,0.5)',
    borderRadius: 3,
    alignSelf: 'center',
    marginBottom: 24,
  },
  etaSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 32,
  },
  etaLabel: {
    fontSize: 10,
    fontWeight: '600',
    color: '#94a3b8',
    letterSpacing: 2,
    marginBottom: 4,
  },
  etaRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 8,
  },
  etaNumber: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#fff',
  },
  etaUnit: {
    fontSize: 20,
    fontWeight: '500',
    color: '#cbd5e1',
  },
  distanceCard: {
    backgroundColor: 'rgba(25,99,235,0.2)',
    borderWidth: 1,
    borderColor: 'rgba(25,99,235,0.3)',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 8,
    alignItems: 'center',
  },
  distanceNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1963eb',
  },
  distanceLabel: {
    fontSize: 8,
    fontWeight: 'bold',
    color: 'rgba(25,99,235,0.7)',
    letterSpacing: 1,
  },
  driverCard: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  driverInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  driverImageContainer: {
    position: 'relative',
  },
  driverImage: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(25,99,235,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#1963eb',
  },
  onlineBadge: {
    position: 'absolute',
    bottom: -4,
    right: -4,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#10b981',
    borderWidth: 2,
    borderColor: '#101622',
  },
  driverName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  driverRating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    fontSize: 14,
    color: '#94a3b8',
  },
  licensePlate: {
    alignItems: 'flex-end',
  },
  licensePlateLabel: {
    fontSize: 8,
    fontWeight: 'bold',
    color: '#94a3b8',
    letterSpacing: 1,
    marginBottom: 4,
  },
  licensePlateBox: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  licensePlateText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
    fontFamily: 'monospace',
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
  },
  callBtn: {
    flex: 4,
    flexDirection: 'row',
    backgroundColor: '#1963eb',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    shadowColor: '#1963eb',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  callBtnText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  chatBtn: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    backgroundColor: '#101622',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.05)',
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
    fontWeight: '500',
    color: '#94a3b8',
  },
  navTextActive: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#1963eb',
  },
});
