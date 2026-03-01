import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTranslation } from '../hooks/useTranslation';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function MedicalReports({ navigation }) {
  const { t } = useTranslation();
  const reports = [
    { id: 1, title: 'Full Blood Count', facility: 'City Lab Center', date: 'Oct 24, 2023', size: '2.4 MB', status: 'Normal', icon: 'water', color: '#ef4444' },
    { id: 2, title: 'Chest X-Ray PA View', facility: 'LifeLink General Hospital', date: 'Sep 12, 2023', size: '15.8 MB', status: 'Review Needed', icon: 'radiobox-marked', color: '#3b82f6' },
    { id: 3, title: 'Cardiology Report', facility: 'Heart Care Institute', date: 'Aug 05, 2023', size: '1.1 MB', status: 'Normal', icon: 'file-document-outline', color: '#10b981' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t('patient.medicalReports')}</Text>
        <TouchableOpacity 
          style={styles.notificationBtn}
          onPress={() => navigation.navigate('Notifications')}
        >
          <MaterialCommunityIcons name="bell-outline" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <MaterialCommunityIcons name="magnify" size={20} color="#94a3b8" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search blood tests, X-rays..."
          placeholderTextColor="#94a3b8"
        />
      </View>

      <TouchableOpacity style={styles.uploadBtn}>
        <MaterialCommunityIcons name="cloud-upload" size={20} color="#fff" />
        <Text style={styles.uploadBtnText}>Upload New Report</Text>
      </TouchableOpacity>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filters}>
        <TouchableOpacity style={styles.filterActive}>
          <Text style={styles.filterTextActive}>All Reports</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filter}>
          <Text style={styles.filterText}>Lab Results</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filter}>
          <Text style={styles.filterText}>Imaging</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filter}>
          <Text style={styles.filterText}>Prescriptions</Text>
        </TouchableOpacity>
      </ScrollView>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Reports</Text>
          <TouchableOpacity>
            <Text style={styles.viewArchive}>View Archive</Text>
          </TouchableOpacity>
        </View>

        {reports.map((report) => (
          <View key={report.id} style={styles.reportCard}>
            <View style={[styles.reportIcon, { backgroundColor: `${report.color}15` }]}>
              <MaterialCommunityIcons name={report.icon} size={18} color={report.color} />
            </View>
            <View style={styles.reportInfo}>
              <Text style={styles.reportTitle}>{report.title}</Text>
              <Text style={styles.reportFacility}>{report.facility}</Text>
              <Text style={styles.reportMeta}>{report.date} • {report.size}</Text>
            </View>
            <View style={styles.reportActions}>
              <MaterialCommunityIcons name="dots-vertical" size={20} color="#94a3b8" />
              <View style={[
                styles.statusBadge,
                report.status === 'Normal' ? styles.statusNormal : styles.statusReview
              ]}>
                <Text style={[
                  styles.statusText,
                  report.status === 'Normal' ? styles.statusTextNormal : styles.statusTextReview
                ]}>
                  {report.status}
                </Text>
              </View>
            </View>
          </View>
        ))}

        <View style={styles.aiInsightCard}>
          <View style={styles.aiInsightIcon}>
            <MaterialCommunityIcons name="auto-fix" size={20} color="#1963eb" />
          </View>
          <View style={styles.aiInsightContent}>
            <Text style={styles.aiInsightLabel}>AI Report Analysis</Text>
            <Text style={styles.aiInsightText}>
              Our AI has analyzed your recent blood test. Most markers are within range, but Vitamin D is slightly low.
            </Text>
            <TouchableOpacity>
              <Text style={styles.aiInsightLink}>Read Full Summary</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      <View style={styles.bottomNav}>
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => navigation.navigate('PatientDashboard')}
        >
          <MaterialCommunityIcons name="home-outline" size={24} color="#94a3b8" />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItemActive}>
          <MaterialCommunityIcons name="file-document" size={24} color="#1963eb" />
          <Text style={styles.navTextActive}>Reports</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.navItem} 
          onPress={() => navigation.navigate('AmbulanceTracking')}
        >
          <MaterialCommunityIcons name="ambulance" size={24} color="#94a3b8" />
          <Text style={styles.navText}>Tracking</Text>
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
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  notificationBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(30,41,59,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e293b',
    borderRadius: 12,
    marginHorizontal: 16,
    marginVertical: 12,
    paddingHorizontal: 16,
    height: 56,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    color: '#fff',
    fontSize: 14,
  },
  uploadBtn: {
    flexDirection: 'row',
    backgroundColor: '#1963eb',
    borderRadius: 12,
    height: 64,
    marginHorizontal: 16,
    marginVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    shadowColor: '#1963eb',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  uploadBtnText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  filters: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  filterActive: {
    backgroundColor: '#1963eb',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 12,
  },
  filterTextActive: {
    fontSize: 14,
    fontWeight: '500',
    color: '#fff',
  },
  filter: {
    backgroundColor: '#1e293b',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#334155',
  },
  filterText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#64748b',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingBottom: 100,
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
  viewArchive: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1963eb',
  },
  reportCard: {
    flexDirection: 'row',
    backgroundColor: 'rgba(30,41,59,0.4)',
    borderRadius: 12,
    padding: 10,
    marginBottom: 8,
    gap: 10,
    borderWidth: 1,
    borderColor: '#334155',
  },
  reportIcon: {
    width: 44,
    height: 44,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  reportInfo: {
    flex: 1,
    gap: 2,
  },
  reportTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#fff',
  },
  reportFacility: {
    fontSize: 10,
    fontWeight: '500',
    color: '#94a3b8',
    letterSpacing: 0.3,
  },
  reportMeta: {
    fontSize: 9,
    color: '#64748b',
  },
  reportActions: {
    alignItems: 'flex-end',
    gap: 6,
  },
  statusBadge: {
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 3,
  },
  statusNormal: {
    backgroundColor: 'rgba(16,185,129,0.1)',
  },
  statusReview: {
    backgroundColor: 'rgba(251,191,36,0.1)',
  },
  statusText: {
    fontSize: 9,
    fontWeight: 'bold',
  },
  statusTextNormal: {
    color: '#10b981',
  },
  statusTextReview: {
    color: '#fbbf24',
  },
  aiInsightCard: {
    flexDirection: 'row',
    backgroundColor: 'rgba(25,99,235,0.1)',
    borderRadius: 16,
    padding: 16,
    marginTop: 16,
    gap: 16,
    borderWidth: 1,
    borderColor: 'rgba(25,99,235,0.2)',
  },
  aiInsightIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: 'rgba(25,99,235,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  aiInsightContent: {
    flex: 1,
    gap: 4,
  },
  aiInsightLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
  },
  aiInsightText: {
    fontSize: 12,
    color: '#94a3b8',
    lineHeight: 18,
  },
  aiInsightLink: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#1963eb',
    marginTop: 8,
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    backgroundColor: 'rgba(30,41,59,0.9)',
    borderTopWidth: 1,
    borderTopColor: '#334155',
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
    fontSize: 12,
    fontWeight: '500',
    color: '#94a3b8',
  },
  navTextActive: {
    fontSize: 12,
    fontWeight: '500',
    color: '#1963eb',
  },
});
