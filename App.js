import React from 'react';
import {StatusBar, StyleSheet, View} from 'react-native';
import Footer from './src/components/footer/Footer';
import Header from './src/components/header/Header';
import Login from './src/pages/login/Login';
import Home from './src/pages/home/Home';
import CodeCheck from './src/pages/codecheck/CodeCheck';
import EmailCheck from './src/pages/emailcheck/EmailCheck';
import RegisterOrChangeUser from './src/pages/registerorchangeuser/RegisterOrChangeUser';
import Register from './src/pages/register/Register';
import FindDependentLocally from './src/pages/finddependentlocally/FindDependentLocally';
import AccessRecovery from './src/pages/accessrecovery/AccessRecovery';
import ForgotPassword from './src/pages/forgotPassword/ForgotPassword';
import ChangePassword from './src/pages/changepassword/ChangePassword';
import UserProfile from './src/pages/userProfile/UserProfile';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {UserProvider} from './src/contexts/UserContext';
import {COLORS} from './src/constants/constants';
import Toast, {BaseToast} from 'react-native-toast-message';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <UserProvider>
        <View style={styles.container}>
          <StatusBar style="auto" backgroundColor={COLORS.BLUE_MAIN} />
          <Stack.Navigator
            initialRouteName="Login"
            screenOptions={{
              headerShown: false,
            }}>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen
              name="RegisterOrChangeUser"
              component={RegisterOrChangeUser}
            />
            <Stack.Screen name="CodeCheck" component={CodeCheck} />
            <Stack.Screen name="EmailCheck" component={EmailCheck} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen
              name="FindDependentLocally"
              component={FindDependentLocally}
            />
            <Stack.Screen name="AccessRecovery" component={AccessRecovery} />
            <Stack.Screen name="ChangePassword" component={ChangePassword} />
            <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
            <Stack.Screen name="UserProfile" component={UserProfile} />
          </Stack.Navigator>
          <Header />
          <Footer />
        </View>
        <Toast
          config={{
            success: props => (
              <BaseToast
                {...props}
                style={{borderLeftColor: 'green', zIndex: 9999}}
                text1Style={{
                  fontSize: 16,
                  fontWeight: 'bold',
                }}
                text2Style={{
                  fontSize: 14,
                }}
              />
            ),
            error: props => (
              <BaseToast
                {...props}
                style={{borderLeftColor: 'red', zIndex: 9999}}
                text1Style={{
                  fontSize: 16,
                  fontWeight: 'bold',
                }}
                text2Style={{
                  fontSize: 14,
                }}
              />
            ),
            info: props => (
              <BaseToast
                {...props}
                style={{borderLeftColor: 'blue', zIndex: 9999}}
                text1Style={{
                  fontSize: 16,
                  fontWeight: 'bold',
                }}
                text2Style={{
                  fontSize: 14,
                }}
              />
            ),
          }}
        />
      </UserProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
