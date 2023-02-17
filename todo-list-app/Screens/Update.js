import { View, TextInput , ActivityIndicator,Pressable } from 'react-native'
import React, { useState } from 'react'
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import * as SecureStore from 'expo-secure-store';
import { updateTodo } from '../Api';
const Update = ({route,navigation}) => {
    const { _id, todo } = route.params;
    const [utodo,setUtodo] = useState(todo);
    const [loading,setLoading] = useState(false);
    const update = async()=>{
        try {
            const token = await SecureStore.getItemAsync('token');
        const res = await updateTodo(token,_id,utodo);
            navigation.navigate('Home');
        } catch (error) {
            alert('There is some error');
        }
    }
    return (
    <View style={{
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center',
        padding:'4%',
        width:'100%',
        height:'100%'
      }}>
        <TextInput
        multiline={true}
        value={utodo}
        onChangeText={setUtodo}
        placeholder='Enter Todo'
        style={{
            fontSize:15,
            width:'100%',
            textAlign:'center',
            backgroundColor:"#C9F4AA",
            height:'50%',
            padding:'2%',
            borderRadius:40
        }}
        ></TextInput>
        {loading==true? <ActivityIndicator/>:<View
        style={{
            flexDirection:'row',
            alignItems:'center',
            justifyContent:'space-evenly',
            width:'100%',
            marginTop:"10%"
        }}>
        <Pressable onPress={()=>{update()}}><AntDesign name="plussquareo" size={30} color="#e33062" /></Pressable>
        <Pressable onPress={()=>{navigation.navigate('Home')}}><MaterialIcons name="cancel" size={34} color="blue" /></Pressable>
            </View>}
      </View>
  )
}

export default Update