import { ScrollView, View, Text, TextInput, Image, StyleSheet, Pressable } from 'react-native';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addUserInfo, removeUserInfo } from '../store/user-store';
import DoSimpleBanner from '../components/psc/DoSimpleBanner';
import API from '../api/API';
import Toast from "react-native-root-toast";

const MyDoScreen = ({route, navigation}) => {
    //const [doList, setDoList] = useState([]); 

    const userId = useSelector(state => state.userInfo.id);
    const myDoList = useSelector(state => state.myDoList.myDoList);

    // const handleResponseError = (err) => {
    //     Toast.show(err,
    //     {
    //       duration : Toast.durations.SHORT,
    //       position : Toast.positions.BOTTOM,
    //       shadow : true,
    //       animation : true,
    //       hideOnPress : true,
    //       delay : 0,
    //     });
    //   }

    // const updateMyDoList = ({data}) => 
    // {
    //     setDoList(current => data.doResponseDTOList);
    // }
  
    // const updateData = async () => {
    //   await API.get(`api/users/doList`, {
    //     params : {
    //       id : userId,
    //     }
    //   }).then(updateMyDoList).catch(handleResponseError).finally(()=>console.log("Get Do list Axios 처리 끝"));
    // }
    
    // useEffect(()=>{
    //   navigation.addListener("focus", ()=>{
    //     updateData();
    //   });
    // }, []);

    return(
        <ScrollView style={styles.rootContainer}>
            <View style={styles.pageTitleContainer}>
              <Text style={styles.pageTitle}>MyDo</Text>
            </View>
            <View style={styles.doContainer}>
                <View style={styles.doTitleContainer}>
                    <Text style={styles.doTitle}>가입한 Do</Text>
                </View>
                <View style={styles.doListContainer}>
                    {myDoList.map((aDo, i) => <DoSimpleBanner key={i} doInfo={aDo} />)}
                </View>
            </View>
        </ScrollView>
    )
}

export default MyDoScreen;

const styles = StyleSheet.create({
  rootContainer : {
    flex : 1,
    padding : 20,
  },
  pageTitleContainer : {
    width : '100%',
    height : 50,
    backgroundColor : 'tomato',
    justifyContent : 'center',
    alignItems : 'center',
    paddingHorizontal : 5,
    marginBottom : 20,
  },
  pageTitle : {
    fontSize : 30,
    fontWeight : 'bold',
    fontFamily:'NanumGothic-Regular',
    color : 'pink',
  },
  doContainer : {
    flex : 1,
    marginBottom : 100,
  },
  doTitleContainer : {
    flex : 1,
    marginBottom : 10,
  },
  doTitle : {
    fontSize : 20,
    fontWeight : 'bold',
  },
  doListContainer : {
    flex : 1,
  },
});