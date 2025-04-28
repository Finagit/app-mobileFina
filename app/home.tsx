// app/home.tsx
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
    const router = useRouter();
  const [prayerTimes, setPrayerTimes] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [currentPrayer, setCurrentPrayer] = useState<string | null>(null);

  useEffect(() => {
    fetchPrayerTimes();
  }, []);

  const fetchPrayerTimes = async () => {
    try {
      const response = await fetch(
        'https://api.aladhan.com/v1/timingsByCity?city=Sampang&country=Indonesia&method=2'
      );
      const data = await response.json();
      setPrayerTimes(data.data.timings);
      detectCurrentPrayer(data.data.timings);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching prayer times:', error);
    }
  };

  const detectCurrentPrayer = (timings: any) => {
    const now = new Date();
    const currentTime = now.getHours() * 60 + now.getMinutes();

    const schedule = [
      { name: 'Subuh', time: timings.Fajr },
      { name: 'Dzuhur', time: timings.Dhuhr },
      { name: 'Ashar', time: timings.Asr },
      { name: 'Maghrib', time: timings.Maghrib },
      { name: 'Isya', time: timings.Isha },
    ];

    let activePrayer: string | null = null;

    for (let i = 0; i < schedule.length; i++) {
      const [h, m] = schedule[i].time.split(':').map(Number);
      const prayerMinutes = h * 60 + m;

      if (currentTime >= prayerMinutes) {
        activePrayer = schedule[i].name;
      }
    }

    setCurrentPrayer(activePrayer);
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#00ff00" />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <Text style={styles.title}>Prayer Time</Text>

      {/* Clock */}
      <View style={styles.clockContainer}>
        {/* nanti bisa pakai animasi jam beneran */}
        <Text style={styles.clockText}>🕒</Text>
      </View>

      {/* Location + Alarm */}
      <View style={styles.locationContainer}>
        <Text style={styles.locationText}>Sampang</Text>
        <TouchableOpacity style={styles.alarmButton}>
          <Text style={styles.alarmButtonText}>Alarm Shalat</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.locationContainer}>
        <TouchableOpacity style={styles.qiblaButton} onPress={() => router.push('/qiblat')}>
          <Text style={styles.qiblaButtonText}>Arah Kiblat</Text>
        </TouchableOpacity>
        </View>

      {/* List Prayer Times */}
      <View style={styles.prayerList}>
        {prayerTimes && (
          <>
            {renderPrayerItem('Subuh', prayerTimes.Fajr, currentPrayer)}
            {renderPrayerItem('Dzuhur', prayerTimes.Dhuhr, currentPrayer)}
            {renderPrayerItem('Ashar', prayerTimes.Asr, currentPrayer)}
            {renderPrayerItem('Maghrib', prayerTimes.Maghrib, currentPrayer)}
            {renderPrayerItem('Isya', prayerTimes.Isha, currentPrayer)}
          </>
        )}
      </View>
    </ScrollView>
  );
}

function renderPrayerItem(name: string, time: string, currentPrayer: string | null) {
  const isActive = name === currentPrayer;
  return (
    <View style={[styles.prayerItem, isActive && styles.activePrayer]}>
      <Text style={[styles.prayerName, isActive && styles.activePrayerText]}>{name}</Text>
      <Text style={[styles.prayerTime, isActive && styles.activePrayerText]}>{time}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
    qiblaButton:{ 
    backgroundColor: '#6dd47e',
    paddingVertical: 8, 
    paddingHorizontal: 15, 
    borderRadius: 10, 
    marginRight: 10 },

    qiblaButtonText: { 
    fontSize: 14, color: 'white' },

  container: {
     flexGrow: 1, 
     backgroundColor: '#d4f5d3', 
     alignItems: 'center', 
     padding: 20 },
  title: { 
    fontSize: 28, 
    fontWeight: 'bold', 
    marginVertical: 20 },

  clockContainer: { 
    backgroundColor: '#b7e4b1', 
    padding: 30, 
    borderRadius: 20, 
    marginBottom: 20 },

  clockText: { 
    fontSize: 50 },

  locationContainer: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    width: '100%', 
    marginBottom: 20 },

  locationText: { 
    fontSize: 20, 
    fontWeight: 'bold' },

  alarmButton: { 
    backgroundColor: '#a7d7a5', 
    paddingVertical: 8, 
    paddingHorizontal: 15, 
    borderRadius: 10 },

  alarmButtonText: { 
    fontSize: 14 },

  prayerList: { 
    width: '100%' },

  prayerItem: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    backgroundColor: '#c9f7c7', 
    padding: 15, borderRadius: 10, 
    marginBottom: 10 },
    
  activePrayer: { 
    backgroundColor: '#89cff0' },

  prayerName: { 
    fontSize: 18 },

  prayerTime: { 
    fontSize: 18, 
    fontWeight: 'bold' },

  activePrayerText: { 
    color: '#fff' },
});
