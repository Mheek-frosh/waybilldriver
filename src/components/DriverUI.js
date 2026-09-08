import React from 'react';
import { Text, View, Pressable, TextInput, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
export function Button({ title, onPress, secondary, disabled }) {
  return <Pressable accessibilityRole="button" accessibilityState={{ disabled: !!disabled }} disabled={disabled} onPress={onPress} style={({ pressed }) => [s.button, secondary && s.secondary, { opacity: disabled ? .4 : pressed ? .75 : 1 }]}><Text style={[s.buttonText, secondary && { color: '#fff' }]}>{title}</Text><Ionicons name="arrow-forward" size={20} color={secondary ? '#fff' : colors.deepNavy} /></Pressable>;
}
export function Field({ label, ...props }) { return <View style={{ gap: 10, marginBottom: 22 }}><Text style={s.label}>{label}</Text><TextInput accessibilityLabel={label} placeholderTextColor="#858589" style={s.input} selectionColor={colors.limeGreen} {...props} /></View>; }
export const s = StyleSheet.create({
  page: { flex: 1, backgroundColor: '#1C1C1E' },
  frame: { flex: 1, width: '100%', maxWidth: 520, alignSelf: 'center' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 24, paddingVertical: 14 },
  brand: { color: '#fff', fontSize: 25, fontWeight: '800', letterSpacing: -1 },
  badge: { color: colors.limeGreen, fontSize: 10, fontWeight: '800', letterSpacing: 2 },
  title: { color: '#fff', fontSize: 34, fontWeight: '700', letterSpacing: -1, lineHeight: 40, marginBottom: 12 },
  subtitle: { color: '#AAAAB0', fontSize: 15, lineHeight: 23, marginBottom: 28 },
  label: { color: '#E8E8EA', fontSize: 14, fontWeight: '600' },
  input: { backgroundColor: '#2C2C2E', borderWidth: 1, borderColor: '#414144', borderRadius: 14, padding: 17, minHeight: 58, color: '#fff', fontSize: 17 },
  button: { backgroundColor: colors.limeGreen, minHeight: 58, borderRadius: 14, padding: 18, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  secondary: { backgroundColor: '#303033' }, buttonText: { color: colors.deepNavy, fontSize: 16, fontWeight: '700' },
  footer: { padding: 24, gap: 12 }, note: { color: '#AAAAB0', fontSize: 12, lineHeight: 18, textAlign: 'center' },
  icon: { backgroundColor: '#303423', width: 64, height: 64, borderRadius: 20, alignItems: 'center', justifyContent: 'center', marginBottom: 26 },
});
