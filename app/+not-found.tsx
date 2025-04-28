// app/+not-found.tsx

import { Link, Stack } from 'expo-router';
import { Text, View, StyleSheet } from 'react-native';


export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <View style={styles.container}>
        <Text style={styles.title}>Halaman tidak ditemukan.</Text>
        <Link href="/home" style={styles.link}>
          <Text style={styles.linkText}>Kembali ke beranda</Text>
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  link: {
    paddingVertical: 8,
  },
  linkText: {
    fontSize: 16,
    color: '#2e78b7',
  },
});
