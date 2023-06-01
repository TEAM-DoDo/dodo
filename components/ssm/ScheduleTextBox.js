import moment from 'moment';
import React from 'react';
import { View, Text, StyleSheet, Dimensions, Platform } from 'react-native';

const ScheduleTextBox = ({ address, time, title }) => {
  //console.log(address, time, title)
  
  const date = new Date();
  date.setTime(time);
  // const today = moment().startOf('day');
  // const dday = moment(end).diff(today, 'days');
  // const ddayText = dday === 0 ? "+Day" : (dday > 0 ? "-" + dday : dday);
  const addr = address.length >= 24 ? address.substr(0, 24) + "..." : address;

  return (
    <View style={styles.container}>
      <View style={styles.date_holder}>
        <Text style={styles.do_date}>{moment(date).format("MM/DD")}</Text>
        <Text style={styles.do_date}>{moment(date).format("LT")}</Text>
      </View>
      <View style={styles.do_schedule_info_holder}>
        <Text style={styles.do_title_text}>{title}</Text>
        <View flexDirection='row' alignItems='center'>
          <Text style={styles.do_place_text}>{addr}</Text>
        </View>
      </View>
    </View>
  );
};
/*YYYY-MM-DD LT */

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get('window').height * 0.1,
    marginVertical: 5,
    flexDirection: 'row',
    alignSelf: 'baseline',
  },
  date_holder: {
    height: "100%",
    aspectRatio: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'baseline',
    padding: 6,
    borderRadius: 15,
    backgroundColor: 'white',

  },
  do_date: {
    fontFamily: 'NanumGothic-ExtraBold',
    textAlign: 'center',
    fontSize: Platform.OS === 'android' ? 18 : 15,
  },
  do_schedule_info_holder: {
    //flex:1,
    marginStart: 5,
    justifyContent: "center",
    //backgroundColor:'#dfdfdf',
  },
  do_title_text: {
    fontFamily: 'NanumGothic-ExtraBold',
    fontSize: 20,
    padding: 2,
    marginStart:3,
    marginBottom:5
  },
  do_place_text: {
    fontFamily: 'NanumGothic-Bold',
    color:'grey',
    fontSize: 15,
    padding: 5,

  },
});

export default ScheduleTextBox;
