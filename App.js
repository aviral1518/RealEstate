import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Login from './src/Login';
import HousingList from './src/HousingList';
import HouseDetail from './src/HouseDetail';
import Splash from './src/Splash';

export default function App() {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
        <Stack.Navigator
            initialRouteName="Splash"
            screenOptions={{headerShown: false}}
        >
            <Stack.Screen name="Splash" component={Splash} options={{ headerShown: false }}/>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="HousingList" component={HousingList} />
            <Stack.Screen name="HouseDetail" component={HouseDetail} />
        </Stack.Navigator>
    </NavigationContainer>
  );
}
