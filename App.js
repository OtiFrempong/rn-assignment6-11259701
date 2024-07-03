import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from './screens/HomeScreen';
import CartScreen from './screens/CartScreen';

const Drawer = createDrawerNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={HomeScreen} options={{headerShown: false}}/>
        <Drawer.Screen name="Cart" component={CartScreen} options={{headerShown: false}}/>
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default App;
