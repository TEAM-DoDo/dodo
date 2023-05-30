import moment from 'moment';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ScheduleTextBox = ({ address, time, title }) => {
  console.log( address, time, title )
  const date = new Date();
  date.setTime(time);
  return (
    <View style={styles.container}>
      <Text style={styles.addressText}>{address}</Text>
      <View style={styles.timeTitleContainer}>
        <Text style={styles.timeText}>{moment(date).format("MM/DD\n LT")}</Text>
        <Text style={styles.titleText}>{title}</Text>
      </View>
    </View>
  );
};
 /*YYYY-MM-DD LT */

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    width: '80%',
    alignSelf: 'center',
  },
  addressText: {
    height: 40,
    borderRadius: 8,
    borderColor: '#E30A8B',
    textAlign: 'center',
    borderWidth: 3,
    paddingHorizontal: 10,
    paddingTop: 8,
    marginBottom: 8,
    fontSize: 14,
    fontWeight: 'bold',
  },
  timeTitleContainer: {
    flexDirection: 'row',
  },
  timeText: {
    flex: 1,
    height: 40,
    borderRadius: 8,
    borderColor: '#E30A8B',
    color: 'black',
    textAlign: 'center',
    borderWidth: 3,
    paddingHorizontal: 10,
    marginRight: 8,
    fontSize: 14,
    fontWeight: 'bold',
  },
  titleText: {
    flex: 2,
    height: 40,
    borderRadius: 8,
    borderColor: '#E30A8B',
    color: 'black',
    textAlign: 'center',
    borderWidth: 3,
    paddingHorizontal: 10,
    paddingTop: 8,
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default ScheduleTextBox;
