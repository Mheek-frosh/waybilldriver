import React, { useState } from 'react';
import { View, Text, Pressable, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { s } from '../components/DriverUI';
import { useDriverStore } from '../state/useDriverStore';

// Full-screen account updates; each card expands in place instead of opening a sheet.
export default function NotificationsScreen({ navigation }) {
  const draft = useDriverStore(state => state.draft);
  const [expanded, setExpanded] = useState(null);
  // Local preview notices derived from the profile, not a remote notification feed.
  const notifications = [
    { id: 'welcome', icon: 'checkmark-circle-outline', title: 'Welcome to Waybill', body: 'Your profile details are confirmed.', detail: `${draft.name} · ${draft.vehicleType} partner · ${draft.city}` },
    { id: 'verification', icon: 'document-text-outline', title: 'Complete your verification', body: 'Contact and documents pending.', detail: 'Contact verification, driver identity and vehicle registration are still required. Document upload coming soon.' },
  ];
  return <SafeAreaView style={s.page}><View style={s.frame}>
    <View style={styles.header}>
      <Pressable accessibilityRole="button" accessibilityLabel="Back to dashboard" onPress={() => navigation.goBack()} style={styles.back}><Ionicons name="arrow-back" size={24} color="#fff" /></Pressable>
      <Text style={styles.title}>Notifications</Text>
    </View>
    <ScrollView contentContainerStyle={styles.content}>
      <Text style={[s.badge, { marginBottom: 20 }]}>ACCOUNT UPDATES</Text>
      {notifications.map(item => <Pressable key={item.id} accessibilityRole="button" accessibilityState={{ expanded: expanded === item.id }} onPress={() => setExpanded(expanded === item.id ? null : item.id)} style={styles.card}>
        <View style={styles.row}><View style={styles.icon}><Ionicons name={item.icon} size={24} color="#D4E903" /></View><View style={{ flex: 1 }}><Text style={styles.name}>{item.title}</Text><Text style={styles.body}>{item.body}</Text></View><Ionicons name={expanded === item.id ? 'chevron-up' : 'chevron-down'} size={18} color="#A5A5AD" /></View>
        {expanded === item.id && <Text style={styles.detail}>{item.detail}</Text>}
      </Pressable>)}
    </ScrollView>
  </View></SafeAreaView>;
}
const styles = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'center', padding: 18, gap: 12 }, back: { padding: 10 }, title: { color: '#fff', fontSize: 24, fontWeight: '700' }, content: { padding: 24 }, card: { backgroundColor: '#29292C', padding: 18, borderRadius: 18, marginBottom: 14 }, row: { flexDirection: 'row', alignItems: 'center', gap: 12 }, icon: { width: 44, height: 44, backgroundColor: '#343829', borderRadius: 14, alignItems: 'center', justifyContent: 'center' }, name: { color: '#fff', fontSize: 15, fontWeight: '600', lineHeight: 22 }, body: { color: '#A5A5AD', fontSize: 13, lineHeight: 20, marginTop: 5 }, detail: { color: '#C9C9D0', fontSize: 14, lineHeight: 22, marginTop: 18, paddingTop: 16, borderTopWidth: 1, borderTopColor: '#404044' },
});
