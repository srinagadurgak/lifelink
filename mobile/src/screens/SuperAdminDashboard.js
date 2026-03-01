import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
  Modal,
  Alert,
  Animated
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTranslation } from '../hooks/useTranslation';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// Mock data
const MOCK_ADMINS = [
  { id: '1', name: 'John Smith', email: 'john@hospital.com', role: 'Hospital Admin', status: 'Active', hospital: 'City General' },
  { id: '2', name: 'Sarah Wilson', email: 'sarah@clinic.com', role: 'Clinic Admin', status: 'Active', hospital: 'Metro Clinic' },
  { id: '3', name: 'Mike Brown', email: 'mike@health.com', role: 'System Admin', status: 'Inactive', hospital: 'N/A' },
];

const MOCK_DOCTORS = [
  { id: '1', name: 'Dr. Emily Chen', specialty: 'Cardiologist', email: 'emily@hospital.com', status: 'Active', patients: 145 },
  { id: '2', name: 'Dr. James Wilson', specialty: 'Neurologist', email: 'james@hospital.com', status: 'Active', patients: 98 },
  { id: '3', name: 'Dr. Lisa Anderson', specialty: 'Dermatologist', email: 'lisa@clinic.com', status: 'Pending', patients: 67 },
];

const MOCK_HOSPITALS = [
  { id: '1', name: 'City General Hospital', location: 'Downtown', beds: 250, email: 'info@citygeneral.com', status: 'Verified', type: 'General' },
  { id: '2', name: 'St. Mary Medical Center', location: 'Westside', beds: 180, email: 'contact@stmary.com', status: 'Verified', type: 'Specialty' },
  { id: '3', name: 'Metro Health Clinic', location: 'Eastside', beds: 120, email: 'info@metrohealth.com', status: 'Pending', type: 'Clinic' },
  { id: '4', name: 'Children\'s Hospital', location: 'North District', beds: 150, email: 'admin@childrens.com', status: 'Verified', type: 'Pediatric' },
];

export default function SuperAdminDashboard({ navigation }) {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('admins');
  const [admins, setAdmins] = useState(MOCK_ADMINS);
  const [doctors, setDoctors] = useState(MOCK_DOCTORS);
  const [hospitals, setHospitals] = useState(MOCK_HOSPITALS);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [formData, setFormData] = useState({});

  const fadeAnim = useState(new Animated.Value(0))[0];
  const slideAnim = useState(new Animated.Value(30))[0];
  const scrollViewRef = React.useRef(null);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleDelete = (type, id) => {
    Alert.alert(
      'Confirm Delete',
      `Are you sure you want to delete this ${type}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            if (type === 'admin') {
              setAdmins(admins.filter(a => a.id !== id));
            } else if (type === 'doctor') {
              setDoctors(doctors.filter(d => d.id !== id));
            } else {
              setHospitals(hospitals.filter(h => h.id !== id));
            }
            Alert.alert('Success', `${type} deleted successfully`);
          }
        }
      ]
    );
  };

  const handleStatCardPress = (tab) => {
    setActiveTab(tab);
    // Scroll to the list section after a short delay
    setTimeout(() => {
      scrollViewRef.current?.scrollTo({ y: 400, animated: true });
    }, 100);
  };

  const handleEdit = (item) => {
    setSelectedItem(item);
    setFormData(item);
    setShowEditModal(true);
  };

  const handleAdd = () => {
    setFormData({});
    setShowAddModal(true);
  };

  const handleSave = () => {
    if (showEditModal) {
      if (activeTab === 'admins') {
        setAdmins(admins.map(a => a.id === selectedItem.id ? formData : a));
      } else if (activeTab === 'doctors') {
        setDoctors(doctors.map(d => d.id === selectedItem.id ? formData : d));
      } else {
        setHospitals(hospitals.map(h => h.id === selectedItem.id ? formData : h));
      }
      setShowEditModal(false);
      Alert.alert('Success', 'Updated successfully');
    } else {
      const newItem = { ...formData, id: Date.now().toString() };
      if (activeTab === 'admins') {
        setAdmins([...admins, newItem]);
      } else if (activeTab === 'doctors') {
        setDoctors([...doctors, newItem]);
      } else {
        setHospitals([...hospitals, newItem]);
      }
      setShowAddModal(false);
      Alert.alert('Success', 'Added successfully');
    }
  };

  const filteredAdmins = admins.filter(a => 
    a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredDoctors = doctors.filter(d => 
    d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.specialty.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredHospitals = hospitals.filter(h => 
    h.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    h.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const stats = {
    totalAdmins: admins.length,
    activeAdmins: admins.filter(a => a.status === 'Active').length,
    totalDoctors: doctors.length,
    activeDoctors: doctors.filter(d => d.status === 'Active').length,
    totalHospitals: hospitals.length,
    verifiedHospitals: hospitals.filter(h => h.status === 'Verified').length,
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        ref={scrollViewRef}
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <Animated.View 
        style={[
          styles.header,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }]
          }
        ]}
      >
        <View style={styles.headerLeft}>
          <View style={styles.adminBadge}>
            <MaterialCommunityIcons name="shield-crown" size={24} color="#fbbf24" />
          </View>
          <View>
            <Text style={styles.headerTitle}>Super Admin</Text>
            <Text style={styles.headerSubtitle}>Management Portal</Text>
          </View>
        </View>
        <TouchableOpacity 
          style={styles.logoutBtn}
          onPress={() => {
            Alert.alert(
              'Logout',
              'Are you sure you want to logout?',
              [
                { text: 'Cancel', style: 'cancel' },
                {
                  text: 'Logout',
                  style: 'destructive',
                  onPress: () => navigation.reset({ index: 0, routes: [{ name: 'Auth' }] })
                }
              ]
            );
          }}
        >
          <MaterialCommunityIcons name="logout" size={20} color="#ef4444" />
        </TouchableOpacity>
      </Animated.View>

      {/* Stats Cards */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.statsContainer}>
        <TouchableOpacity 
          style={styles.statCard}
          onPress={() => handleStatCardPress('admins')}
          activeOpacity={0.7}
        >
          <MaterialCommunityIcons name="account-tie" size={32} color="#1963eb" />
          <Text style={styles.statValue}>{stats.totalAdmins}</Text>
          <Text style={styles.statLabel}>Total Admins</Text>
          <Text style={styles.statSubtext}>{stats.activeAdmins} active</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.statCard}
          onPress={() => handleStatCardPress('doctors')}
          activeOpacity={0.7}
        >
          <MaterialCommunityIcons name="doctor" size={32} color="#10b981" />
          <Text style={styles.statValue}>{stats.totalDoctors}</Text>
          <Text style={styles.statLabel}>Total Doctors</Text>
          <Text style={styles.statSubtext}>{stats.activeDoctors} active</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.statCard}
          activeOpacity={0.7}
          onPress={() => handleStatCardPress('hospitals')}
        >
          <MaterialCommunityIcons name="hospital-building" size={32} color="#f59e0b" />
          <Text style={styles.statValue}>{stats.totalHospitals}</Text>
          <Text style={styles.statLabel}>Hospitals</Text>
          <Text style={styles.statSubtext}>{stats.verifiedHospitals} verified</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'admins' && styles.tabActive]}
          onPress={() => setActiveTab('admins')}
        >
          <MaterialCommunityIcons 
            name="account-tie" 
            size={18} 
            color={activeTab === 'admins' ? '#1963eb' : '#64748b'} 
          />
          <Text style={[styles.tabText, activeTab === 'admins' && styles.tabTextActive]}>
            Admins
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'doctors' && styles.tabActive]}
          onPress={() => setActiveTab('doctors')}
        >
          <MaterialCommunityIcons 
            name="doctor" 
            size={18} 
            color={activeTab === 'doctors' ? '#1963eb' : '#64748b'} 
          />
          <Text style={[styles.tabText, activeTab === 'doctors' && styles.tabTextActive]}>
            Doctors
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'hospitals' && styles.tabActive]}
          onPress={() => setActiveTab('hospitals')}
        >
          <MaterialCommunityIcons 
            name="hospital-building" 
            size={18} 
            color={activeTab === 'hospitals' ? '#1963eb' : '#64748b'} 
          />
          <Text style={[styles.tabText, activeTab === 'hospitals' && styles.tabTextActive]}>
            Hospitals
          </Text>
        </TouchableOpacity>
      </View>

      {/* Search and Add */}
      <View style={styles.actionBar}>
        <View style={styles.searchContainer}>
          <MaterialCommunityIcons name="magnify" size={20} color="#94a3b8" />
          <TextInput
            style={styles.searchInput}
            placeholder={`Search ${activeTab}...`}
            placeholderTextColor="#94a3b8"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <TouchableOpacity style={styles.addBtn} onPress={handleAdd}>
          <MaterialCommunityIcons name="plus" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* List */}
      <View style={styles.listContainer}>
        {activeTab === 'admins' ? (
          filteredAdmins.map((admin) => (
            <View key={admin.id} style={styles.card}>
              <View style={styles.cardHeader}>
                <View style={styles.cardIcon}>
                  <MaterialCommunityIcons name="account-tie" size={20} color="#1963eb" />
                </View>
                <View style={styles.cardInfo}>
                  <Text style={styles.cardName}>{admin.name}</Text>
                  <Text style={styles.cardSubtext}>{admin.email}</Text>
                  <View style={styles.cardMeta}>
                    <Text style={styles.cardRole}>{admin.role}</Text>
                    <Text style={styles.cardDivider}>•</Text>
                    <Text style={styles.cardHospital}>{admin.hospital}</Text>
                  </View>
                </View>
                <View style={[styles.statusBadge, admin.status === 'Active' ? styles.statusActive : styles.statusInactive]}>
                  <Text style={styles.statusText}>{admin.status}</Text>
                </View>
              </View>
              <View style={styles.cardActions}>
                <TouchableOpacity style={styles.actionBtn} onPress={() => handleEdit(admin)}>
                  <MaterialCommunityIcons name="pencil" size={16} color="#1963eb" />
                  <Text style={styles.actionBtnText}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[styles.actionBtn, styles.actionBtnDanger]} 
                  onPress={() => handleDelete('admin', admin.id)}
                >
                  <MaterialCommunityIcons name="delete" size={16} color="#ef4444" />
                  <Text style={[styles.actionBtnText, styles.actionBtnTextDanger]}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        ) : activeTab === 'doctors' ? (
          filteredDoctors.map((doctor) => (
            <View key={doctor.id} style={styles.card}>
              <View style={styles.cardHeader}>
                <View style={styles.cardIcon}>
                  <MaterialCommunityIcons name="doctor" size={20} color="#10b981" />
                </View>
                <View style={styles.cardInfo}>
                  <Text style={styles.cardName}>{doctor.name}</Text>
                  <Text style={styles.cardSubtext}>{doctor.email}</Text>
                  <View style={styles.cardMeta}>
                    <Text style={styles.cardRole}>{doctor.specialty}</Text>
                    <Text style={styles.cardDivider}>•</Text>
                    <Text style={styles.cardHospital}>{doctor.patients} patients</Text>
                  </View>
                </View>
                <View style={[styles.statusBadge, doctor.status === 'Active' ? styles.statusActive : styles.statusPending]}>
                  <Text style={styles.statusText}>{doctor.status}</Text>
                </View>
              </View>
              <View style={styles.cardActions}>
                <TouchableOpacity style={styles.actionBtn} onPress={() => handleEdit(doctor)}>
                  <MaterialCommunityIcons name="pencil" size={16} color="#1963eb" />
                  <Text style={styles.actionBtnText}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[styles.actionBtn, styles.actionBtnDanger]} 
                  onPress={() => handleDelete('doctor', doctor.id)}
                >
                  <MaterialCommunityIcons name="delete" size={16} color="#ef4444" />
                  <Text style={[styles.actionBtnText, styles.actionBtnTextDanger]}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        ) : (
          filteredHospitals.map((hospital) => (
            <View key={hospital.id} style={styles.card}>
              <View style={styles.cardHeader}>
                <View style={styles.cardIcon}>
                  <MaterialCommunityIcons name="hospital-building" size={20} color="#f59e0b" />
                </View>
                <View style={styles.cardInfo}>
                  <Text style={styles.cardName}>{hospital.name}</Text>
                  <Text style={styles.cardSubtext}>{hospital.email}</Text>
                  <View style={styles.cardMeta}>
                    <Text style={styles.cardRole}>{hospital.type}</Text>
                    <Text style={styles.cardDivider}>•</Text>
                    <Text style={styles.cardHospital}>{hospital.location}</Text>
                    <Text style={styles.cardDivider}>•</Text>
                    <Text style={styles.cardHospital}>{hospital.beds} beds</Text>
                  </View>
                </View>
                <View style={[styles.statusBadge, hospital.status === 'Verified' ? styles.statusActive : styles.statusPending]}>
                  <Text style={styles.statusText}>{hospital.status}</Text>
                </View>
              </View>
              <View style={styles.cardActions}>
                <TouchableOpacity style={styles.actionBtn} onPress={() => handleEdit(hospital)}>
                  <MaterialCommunityIcons name="pencil" size={16} color="#1963eb" />
                  <Text style={styles.actionBtnText}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[styles.actionBtn, styles.actionBtnDanger]} 
                  onPress={() => handleDelete('hospital', hospital.id)}
                >
                  <MaterialCommunityIcons name="delete" size={16} color="#ef4444" />
                  <Text style={[styles.actionBtnText, styles.actionBtnTextDanger]}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}
      </View>
      </ScrollView>

      {/* Add/Edit Modal */}
      <Modal
        visible={showAddModal || showEditModal}
        transparent
        animationType="slide"
        onRequestClose={() => {
          setShowAddModal(false);
          setShowEditModal(false);
        }}
      >
        <TouchableOpacity 
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => {
            setShowAddModal(false);
            setShowEditModal(false);
          }}
        >
          <TouchableOpacity 
            style={styles.modalContent}
            activeOpacity={1}
            onPress={(e) => e.stopPropagation()}
          >
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                {showEditModal ? 'Edit' : 'Add'} {activeTab === 'admins' ? 'Admin' : activeTab === 'doctors' ? 'Doctor' : 'Hospital'}
              </Text>
              <TouchableOpacity onPress={() => {
                setShowAddModal(false);
                setShowEditModal(false);
              }}>
                <MaterialCommunityIcons name="close" size={24} color="#fff" />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalForm}>
              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Name</Text>
                <TextInput
                  style={styles.formInput}
                  placeholder="Enter name"
                  placeholderTextColor="#64748b"
                  value={formData.name || ''}
                  onChangeText={(text) => setFormData({...formData, name: text})}
                />
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Email</Text>
                <TextInput
                  style={styles.formInput}
                  placeholder="Enter email"
                  placeholderTextColor="#64748b"
                  keyboardType="email-address"
                  value={formData.email || ''}
                  onChangeText={(text) => setFormData({...formData, email: text})}
                />
              </View>

              {activeTab === 'admins' ? (
                <>
                  <View style={styles.formGroup}>
                    <Text style={styles.formLabel}>Role</Text>
                    <TextInput
                      style={styles.formInput}
                      placeholder="Enter role"
                      placeholderTextColor="#64748b"
                      value={formData.role || ''}
                      onChangeText={(text) => setFormData({...formData, role: text})}
                    />
                  </View>
                  <View style={styles.formGroup}>
                    <Text style={styles.formLabel}>Hospital</Text>
                    <TextInput
                      style={styles.formInput}
                      placeholder="Enter hospital"
                      placeholderTextColor="#64748b"
                      value={formData.hospital || ''}
                      onChangeText={(text) => setFormData({...formData, hospital: text})}
                    />
                  </View>
                </>
              ) : activeTab === 'doctors' ? (
                <>
                  <View style={styles.formGroup}>
                    <Text style={styles.formLabel}>Specialty</Text>
                    <TextInput
                      style={styles.formInput}
                      placeholder="Enter specialty"
                      placeholderTextColor="#64748b"
                      value={formData.specialty || ''}
                      onChangeText={(text) => setFormData({...formData, specialty: text})}
                    />
                  </View>
                  <View style={styles.formGroup}>
                    <Text style={styles.formLabel}>Patients</Text>
                    <TextInput
                      style={styles.formInput}
                      placeholder="Enter patient count"
                      placeholderTextColor="#64748b"
                      keyboardType="number-pad"
                      value={formData.patients?.toString() || ''}
                      onChangeText={(text) => setFormData({...formData, patients: parseInt(text) || 0})}
                    />
                  </View>
                </>
              ) : (
                <>
                  <View style={styles.formGroup}>
                    <Text style={styles.formLabel}>Location</Text>
                    <TextInput
                      style={styles.formInput}
                      placeholder="Enter location"
                      placeholderTextColor="#64748b"
                      value={formData.location || ''}
                      onChangeText={(text) => setFormData({...formData, location: text})}
                    />
                  </View>
                  <View style={styles.formGroup}>
                    <Text style={styles.formLabel}>Type</Text>
                    <TextInput
                      style={styles.formInput}
                      placeholder="Enter type (General, Specialty, etc.)"
                      placeholderTextColor="#64748b"
                      value={formData.type || ''}
                      onChangeText={(text) => setFormData({...formData, type: text})}
                    />
                  </View>
                  <View style={styles.formGroup}>
                    <Text style={styles.formLabel}>Beds</Text>
                    <TextInput
                      style={styles.formInput}
                      placeholder="Enter bed count"
                      placeholderTextColor="#64748b"
                      keyboardType="number-pad"
                      value={formData.beds?.toString() || ''}
                      onChangeText={(text) => setFormData({...formData, beds: parseInt(text) || 0})}
                    />
                  </View>
                </>
              )}

              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Status</Text>
                <View style={styles.statusOptions}>
                  <TouchableOpacity
                    style={[styles.statusOption, formData.status === (activeTab === 'hospitals' ? 'Verified' : 'Active') && styles.statusOptionActive]}
                    onPress={() => setFormData({...formData, status: activeTab === 'hospitals' ? 'Verified' : 'Active'})}
                  >
                    <Text style={[styles.statusOptionText, formData.status === (activeTab === 'hospitals' ? 'Verified' : 'Active') && styles.statusOptionTextActive]}>
                      {activeTab === 'hospitals' ? 'Verified' : 'Active'}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.statusOption, formData.status === (activeTab === 'hospitals' ? 'Pending' : 'Inactive') && styles.statusOptionActive]}
                    onPress={() => setFormData({...formData, status: activeTab === 'hospitals' ? 'Pending' : 'Inactive'})}
                  >
                    <Text style={[styles.statusOptionText, formData.status === (activeTab === 'hospitals' ? 'Pending' : 'Inactive') && styles.statusOptionTextActive]}>
                      {activeTab === 'hospitals' ? 'Pending' : 'Inactive'}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>

            <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
              <Text style={styles.saveBtnText}>Save</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#101622',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 48,
    paddingBottom: 16,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  adminBadge: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(251,191,36,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#fbbf24',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#94a3b8',
  },
  logoutBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(239,68,68,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statsContainer: {
    paddingHorizontal: 24,
    marginBottom: 12,
  },
  statCard: {
    width: SCREEN_WIDTH * 0.35,
    backgroundColor: 'rgba(30,41,59,0.5)',
    borderRadius: 16,
    padding: 12,
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#334155',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 6,
  },
  statLabel: {
    fontSize: 11,
    color: '#94a3b8',
    marginTop: 3,
  },
  statSubtext: {
    fontSize: 9,
    color: '#64748b',
    marginTop: 2,
  },
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    marginBottom: 12,
    gap: 12,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1e293b',
    borderRadius: 12,
    paddingVertical: 10,
    gap: 8,
    borderWidth: 1,
    borderColor: '#334155',
  },
  tabActive: {
    backgroundColor: 'rgba(25,99,235,0.1)',
    borderColor: '#1963eb',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748b',
  },
  tabTextActive: {
    color: '#1963eb',
  },
  actionBar: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    marginBottom: 12,
    gap: 12,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e293b',
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 44,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    color: '#fff',
    fontSize: 14,
  },
  addBtn: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#1963eb',
    alignItems: 'center',
    justifyContent: 'center',
  },
  listContainer: {
    paddingHorizontal: 24,
  },
  card: {
    backgroundColor: 'rgba(30,41,59,0.5)',
    borderRadius: 16,
    padding: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#334155',
  },
  cardHeader: {
    flexDirection: 'row',
    marginBottom: 10,
    gap: 10,
  },
  cardIcon: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: 'rgba(25,99,235,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardInfo: {
    flex: 1,
  },
  cardName: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 3,
  },
  cardSubtext: {
    fontSize: 11,
    color: '#94a3b8',
    marginBottom: 3,
  },
  cardMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  cardRole: {
    fontSize: 10,
    color: '#64748b',
  },
  cardDivider: {
    fontSize: 10,
    color: '#334155',
  },
  cardHospital: {
    fontSize: 10,
    color: '#64748b',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
    height: 22,
  },
  statusActive: {
    backgroundColor: 'rgba(16,185,129,0.1)',
  },
  statusInactive: {
    backgroundColor: 'rgba(100,116,139,0.1)',
  },
  statusPending: {
    backgroundColor: 'rgba(251,191,36,0.1)',
  },
  statusText: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#10b981',
  },
  cardActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(25,99,235,0.1)',
    borderRadius: 10,
    paddingVertical: 8,
    gap: 6,
    borderWidth: 1,
    borderColor: 'rgba(25,99,235,0.2)',
  },
  actionBtnDanger: {
    backgroundColor: 'rgba(239,68,68,0.1)',
    borderColor: 'rgba(239,68,68,0.2)',
  },
  actionBtnText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1963eb',
  },
  actionBtnTextDanger: {
    color: '#ef4444',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#1e293b',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    maxHeight: '85%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  modalForm: {
    marginBottom: 16,
  },
  formGroup: {
    marginBottom: 16,
  },
  formLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#94a3b8',
    marginBottom: 8,
  },
  formInput: {
    backgroundColor: 'rgba(30,41,59,0.5)',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    color: '#fff',
    fontSize: 14,
    borderWidth: 1,
    borderColor: '#334155',
  },
  statusOptions: {
    flexDirection: 'row',
    gap: 12,
  },
  statusOption: {
    flex: 1,
    backgroundColor: 'rgba(30,41,59,0.5)',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#334155',
  },
  statusOptionActive: {
    backgroundColor: 'rgba(25,99,235,0.1)',
    borderColor: '#1963eb',
  },
  statusOptionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748b',
  },
  statusOptionTextActive: {
    color: '#1963eb',
  },
  saveBtn: {
    backgroundColor: '#1963eb',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  saveBtnText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});
