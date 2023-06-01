import React, { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList, Text } from 'react-native';
import ScheduleTextBox from '../components/ssm/ScheduleTextBox';
import { useSelector } from "react-redux";
import API from '../api/API';

function CalenderScreen({navigation}) {
  const userId = useSelector(state => state.userInfo.id);

  // schduleSelector
  const mySchedule = useSelector(state => state.mySchedule);

  const [userSchedule, setUserSchedule] = useState('');


  const getSchedule = () => {
    API.get(`/api/users/scheduleList?id=${userId}`).then((response) => {
      setUserSchedule(response.data.scheduleList);
      console.log(response.data.scheduleList);
    }).catch((error) => {
      console.log("schedule not found");
    });
  }
  useEffect(() => {
    navigation.addListener('focus', () => {
      getSchedule();
    });
    return (() => {

    });
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.pageTitleContainer}>
        <Text style={styles.pageTitle}>Do 일정</Text>
      </View>
      <FlatList
        alignSelf='stretch'
        backgroundColor='white'
        data={userSchedule}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          console.log(item);
          return (<ScheduleTextBox address={item.place} time={item.startTime} title={item.title} />);
        }}
      />
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex : 1,
    // IOS shadow
    shadowColor : '#c5c5c5',
    shadowOffset : { height : 5, },
    shadowOpacity : 1,
    // Android shadow
    elevation : 20,

  },
  //Do 일정
  pageTitleContainer: {
    width : '100%',
    backgroundColor : 'white',
    justifyContent : 'center',
    alignItems : 'center',
    paddingHorizontal : 5,
    paddingBottom : 20,
    // IOS shadow
    shadowColor : '#c5c5c5',
    shadowOffset : { height : 1, },
    shadowOpacity : 0.1,
    // Android shadow
    elevation : 20,


  },
  pageTitle: {
    fontSize : 25,
    fontWeight : 'bold',
    fontFamily:'NanumGothic-ExtraBold',
    color : '#E30A8B',
    // color : 'pink',
    paddingTop : 11,
  },
});

export default CalenderScreen;
