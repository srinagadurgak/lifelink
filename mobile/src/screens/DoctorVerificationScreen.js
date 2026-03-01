import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Alert, ActivityIndicator, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../config/api';
import VerificationBadge from '../components/VerificationBadge';
import { useTranslation } from '../hooks/useTranslation';

export default function DoctorVerificationScreen({ navigation }) {
  const { t } = useTranslation();
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [adminId, setAdminId] = useState(null);
  const [filter, setFilter] = useState('pending'); // 'all', 'pending', 'verified', 'rejected'

  useEffect(() => {
    loadAdminData();
    loadDoctors();
  }, [filter]);

  const loadAdminData = async () => {
    try {
      const userStr = await AsyncStorage.getItem('user');
      if (userStr) {
        const user = JSON.parse(userStr);
        setAdminId(user._id);
      }
    } catch (error) {
      console.error('Error loading admin data:', error);
    }
  };

  const loadDoctors = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const endpoint = filter === 'pending' 
        ? `${API_URL}/api/verification/pending-doctors`
        : `${API_URL}/api/verification/doctors`;
      
      const response = await fetch(endpoint, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();
      
      if (response.ok) {
        let filteredDoctors = data;
        if (filter !== 'all' && filter !== 'pending') {
          filteredDoctors = data.filter(doc => doc.verificationStatus === filter);
        }
        setDoctors(filteredDoctors);
      }
    } catch (error) {
      console.error('Error loading doctors:', error);
      Alert.alert('Error', 'Failed to load doctors');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleVerify = async (doctorId, status) => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await fetch(`${API_URL}/api/verification/verify-doctor/${doctorId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ adminId, status })
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert('Success', data.message);
        loadDoctors();
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      Alert.alert('Error', error.message || 'Failed to update verification status');
    }
  };

  const handleAutoVerify = async (doctorId) => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await fetch(`${API_URL}/api/verification/auto-verify-doctor/${doctorId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ adminId })
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert('Success', data.message);
        loadDoctors();
      } else {
        throw new Error(data.error || data.message);
      }
    } catch (error) {
      Alert.alert('Error', error.message || 'Auto-verification failed');
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    loadDoctors();
  };

  const renderDoctorCard = (doctor) => (
    <View key={doctor._id} style={styles.doctorCard}>
      <View style={styles.doctorHeader}>
        <View style={styles.doctorAvatar}>
          <MaterialCommunityIcons name="doctor" size={32} color="#1963eb" />
        </View>
        <View style={styles.doctorInfo}>
          <Text style={styles.doctorName}>{doctor.name}</Text>
          <Text style={styles.doctorEmail}>{doctor.email}</Text>
          <VerificationBadge 
            isVerified={doctor.isVerified} 
            verificationStatus={doctor.verificationStatus}
            size="small"
          />
        </View>
      </View>

      <View style={styles.doctorDetails}>
        <View style={styles.detailRow}>
          <MaterialCommunityIcons name="school" size={16} color="#94a3b8" />
          <Text style={styles.detailLabel}>Qualification:</Text>
          <Text style={styles.detailValue}>{doctor.qualification || 'N/A'}</Text>
        </View>
        
        <View style={styles.detailRow}>
          <MaterialCommunityIcons name="card-account-details" size={16} color="#94a3b8" />
          <Text style={styles.detailLabel}>NMC Code:</Text>
          <Text style={styles.detailValue}>{doctor.nmcCode || 'N/A'}</Text>
        </View>
        
        <View style={styles.detailRow}>
          <MaterialCommunityIcons name="map-marker" size={16} color="#94a3b8" />
          <Text style={styles.detailLabel}>Council:</Text>
          <Text style={styles.detailValue}>{doctor.stateMedicalCouncil || 'N/A'}</Text>
        </View>

        {doctor.verifiedAt && (
          <View style={styles.detailRow}>
            <MaterialCommunityIcons name="calendar-check" size={16} color="#94a3b8" />
            <Text style={styles.detailLabel}>Verified:</Text>
            <Text style={styles.detailValue}>
              {new Date(doctor.verifiedAt).toLocaleDateString()}
            </Text>
          </View>
        )}
      </View>

      {doctor.verificationStatus === 'pending' && (
        <View style={styles.actionButtons}>
          <TouchableOpacity 
            style={styles.autoVerifyBtn}
            onPress={() => handleAutoVerify(doctor._id)}
          >
            <MaterialCommunityIcons name="shield-check" size={18} color="#1963eb" />
            <Text style={styles.autoVerifyText}>Auto Verify</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.approveBtn}
            onPress={() => handleVerify(doctor._id, 'verified')}
          >
            <MaterialCommunityIcons name="check" size={18} color="#fff" />
            <Text style={styles.approveBtnText}>Approve</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.rejectBtn}
            onPress={() => handleVerify(doctor._id, 'rejected')}
          >
            <MaterialCommunityIcons name="close" size={18} color="#fff" />
            <Text style={styles.rejectBtnText}>Reject</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#1963eb" />
          <Text style={styles.loadingText}>Loading doctors...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Doctor Verification</Text>
        <View style={{ width: 40 }} />
      </View>

      <View style={styles.filterContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <TouchableOpacity 
            style={[styles.filterBtn, filter === 'pending' && styles.filterBtnActive]}
            onPress={() => setFilter('pending')}
          >
            <Text style={[styles.filterText, filter === 'pending' && styles.filterTextActive]}>
              Pending
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.filterBtn, filter === 'verified' && styles.filterBtnActive]}
            onPress={() => setFilter('verified')}
          >
            <Text style={[styles.filterText, filter === 'verified' && styles.filterTextActive]}>
              Verified
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.filterBtn, filter === 'rejected' && styles.filterBtnActive]}
            onPress={() => setFilter('rejected')}
          >
            <Text style={[styles.filterText, filter === 'rejected' && styles.filterTextActive]}>
              Rejected
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.filterBtn, filter === 'all' && styles.filterBtnActive]}
            onPress={() => setFilter('all')}
          >
            <Text style={[styles.filterText, filter === 'all' && styles.filterTextActive]}>
              All
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      <ScrollView 
        style={styles.content}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#1963eb" />
        }
      >
        {doctors.length === 0 ? (
          <View style={styles.emptyState}>
            <MaterialCommunityIcons name="doctor" size={64} color="#334155" />
            <Text style={styles.emptyText}>No doctors found</Text>
          </View>
        ) : (
          doctors.map(renderDoctorCard)
        )}
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
    paddingVertical: 16,
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
  filterContainer: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#334155',
  },
  filterBtn: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#1e293b',
    marginRight: 8,
  },
  filterBtnActive: {
    backgroundColor: '#1963eb',
  },
  filterText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#94a3b8',
  },
  filterTextActive: {
    color: '#fff',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  doctorCard: {
    backgroundColor: '#1e293b',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#334155',
  },
  doctorHeader: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  doctorAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(25,99,235,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  doctorInfo: {
    flex: 1,
    gap: 4,
  },
  doctorName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  doctorEmail: {
    fontSize: 13,
    color: '#94a3b8',
  },
  doctorDetails: {
    gap: 12,
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  detailLabel: {
    fontSize: 13,
    color: '#94a3b8',
    fontWeight: '500',
  },
  detailValue: {
    fontSize: 13,
    color: '#e2e8f0',
    flex: 1,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 8,
  },
  autoVerifyBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: 'rgba(25,99,235,0.1)',
    borderWidth: 1,
    borderColor: '#1963eb',
  },
  autoVerifyText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1963eb',
  },
  approveBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: '#10b981',
  },
  approveBtnText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#fff',
  },
  rejectBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: '#ef4444',
  },
  rejectBtnText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
  },
  loadingText: {
    fontSize: 16,
    color: '#94a3b8',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 64,
    gap: 16,
  },
  emptyText: {
    fontSize: 16,
    color: '#94a3b8',
  },
});
