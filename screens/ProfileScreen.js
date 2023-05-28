import React, { useEffect, useState } from 'react';

import { ScrollView, View, Text, TextInput, Image, StyleSheet, Pressable } from 'react-native';

import { AntDesign } from '@expo/vector-icons';

import { useDispatch, useSelector } from 'react-redux'; //useDispatch는 메서드(slice의 reducers) 접근, useSelector는 value(slice의 initialState) 접근
import { addUserInfo, removeUserInfo } from '../store/user-store';

import API, { localIpAddress, portNumber } from '../api/API';
import Toast from "react-native-root-toast";
import * as ImagePicker from 'expo-image-picker';
//  Colors
import Colors from "../constants/Colors";
import mime from 'mime';
import DoSimpleBanner from '../components/psc/DoSimpleBanner';
import SimpleCategory from '../components/psc/SimpleCategory';
function ProfileScreen ({navigation, route}) {
  
  const [intro, setIntro] = useState('Input the Text');
  // const [myDo, setMyDo] = useState('Input the Text');
  const [interests, setInterests] = useState('Input the Text');
  const [userInfo, setUserInfo] = useState(null);
  const [doList, setDoList] = useState([]); 
  const [isInfoUpdated, setIsInfoUpdated] = useState(false);
  function moveToSelectInterestScreen() { // 관심사 선택 화면 이동
    navigation.navigate('SelectInterestScreen');
  };

  //redux
  const dispatch = useDispatch();
  const addUserInfo = dispatch(addUserInfo);
  const removeUserInfo = dispatch(removeUserInfo);


  const userId = useSelector(state => state.user.id); //만약 업로드한 이미지가 없다면 어떻게 처리?

  const handleResponseError = (err) => {
    Toast.show(err), 
    {
      duration : Toast.durations.SHORT,
      position : Toast.positions.BOTTOM,
      shadow : true,
      animation : true,
      hideOnPress : true,
      delay : 0,
    }
  }

  const updateUserInfo = ({data}) =>
  {
    setUserInfo(current => data);
  }

  const updateMyDoList = ({data}) => 
  {
    setDoList(current => data.doResponseDTOList);
  }

  const updateData = async () => {
    await API.get(`api/users/${userId}`).then(updateUserInfo).catch(handleResponseError).finally(()=>console.log("Get 유저 정보 Axios 처리 끝"));
    await API.get(`api/users/doList`, {
      params : {
        id : userId,
      }
    }).then(updateMyDoList).catch(handleResponseError).finally(()=>console.log("Get Do list Axios 처리 끝"));
  }
  
  useEffect(()=>{
    navigation.addListener("focus", ()=>{
      updateData();
    });
  });
  
  const handleProfileImageUpload = async () =>
  {
      isGetImageAllowed = await ImagePicker.getMediaLibraryPermissionsAsync();
      if(!isGetImageAllowed)
      {
        Toast.show("이미지 권한이 존재하지 않습니다.",
        {
          duration : Toast.durations.SHORT,
          position : Toast.positions.BOTTOM,
          shadow : true,
          animation : true,
          hideOnPress : true,
          delay : 0,
        })
        return;
      }
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes : ImagePicker.MediaTypeOptions.Images,
        allowsEditing : true,
        quality : 0.25,
      });
      if(result.canceled)
      {
        Toast.show("이미지가 선택되지 않았습니다.", {
          duration : Toast.durations.SHORT,
          position : Toast.positions.BOTTOM,
          shadow : true,
          animation : true,
          hideOnPress : true,
          delay : 0,
        });
        return;
      }
      const image = {
        uri : '',
        type : "image/jpeg",
        name : 'test',
      };
      image.uri = result.assets[0].uri;
      image.name = image.uri.split("/").pop();
      image.type = mime.getType(image.uri);
      const formData = new FormData();
      formData.append("files", image);
      API.post(
        `api/users/${userId}/profile-image`, formData,
        {headers : {"Content-Type":`multipart/form-data`}}
      ).then(response => setIsInfoUpdated(current => !currnet)).catch(err => console.log(err));
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.avatarContainer}>
        <Pressable onPress={handleProfileImageUpload} style={({pressed}) => [styles.avatarPressArea, pressed ? styles.pressedOpacity : null]} 
        android_ripple={{color : Colors.button.rippleColor}}>  
          <Image
            source={{uri:`http://${localIpAddress}:${portNumber}/api/users/${userId}/profile-image`}} // TO DO : add profile edit function
            style={styles.avatar}
          />
        </Pressable>
        <Text style={styles.name}>{userInfo.nickname}</Text>
        <Text style={styles.infoValue}>{userInfo.address}</Text>
      </View>
      {/* <View style={styles.infoContainer}>
        <Text style={styles.infoLabel}>{userInfo.level}</Text>
        <TextInput
          style={styles.infoValue}
          value={intro}
          onChangeText={(text) => setIntro(text)}
          editable={true}
        />
      </View> */}
      <View style={styles.infoContainer}>
        <View>
          <Text style={styles.infoLabel}>가입한 Do</Text> 
        </View>
        {
          doList.map((aDo)=> <DoSimpleBanner props={aDo} />)
        }
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.infoLabel}>내 관심사</Text>
        {/* <Pressable onPress={moveToSelectInterestScreen} style={styles.editButton}>
        <AntDesign name="pluscircleo" size={20} color="black" />
        </Pressable> */}
        {/* <Text style={styles.infoValue}>Input the Text</Text> */}
        <View>
          {JSON.parse(userInfo.category).split(",").map((category) => <SimpleCategory props={category} />)}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  pressedOpacity : {
    opacity : 0.5,
  },
  avatarContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  avatarPressArea : {
    flex : 1,
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  name: {
    fontSize: 35,
    fontWeight: 'bold',
    marginTop: 10,
  },
  infoContainer: {
    marginTop: 50,
  },
  infoLabel: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  infoValue: {
    fontSize: 15,
    marginTop: 5,
  },
  editButton: {
    position: 'absolute',
    right: 0,
    top: 0,
    padding: 10,
  },
});

export default ProfileScreen;

