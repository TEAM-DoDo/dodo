//Import ---------------------------------------------------
//  React
import { useState, useEffect } from 'react';

// Redux
import { Provider } from 'react-redux';
import { store } from './store/redux-store';
//  Native
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaView,StyleSheet } from 'react-native';
//  Expo
import { StatusBar } from 'expo-status-bar';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { Ionicons } from '@expo/vector-icons';
import * as Notifications from 'expo-notifications';
import * as Lication from 'expo-location';

//  Components
import StartUpScreen from './screens/StartUpScreen';
import UserVerifyScreen from './screens/UserVerifyScreen';
import GenerateIDScreen from './screens/GenerateIDScreen';
import SelectCategoryScreen from './screens/SelectCategoryScreen';
import ChatScreen from './screens/ChatScreen';
import AlarmScreen from './screens/AlarmScreen';
import DoInfoScreen from './screens/DoInfoScreen';
import DoScreen from './screens/DoScreen';
import CalendarScreen from './screens/CalendarScreen';
import HomeScreen from './screens/HomeScreen'
import ProfileScreen from './screens/ProfileScreen';
import SelectTrendCategoryScreen from './screens/SelectTrendCategoryScreen';
import { RootSiblingParent } from 'react-native-root-siblings';
import DoScheduleAddScreen from './screens/DoScheduleAddScreen';
import DoNoticeScreen from './screens/DoNoticeScreen';
import DoCreateScreen from './screens/DoCreateScreen';
import SelectInterestScreen from './screens/SelectInterestScreen';

// Library
import * as encoding from 'text-encoding';
import { KeyboardAvoidingView } from 'react-native';
import UserListScreen from './screens/UserListScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';

//Create Navigation
const Stack = createNativeStackNavigator();
const MainContent = createNativeStackNavigator();
const BottomTab = createBottomTabNavigator();



//Definition Component ---------------------------------------------------

function BottomTabNavigator({ route, navigation }) {
  return (
    <BottomTab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: 'blue',
        tabBarInactiveTintColor: 'black',
        tabBarShowLabel: false,
      }}
    >
      <BottomTab.Screen name="Home" component={HomeScreen} options={
        {
          tabBarIcon: ({ color, size }) => <Ionicons name='home' color={color} size={size} />
        }}
      />
      <BottomTab.Screen name="MyDo" component={DoScreen} options={
        { tabBarIcon: ({ color, size }) => <Ionicons name='list' color={color} size={size} /> }}
      />
      <BottomTab.Screen name="Calender" component={CalendarScreen} options={
        { tabBarIcon: ({ color, size }) => <Ionicons name='calendar' color={color} size={size} /> }}
      />
      <BottomTab.Screen name="Profile" component={ProfileScreen} options={
        { tabBarIcon: ({ color, size }) => <Ionicons name='person-circle' color={color} size={size} /> }}
      />
    </BottomTab.Navigator>
  );
}

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  async function SplashIn() {
    await SplashScreen.preventAutoHideAsync();
    await Font.loadAsync({
      'NotoSansKR-Regular': require('./assets/fonts/NotoSansKR-Regular.otf'),
      'NotoSansKR-Bold': require('./assets/fonts/NotoSansKR-Bold.otf'),
      'NanumGothic-Bold': require('./assets/fonts/NanumGothic-Bold.ttf'),
      'NanumGothic-ExtraBold': require('./assets/fonts/NanumGothic-ExtraBold.ttf'),
      'NanumGothic-Regular': require('./assets/fonts/NanumGothic-Regular.ttf'),
      'OpenSans': require('./assets/fonts/OpenSans.ttf'),
    });
    await new Promise(resolve => setTimeout(resolve, 2000));
    await setAppIsReady(true);
  }
  async function SplashOut() {
    await SplashScreen.hideAsync();
  }

  useEffect(() => {
    SplashIn();
  }, []);

  if (!appIsReady) {
    return null;
  }
  else {
    SplashOut();
  }
  //노티피케이션 설정
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    }),
  });
  AsyncStorage.clear();
  return (
    <SafeAreaView style={Style.droidSafeArea}>
      {/* <KeyboardAvoidingView style={Style.master_view} behavior='padding'> */}
      <Provider store={store}>
      <RootSiblingParent>
      <StatusBar style='dark' />
      <NavigationContainer>
        <Stack.Navigator screenOptions={{
          headerShown: false,
        }}>
          <Stack.Screen name='StartUpScreen' component={StartUpScreen} />
          <Stack.Screen name='UserVerifyScreen' component={UserVerifyScreen} />
          <Stack.Screen name='GenerateIDScreen' component={GenerateIDScreen} />
          <Stack.Screen name="SelectCategoryScreen" component={SelectCategoryScreen} />
          <Stack.Screen name="SelectTrendCategoryScreen" component={SelectTrendCategoryScreen} />
          <Stack.Screen name="BottomTabNavigatorScreen" component={BottomTabNavigator} />
          <Stack.Screen name="DoScreen" component={DoScreen} />
          <Stack.Screen name='DoScheduleAddScreen' component={DoScheduleAddScreen}/>
          <Stack.Screen name='DoNoticeScreen'component={DoNoticeScreen}/>
          <Stack.Screen name='DoCreateScreen'component={DoCreateScreen}/>
          <Stack.Screen name='AlarmScreen' component={AlarmScreen}/>
          <Stack.Screen name='SelectInterestScreen' component={SelectInterestScreen}/>
          <Stack.Screen name='UserListScreen' component={UserListScreen}/>
        </Stack.Navigator>
      </NavigationContainer>
      </RootSiblingParent>
      </Provider>
      {/* </KeyboardAvoidingView> */}
    </SafeAreaView>
  );
}
const Style =  StyleSheet.create({
  droidSafeArea: {
      flex: 1,
      paddingTop: Platform.OS === 'android' ? 25 : 0
  },
  master_view:{
    flex: 1,
    backgroundColor: 'white',
  }
});