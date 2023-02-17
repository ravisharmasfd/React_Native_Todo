import { View, Text, Pressable, ActivityIndicator, TextInput } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import appStore from '../Store/Context'
import { AntDesign } from '@expo/vector-icons';
import TodoList from '../Components/TodoList';
import * as SecureStore from 'expo-secure-store';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { createTodo, getUser } from '../Api';

const Home = () => {
    const navigation = useNavigation();
    const isFocused = useIsFocused();
    const {state,dispatch} = useContext(appStore);
    const [loading,setLoading] = useState(false);
    const [creatingLoading,setCreatingLoading] = useState(false);
    const [newTodo, setNewTodo] = useState("");
    const [refresh, setRefresh] = useState(false);
    
    async function checkAuth(){
        try {
            setLoading(true);
        const token = await SecureStore.getItemAsync('token');
        if(!token) navigation.navigate('Login')
        if(!state.user){
            const data = await getUser(token);            
            dispatch({type:'login',payload:data.user})
        }
        setLoading(false)
        } catch (error) {
            setLoading(false)
        }
    }
    const create = async()=>{
      try {
        if(newTodo.length < 1){
          alert("Enter Todo");
          return
        }
        setCreatingLoading(true);
        const token = await SecureStore.getItemAsync('token');
        console.log(token,newTodo)
        const res = await createTodo(token,newTodo)
        setNewTodo('');
        setCreatingLoading(false);
        setRefresh(!refresh)
      } catch (error) {
        alert('there is some error');
        setCreatingLoading(false);
      }
    }
    useEffect(()=>{
        checkAuth();
    },[])
    useEffect(()=>{setRefresh(!refresh)},[isFocused])
  return (
    <View style={{flex:1,height:'100%',paddingHorizontal:'5%' , paddingVertical:'5%', alignItems:'center',justifyContent:'center', rowGap:'10%'}}>
      <View style={{flexDirection:'row',width:'100%' , alignItems:'center', justifyContent:'space-between',marginVertical:'4%'}}>
        <Text style={{
            color:'black',
            fontSize: 18,
            fontWeight: 'bold'
            }}>ToDo List</Text>
        {
            (loading==true)? <ActivityIndicator/>:<Pressable onPress={()=>{
              navigation.navigate('Setting')
            }}>
              <Text style={{
                color:'#e33062',
                fontSize: 18,
                fontWeight: 'bold'
    
                }}>{`${state?.user?.firstName} ${state?.user?.lastName}`}</Text>
            </Pressable>
        }
      </View>
      <View style={{
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center',
        padding:'2%',
        width:'100%',
        height:'20%'
      }}>
        <TextInput
        multiline={true}
        placeholder='Create Todo'
        value={newTodo}
        onChangeText={setNewTodo}
        style={{
          fontSize:15,
            width:'100%',
            textAlign:'center',
            backgroundColor:"#C9F4AA",
             padding:'2%',
            borderRadius:40,
            marginBottom:'5%'
        }}
        ></TextInput>
        {creatingLoading==true? <ActivityIndicator/>:<Pressable onPress={()=>{create()}}><AntDesign name="plussquareo" size={30} color="#e33062" /></Pressable>}
      </View>
      <TodoList refresh={refresh}></TodoList>
    </View>
  )
}

export default Home