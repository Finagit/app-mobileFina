import { View, Text, TextInput, TouchableOpacity,Button,Image} from'react-native';
import { StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';


const router = useRouter();
const [username, setUsername] = useState('');
const [password, setPassword] = useState('');

const handleLogin = () => {
    
    if (username && password) {
      router.push('/home'); 
    } else {
      alert('Isi username dan password yaa!');
    }
  };

export default function LoginScreen() {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/images/masjid.png')} style={styles.logo} />

      <Text style={styles.title}>Tuntunan Sholat</Text>
      <Text style={styles.subtitle}>Your Prayer Assistant</Text>

      <Text style={styles.loginText}>Login</Text>

      <TextInput style={styles.input} placeholder="Email required" placeholderTextColor="#555" />
      <TextInput style={styles.input} placeholder="Password required" placeholderTextColor="#555" secureTextEntry />

      <TouchableOpacity>
        <Text style={styles.forgotPassword}>Forgot Password?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.loginButton} onPress={() => router.push('/home')}>
        <Text style={styles.loginButtonText}>LOGIN</Text>
      </TouchableOpacity>

      <Text style={styles.thirdPartyLogin}>Third Party Login</Text>

      <View style={styles.socialIcons}>
        <Image source={require('../assets/images/google.png')} style={styles.icon} />
        <Image source={require('../assets/images/apple.png')} style={styles.icon} />
        <Image source={require('../assets/images/facebook.png')} style={styles.icon} />
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#C6F6C6', 
    alignItems: 'center', 
    justifyContent: 'center', 
    padding: 20 },
  logo: { 
    width: 80, 
    height: 80, 
    marginBottom: 10 },
  title: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    color: '#333' },
  subtitle: { 
    fontSize: 14, 
    color: '#333', 
    marginBottom: 30 },
  loginText: { 
    fontSize: 28, 
    fontWeight: 'bold', 
    marginBottom: 20, 
    color: '#333' },
  input: { 
    width: '100%',
    height: 50, 
    borderColor: '#ccc', 
    borderWidth: 1, 
    borderRadius: 8, 
    marginBottom: 15, 
    paddingHorizontal: 10, 
    backgroundColor: '#fff' },
  forgotPassword: { 
    color: 'red', 
    alignSelf: 'flex-end', 
    marginBottom: 20 },
  loginButton: { 
    backgroundColor: '#7ED957', 
    paddingVertical: 15, 
    paddingHorizontal: 50, 
    borderRadius: 8 },
  loginButtonText: { 
    color: '#fff', 
    fontWeight: 'bold' },
  thirdPartyLogin: { 
    marginTop: 20, 
    marginBottom: 10, 
    color: '#333' },
  socialIcons: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    width: '60%' },
  icon: { 
    width: 40, 
    height: 40 },
});
