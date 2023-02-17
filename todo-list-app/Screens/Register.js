import { StyleSheet,
  View, 
  KeyboardAvoidingView,
  Text, 
  TextInput, 
  Pressable, 
  ScrollView,
  ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { registerApi } from '../Api/index.js';
import { useNavigation } from '@react-navigation/native';

export default function Register() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [Fname, setFname] = useState('');
  const [Lname, setLname] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  
  const [loading,setLoading] = useState(false);
  const handleRegisterForm = async() => {
    setLoading(true)
    if(confirm != password) alert("Password Not Matched")
    try {
      const data = await registerApi(Fname,Lname,email,password)
      setLoading(false)
      navigation.navigate('Login')
    } catch (error) {
      setLoading(false)
      alert("Check your credentials or there is a server error")
    }
  };
  return (
    <View style={{paddingHorizontal:"5%" , paddingVertical:'25%', flexDirection: 'column',alignContent:"center", backgroundColor:'white',justifyContent:'space-evenly', height: '100%'} }>
      <TextInput 
        placeholder="First Name..."
        value={Fname}
        onChangeText={setFname}
        style={{
          color: 'black',
          fontSize: 18,
          width: '100%',
          marginVertical: 25, 
        }}
      />
      <TextInput 
        placeholder="Last Name..."
        value={Lname}
        onChangeText={setLname}
        style={{
          color: 'black',
          fontSize: 18,
          width: '100%',
          marginVertical: 25, 
        }}
      />
      <TextInput 
        placeholder="Email..."
        value={email}
        onChangeText={setEmail}
        style={{
          color: 'black',
          fontSize: 18,
          width: '100%',
          marginVertical: 25, 
        }}
      />

      <TextInput 
        placeholder="Password..."
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{
          color: 'black',
          fontSize: 18,
          width: '100%',
          marginVertical: 25, 
        }}
      />
      <TextInput 
        placeholder="Confirm Password..."
        value={confirm}
        onChangeText={setConfirm}
        secureTextEntry
        style={{
          color: 'black',
          fontSize: 18,
          width: '100%',
          marginVertical: 25, 
        }}
      />

      <Pressable 
        onPress={handleRegisterForm} 
        style={{ 
          backgroundColor: '#e33062',
          height: 50,
          borderRadius: 5,
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'center',
          marginTop: 30,
        }}
      >
        {loading && <ActivityIndicator />}
        <Text 
          style={{
            color: 'black',
            fontSize: 18,
            fontWeight: 'bold'
          }}>
            Sign up
        </Text>
      </Pressable>
      

      <Pressable
        disabled={loading}
        onPress={() => {navigation.navigate('Login')} } 
        style={{ 
          height: 50,
          borderRadius: 5,
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 30,
        }}
      >
        <Text 
          style={{
            color: '#e33062',
            fontSize: 18,
            fontWeight: 'bold',
          }}>
            Already Have an account? Login
        </Text>
      </Pressable>
    </View>
  )
}
