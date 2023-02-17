import React, { useContext } from 'react'
import { Text, View, TextInput, Pressable, ActivityIndicator} from 'react-native'
import { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { LoginApi } from '../Api';
import * as SecureStore from 'expo-secure-store';
import appStore from '../Store/Context';
export default function Login() {
  const {state,dispatch} = useContext(appStore);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const [loading,setLoading] = useState(false);
  const handleLoginForm = async() => {
    setLoading(true)
    try {
      const data = await LoginApi(email,password)
      await SecureStore.setItemAsync('token', data.token);
      
      const payload = data.user;
      dispatch({type:'login',payload});
      setLoading(false)
      navigation.navigate('Home')
    } catch (error) {
      setLoading(false)
      alert("Check your credentials or there is a server error")
    }
  };
  return (
    <View style={{paddingHorizontal:"5%" , paddingVertical:'25%', flexDirection: 'column',alignContent:"center", backgroundColor:'white',justifyContent:'space-evenly', height: '100%'} }>
      
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

      <Pressable 
        onPress={handleLoginForm} 
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
            Login
        </Text>
      </Pressable>
      
      <Pressable
        disabled={loading}
        onPress={() => {navigation.navigate("Forgot")} } 
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
            color: 'blue',
            fontSize: 18,
            fontWeight: 'bold',
          }}>
           Forgot Password
        </Text>
      </Pressable>
      <Pressable
        disabled={loading}
        onPress={() => {navigation.navigate("Register")} } 
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
            color: 'black',
            fontSize: 18,
            fontWeight: 'bold',
          }}>
            Do you not have a account? Sign up
        </Text>
      </Pressable>
    </View>
  )
}
