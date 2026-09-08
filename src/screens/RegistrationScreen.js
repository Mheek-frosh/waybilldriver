import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Pressable, KeyboardAvoidingView, Platform, BackHandler, Keyboard } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Button, Field, s } from '../components/DriverUI';
import VehicleSelectionModal from '../components/VehicleSelectionModal';
import BottomSheet from '../components/BottomSheet';
import SuccessTick from '../components/SuccessTick';
import { useDriverStore } from '../state/useDriverStore';
import { validateStep, normalizePhone, VEHICLES } from '../utils/registration';
import { normalizeEmail } from '../utils/email';
const titles = ['Let’s stay in touch.', 'A little about you.', 'Meet your vehicle.', 'Looking good?'];
const subtitles = ['Add your contact details to start your driver profile.', 'Help us put a name to the person behind the wheel.', 'Tell us what you’ll be delivering with.', 'Check your details before finishing your profile draft.'];
export default function RegistrationScreen({ navigation }) {
  const { draft, update } = useDriverStore();
  const [step, setStep] = useState(0);
  const [error, setError] = useState('');
  const [modal, setModal] = useState(!draft.vehicleType);
  const [done, setDone] = useState(false);
  const [success, setSuccess] = useState(false);
  const verify = () => {
    const invalid = [0, 1, 2].map(i => validateStep(i, draft)).find(Boolean);
    if (invalid) { setError(invalid); setDone(false); setStep(3); return; }
    setSuccess(true);
  };
  const openDashboard = () => {
    setSuccess(false);
    navigation.reset({ index: 0, routes: [{ name: 'DriverDashboard' }] });
  };
  const vehicle = VEHICLES.find(v => v.id === draft.vehicleType);
  const back = () => { Keyboard.dismiss(); setError(''); if (done) setDone(false); else if (step > 0) setStep(step - 1); else navigation.goBack(); };
  useEffect(() => { const sub = BackHandler.addEventListener('hardwareBackPress', () => { if (step > 0 || done) { back(); return true; } return false; }); return () => sub.remove(); }, [step, done]);
  const change = key => value => { update({ [key]: value }); setError(''); };
  const next = () => {
    const invalid = step === 3 ? [0, 1, 2].map(i => validateStep(i, draft)).find(Boolean) : validateStep(step, draft);
    if (invalid) { setError(invalid); return; }
    Keyboard.dismiss(); setError('');
    if (step === 3) { update({ email: normalizeEmail(draft.email), name: draft.name.trim(), city: draft.city.trim(), plate: draft.plate.trim().toUpperCase(), make: draft.make.trim() }); setDone(true); }
    else setStep(step + 1);
  };
  const edit = index => { setStep(index); setError(''); };
  const row = (label, value, index) => <Pressable accessibilityRole="button" accessibilityLabel={`Edit ${label}`} onPress={() => edit(index)} style={{ paddingVertical: 19, borderBottomWidth: 1, borderBottomColor: '#3A3A3D', flexDirection: 'row', alignItems: 'center', gap: 14 }}><View style={{ flex: 1 }}><Text style={[s.note, { textAlign: 'left', marginBottom: 6 }]}>{label}</Text><Text style={[s.label, { fontSize: 17 }]}>{value}</Text></View><Ionicons name="pencil-outline" color="#D4E903" size={18} /></Pressable>;
  return <SafeAreaView style={s.page}><KeyboardAvoidingView style={s.frame} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
    <View style={s.header}><Pressable accessibilityRole="button" accessibilityLabel="Go back" onPress={back} style={{ padding: 10, marginLeft: -10 }}><Ionicons name="arrow-back" size={24} color="#fff" /></Pressable><Text style={s.brand}>Waybill <Text style={s.badge}>DRIVER</Text></Text><Text style={s.note}>{done ? '' : `${step + 1} of 4`}</Text></View>
    <View style={{ flexDirection: 'row', gap: 6, paddingHorizontal: 24 }}>{[0, 1, 2, 3].map(i => <View key={i} style={{ flex: 1, height: 3, borderRadius: 3, backgroundColor: i <= step ? '#D4E903' : '#3A3A3D' }} />)}</View>
    <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{ padding: 24, paddingTop: 32 }}>
      <View style={s.icon}><Ionicons name={done ? 'checkmark-outline' : ['call-outline', 'person-outline', vehicle?.icon || 'car-outline', 'clipboard-outline'][step]} size={30} color="#D4E903" /></View>
      <Text style={s.title}>{done ? 'You’re off to\na great start.' : titles[step]}</Text>
      <Text style={s.subtitle}>{done ? `${draft.name.split(' ')[0]}, your ${draft.vehicleType.toLowerCase()} profile draft is ready. Your next step will be contact and document verification.` : subtitles[step]}</Text>
      {!done && <Pressable accessibilityRole="button" accessibilityLabel="Change delivery vehicle" onPress={() => { Keyboard.dismiss(); setModal(true); }} style={{ backgroundColor: '#303423', borderRadius: 12, padding: 15, flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 28 }}><Ionicons name={vehicle?.icon || 'car-outline'} size={23} color="#D4E903" /><Text style={[s.label, { flex: 1 }]}>{draft.vehicleType || 'Choose your vehicle'}</Text><Text style={{ color: '#D4E903', fontSize: 13 }}>Change</Text></Pressable>}
      {!done && step === 0 && <>
        <View style={{ flexDirection: 'row', padding: 5, backgroundColor: '#28282B', borderRadius: 14, marginBottom: 28 }}>{['phone', 'email'].map(method => <Pressable key={method} accessibilityRole="tab" accessibilityState={{ selected: draft.method === method }} onPress={() => { update({ method }); setError(''); }} style={{ flex: 1, padding: 13, borderRadius: 10, backgroundColor: draft.method === method ? '#454548' : 'transparent' }}><Text style={[s.label, { textAlign: 'center' }]}>{method === 'phone' ? 'Phone number' : 'Email address'}</Text></Pressable>)}</View>
        {draft.method === 'phone' ? <><Text style={[s.note, { textAlign: 'left', marginBottom: 12 }]}>Nigeria (+234)</Text><Field label="Phone number" value={draft.phone} onChangeText={change('phone')} placeholder="0801 234 5678" keyboardType="phone-pad" autoComplete="tel" maxLength={20} /></> : <Field label="Email address" value={draft.email} onChangeText={change('email')} placeholder="you@example.com" keyboardType="email-address" autoComplete="email" autoCapitalize="none" autoCorrect={false} maxLength={254} />}
        <Text style={[s.note, { textAlign: 'left' }]}>Your contact details will need verification before you can start delivering.</Text>
      </>}
      {!done && step === 1 && <><Field label="Full name" value={draft.name} onChangeText={change('name')} placeholder="Your first and last name" autoComplete="name" autoCapitalize="words" maxLength={80} /><Field label="Delivery city" value={draft.city} onChangeText={change('city')} placeholder="e.g. Lagos" autoCapitalize="words" maxLength={60} /></>}
      {!done && step === 2 && <><Field label={draft.vehicleType === 'Rider' ? 'Motorbike make and model' : 'Vehicle make and model'} value={draft.make} onChangeText={change('make')} placeholder={draft.vehicleType === 'Rider' ? 'e.g. Honda ACE 125' : draft.vehicleType === 'Van' ? 'e.g. Toyota Hiace' : 'e.g. Isuzu NQR'} autoCapitalize="words" maxLength={80} /><Field label="Plate number" value={draft.plate} onChangeText={value => change('plate')(value.toUpperCase())} placeholder="e.g. ABC 123 XY" autoCapitalize="characters" autoCorrect={false} maxLength={15} /><Text style={[s.note, { textAlign: 'left' }]}>Use the details on your vehicle registration document.</Text></>}
      {!done && step === 3 && <>{row('Contact', draft.method === 'email' ? normalizeEmail(draft.email) : `+234 ${normalizePhone(draft.phone)}`, 0)}{row('Driver', `${draft.name} · ${draft.city}`, 1)}{row('Vehicle', `${draft.make} · ${draft.plate}`, 2)}</>}
      {done && <View style={{ backgroundColor: '#2C2C2E', borderRadius: 18, padding: 22, gap: 22 }}><Text style={s.label}>What comes next</Text>{['Verify your contact details', 'Provide your driver and vehicle documents', 'Complete your driver review'].map((text, i) => <View key={text} style={{ flexDirection: 'row', gap: 14, alignItems: 'center' }}><Text style={{ color: '#D4E903', fontWeight: '700' }}>0{i + 1}</Text><Text style={{ color: '#CDCDD0', flex: 1, lineHeight: 21 }}>{text}</Text></View>)}</View>}
      {!!error && <Text accessibilityRole="alert" accessibilityLiveRegion="polite" style={{ color: '#FF9999', marginTop: 16, lineHeight: 21 }}>{error}</Text>}
    </ScrollView>
    <View style={s.footer}><Button title={done ? 'Verify details' : step === 3 ? 'Confirm my details' : 'Continue'} onPress={done ? verify : next} /><Text style={s.note}>{done ? 'Confirm your profile details to continue.' : 'Registration preview · Your account is not yet activated.'}</Text></View>
    <BottomSheet visible={success} onClose={() => setSuccess(false)} showClose={false} showHandle={false}>
      <View style={{ alignItems: 'center', paddingVertical: 12 }}>
        <SuccessTick visible={success} pulse />
        <Text style={[s.badge, { marginTop: 16, marginBottom: 16 }]}>All set!</Text>
        <Text style={[s.title, { textAlign: 'center' }]}>Details confirmed.</Text>
        <Text style={[s.subtitle, { textAlign: 'center', marginBottom: 12 }]}>Welcome aboard, {draft.name.split(' ')[0]}.</Text>
      </View>
      <Button title="Go to dashboard" onPress={openDashboard} />
      <Text style={[s.note, { marginTop: 16 }]}>Identity verification pending.</Text>
    </BottomSheet>
    <VehicleSelectionModal visible={modal} selected={draft.vehicleType} onClose={() => setModal(false)} onSelect={vehicleType => { update({ vehicleType }); setModal(false); setError(''); }} />
  </KeyboardAvoidingView></SafeAreaView>;
}
