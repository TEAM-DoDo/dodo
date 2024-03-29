import React, { useEffect, useState } from 'react';

import { ScrollView, View, Text, TextInput, StyleSheet, Pressable,FlatList } from 'react-native';
import {Image} from 'expo-image';

import { AntDesign } from '@expo/vector-icons';

import { useDispatch, useSelector } from 'react-redux'; //useDispatch는 메서드(slice의 reducers) 접근, useSelector는 value(slice의 initialState) 접근
import { addUserInfo, removeUserInfo } from '../store/user-store';
import LogoutButton from '../components/psc/LogoutButton';

import API, { localIpAddress, portNumber } from '../api/API';
import Toast from "react-native-root-toast";
import * as ImagePicker from 'expo-image-picker';

import Colors from "../constants/Colors";
import mime from 'mime';
import DoSimpleBanner from '../components/psc/DoSimpleBanner';
import SimpleCategory from '../components/psc/SimpleCategory';

import unknownImagePath from "../assets/images/Unknown_person.jpg";

function ProfileScreen ({navigation, route}) {
  const [tick, setTick] = useState(Date.now());
  console.log("profilescreen에서 호출 tick : ", tick);
  //redux
  const userInfo = useSelector(state => state.userInfo);
  //console.log("profilescreen에서 호출 userinfo : ", userInfo);
  const myDoList = useSelector(state => state.myDoList.myDoList);
  //console.log("profilescreen에서 호출 do list : ", myDoList);
  const dispatch = useDispatch();

  const accessToken = useSelector(state => state.jwt.access_token);

  function moveToSelectInterestScreen() { // 관심사 선택 화면 이동
    navigation.navigate('SelectInterestScreen');
  };
  
  useEffect(()=>{
    navigation.addListener("focus", ()=>{
      setTick(Date.now());
    });
  }, []);
  
  const handleProfileImageUpload = async () =>
  {
      isGetImageAllowed = await ImagePicker.getMediaLibraryPermissionsAsync();
      if(!isGetImageAllowed)
      {
        Toast.show("이미지 권한이 존재하지 않습니다.",
        {
          duration: Toast.durations.SHORT,
          position: Toast.positions.BOTTOM,
          shadow: true,
          animation: true,
          hideOnPress: true,
          delay: 0,
        });
        return;
      }
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 0.25,
      });
      if(result.canceled)
      {
        Toast.show("이미지가 선택되지 않았습니다.", 
        {
          duration: Toast.durations.SHORT,
          position: Toast.positions.BOTTOM,
          shadow: true,
          animation: true,
          hideOnPress: true,
          delay: 0,
        });
        return;
      }
      const image = {
        uri: '',
        type: 'image/jpeg',
        name: 'test',
      };
      image.uri = result.assets[0].uri;
      image.name = image.uri.split("/").pop();
      image.type = mime.getType(image.uri);
      const formData = new FormData();
      formData.append("files", image);
      userInfo.imagePath = image.name;
      dispatch(addUserInfo({data : userInfo}));
      API.post(
        `api/users/${userInfo.id}/profile-image`, formData,
        {headers:{"Content-Type": `multipart/form-data`}}
      ).then(response => setTick(Date.now())).catch(err => console.log(err));
  }

  const splitAddress = userInfo.address.split(" ");
  const address = splitAddress[0] + " " + splitAddress[1];

  return (
    <ScrollView style={styles.rootContainer}>
      <LogoutButton navigation={navigation} />
      <View style={styles.avatarOuterContainer}>
        <View style={styles.avatarInnerContainer}>
          <Pressable onPress={handleProfileImageUpload} style={({pressed}) => [styles.avatarPressArea, pressed ? styles.pressedOpacity : null]} 
          android_ripple={{color : Colors.button.rippleColor}}>  
            <Image
              source={userInfo.imagePath == null ? unknownImagePath : 
                {
                  uri:`http://${localIpAddress}:${portNumber}/api/users/${userInfo.id}/profile-image?${tick}`,
                  headers : {
                    Authorization : `Bearer ${accessToken}`
                  }
                }
              }
              style={styles.avatar}
            />
          </Pressable>
        </View>
        <View style={styles.profileInfoContainer}>
          <Text style={styles.name}>{userInfo.nickname}</Text>
          <Text style={styles.infoValue}>{address}</Text>
        </View>
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.infoLabel}>가입한 Do</Text> 
        </View>
        {myDoList.map((item, i) => <DoSimpleBanner key={i} doInfo={item} tick={tick} />)}
      </View>
      <View style={styles.interestContainer}>
        <View style={styles.interestTobContainer}>
          <Pressable onPress={moveToSelectInterestScreen} style={({pressed}) => [styles.interestTobContainerPressArea, pressed ? styles.pressedOpacity : null]} 
          android_ripple={{color : Colors.button.rippleColor}}>
            <Text style={styles.infoLabel}>내 관심사</Text>
            <AntDesign name="pluscircleo" size={18} color="black" />
          </Pressable>
        </View>
        <View style={styles.categoryContainer}>
          {userInfo.category.map((item, i) => <SimpleCategory key={i} text={item} />)}
        </View>
      </View>
    </ScrollView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  avatarOuterContainer: {
    alignItems: 'center',
    marginTop: 20,
    // IOS shadow
    shadowColor : '#black',
    shadowOffset : { width : 13, height : 10, },
    shadowOpacity : 0.1,
    // Android shadow
    elevation : 10,
  },
  avatarInnerContainer : {
    width : 200,
    height : 200,
    borderRadius: 100,
    overflow : 'hidden',
    marginBottom : 20,
  },
  avatarPressArea : {
    flex : 1,
  },
  pressedOpacity : {
    opacity : 0.5,
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  profileInfoContainer : {
    alignItems : 'center',
  },
  name: {
    fontSize: 35,
    fontWeight: 'bold',
    marginTop: 10,
  },
  infoValue: {
    fontSize: 15,
    marginTop: 5,
  },
  infoContainer: {
    marginTop : 20,
  },
  titleContainer : {
    marginBottom : 10,
    
  },
  infoLabel: {
    fontFamily:'NanumGothic-ExtraBold',
    fontSize: 23,
    fontWeight: 'bold',
    marginRight : 5,
  },
  doListContainer : {
    flex : 1,
  },
  interestContainer : {
    width : '100%',
    flex : 1,
    marginTop : 30,
    marginBottom : 100,
  },
  interestTobContainer : {
    width : '100%',
    marginBottom : 10,
  },
  interestTobContainerPressArea : {
    flex : 1,
    flexDirection : 'row',
    alignItems : 'center',
  },
  categoryContainer : {
    flex : 1,
    flexDirection : 'row',
    flexWrap : 'wrap',
    gap : 3
  },

});