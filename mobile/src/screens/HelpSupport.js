import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTranslation } from '../hooks/useTranslation';

export default function HelpSupport({ navigation }) {
  const { t } = useTranslation();
  const contactOptions = [
    { icon: 'phone', title: 'Call Us', subtitle: '+1 800 123 4567', action: 'tel:+18001234567' },
    { icon: 'email', title: 'Email Support', subtitle: 'support@lifelink.com', action: 'mailto:support@lifelink.com' },
    { icon: 'chat', title: 'Live Chat', subtitle: 'Chat with our team', action: null },
    { icon: 'web', title: 'Visit Website', subtitle: 'www.lifelink.com', action: 'https://www.lifelink.com' },
  ];

  const faqItems = [
    { question: 'How do I book an appointment?', answer: 'Go to Appointments and select your preferred doctor and time slot.' },
    { question: 'How to request emergency ambulance?', answer: 'Tap the Emergency button on your dashboard for immediate assistance.' },
    { question: 'Can I view my medical reports?', answer: 'Yes, all reports are available in the Medical Reports section.' },
    { question: 'How to update my profile?', answer: 'Go to Profile > Edit Profile to update your information.' },
  ];

  const handleContact = (action) => {
    if (action) {
      Linking.openURL(action);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Help & Support</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contact Us</Text>
          {contactOptions.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={styles.contactCard}
              onPress={() => handleContact(option.action)}
            >
              <View style={styles.contactIcon}>
                <MaterialCommunityIcons name={option.icon} size={24} color="#1963eb" />
              </View>
              <View style={styles.contactInfo}>
                <Text style={styles.contactTitle}>{option.title}</Text>
                <Text style={styles.contactSubtitle}>{option.subtitle}</Text>
              </View>
              <MaterialCommunityIcons name="chevron-right" size={24} color="#64748b" />
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
          {faqItems.map((item, index) => (
            <View key={index} style={styles.faqCard}>
              <View style={styles.faqHeader}>
                <MaterialCommunityIcons name="help-circle" size={20} color="#1963eb" />
                <Text style={styles.faqQuestion}>{item.question}</Text>
              </View>
              <Text style={styles.faqAnswer}>{item.answer}</Text>
            </View>
          ))}
        </View>

        <TouchableOpacity style={styles.emergencyCard}>
          <MaterialCommunityIcons name="alert-circle" size={24} color="#ef4444" />
          <View style={styles.emergencyInfo}>
            <Text style={styles.emergencyTitle}>Emergency Hotline</Text>
            <Text style={styles.emergencyNumber}>911 or +1 800 EMERGENCY</Text>
          </View>
        </TouchableOpacity>
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
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 16,
  },
  contactCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e293b',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#334155',
  },
  contactIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(25,99,235,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  contactInfo: {
    flex: 1,
  },
  contactTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 2,
  },
  contactSubtitle: {
    fontSize: 14,
    color: '#94a3b8',
  },
  faqCard: {
    backgroundColor: '#1e293b',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#334155',
  },
  faqHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 8,
  },
  faqQuestion: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  faqAnswer: {
    fontSize: 14,
    color: '#94a3b8',
    lineHeight: 20,
    marginLeft: 32,
  },
  emergencyCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(239,68,68,0.1)',
    borderRadius: 16,
    padding: 20,
    gap: 16,
    borderWidth: 2,
    borderColor: 'rgba(239,68,68,0.3)',
    marginBottom: 32,
  },
  emergencyInfo: {
    flex: 1,
  },
  emergencyTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ef4444',
    marginBottom: 4,
  },
  emergencyNumber: {
    fontSize: 14,
    color: '#94a3b8',
  },
});
