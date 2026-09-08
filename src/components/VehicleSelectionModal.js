import React, { useState, useEffect } from 'react';
import { Modal, View, Text, Pressable, ScrollView, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { VEHICLES } from '../utils/registration';
import { Button, s } from './DriverUI';
export default function VehicleSelectionModal({ visible, selected, onClose, onSelect }) {
  const [choice, setChoice] = useState(selected);
  const insets = useSafeAreaInsets();
  useEffect(() => { if (visible) setChoice(selected); }, [visible, selected]);
  return <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose} statusBarTranslucent>
    <View style={styles.overlay}><Pressable accessibilityRole="button" accessibilityLabel="Close vehicle selection" style={StyleSheet.absoluteFill} onPress={onClose} />
      <View accessibilityViewIsModal style={[styles.sheet, { paddingBottom: Math.max(insets.bottom, 24), maxHeight: '92%' }]}>
        <View style={styles.handle} /><ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.heading}><Text style={s.badge}>YOUR JOURNEY STARTS HERE</Text><Pressable accessibilityRole="button" accessibilityLabel="Close" onPress={onClose} style={{ padding: 10 }}><Ionicons name="close" size={22} color="#fff" /></Pressable></View>
        <Text style={s.title}>How will you deliver?</Text><Text style={s.subtitle}>Choose your vehicle to set up your driver profile.</Text>
        {VEHICLES.map(v => <Pressable key={v.id} accessibilityRole="radio" accessibilityState={{ checked: choice === v.id }} accessibilityLabel={`${v.title}, ${v.description}`} onPress={() => setChoice(v.id)} style={[styles.option, choice === v.id && styles.selected]}>
          <View style={[styles.vehicleIcon, choice === v.id && { backgroundColor: colors.limeGreen }]}><Ionicons name={v.icon} size={30} color={choice === v.id ? colors.deepNavy : '#fff'} /></View>
          <View style={{ flex: 1 }}><Text style={styles.title}>{v.title}</Text><Text style={styles.description}>{v.description}</Text><Text style={styles.detail}>{v.detail}</Text></View>
          <Ionicons name={choice === v.id ? 'radio-button-on' : 'radio-button-off'} color={choice === v.id ? colors.limeGreen : '#777'} size={23} />
        </Pressable>)}
        <View style={{ marginTop: 14 }}><Button disabled={!choice} title={choice ? `Continue as ${choice}` : 'Choose your vehicle'} onPress={() => onSelect(choice)} /></View>
        <Text style={[s.note, { marginTop: 16 }]}>You can change this before finishing registration.</Text>
      </ScrollView></View>
    </View>
  </Modal>;
}
const styles = StyleSheet.create({ overlay: { flex: 1, backgroundColor: '#0009', justifyContent: 'flex-end', alignItems: 'center' }, sheet: { backgroundColor: '#242426', borderTopLeftRadius: 30, borderTopRightRadius: 30, padding: 24, paddingTop: 12, width: '100%', maxWidth: 520 }, handle: { width: 36, height: 4, backgroundColor: '#555558', alignSelf: 'center', borderRadius: 8, marginBottom: 16 }, heading: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }, option: { flexDirection: 'row', alignItems: 'center', gap: 14, padding: 16, borderWidth: 1, borderColor: '#444447', borderRadius: 18, marginBottom: 12 }, selected: { borderColor: colors.limeGreen, backgroundColor: '#303423' }, vehicleIcon: { width: 56, height: 56, backgroundColor: '#38383B', alignItems: 'center', justifyContent: 'center', borderRadius: 16 }, title: { color: '#fff', fontSize: 20, fontWeight: '700', marginBottom: 4 }, description: { color: '#ddd', fontSize: 13 }, detail: { color: '#99999F', fontSize: 11, marginTop: 4 } });
