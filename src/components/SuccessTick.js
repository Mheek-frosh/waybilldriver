import React, { useEffect, useRef } from 'react';
import { AccessibilityInfo, Animated, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';

export default function SuccessTick({ visible = true, pulse = false }) {
  const circle = useRef(new Animated.Value(0)).current;
  const tick = useRef(new Animated.Value(0)).current;
  const ripple = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    let disposed = false;
    let animation;
    let pulseAnimation;
    const play = reduceMotion => {
      if (disposed) return;
      animation?.stop();
      pulseAnimation?.stop();
      circle.setValue(reduceMotion ? 1 : 0);
      tick.setValue(reduceMotion ? 1 : 0);
      ripple.setValue(reduceMotion ? 1 : 0);
      if (!visible || reduceMotion) return;
      animation = Animated.sequence([
        Animated.delay(250),
        Animated.spring(circle, { toValue: 1, friction: 6, tension: 90, useNativeDriver: true }),
        Animated.parallel([
          Animated.spring(tick, { toValue: 1, friction: 5, tension: 120, useNativeDriver: true }),
          Animated.timing(ripple, { toValue: 1, duration: 650, useNativeDriver: true }),
        ]),
      ]);
      animation.start(({ finished }) => {
        if (!finished || disposed || !pulse) return;
        pulseAnimation = Animated.loop(Animated.sequence([
          Animated.timing(ripple, { toValue: 0, duration: 0, useNativeDriver: true, isInteraction: false }),
          Animated.timing(ripple, { toValue: 1, duration: 1000, useNativeDriver: true, isInteraction: false }),
          Animated.delay(450),
        ]));
        pulseAnimation.start();
      });
    };
    if (visible) AccessibilityInfo.isReduceMotionEnabled().then(play).catch(() => play(false));
    const subscription = AccessibilityInfo.addEventListener('reduceMotionChanged', play);
    return () => { disposed = true; animation?.stop(); pulseAnimation?.stop(); subscription.remove(); };
  }, [visible, pulse, circle, tick, ripple]);

  return <View accessible accessibilityLabel="Success" style={styles.container}>
    <Animated.View style={[styles.ripple, { opacity: ripple.interpolate({ inputRange: [0, 1], outputRange: [.3, 0] }), transform: [{ scale: ripple.interpolate({ inputRange: [0, 1], outputRange: [.8, 1.4] }) }] }]} />
    <Animated.View style={[styles.circle, { opacity: circle, transform: [{ scale: circle }] }]}>
      <Animated.View style={{ opacity: tick, transform: [{ scale: tick.interpolate({ inputRange: [0, 1], outputRange: [.4, 1] }) }, { rotate: tick.interpolate({ inputRange: [0, 1], outputRange: ['-18deg', '0deg'] }) }] }}><Ionicons name="checkmark" size={46} color={colors.deepNavy} /></Animated.View>
    </Animated.View>
  </View>;
}
const styles = StyleSheet.create({
  container: { width: 120, height: 120, alignSelf: 'center', alignItems: 'center', justifyContent: 'center' },
  circle: { width: 88, height: 88, borderRadius: 44, backgroundColor: colors.limeGreen, alignItems: 'center', justifyContent: 'center' },
  ripple: { position: 'absolute', width: 88, height: 88, borderRadius: 44, borderWidth: 2, borderColor: colors.limeGreen },
});
