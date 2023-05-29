import { ScrollView, View, Text, TextInput, Image, StyleSheet, Pressable } from 'react-native';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addUserInfo, removeUserInfo } from '../store/user-store';
import DoSimpleBanner from '../components/psc/DoSimpleBanner';
import API from '../api/API';
import Toast from "react-native-root-toast";

const MyDoScreen = ({route, navigation}) => {
    const [doList, setDoList] = useState([]); 

    const userId = useSelector(state => state.userInfo.id);
    
    const handleResponseError = (err) => {
        Toast.show(err,
        {
          duration : Toast.durations.SHORT,
          position : Toast.positions.BOTTOM,
          shadow : true,
          animation : true,
          hideOnPress : true,
          delay : 0,
        });
      }

    const updateMyDoList = ({data}) => 
    {
        console.log(data.doResponseDTOList);
        console.log(typeof data.doResponseDTOList);
        setDoList(current => data.doResponseDTOList);
    }
  
    const updateData = async () => {
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

    return(
        <View style={{flex : 1}}>
            <View><Text>MyDo</Text></View>
            <View style={{flex : 1}}>
                <View>
                    <Text>가입한 Do</Text>
                </View>
                <View style={{flex:1}}>
                    {doList.map((aDo, i) => <DoSimpleBanner key={i} doInfo={aDo} />)}
                </View>
            </View>
        </View>
    )
}

export default MyDoScreen;