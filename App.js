import React from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';

import Footer from './src/components/Footer';
import Header from './src/components/Header';

import Login from './src/pages/Login';
import Home from './src/pages/Home';
import CodeCheck from './src/pages/CodeCheck';
import RegisterOrChangeUser from './src/pages/RegisterOrChangeUser';
import Register from './src/pages/Register';
import FindDependentLocally from './src/pages/FindDependentLocally';

import {
  NavigationContainer,
  useNavigationState,
} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { UserProvider } from './src/contexts/UserContext';
import { COLORS } from './src/constants/constants';

const Stack = createStackNavigator();

export default function App() {
  return (
    <UserProvider>
      <View style={styles.container}>
        <NavigationContainer>
          <StatusBar style='auto' backgroundColor={COLORS.BLUE_MAIN} />
          <Stack.Navigator
            initialRouteName='Login'
            screenOptions={{
              headerShown: false,
            }}>
            <Stack.Screen name='Login' component={Login} />
            <Stack.Screen name='Home' component={Home} />
            <Stack.Screen
              name='RegisterOrChangeUser'
              component={RegisterOrChangeUser}
            />
            <Stack.Screen name='CodeCheck' component={CodeCheck} />
            <Stack.Screen name='Register' component={Register} />
            <Stack.Screen
              name="FindDependentLocally"
              component={FindDependentLocally}
            />
          </Stack.Navigator>
          <Header />
          <Footer />
        </NavigationContainer>
      </View>
    </UserProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});
