import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './Screens/Login.js';
import Register from './Screens/Register.js';
import Store from './Store/Store.js';
import Home from './Screens/Home.js';
import Update from './Screens/Update.js';
import Setting from './Screens/Setting.js';
import Forgot from './Screens/Forgot.js';
import Edit from './Screens/Edit.js';
const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <Store>
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home' screenOptions={{
    headerShown: false
  }} >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register}  />
        <Stack.Screen name="Forgot" component={Forgot} />
        <Stack.Screen name="Update" component={Update}  />
        <Stack.Screen name="Setting" component={Setting}  />
        <Stack.Screen name="Edit" component={Edit}  />
        
      </Stack.Navigator>
    </NavigationContainer>
    </Store>
  );
}
