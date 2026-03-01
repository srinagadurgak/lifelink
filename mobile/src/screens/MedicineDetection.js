import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Dimensions, Alert, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { API_ENDPOINTS } from '../config/api';
import { useTranslation } from '../hooks/useTranslation';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function MedicineDetection({ navigation }) {
  const { t } = useTranslation();
  const [isScanning, setIsScanning] = useState(false);
  const [detectionResult, setDetectionResult] = useState(null);
  const [patientAge, setPatientAge] = useState('28');
  const [scanProgress, setScanProgress] = useState(0);
  const [hasPermission, setHasPermission] = useState(null);
  const [flashMode, setFlashMode] = useState(false);
  const scanLineAnim = useState(new Animated.Value(0))[0];

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  useEffect(() => {
    if (isScanning) {
      // Animate scan line
      Animated.loop(
        Animated.sequence([
          Animated.timing(scanLineAnim, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
          }),
          Animated.timing(scanLineAnim, {
            toValue: 0,
            duration: 0,
            useNativeDriver: true,
          }),
        ])
      ).start();

      // Simulate progress
      const interval = setInterval(() => {
        setScanProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 10;
        });
      }, 200);

      return () => clearInterval(interval);
    } else {
      scanLineAnim.setValue(0);
      setScanProgress(0);
    }
  }, [isScanning]);

  const medicines = [
    {
      name: 'Amoxicillin 500mg',
      type: 'Antibiotic • Capsule Form',
      dosage: '1 cap / 8 hrs',
      prices: [
        { shop: 'MediCare Plus', price: '$12.50', available: true },
        { shop: 'Life Pharma', price: '$14.20', available: true },
      ]
    },
    {
      name: 'Paracetamol 650mg',
      type: 'Pain Relief • Tablet',
      dosage: '1 tab / 6 hrs',
      prices: [
        { shop: 'HealthMart', price: '$5.99', available: true },
        { shop: 'QuickMeds', price: '$6.50', available: true },
      ]
    },
    {
      name: 'Ibuprofen 400mg',
      type: 'Anti-inflammatory • Tablet',
      dosage: '1 tab / 8 hrs',
      prices: [
        { shop: 'CityPharmacy', price: '$8.75', available: true },
        { shop: 'MediCare Plus', price: '$9.20', available: true },
      ]
    }
  ];

  const handleScan = async () => {
    if (isScanning) return;
    
    setIsScanning(true);
    setDetectionResult(null);
    setScanProgress(0);
    
    try {
      // Simulate scanning progress
      const progressInterval = setInterval(() => {
        setScanProgress(prev => Math.min(prev + 10, 90));
      }, 200);

      // In a real scenario, you would capture/select an image first
      // For now, we'll show an alert to select image
      Alert.alert(
        'Select Image',
        'Please select a medicine image to analyze',
        [
          {
            text: 'Cancel',
            onPress: () => {
              clearInterval(progressInterval);
              setIsScanning(false);
              setScanProgress(0);
            },
            style: 'cancel'
          },
          {
            text: 'Choose Image',
            onPress: async () => {
              try {
                const result = await ImagePicker.launchImageLibraryAsync({
                  mediaTypes: ImagePicker.MediaTypeOptions.Images,
                  allowsEditing: true,
                  aspect: [4, 3],
                  quality: 0.8,
                  base64: false,
                });

                if (!result.canceled && result.assets[0]) {
                  const imageUri = result.assets[0].uri;
                  
                  // Create form data
                  const formData = new FormData();
                  formData.append('image', {
                    uri: imageUri,
                    type: 'image/jpeg',
                    name: 'medicine.jpg',
                  });

                  // Call backend API
                  const response = await fetch(API_ENDPOINTS.MEDICINE_DETECT, {
                    method: 'POST',
                    body: formData,
                    headers: {
                      'Content-Type': 'multipart/form-data',
                    },
                  });

                  clearInterval(progressInterval);
                  setScanProgress(100);

                  if (response.ok) {
                    const data = await response.json();
                    
                    if (data.success && data.detected) {
                      // Format the result for display
                      const formattedResult = {
                        name: data.detected.name || 'Unknown Medicine',
                        type: `${data.detected.category || 'Medicine'} • ${data.detected.genericName || 'Generic'}`,
                        dosage: data.detected.usage || 'Consult doctor for dosage',
                        uses: data.detected.uses || [],
                        sideEffects: data.detected.sideEffects || [],
                        precautions: data.detected.precautions || [],
                        confidence: data.detected.confidence || 0,
                        prices: [
                          { shop: 'MediCare Plus', price: '$12.50', available: true },
                          { shop: 'Life Pharma', price: '$14.20', available: true },
                        ]
                      };
                      
                      setDetectionResult(formattedResult);
                      setIsScanning(false);
                      
                      Alert.alert(
                        'Medicine Detected!',
                        `${formattedResult.name}\n\nConfidence: ${(formattedResult.confidence * 100).toFixed(0)}%\n\nUses: ${formattedResult.uses.slice(0, 2).join(', ')}`,
                        [{ text: 'OK' }]
                      );
                    } else {
                      throw new Error('Detection failed');
                    }
                  } else {
                    throw new Error('API request failed');
                  }
                } else {
                  clearInterval(progressInterval);
                  setIsScanning(false);
                  setScanProgress(0);
                }
              } catch (error) {
                clearInterval(progressInterval);
                setIsScanning(false);
                setScanProgress(0);
                console.error('Detection error:', error);
                Alert.alert(
                  'Detection Failed',
                  'Unable to analyze the medicine. Please try again with a clearer image.',
                  [{ text: 'OK' }]
                );
              }
            }
          }
        ]
      );
    } catch (error) {
      setIsScanning(false);
      setScanProgress(0);
      console.error('Scan error:', error);
      Alert.alert('Error', 'Failed to start scanning');
    }
  };

  const handleImagePick = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (status !== 'granted') {
        Alert.alert('Permission Required', 'Please grant gallery access to select images');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        setIsScanning(true);
        setDetectionResult(null);
        setScanProgress(0);

        try {
          const imageUri = result.assets[0].uri;
          
          // Simulate progress
          const progressInterval = setInterval(() => {
            setScanProgress(prev => Math.min(prev + 10, 90));
          }, 200);

          // Create form data
          const formData = new FormData();
          formData.append('image', {
            uri: imageUri,
            type: 'image/jpeg',
            name: 'medicine.jpg',
          });

          // Call backend API
          const response = await fetch(API_ENDPOINTS.MEDICINE_DETECT, {
            method: 'POST',
            body: formData,
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });

          clearInterval(progressInterval);
          setScanProgress(100);

          if (response.ok) {
            const data = await response.json();
            
            if (data.success && data.detected) {
              const formattedResult = {
                name: data.detected.name || 'Unknown Medicine',
                type: `${data.detected.category || 'Medicine'} • ${data.detected.genericName || 'Generic'}`,
                dosage: data.detected.usage || 'Consult doctor for dosage',
                uses: data.detected.uses || [],
                sideEffects: data.detected.sideEffects || [],
                precautions: data.detected.precautions || [],
                confidence: data.detected.confidence || 0,
                prices: [
                  { shop: 'MediCare Plus', price: '$12.50', available: true },
                  { shop: 'Life Pharma', price: '$14.20', available: true },
                ]
              };
              
              setDetectionResult(formattedResult);
              setIsScanning(false);
              
              Alert.alert(
                'Medicine Detected!',
                `${formattedResult.name}\n\nConfidence: ${(formattedResult.confidence * 100).toFixed(0)}%`,
                [{ text: 'View Details', onPress: () => {} }]
              );
            } else {
              throw new Error('Detection failed');
            }
          } else {
            throw new Error('API request failed');
          }
        } catch (error) {
          setIsScanning(false);
          setScanProgress(0);
          console.error('Detection error:', error);
          Alert.alert(
            'Detection Failed',
            'Unable to analyze the medicine. Please ensure:\n• Image is clear\n• Medicine label is visible\n• Good lighting\n\nThen try again.',
            [{ text: 'OK' }]
          );
        }
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to access gallery');
    }
  };

  const handleFlashToggle = () => {
    setFlashMode(!flashMode);
    Alert.alert('Flash', flashMode ? 'Flash turned off' : 'Flash turned on');
  };

  const scanLineTranslateY = scanLineAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-SCREEN_WIDTH * 0.32, SCREEN_WIDTH * 0.32],
  });
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="#fff" />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>AI Medicine Scanner</Text>
          <Text style={styles.headerSubtitle}>LIFELINK AI ACTIVE</Text>
        </View>
        <TouchableOpacity>
          <MaterialCommunityIcons name="history" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.cameraView}>
        <View style={styles.scannerFrame}>
          <View style={[styles.corner, styles.cornerTL]} />
          <View style={[styles.corner, styles.cornerTR]} />
          <View style={[styles.corner, styles.cornerBL]} />
          <View style={[styles.corner, styles.cornerBR]} />
          
          {isScanning && (
            <Animated.View 
              style={[
                styles.scanLine,
                { transform: [{ translateY: scanLineTranslateY }] }
              ]} 
            />
          )}
          
          <View style={styles.scanIcon}>
            <MaterialCommunityIcons 
              name={isScanning ? "loading" : "camera-outline"} 
              size={48} 
              color={isScanning ? "#1963eb" : "rgba(25,99,235,0.6)"} 
            />
            <Text style={styles.scanText}>
              {isScanning ? `SCANNING... ${scanProgress}%` : 'TAP SCAN TO START'}
            </Text>
            {!isScanning && !detectionResult && (
              <Text style={styles.scanHint}>Point camera at medicine label</Text>
            )}
          </View>
        </View>
      </View>

      {detectionResult && (
        <View style={styles.detectionCard}>
          <View style={styles.detectionHeader}>
            <View>
              <Text style={styles.detectionBadge}>DETECTION SUCCESS</Text>
              <Text style={styles.medicineName}>{detectionResult.name}</Text>
              <Text style={styles.medicineType}>{detectionResult.type}</Text>
            </View>
            <View style={styles.medicineIcon}>
              <MaterialCommunityIcons name="pill" size={24} color="#1963eb" />
            </View>
          </View>

          <View style={styles.inputRow}>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Patient Age</Text>
              <View style={styles.inputContainer}>
                <TextInput 
                  style={styles.input} 
                  value={patientAge} 
                  onChangeText={setPatientAge}
                  keyboardType="number-pad" 
                />
                <Text style={styles.inputUnit}>YRS</Text>
              </View>
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Dosage Advice</Text>
              <View style={styles.dosageBox}>
                <Text style={styles.dosageText}>{detectionResult.dosage}</Text>
              </View>
            </View>
          </View>

          <View style={styles.priceSection}>
            <View style={styles.priceSectionHeader}>
              <Text style={styles.inputLabel}>Price Comparison</Text>
              <Text style={styles.nearbyBadge}>NEARBY</Text>
            </View>
            {detectionResult.prices.map((item, index) => (
              <View key={index} style={styles.shopCard}>
                <View style={styles.shopInfo}>
                  <MaterialCommunityIcons 
                    name="store" 
                    size={16} 
                    color={index === 0 ? "#10b981" : "#94a3b8"} 
                  />
                  <Text style={styles.shopName}>{item.shop}</Text>
                </View>
                <Text style={styles.shopPrice}>{item.price}</Text>
              </View>
            ))}
          </View>

          <TouchableOpacity style={styles.reserveBtn}>
            <MaterialCommunityIcons name="cart" size={20} color="#fff" />
            <Text style={styles.reserveBtnText}>Reserve at {detectionResult.prices[0].shop}</Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.cameraControls}>
        <TouchableOpacity style={styles.controlBtn} onPress={handleImagePick}>
          <MaterialCommunityIcons name="image" size={24} color="#cbd5e1" />
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.scanButton} 
          onPress={handleScan}
          disabled={isScanning}
        >
          <View style={styles.scanButtonInner}>
            <MaterialCommunityIcons name="qrcode-scan" size={32} color="#fff" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.controlBtn} onPress={handleFlashToggle}>
          <MaterialCommunityIcons 
            name={flashMode ? "flash" : "flash-off"} 
            size={24} 
            color={flashMode ? "#fbbf24" : "#cbd5e1"} 
          />
        </TouchableOpacity>
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
          <MaterialCommunityIcons name="qrcode-scan" size={24} color="#1963eb" />
          <Text style={styles.navTextActive}>Scan</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => navigation.navigate('AmbulanceTracking')}
        >
          <MaterialCommunityIcons name="ambulance" size={24} color="#94a3b8" />
          <Text style={styles.navText}>Ambulance</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => navigation.navigate('Profile')}
        >
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
    backgroundColor: '#0a0e1a',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 48,
    paddingBottom: 24,
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
    fontSize: 10,
    fontWeight: 'bold',
    color: '#1963eb',
    letterSpacing: 2,
  },
  cameraView: {
    flex: 1,
    backgroundColor: '#1e293b',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scannerFrame: {
    width: SCREEN_WIDTH * 0.64,
    height: SCREEN_WIDTH * 0.64,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  corner: {
    position: 'absolute',
    width: 32,
    height: 32,
    borderColor: '#1963eb',
  },
  cornerTL: {
    top: 0,
    left: 0,
    borderTopWidth: 4,
    borderLeftWidth: 4,
    borderTopLeftRadius: 8,
  },
  cornerTR: {
    top: 0,
    right: 0,
    borderTopWidth: 4,
    borderRightWidth: 4,
    borderTopRightRadius: 8,
  },
  cornerBL: {
    bottom: 0,
    left: 0,
    borderBottomWidth: 4,
    borderLeftWidth: 4,
    borderBottomLeftRadius: 8,
  },
  cornerBR: {
    bottom: 0,
    right: 0,
    borderBottomWidth: 4,
    borderRightWidth: 4,
    borderBottomRightRadius: 8,
  },
  scanLine: {
    position: 'absolute',
    width: '100%',
    height: 3,
    backgroundColor: '#1963eb',
    shadowColor: '#1963eb',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 5,
  },
  scanIcon: {
    alignItems: 'center',
    gap: 12,
  },
  scanText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: 'rgba(25,99,235,0.8)',
    letterSpacing: 2,
  },
  scanHint: {
    fontSize: 10,
    color: '#64748b',
    marginTop: 4,
  },
  detectionCard: {
    backgroundColor: 'rgba(28,31,39,0.95)',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  detectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
    marginBottom: 16,
  },
  detectionBadge: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#1963eb',
    letterSpacing: 1,
    marginBottom: 4,
  },
  medicineName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  medicineType: {
    fontSize: 14,
    color: '#94a3b8',
  },
  medicineIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: 'rgba(25,99,235,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(25,99,235,0.3)',
  },
  inputRow: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 16,
  },
  inputGroup: {
    flex: 1,
    gap: 6,
  },
  inputLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: '#94a3b8',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(30,41,59,0.5)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 40,
  },
  input: {
    flex: 1,
    color: '#fff',
    fontSize: 14,
  },
  inputUnit: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#94a3b8',
    letterSpacing: 1,
  },
  dosageBox: {
    backgroundColor: 'rgba(25,99,235,0.1)',
    borderWidth: 1,
    borderColor: 'rgba(25,99,235,0.2)',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 40,
    justifyContent: 'center',
  },
  dosageText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1963eb',
  },
  priceSection: {
    gap: 8,
    marginBottom: 16,
  },
  priceSectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  nearbyBadge: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#1963eb',
  },
  shopCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
    borderRadius: 12,
    padding: 8,
  },
  shopInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  shopName: {
    fontSize: 14,
    color: '#cbd5e1',
  },
  shopPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
  },
  reserveBtn: {
    flexDirection: 'row',
    backgroundColor: '#1963eb',
    borderRadius: 12,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  reserveBtnText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  cameraControls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    gap: 32,
    backgroundColor: '#101622',
    borderTopWidth: 1,
    borderTopColor: '#1e293b',
  },
  controlBtn: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#1e293b',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scanButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255,255,255,0.1)',
    padding: 4,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  scanButtonInner: {
    flex: 1,
    borderRadius: 36,
    backgroundColor: '#1963eb',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#1963eb',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 8,
  },
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: '#101622',
    borderTopWidth: 1,
    borderTopColor: '#1e293b',
    paddingHorizontal: 24,
    paddingTop: 8,
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
    fontWeight: '500',
    color: '#1963eb',
  },
});
