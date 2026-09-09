import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Easing } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { colors } from '../theme/colors';

// Branded launch screen shown briefly before driver onboarding.
export default function SplashScreen({ navigation }) {
  const float = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.loop(Animated.sequence([
      Animated.timing(float, { toValue: 1, duration: 1500, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
      Animated.timing(float, { toValue: 0, duration: 1500, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
    ]));
    animation.start();
    // Replace the route so Back cannot return to the splash screen.
    const timer = setTimeout(() => navigation.replace('Onboarding'), 3000);
    // Stop both effects if the screen unmounts before the delay finishes.
    return () => { clearTimeout(timer); animation.stop(); };
  }, [navigation, float]);

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Animated.View style={{ transform: [{ translateY: float.interpolate({ inputRange: [0, 1], outputRange: [0, -14] }) }] }}>
        <Text style={styles.logo}>Waybill</Text>
        <Text style={{ color: colors.limeGreen, textAlign: 'center', letterSpacing: 5, fontSize: 12, marginTop: 8, fontWeight: '700' }}>DRIVER</Text>
        <View style={styles.accent} />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1C1C1E', justifyContent: 'center', alignItems: 'center' },
  logo: { fontSize: 52, fontWeight: 'bold', letterSpacing: -1.5, color: colors.white },
  accent: { width: 40, height: 5, borderRadius: 3, backgroundColor: colors.limeGreen, alignSelf: 'center', marginTop: 14 },
});
