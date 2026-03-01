import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTranslation } from '../hooks/useTranslation';

export default function DoctorStats({ navigation }) {
  const { t } = useTranslation();
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Statistics</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <MaterialCommunityIcons name="account-group" size={24} color="#1963eb" />
            <Text style={styles.statNumber}>142</Text>
            <Text style={styles.statLabel}>Total Patients</Text>
          </View>
          <View style={styles.statCard}>
            <MaterialCommunityIcons name="calendar-check" size={24} color="#10b981" />
            <Text style={styles.statNumber}>28</Text>
            <Text style={styles.statLabel}>This Week</Text>
          </View>
        </View>

        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <MaterialCommunityIcons name="clock-outline" size={24} color="#fbbf24" />
            <Text style={styles.statNumber}>5.2h</Text>
            <Text style={styles.statLabel}>Avg. Consultation</Text>
          </View>
          <View style={styles.statCard}>
            <MaterialCommunityIcons name="star" size={24} color="#f59e0b" />
            <Text style={styles.statNumber}>4.8</Text>
            <Text style={styles.statLabel}>Rating</Text>
          </View>
        </View>

        <View style={styles.chartCard}>
          <Text style={styles.chartTitle}>Weekly Overview</Text>
          <View style={styles.chartPlaceholder}>
            <MaterialCommunityIcons name="chart-line" size={48} color="#334155" />
            <Text style={styles.chartText}>Chart visualization</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          <View style={styles.activityCard}>
            <MaterialCommunityIcons name="check-circle" size={20} color="#10b981" />
            <Text style={styles.activityText}>Completed 5 appointments today</Text>
          </View>
          <View style={styles.activityCard}>
            <MaterialCommunityIcons name="file-document" size={20} color="#1963eb" />
            <Text style={styles.activityText}>Uploaded 3 prescriptions</Text>
          </View>
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
  content: {
    flex: 1,
    padding: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#1e293b',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#334155',
  },
  statNumber: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    color: '#94a3b8',
    marginTop: 4,
    textAlign: 'center',
  },
  chartCard: {
    backgroundColor: '#1e293b',
    borderRadius: 16,
    padding: 20,
    marginTop: 12,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#334155',
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 16,
  },
  chartPlaceholder: {
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(16,22,34,0.5)',
    borderRadius: 12,
  },
  chartText: {
    fontSize: 14,
    color: '#64748b',
    marginTop: 8,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 12,
  },
  activityCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    gap: 12,
    borderWidth: 1,
    borderColor: '#334155',
  },
  activityText: {
    fontSize: 14,
    color: '#94a3b8',
  },
});
