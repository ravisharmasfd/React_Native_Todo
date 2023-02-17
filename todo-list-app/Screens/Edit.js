import React, { useContext } from 'react'
import { Text, View, TextInput, Pressable, ActivityIndicator} from 'react-native'
import { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { forgot, updateUser } from '../Api';
import appStore from '../Store/Context';
import * as SecureStore from 'expo-secure-store';

export default function Edit() {
  const {state,dispatch} = useContext(appStore);
  const [firstName, setFirstName] = useState(state?.user?.firstName);
  const [lastName, setLastName] = useState(state?.user?.lastName);
  const navigation = useNavigation();
  const [loading,setLoading] = useState(false);
  const handleUpdate = async() => { 
    try {
        setLoading(true)
        const token = await SecureStore.getItemAsync('token')
        const data = await updateUser(firstName,lastName,token)
        alert(data.msg)
        dispatch({type:'login',payload:data.user})
        setLoading(false)
    } catch (error) {
        setLoading(false)
        alert(data.msg)
    }
  };
  return (
    <View style={{paddingHorizontal:"5%" , paddingVertical:'25%', flexDirection: 'column',alignContent:"center", backgroundColor:'white',justifyContent:'space-evenly', height: '100%'} }>
      
      <TextInput 
        placeholder="First Name..."
        value={firstName}
        onChangeText={setFirstName}
        style={{
          color: 'black',
          fontSize: 18,
          width: '100%',
          marginVertical: 25, 
        }}
      />
      <TextInput 
        placeholder="Last Name..."
        value={lastName}
        onChangeText={setLastName}
        style={{
          color: 'black',
          fontSize: 18,
          width: '100%',
          marginVertical: 25, 
        }}
      />

      <Pressable 
        onPress={handleUpdate} 
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
        onPress={() => {navigation.goBack()} } 
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
            Go Back
        </Text>
      </Pressable>
    </View>
  )
}
