import { ScrollView, View, Text, TextInput, Image, StyleSheet, Pressable } from 'react-native';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addUserInfo, removeUserInfo } from '../store/user-store';
import DoSimpleBanner from '../components/psc/DoSimpleBanner';
import API from '../api/API';
import Toast from "react-native-root-toast";
import { FlatList } from 'react-native';

const MyDoScreen = ({route, navigation}) => {
    const [tick, setTick] = useState(Date.now()); 

    const userId = useSelector(state => state.userInfo.id);
    const myDoList = useSelector(state => state.myDoList.myDoList);
    //console.log(myDoList);
    useEffect(()=>{
      navigation.addListener("focus", ()=>{
        setTick(Date.now());
      });
    }, []);

    return(
        <View style={styles.rootContainer}>
            <View style={styles.pageTitleContainer}>
              <Text style={styles.pageTitle}>MyDo</Text>
            </View>
            <View style={styles.doContainer}>
                <View style={styles.doTitleContainer}>
                    <Text style={styles.doTitle}>가입한 Do</Text>
                </View>
                <View style={styles.doListContainer}>
                  <FlatList
                    data={myDoList}
                    keyExtractor={(item)=>item.id}
                    renderItem={({item})=>{
                      //console.log(item);
                      return(<DoSimpleBanner doInfo={item} tick={tick} />);
                    }}/>
                </View>
            </View>
        </View>
    )
}

export default MyDoScreen;

const styles = StyleSheet.create({
  rootContainer : {
    flex : 1,
  },

  pageTitleContainer : {
    width : '100%',
    backgroundColor : 'white',
    justifyContent : 'center',
    alignItems : 'center',
    paddingHorizontal : 5,
    paddingBottom : 20,
    // IOS shadow
    shadowColor : '#c5c5c5',
    shadowOffset : { height : 10, },
    shadowOpacity : 1,
    // Android shadow
    elevation : 20,

  },
  pageTitle : {
    fontSize : 25,
    fontWeight : 'bold',
    fontFamily:'NanumGothic-Bold',
    color : '#E30A8B',
    // color : 'pink',
    paddingTop : 11,

    
  },
  doContainer : {
    flex : 1,
    padding:20,
  },
  doTitleContainer : {
    
  },
  doTitle : {
    fontSize : 23,
    fontWeight : 'bold',
    // padding : 7,
  },
  doListContainer : {
    flex : 1,
  },
});