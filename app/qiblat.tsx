import { View, Text, StyleSheet, Image, Animated } from 'react-native';
import { useRouter } from 'expo-router';
import { TouchableOpacity } from 'react-native';
import { useEffect, useRef, useState } from 'react';
import { Magnetometer } from 'expo-sensors';

export default function QiblatScreen() {
  const router = useRouter();
  const [angle, setAngle] = useState(0);
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const subscription = Magnetometer.addListener((data) => {
      let { x, y } = data;
      let angle = Math.atan2(y, x) * (180 / Math.PI);
      if (angle < 0) {
        angle = 360 + angle;
      }
      setAngle(Math.round(angle));
    });

    return () => subscription.remove();
  }, []);

  useEffect(() => {
    Animated.timing(rotateAnim, {
      toValue: angle,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [angle]);

  const rotation = rotateAnim.interpolate({
    inputRange: [0, 360],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backButton}>←</Text>
        </TouchableOpacity>
      </View>

      {/* Title */}
      <Text style={styles.title}>Qiblat</Text>

      {/* Compass */}
      <Animated.Image
        source={require('../assets/images/kompas.png')}
        style={[styles.compassImage, { transform: [{ rotate: rotation }] }]}
        resizeMode="contain"
      />

      <Text style={styles.gpsText}>Yuk, kita sholat tepat waktu.</Text>

      <Image
        source={require('../assets/images/ustad.png')} 
        style={styles.calibrateImage}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#d4f5d3', 
    padding: 20, 
    alignItems: 'center' },
  header: { 
    flexDirection: 'row', 
    width: '100%', 
    alignItems: 'center' },
  backButton: { 
    fontSize: 30 },
  title: { 
    fontSize: 28, 
    fontWeight: 'bold', 
    marginVertical: 10 },
  compassImage: { 
    width: 250, 
    height: 250, 
    marginVertical: 20 },
  gpsText: { 
    fontSize: 16, 
    textAlign: 'center', 
    marginVertical: 20 },
  calibrateImage: { 
    width: 200, 
    height: 150 },
});
