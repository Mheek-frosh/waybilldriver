import React from 'react';
import { Modal, View, Text, Pressable, ScrollView, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { s } from './DriverUI';

export default function BottomSheet({ visible, onClose, title, children }) {
  const insets = useSafeAreaInsets();
  return <Modal visible={visible} transparent animationType="slide" statusBarTranslucent onRequestClose={onClose}>
    <View style={styles.overlay}>
      <Pressable style={StyleSheet.absoluteFill} accessibilityRole="button" accessibilityLabel="Dismiss sheet" onPress={onClose} />
      <View accessibilityViewIsModal style={[styles.sheet, { paddingBottom: Math.max(insets.bottom, 24) }]}>
        <View style={styles.handle} />
        <View style={styles.heading}><Text style={[s.label, { fontSize: 20, flex: 1 }]}>{title}</Text><Pressable accessibilityRole="button" accessibilityLabel="Close sheet" onPress={onClose} style={{ padding: 10 }}><Ionicons name="close" size={22} color="#fff" /></Pressable></View>
        <ScrollView keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>{children}</ScrollView>
      </View>
    </View>
  </Modal>;
}
const styles = StyleSheet.create({ overlay: { flex: 1, justifyContent: 'flex-end', alignItems: 'center', backgroundColor: '#000A' }, sheet: { width: '100%', maxWidth: 520, maxHeight: '90%', padding: 24, paddingTop: 12, backgroundColor: '#252527', borderTopLeftRadius: 30, borderTopRightRadius: 30 }, handle: { width: 36, height: 4, borderRadius: 4, backgroundColor: '#555558', alignSelf: 'center', marginBottom: 14 }, heading: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 } });
