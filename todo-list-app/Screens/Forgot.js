import React, { useContext } from 'react'
import { Text, View, TextInput, Pressable, ActivityIndicator} from 'react-native'
import { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { forgot } from '../Api';
export default function Forgot() {
  const [email, setEmail] = useState('');
  const navigation = useNavigation();
  const [loading,setLoading] = useState(false);
  const handleForgot = async() => {
    setLoading(true)
    try {
      const data = await forgot(email);
      alert(data.msg)
      setLoading(false)
      navigation.navigate('Login')
    } catch (error) {
      setLoading(false)
      alert(data.msg)
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

      <Pressable 
        onPress={handleForgot} 
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
            Submit
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
