import React, { useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { useRouter } from 'expo-router';

const Cover = () => {
  const router = useRouter();

  const handlePress = () => {
    router.push('/home'); 
  };

  return (
    <View style={styles.container}>
     
      <Animated.Image
        entering={FadeIn.duration(1000)}
        source={require('../assets/images/cat.png')}
        style={styles.image}
      />

      <Animated.Text entering={FadeIn.delay(500).duration(1000)} style={styles.title}>
        Tuntunan
      </Animated.Text>
      <Animated.Text entering={FadeIn.delay(1000).duration(1000)} style={styles.title}>
        Sholat
      </Animated.Text>

      <TouchableOpacity style={styles.button} onPress={handlePress}>
        <Text style={styles.buttonText}>Jelajahi</Text>
      </TouchableOpacity>

      <Text style={styles.footer}>by: Fina Nl ©</Text>
    </View>
  );
};

export default Cover; 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d5f3f3',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: 'green',
    fontFamily: 'cursive',
  },
  button: {
    marginTop: 20,
    backgroundColor: '#74c69d',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 12,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  footer: {
    position: 'absolute',
    bottom: 20,
    fontSize: 14,
    color: '#666',
  },
});
