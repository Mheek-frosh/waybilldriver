import React, { useState } from 'react';
import { View, Text, Image, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, s } from '../components/DriverUI';
import VehicleSelectionModal from '../components/VehicleSelectionModal';
import { useDriverStore } from '../state/useDriverStore';
// Introduces the driver app and requires a vehicle choice before registration.
export default function OnboardingScreen({ navigation }) {
  const [modal, setModal] = useState(false);
  const [slide, setSlide] = useState(0);
  const { draft, update } = useDriverStore();
  return <SafeAreaView style={s.page}><View style={s.frame}>
    <View style={s.header}><Text style={s.brand}>Waybill<Text style={{ color: '#D4E903' }}>.</Text></Text><Text style={s.badge}>DRIVER</Text></View>
    {/* Two introductory panels reuse the customer app's illustrations. */}
    <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', padding: 24 }}>
      <View style={{ alignItems: 'center', backgroundColor: '#252527', borderRadius: 32, marginBottom: 30, padding: 12 }}>
        <Image source={slide ? require('../../assets/s2.png') : require('../../assets/s1.png')} style={{ width: '100%', height: 245 }} resizeMode="contain" />
        <Text style={[s.badge, { marginBottom: 14 }]}>YOUR VEHICLE. YOUR OPPORTUNITY.</Text>
      </View>
      <Text style={s.title}>{slide ? 'Move more.\nMake every trip count.' : 'Your next chapter.\nIn the driver’s seat.'}</Text>
      <Text style={s.subtitle}>{slide ? 'From small parcels to bigger loads, find your place with Waybill.' : 'Deliver with Waybill. Choose your vehicle and get started on your own terms.'}</Text>
      <View style={{ flexDirection: 'row', gap: 8 }}>{[0, 1].map(i => <Pressable key={i} accessibilityRole="button" accessibilityLabel={`Show introduction ${i + 1}`} accessibilityState={{ selected: slide === i }} onPress={() => setSlide(i)} style={{ paddingVertical: 12 }}><View style={{ width: slide === i ? 28 : 8, height: 5, borderRadius: 4, backgroundColor: slide === i ? '#D4E903' : '#555' }} /></Pressable>)}</View>
    </ScrollView>
    <View style={s.footer}><Button title="Get started" onPress={() => setModal(true)} /><Text style={s.note}>Rider, van or truck. There’s a way forward for you.</Text></View>
    {/* Keep the selection in the shared draft for vehicle-specific form labels. */}
    <VehicleSelectionModal visible={modal} selected={draft.vehicleType} onClose={() => setModal(false)} onSelect={vehicleType => { update({ vehicleType }); setModal(false); navigation.navigate('Registration'); }} />
  </View></SafeAreaView>;
}
