import { View, Text, ScrollView, ActivityIndicator, FlatList, Pressable } from 'react-native'
import React, { useState, useEffect } from 'react'
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import * as SecureStore from 'expo-secure-store';
import { deleteTodo, getTodo,fullfilTodo } from '../Api';
import { useNavigation } from '@react-navigation/native';
const TodoList = ({refresh}) => {
    const [todo,setTodo] = useState([]);
    const [jwt,setJwt] =useState(null);
    const [fullfil,setFullfil] = useState([]);
    const [tab,setTab] = useState('t');
    const [loading ,setLoading] = useState(false)
    const navigation = useNavigation();
    async function fetchTodo(){
       try {
        setLoading(true);
        const token = await SecureStore.getItemAsync('token');
        setJwt(token)
        const data = await getTodo(token);
        const t =[];
        const f = [];
        data.todos.forEach(item=>{
            if(item.fullfil) f.push(item);
            else t.push(item);
        })
        setTodo(t);
        setFullfil(f);

        setLoading(false);
       } catch (error) {
        alert("server error")
       }
    }
    const fullfilHandle = async(item)=>{
        try {
            setLoading(true)
            const res = await fullfilTodo(jwt,item._id);
            await fetchTodo();
   
            setLoading(false)
        } catch (error) {
            alert('There is some error')
            await fetchTodo();
            
        }

    }
    const deleteItem = async(item)=>{
        try {
            setLoading(true)
            const res = await deleteTodo(jwt,item._id)
            await fetchTodo();
   
            setLoading(false)
        } catch (error) {
            alert('Todo not deleted')
            await fetchTodo();
            
        }
    }
    useEffect(() => {
        fetchTodo();
    }, [refresh])
    
  return (
    <View style={{
        width:'100%',
        height:'60%'
    }}>
        <View style={{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        width:"100%",
        height:'10%',
        marginVertical:"4%"
      }}>
        <Pressable onPress={()=>{setTab('t')}}><Text style={{
            padding:'2%',
            fontWeight:'bold',
            backgroundColor:"#FCC2FC",
            borderRadius:10
        }}>Unfulfilled</Text></Pressable>
        <Pressable onPress={()=>{setTab('f')}}><Text style={{
            padding:'2%',
            fontWeight:'bold',
            backgroundColor:"#C9F4AA",
            borderRadius:10
        }}>Fulfilled</Text></Pressable>
      </View>
        {(loading == true)? <ActivityIndicator></ActivityIndicator>:
        <View style={{
            height:'100%'
        }}>
            {
                (tab=='t')?
                <FlatList 
        keyExtractor={(item)=>item._id}
        data = {todo}
        
        renderItem={({item})=>{
            return(
                <View style={{
                    backgroundColor:"#FCC2FC",
                    marginVertical:'2%',
                    padding:'2%',
                    width:"100%",
                    borderRadius:10,
                    alignContent:'center',
                    justifyContent:'center'
                }}>
                    <Text style={{
                        color:'black',
                        textAlign:'center',
                        fontWeight: 'bold'
                    }}>{item.todo}</Text>
                    <View style={{
                        flexDirection:'row',
                        justifyContent:'space-between'
                    }}>
                    <Pressable onPress={()=>{fullfilHandle(item)}} style={{flexDirection:'row', alignContent:'center',
                    justifyContent:'center',textAlign:'center', padding:'2%'}}>
                      <AntDesign name="checksquareo" size={24} color="black" />
                      </Pressable>
                      <Pressable onPress={()=>{deleteItem(item)}} style={{flexDirection:'row', alignContent:'center',
                    justifyContent:'center',textAlign:'center', padding:'2%'}}>
                      <MaterialIcons name="delete-outline" size={24} color="black" />
                      </Pressable>
                      <Pressable onPress={()=>{navigation.navigate('Update',{_id:item._id,todo:item.todo})}} style={{flexDirection:'row', alignContent:'center',
                    justifyContent:'center',textAlign:'center', padding:'2%'}}>
                      <MaterialIcons name="update" size={24} color="black" />
                      </Pressable>
                    </View>
                </View>
  )}}
      ></FlatList>
      :
      <FlatList 
        keyExtractor={(item)=>item._id}
        data = {fullfil}
        
        renderItem={({item})=>{
            return(
                <View style={{
                    backgroundColor:"#C9F4AA",
                    marginVertical:'2%',
                    padding:'2%',
                    width:"100%",
                    borderRadius:10,
                    alignContent:'center',
                    justifyContent:'center'
                }}>
                    <Text style={{
                        color:'black',
                        textAlign:'center',
                        fontWeight: 'bold'
                    }}>{item.todo}</Text>
                    <View style={{
                        flexDirection:'row',
                        justifyContent:'space-between'
                    }}>
                    <Pressable onPress={()=>{fullfilHandle(item)}} style={{flexDirection:'row', alignContent:'center',
                    justifyContent:'center',textAlign:'center', padding:'2%'}}>
                      <Entypo name="circle-with-cross" size={24} color="black" />
                      </Pressable>
                      <Pressable onPress={()=>{deleteItem(item)}} style={{flexDirection:'row', alignContent:'center',
                    justifyContent:'center',textAlign:'center', padding:'2%'}}>
                      <MaterialIcons name="delete-outline" size={24} color="black" />
                      </Pressable>
                      <Pressable onPress={()=>{navigation.navigate('Update',{_id:item._id,todo:item.todo})}} style={{flexDirection:'row', alignContent:'center',
                    justifyContent:'center',textAlign:'center', padding:'2%'}}>
                      <MaterialIcons name="update" size={24} color="black" />
                      </Pressable>
                    </View>
                </View>
  )}}
      ></FlatList>
            }
        

        </View>
        }
      
    </View>
  )
}

export default TodoList