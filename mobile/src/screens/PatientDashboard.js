import React, { useState, useCallback, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
  ActivityIndicator,
  RefreshControl,
  Alert,
  Modal,
  Linking,
  Animated
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import LanguageSwitcher from '../components/LanguageSwitcher';
import { useTranslation } from '../hooks/useTranslation';

// Mock data for demonstration
const MOCK_DOCTORS = [
  {
    id: '1',
    name: 'Dr. Sarah James',
    specialty: 'Cardiologist',
    category: 'cardio',
    rating: 4.9,
    available: true,
    image: 'doctor',
    consultationFee: 50,
    distance: 1.2
  },
  {
    id: '2',
    name: 'Dr. Michael Chen',
    specialty: 'Dermatologist',
    category: 'skin',
    rating: 4.8,
    available: true,
    image: 'doctor',
    consultationFee: 45,
    distance: 0.8
  },
  {
    id: '3',
    name: 'Dr. Emily Williams',
    specialty: 'Neurologist',
    category: 'neurology',
    rating: 4.9,
    available: false,
    image: 'doctor',
    consultationFee: 60,
    distance: 2.1
  },
  {
    id: '4',
    name: 'Dr. Priya Sharma',
    specialty: 'Hair Specialist',
    category: 'hair',
    rating: 4.7,
    available: true,
    image: 'doctor',
    consultationFee: 40,
    distance: 1.5
  },
  {
    id: '5',
    name: 'Dr. James Wilson',
    specialty: 'Orthopedic',
    category: 'orthopedic',
    rating: 4.8,
    available: true,
    image: 'doctor',
    consultationFee: 55,
    distance: 1.8
  }
];

const MOCK_CATEGORIES = [
  { id: 'all', name: 'All', icon: 'medical-bag' },
  { id: 'cardio', name: 'Cardio', icon: 'heart-pulse' },
  { id: 'skin', name: 'Skin', icon: 'hand-back-right' },
  { id: 'hair', name: 'Hair', icon: 'hair-dryer' },
  { id: 'neurology', name: 'Neuro', icon: 'brain' },
  { id: 'orthopedic', name: 'Bones', icon: 'bone' },
  { id: 'pediatrics', name: 'Kids', icon: 'human-child' }
];

const MOCK_HOSPITALS = [
  {
    id: 'h1',
    name: 'City General Hospital',
    distance: 0.8,
    rating: 4.5,
    beds: 250,
    emergency: true
  },
  {
    id: 'h2',
    name: 'St. Mary Medical Center',
    distance: 1.5,
    rating: 4.7,
    beds: 180,
    emergency: true
  },
  {
    id: 'h3',
    name: 'Metro Health Clinic',
    distance: 2.3,
    rating: 4.3,
    beds: 120,
    emergency: false
  }
];

const MOCK_MEDICINES = [
  { id: 'm1', name: 'Paracetamol 500mg', price: 5, category: 'Pain Relief' },
  { id: 'm2', name: 'Vitamin D3', price: 12, category: 'Supplements' },
  { id: 'm3', name: 'Amoxicillin', price: 15, category: 'Antibiotics' }
];

const PatientDashboard = ({ navigation }) => {
  const { t } = useTranslation();
  
  // State management
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [doctors, setDoctors] = useState(MOCK_DOCTORS);
  const [hospitals, setHospitals] = useState(MOCK_HOSPITALS);
  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [hiddenDoctors, setHiddenDoctors] = useState([]);
  const [radiusKm, setRadiusKm] = useState(5);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [showMedicineModal, setShowMedicineModal] = useState(false);
  const [showRadiusModal, setShowRadiusModal] = useState(false);

  // Animation values
  const fadeAnim = useState(new Animated.Value(0))[0];
  const slideAnim = useState(new Animated.Value(50))[0];
  const scaleAnim = useState(new Animated.Value(0.9))[0];

  // Animate on mount
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
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 8,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  // Handlers
  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
    setIsLoading(true);
    
    setTimeout(() => {
      if (categoryId === 'all') {
        setDoctors(MOCK_DOCTORS.filter(d => !hiddenDoctors.includes(d.id)));
      } else {
        const filtered = MOCK_DOCTORS.filter(doctor =>
          !hiddenDoctors.includes(doctor.id) && doctor.category === categoryId
        );
        setDoctors(filtered);
      }
      setIsLoading(false);
    }, 300);
  };

  const handleRadiusChange = (newRadius) => {
    setRadiusKm(newRadius);
    const filtered = MOCK_HOSPITALS.filter(h => h.distance <= newRadius);
    setHospitals(filtered);
    setShowRadiusModal(false);
  };

  const handleHideDoctor = (doctorId) => {
    Alert.alert(
      t('patient.hideDoctor'),
      t('patient.hideDoctorConfirm'),
      [
        { text: t('common.cancel'), style: 'cancel' },
        {
          text: t('patient.hide'),
          style: 'destructive',
          onPress: () => {
            setHiddenDoctors([...hiddenDoctors, doctorId]);
            setDoctors(doctors.filter(d => d.id !== doctorId));
          }
        }
      ]
    );
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setError(null);
    setTimeout(() => {
      setDoctors(MOCK_DOCTORS.filter(d => !hiddenDoctors.includes(d.id)));
      setHospitals(MOCK_HOSPITALS.filter(h => h.distance <= radiusKm));
      setSelectedCategory('all');
      setRefreshing(false);
    }, 1500);
  }, [hiddenDoctors, radiusKm]);

  const handleBookAppointment = (doctor) => {
    if (doctor?.available) {
      setSelectedDoctor(doctor);
      setShowPaymentModal(true);
    } else {
      Alert.alert(
        t('patient.doctorUnavailable'),
        t('patient.doctorUnavailableMessage'),
        [
          { text: t('common.cancel'), style: 'cancel' },
          { text: t('patient.showSimilar'), onPress: () => handleCategorySelect(doctor.category) }
        ]
      );
    }
  };

  const handlePayment = (paymentMethod) => {
    setShowPaymentModal(false);
    // Add slight delay for smooth modal close
    setTimeout(() => {
      Alert.alert(
        t('patient.paymentConfirmation'),
        `${t('patient.bookingWith')} ${selectedDoctor.name}\n${t('patient.consultationFee')}: $${selectedDoctor.consultationFee}\n${t('patient.paymentMethod')}: ${paymentMethod}`,
        [
          { text: t('common.cancel'), style: 'cancel' },
          {
            text: t('patient.confirmAndPay'),
            onPress: () => {
              Alert.alert(t('common.success'), t('patient.appointmentBookedSuccess'));
              navigation.navigate('AppointmentBooking', { 
                doctorId: selectedDoctor.id,
                paid: true 
              });
            }
          }
        ]
      );
    }, 300);
  };

  const handleEmergencyCall = () => {
    Alert.alert(
      t('emergency.callAmbulance'),
      t('patient.callAmbulanceConfirm'),
      [
        { text: t('common.no'), style: 'cancel' },
        {
          text: t('patient.yesCallNow'),
          onPress: () => {
            // Simulate calling ambulance
            Linking.openURL('tel:911').catch(() => {
              Alert.alert(t('common.error'), 'Unable to make call');
            });
            navigation.navigate('AmbulanceTracking');
          },
          style: 'destructive'
        }
      ]
    );
  };

  const handleEmergencyPress = () => {
    // Immediately navigate to emergency call screen without confirmation
    navigation.navigate('EmergencyCall');
  };

  useEffect(() => {
    // Filter hospitals by radius on mount
    const filtered = MOCK_HOSPITALS.filter(h => h.distance <= radiusKm);
    setHospitals(filtered);
  }, [radiusKm]);

  // Memoized components
  const MemoizedDoctorCard = useCallback(({ doctor }) => (
    <View style={styles.doctorCardWrapper}>
      <TouchableOpacity
        style={styles.hideButton}
        onPress={() => handleHideDoctor(doctor.id)}
        accessibilityLabel="Hide this doctor"
      >
        <MaterialCommunityIcons name="close-circle" size={20} color="#ef4444" />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.doctorCard}
        onPress={() => navigation.navigate('DoctorProfile', { doctorId: doctor.id })}
        accessibilityLabel={`Doctor ${doctor.name}, ${doctor.specialty}, rating ${doctor.rating} stars`}
        accessibilityRole="button"
      >
        <View style={styles.doctorImageContainer}>
          <View style={styles.doctorImage}>
            <MaterialCommunityIcons name={doctor.image} size={32} color="#1963eb" />
          </View>
          {doctor.available && <View style={styles.onlineBadge} />}
        </View>
        <Text style={styles.doctorName}>{doctor.name}</Text>
        <Text style={styles.doctorSpecialty}>{doctor.specialty}</Text>
        <View style={styles.doctorMeta}>
          <View style={styles.rating}>
            <MaterialCommunityIcons name="star" size={12} color="#fbbf24" />
            <Text style={styles.ratingText}>{doctor.rating}</Text>
          </View>
          <Text style={styles.distanceText}>{doctor.distance} km</Text>
        </View>
        <Text style={styles.feeText}>${doctor.consultationFee}</Text>
        <TouchableOpacity
          style={[styles.bookBtn, !doctor.available && styles.bookBtnDisabled]}
          onPress={() => handleBookAppointment(doctor)}
          disabled={!doctor.available}
          accessibilityLabel={`Book appointment with ${doctor.name}`}
          accessibilityRole="button"
        >
          <Text style={styles.bookBtnText}>
            {doctor.available ? t('patient.bookNow') : t('patient.unavailable')}
          </Text>
        </TouchableOpacity>
      </TouchableOpacity>
    </View>
  ), [hiddenDoctors]);

  // Render loading state
  if (isLoading && !refreshing) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#1963eb" />
        <Text style={styles.loadingText}>{t('common.loading')}</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
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
        <View style={styles.userInfo}>
          <View style={styles.avatar}>
            <MaterialCommunityIcons name="account" size={24} color="#1963eb" />
          </View>
          <View>
            <Text style={styles.welcomeText}>{t('dashboard.welcome')},</Text>
            <Text style={styles.userName}>Alex Johnson</Text>
          </View>
        </View>
        <View style={styles.headerActions}>
          <LanguageSwitcher iconColor="#64748b" iconSize={22} />
          <TouchableOpacity
            style={styles.notificationBtn}
            accessibilityLabel="Notifications"
            accessibilityRole="button"
            onPress={() => navigation.navigate('Notifications')}
          >
            <MaterialCommunityIcons name="bell-outline" size={24} color="#64748b" />
            <View style={styles.notificationBadge} />
          </TouchableOpacity>
        </View>
      </Animated.View>

      {/* Main Content */}
      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#1963eb"
            colors={["#1963eb"]}
          />
        }
      >
        {/* Categories */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categories}
          accessibilityLabel="Medical categories"
        >
          {MOCK_CATEGORIES.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={[
                styles.category,
                selectedCategory === category.id && styles.categoryActive
              ]}
              onPress={() => handleCategorySelect(category.id)}
              accessibilityLabel={`${category.name} category`}
              accessibilityRole="button"
              accessibilityState={{ selected: selectedCategory === category.id }}
            >
              <MaterialCommunityIcons
                name={category.icon}
                size={18}
                color={selectedCategory === category.id ? '#fff' : '#64748b'}
              />
              <Text
                style={[
                  styles.categoryText,
                  selectedCategory === category.id && styles.categoryTextActive
                ]}
              >
                {category.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Error Message */}
        {error && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
            <TouchableOpacity onPress={onRefresh}>
              <Text style={styles.retryText}>Retry</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Nearby Hospitals */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>{t('patient.nearbyHospitals')}</Text>
            <TouchableOpacity
              onPress={() => setShowRadiusModal(true)}
              accessibilityLabel="Change search radius"
              accessibilityRole="button"
            >
              <Text style={styles.seeAll}>{radiusKm} {t('patient.radiusKm')}</Text>
            </TouchableOpacity>
          </View>
          
          {hospitals.length === 0 ? (
            <View style={styles.emptyState}>
              <MaterialCommunityIcons name="hospital-building" size={48} color="#334155" />
              <Text style={styles.emptyStateText}>{t('patient.noHospitalsWithin')} {radiusKm} {t('patient.km')}</Text>
              <TouchableOpacity
                style={styles.resetButton}
                onPress={() => handleRadiusChange(10)}
              >
                <Text style={styles.resetButtonText}>{t('patient.increaseRadius')}</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {hospitals.map((hospital) => (
                <TouchableOpacity
                  key={hospital.id}
                  style={styles.hospitalCard}
                  onPress={() => navigation.navigate('HospitalDetails', { hospitalId: hospital.id })}
                >
                  <View style={styles.hospitalHeader}>
                    <View style={styles.hospitalIconContainer}>
                      <MaterialCommunityIcons name="hospital-building" size={24} color="#1963eb" />
                    </View>
                    {hospital.emergency && (
                      <View style={styles.emergencyBadge}>
                        <Text style={styles.emergencyBadgeText}>24/7</Text>
                      </View>
                    )}
                  </View>
                  <Text style={styles.hospitalName}>{hospital.name}</Text>
                  <View style={styles.hospitalMeta}>
                    <View style={styles.rating}>
                      <MaterialCommunityIcons name="star" size={12} color="#fbbf24" />
                      <Text style={styles.ratingText}>{hospital.rating}</Text>
                    </View>
                    <Text style={styles.distanceText}>{hospital.distance} {t('patient.km')}</Text>
                  </View>
                  <Text style={styles.bedsText}>{hospital.beds} {t('patient.bedsAvailable')}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          )}
        </View>

        {/* Available Doctors */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>{t('patient.availableDoctors')}</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('DoctorPatients')}
              accessibilityLabel="View all doctors"
              accessibilityRole="button"
            >
              <Text style={styles.seeAll}>{t('patient.viewAll')}</Text>
            </TouchableOpacity>
          </View>
          
          {doctors.length === 0 ? (
            <View style={styles.emptyState}>
              <MaterialCommunityIcons name="doctor" size={48} color="#334155" />
              <Text style={styles.emptyStateText}>{t('patient.noDoctorsFound')}</Text>
              <TouchableOpacity
                style={styles.resetButton}
                onPress={() => {
                  setSelectedCategory('all');
                  setDoctors(MOCK_DOCTORS);
                }}
              >
                <Text style={styles.resetButtonText}>{t('patient.resetFilters')}</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.doctorsList}
              accessibilityLabel="List of available doctors"
            >
              {doctors.map((doctor) => (
                <MemoizedDoctorCard key={doctor.id} doctor={doctor} />
              ))}
            </ScrollView>
          )}
        </View>

        {/* Ambulance Tracker */}
        <TouchableOpacity
          style={styles.ambulanceCard}
          onPress={() => navigation.navigate('AmbulanceTracking')}
          accessibilityLabel="Ambulance tracking: Unit 204 is 4 minutes away"
          accessibilityRole="button"
        >
          <View style={styles.ambulanceIcon}>
            <MaterialCommunityIcons name="ambulance" size={32} color="#fff" />
          </View>
          <View style={styles.ambulanceInfo}>
            <View style={styles.ambulanceHeader}>
              <Text style={styles.ambulanceTitle}>{t('patient.nearbyAmbulance')}</Text>
              <View style={styles.liveBadge}>
                <Text style={styles.liveText}>LIVE</Text>
              </View>
            </View>
            <Text style={styles.ambulanceSubtitle}>Unit #204 {t('patient.ambulanceAway')}</Text>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: '75%' }]} />
            </View>
          </View>
        </TouchableOpacity>

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <TouchableOpacity
            style={styles.quickAction}
            onPress={() => setShowMedicineModal(true)}
          >
            <View style={styles.quickActionIcon}>
              <MaterialCommunityIcons name="pill" size={24} color="#1963eb" />
            </View>
            <Text style={styles.quickActionText}>{t('patient.medicineSuggestions')}</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.quickAction}
            onPress={() => navigation.navigate('MedicineDetection')}
          >
            <View style={styles.quickActionIcon}>
              <MaterialCommunityIcons name="camera" size={24} color="#1963eb" />
            </View>
            <Text style={styles.quickActionText}>{t('patient.scanMedicine')}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Payment Modal */}
      <Modal
        visible={showPaymentModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowPaymentModal(false)}
      >
        <TouchableOpacity 
          style={styles.modalOverlay} 
          activeOpacity={1}
          onPress={() => setShowPaymentModal(false)}
        >
          <TouchableOpacity 
            style={styles.modalContent}
            activeOpacity={1}
            onPress={(e) => e.stopPropagation()}
          >
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{t('patient.paymentMethod')}</Text>
              <TouchableOpacity onPress={() => setShowPaymentModal(false)}>
                <MaterialCommunityIcons name="close" size={24} color="#fff" />
              </TouchableOpacity>
            </View>
            
            {selectedDoctor && (
              <View style={styles.appointmentSummary}>
                <Text style={styles.summaryLabel}>{t('patient.bookingWith')}</Text>
                <Text style={styles.summaryValue}>{selectedDoctor.name}</Text>
                <Text style={styles.summaryLabel}>{t('patient.consultationFee')}</Text>
                <Text style={styles.summaryPrice}>${selectedDoctor.consultationFee}</Text>
              </View>
            )}

            <TouchableOpacity
              style={styles.paymentOption}
              onPress={() => handlePayment(t('patient.creditDebitCard'))}
            >
              <MaterialCommunityIcons name="credit-card" size={24} color="#1963eb" />
              <Text style={styles.paymentOptionText}>{t('patient.creditDebitCard')}</Text>
              <MaterialCommunityIcons name="chevron-right" size={24} color="#94a3b8" />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.paymentOption}
              onPress={() => handlePayment(t('patient.digitalWallet'))}
            >
              <MaterialCommunityIcons name="wallet" size={24} color="#1963eb" />
              <Text style={styles.paymentOptionText}>{t('patient.digitalWallet')}</Text>
              <MaterialCommunityIcons name="chevron-right" size={24} color="#94a3b8" />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.paymentOption}
              onPress={() => handlePayment(t('patient.insurance'))}
            >
              <MaterialCommunityIcons name="shield-check" size={24} color="#1963eb" />
              <Text style={styles.paymentOptionText}>{t('patient.insurance')}</Text>
              <MaterialCommunityIcons name="chevron-right" size={24} color="#94a3b8" />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.paymentOption}
              onPress={() => handlePayment(t('patient.payAtHospital'))}
            >
              <MaterialCommunityIcons name="cash" size={24} color="#1963eb" />
              <Text style={styles.paymentOptionText}>{t('patient.payAtHospital')}</Text>
              <MaterialCommunityIcons name="chevron-right" size={24} color="#94a3b8" />
            </TouchableOpacity>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>

      {/* Medicine Suggestions Modal */}
      <Modal
        visible={showMedicineModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowMedicineModal(false)}
      >
        <TouchableOpacity 
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowMedicineModal(false)}
        >
          <TouchableOpacity 
            style={styles.modalContent}
            activeOpacity={1}
            onPress={(e) => e.stopPropagation()}
          >
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{t('patient.medicineSuggestions')}</Text>
              <TouchableOpacity onPress={() => setShowMedicineModal(false)}>
                <MaterialCommunityIcons name="close" size={24} color="#fff" />
              </TouchableOpacity>
            </View>
            
            <Text style={styles.modalSubtitle}>AI-Powered Recommendations</Text>
            
            {MOCK_MEDICINES.map((medicine) => (
              <TouchableOpacity
                key={medicine.id}
                style={styles.medicineItem}
                onPress={() => {
                  setShowMedicineModal(false);
                  Alert.alert(
                    'Order Medicine',
                    `Would you like to order ${medicine.name}?`,
                    [
                      { text: 'Cancel', style: 'cancel' },
                      { text: 'Order Now', onPress: () => Alert.alert('Success', 'Order placed!') }
                    ]
                  );
                }}
              >
                <View style={styles.medicineIcon}>
                  <MaterialCommunityIcons name="pill" size={20} color="#1963eb" />
                </View>
                <View style={styles.medicineInfo}>
                  <Text style={styles.medicineName}>{medicine.name}</Text>
                  <Text style={styles.medicineCategory}>{medicine.category}</Text>
                </View>
                <Text style={styles.medicinePrice}>${medicine.price}</Text>
              </TouchableOpacity>
            ))}

            <TouchableOpacity
              style={styles.thirdPartyButton}
              onPress={() => {
                setShowMedicineModal(false);
                Linking.openURL('https://www.1mg.com').catch(() => {
                  Alert.alert('Error', 'Unable to open medicine app');
                });
              }}
            >
              <MaterialCommunityIcons name="open-in-new" size={20} color="#fff" />
              <Text style={styles.thirdPartyButtonText}>Browse More on 1mg</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>

      {/* Radius Selection Modal */}
      <Modal
        visible={showRadiusModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowRadiusModal(false)}
      >
        <TouchableOpacity 
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowRadiusModal(false)}
        >
          <TouchableOpacity 
            style={styles.modalContent}
            activeOpacity={1}
            onPress={(e) => e.stopPropagation()}
          >
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{t('patient.searchRadius')}</Text>
              <TouchableOpacity onPress={() => setShowRadiusModal(false)}>
                <MaterialCommunityIcons name="close" size={24} color="#fff" />
              </TouchableOpacity>
            </View>
            
            <Text style={styles.modalSubtitle}>{t('patient.selectDistanceToSearch')}</Text>
            
            {[1, 2, 5, 10, 20].map((radius) => (
              <TouchableOpacity
                key={radius}
                style={[
                  styles.radiusOption,
                  radiusKm === radius && styles.radiusOptionActive
                ]}
                onPress={() => handleRadiusChange(radius)}
              >
                <MaterialCommunityIcons 
                  name="map-marker-radius" 
                  size={24} 
                  color={radiusKm === radius ? '#1963eb' : '#94a3b8'} 
                />
                <Text style={[
                  styles.radiusOptionText,
                  radiusKm === radius && styles.radiusOptionTextActive
                ]}>
                  {radius} km
                </Text>
                {radiusKm === radius && (
                  <MaterialCommunityIcons name="check-circle" size={20} color="#1963eb" />
                )}
              </TouchableOpacity>
            ))}
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity
          style={styles.navItem}
          accessibilityLabel="Home"
          accessibilityRole="button"
          accessibilityState={{ selected: true }}
        >
          <MaterialCommunityIcons name="home" size={24} color="#1963eb" />
          <Text style={styles.navTextActive}>Home</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate('History')}
          accessibilityLabel="Medical history"
          accessibilityRole="button"
        >
          <MaterialCommunityIcons name="history" size={24} color="#94a3b8" />
          <Text style={styles.navText}>History</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.emergencyBtn}
          onPress={handleEmergencyPress}
          accessibilityLabel="Emergency"
          accessibilityRole="button"
          accessibilityHint="Request emergency assistance"
        >
          <MaterialCommunityIcons name="alert-circle" size={32} color="#fff" />
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate('MedicalReports')}
          accessibilityLabel="Medical records"
          accessibilityRole="button"
        >
          <MaterialCommunityIcons name="file-document-outline" size={24} color="#94a3b8" />
          <Text style={styles.navText}>Records</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate('Profile')}
          accessibilityLabel="Profile"
          accessibilityRole="button"
        >
          <MaterialCommunityIcons name="account-outline" size={24} color="#94a3b8" />
          <Text style={styles.navText}>Profile</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#101622',
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: '#101622',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    color: '#fff',
    marginTop: 12,
    fontSize: 14,
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
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(25,99,235,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#1963eb',
  },
  welcomeText: {
    fontSize: 12,
    color: '#94a3b8',
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  notificationBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#1e293b',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ef4444',
    borderWidth: 1,
    borderColor: '#1e293b',
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 120,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e293b',
    borderRadius: 12,
    marginHorizontal: 24,
    marginVertical: 12,
    paddingHorizontal: 16,
    height: 48,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    color: '#fff',
    fontSize: 14,
  },
  categories: {
    paddingHorizontal: 24,
    marginBottom: 12,
  },
  category: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e293b',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginRight: 12,
    gap: 8,
  },
  categoryActive: {
    backgroundColor: '#1963eb',
  },
  categoryText: {
    color: '#64748b',
    fontSize: 14,
    fontWeight: '500',
  },
  categoryTextActive: {
    color: '#fff',
  },
  errorContainer: {
    backgroundColor: 'rgba(239,68,68,0.1)',
    marginHorizontal: 24,
    marginBottom: 16,
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: 'rgba(239,68,68,0.3)',
  },
  errorText: {
    color: '#ef4444',
    fontSize: 14,
    flex: 1,
  },
  retryText: {
    color: '#1963eb',
    fontSize: 14,
    fontWeight: 'bold',
  },
  section: {
    paddingHorizontal: 10,
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  seeAll: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1963eb',
  },
  mapCard: {
    height: 176,
    backgroundColor: '#1e293b',
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#334155',
  },
  mapOverlay: {
    flex: 1,
    padding: 16,
    justifyContent: 'flex-end',
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 12,
  },
  hospitalBadge: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 8,
    alignItems: 'center',
    gap: 8,
  },
  hospitalIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: 'rgba(25,99,235,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeLabel: {
    fontSize: 8,
    fontWeight: 'bold',
    color: '#94a3b8',
    letterSpacing: 1,
  },
  badgeTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#0f172a',
  },
  distanceBadge: {
    backgroundColor: '#1963eb',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  distanceText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#fff',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
    backgroundColor: 'rgba(30,41,59,0.5)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#334155',
  },
  emptyStateText: {
    color: '#94a3b8',
    fontSize: 16,
    marginTop: 12,
    marginBottom: 16,
  },
  resetButton: {
    backgroundColor: '#1963eb',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  resetButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  doctorsList: {
    marginLeft: 0,
  },
  doctorCardWrapper: {
    position: 'relative',
    marginRight: 12,
  },
  hideButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    zIndex: 10,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(0,0,0,0.6)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  doctorCard: {
    width: SCREEN_WIDTH * 0.45,
    backgroundColor: 'rgba(30,41,59,0.5)',
    borderRadius: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: '#334155',
  },
  doctorImageContainer: {
    position: 'relative',
    alignSelf: 'center',
    marginBottom: 8,
  },
  doctorImage: {
    width: 72,
    height: 72,
    borderRadius: 12,
    backgroundColor: 'rgba(25,99,235,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  onlineBadge: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#10b981',
    borderWidth: 2,
    borderColor: '#101622',
  },
  doctorName: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  doctorSpecialty: {
    fontSize: 9,
    color: '#94a3b8',
    textAlign: 'center',
    marginBottom: 4,
  },
  doctorMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    marginBottom: 4,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#fff',
  },
  distanceText: {
    fontSize: 9,
    color: '#94a3b8',
  },
  feeText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#10b981',
    textAlign: 'center',
    marginBottom: 6,
  },
  bookBtn: {
    backgroundColor: '#1963eb',
    borderRadius: 10,
    paddingVertical: 6,
    alignItems: 'center',
  },
  bookBtnDisabled: {
    backgroundColor: '#334155',
  },
  bookBtnText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: 'bold',
  },
  hospitalCard: {
    width: SCREEN_WIDTH * 0.6,
    backgroundColor: 'rgba(30,41,59,0.5)',
    borderRadius: 16,
    padding: 16,
    marginRight: 16,
    borderWidth: 1,
    borderColor: '#334155',
  },
  hospitalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  hospitalIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: 'rgba(25,99,235,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emergencyBadge: {
    backgroundColor: '#ef4444',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  emergencyBadgeText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#fff',
  },
  hospitalName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  hospitalMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 6,
  },
  bedsText: {
    fontSize: 11,
    color: '#94a3b8',
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
    maxHeight: '80%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
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
  modalSubtitle: {
    fontSize: 14,
    color: '#94a3b8',
    marginBottom: 16,
  },
  appointmentSummary: {
    backgroundColor: 'rgba(25,99,235,0.1)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(25,99,235,0.2)',
  },
  summaryLabel: {
    fontSize: 12,
    color: '#94a3b8',
    marginBottom: 4,
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 12,
  },
  summaryPrice: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#10b981',
  },
  paymentOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(30,41,59,0.5)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#334155',
    gap: 12,
  },
  paymentOptionText: {
    flex: 1,
    fontSize: 16,
    color: '#fff',
    fontWeight: '500',
  },
  medicineItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(30,41,59,0.5)',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#334155',
    gap: 12,
  },
  medicineIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: 'rgba(25,99,235,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  medicineInfo: {
    flex: 1,
  },
  medicineName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 2,
  },
  medicineCategory: {
    fontSize: 11,
    color: '#94a3b8',
  },
  medicinePrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#10b981',
  },
  thirdPartyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1963eb',
    borderRadius: 12,
    padding: 16,
    marginTop: 8,
    gap: 8,
  },
  thirdPartyButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  radiusOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(30,41,59,0.5)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#334155',
    gap: 12,
  },
  radiusOptionActive: {
    borderColor: '#1963eb',
    backgroundColor: 'rgba(25,99,235,0.1)',
  },
  radiusOptionText: {
    flex: 1,
    fontSize: 16,
    color: '#94a3b8',
    fontWeight: '500',
  },
  radiusOptionTextActive: {
    color: '#fff',
    fontWeight: 'bold',
  },
  ambulanceCard: {
    flexDirection: 'row',
    backgroundColor: 'rgba(25,99,235,0.1)',
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 24,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(25,99,235,0.2)',
    gap: 16,
  },
  ambulanceIcon: {
    width: 56,
    height: 56,
    borderRadius: 12,
    backgroundColor: '#1963eb',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ambulanceInfo: {
    flex: 1,
  },
  ambulanceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  ambulanceTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
  },
  liveBadge: {
    backgroundColor: '#10b981',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  liveText: {
    fontSize: 8,
    fontWeight: 'bold',
    color: '#fff',
  },
  ambulanceSubtitle: {
    fontSize: 12,
    color: '#94a3b8',
    marginBottom: 8,
  },
  progressBar: {
    height: 6,
    backgroundColor: 'rgba(25,99,235,0.2)',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#1963eb',
    borderRadius: 3,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    marginBottom: 16,
    gap: 12,
  },
  quickAction: {
    flex: 1,
    backgroundColor: 'rgba(30,41,59,0.5)',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#334155',
  },
  quickActionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(25,99,235,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  quickActionText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
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
    paddingBottom: 32,
    paddingTop: 8,
    paddingHorizontal: 24,
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  navItem: {
    alignItems: 'center',
    gap: 4,
  },
  navTextActive: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#1963eb',
  },
  navText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#94a3b8',
  },
  emergencyBtn: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#ef4444',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -32,
    shadowColor: '#ef4444',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 8,
  },
});

export default PatientDashboard;