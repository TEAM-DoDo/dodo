//Import ---------------------------------------------------
//  React
import { useState, useEffect } from 'react';

//  Native
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

//  Expo
import { StatusBar } from 'expo-status-bar';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

//  Components
import StartUpScreen from './screens/StartUpScreen';
import UserVerifyScreen from './screens/UserVerifyScreen';
import GenerateIDScreen from './screens/GenerateIDScreen';

//Create Navigation
const Stack = createNativeStackNavigator();

//Definition Component ---------------------------------------------------
export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  
  async function SplashIn()
  {
    await SplashScreen.preventAutoHideAsync();
    await Font.loadAsync({
      'NotoSansKR-Regular' : require('./assets/fonts/NotoSansKR-Regular.otf'),
      'NotoSansKR-Bold' : require('./assets/fonts/NotoSansKR-Bold.otf'),
      'NanumGothic-Bold' : require('./assets/fonts/NanumGothic-Bold.ttf'),
      'NanumGothic-ExtraBold' : require('./assets/fonts/NanumGothic-ExtraBold.ttf'),
      'NanumGothic-Regular' : require('./assets/fonts/NanumGothic-Regular.ttf'),
      'OpenSans' : require('./assets/fonts/OpenSans.ttf'),
    });
    await new Promise(resolve => setTimeout(resolve, 2000));
    await setAppIsReady(true);
  }

  async function SplashOut()
  {
    await SplashScreen.hideAsync();
  }

  useEffect(()=>{
    SplashIn();
  },[]);

  if (!appIsReady) {
    return null;
  }
  else
  {
    SplashOut();
  }

  return (
    <>
      <StatusBar style='dark' />
      <NavigationContainer>
        <Stack.Navigator screenOptions={{
          headerShown : false,
        }}>
          <Stack.Screen name='StartUpScreen' component={StartUpScreen} />
          <Stack.Screen name='UserVerifyScreen' component={UserVerifyScreen} />
          <Stack.Screen name='GenerateIDScreen' component={GenerateIDScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}