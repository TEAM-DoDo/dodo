import React, { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import ScheduleTextBox from '../components/ssm/ScheduleTextBox';
import { useSelector } from "react-redux";
import API from '../api/API';

function CalenderScreen() {
  const userId = useSelector(state => state.userInfo.id);

  // schduleSelector
  const mySchedule = useSelector(state => state.mySchedule);

  const [userSchedule, setUserSchedule] = useState('');


  const getSchedule = () => {
    API.get(`/api/schedule-of-user/user/${userId}`).then((response) => { // query 미구현 : schedule_of_user
      console.log(response.data);
      setUserSchedule(response.data);
    }).catch((error) => {
      console.log("schedule not found");
    });
  }
  useEffect(() => {
    getSchedule();
    return (() => {

    });
  }, []);

  return (
    <View styles={styles.container} >
      <FlatList
        data={mySchedule}
        keyExtractor={(item) => item.id}
        renderItem={(item) => {
          console.log(item);
          return (<ScheduleTextBox address={item.place} time={item.startTime} title={item.title} />);
        }}
      />
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    width:"100%",
    height:"100%",
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
});

export default CalenderScreen;
