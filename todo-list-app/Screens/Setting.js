import { View, Text, Pressable } from 'react-native'
import React, { useContext } from 'react'
import { Feather } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import appStore from '../Store/Context';
import * as SecureStore from 'expo-secure-store';

const Setting = () => {
    const navigation = useNavigation();
    const {state,dispatch} = useContext(appStore)
    const handlelogout = async()=>{
        dispatch('logout');
        await SecureStore.deleteItemAsync('token');
        navigation.navigate('Login')
    }
  return (
    <View
        style={{
            width:"100%",
            height:"100%",
            justifyContent:'space-evenly',
            alignItems:'center',
            paddingHorizontal:'5%',
            paddingVertical:'5%',
        }}
    >
      <Pressable onPress={handlelogout}
        style={{
            width:"100%",
            flexDirection:'row',
            justifyContent:'space-evenly',
            alignItems:'center',
            backgroundColor:"#C9F4AA",
            padding:'10%',
            borderRadius:20
        }}
      >
      <Feather name="log-out" size={34} color="black" />
        <Text
            style={{
                fontSize:30,
                fontWeight:'bold'
            }}
        >Logout</Text>
      </Pressable>
      <Pressable onPress={()=>{navigation.navigate('Edit')}}
        style={{
            width:"100%",
            flexDirection:'row',
            justifyContent:'space-evenly',
            alignItems:'center',
            backgroundColor:"#C9F4AA",
            padding:'10%',
            borderRadius:20
        }}
      >
      <FontAwesome name="edit" size={34} color="black" />
        <Text
            style={{
                fontSize:30,
                fontWeight:'bold'
            }}
        >Edit Profile</Text>
      </Pressable>
      <Pressable onPress={()=>{navigation.goBack()}}
        style={{
            width:"100%",
            flexDirection:'row',
            justifyContent:'space-evenly',
            alignItems:'center',
            backgroundColor:"#C9F4AA",
            padding:'10%',
            borderRadius:20
        }}
      >
      <Ionicons name="md-backspace-outline" size={34} color="black" />
        <Text
            style={{
                fontSize:30,
                fontWeight:'bold'
            }}
        >Go Back</Text>
      </Pressable>
    </View>
  )
}

export default Setting