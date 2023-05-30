import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ScheduleTextBox = ({ address, time, title }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.addressText}>{address}</Text>
      <View style={styles.timeTitleContainer}>
        <Text style={styles.timeText}>{time}</Text>
        <Text style={styles.titleText}>{title}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    width: '80%',
    alignSelf: 'center',
  },
  addressText: {
    height: 40,
    borderColor: '#E30A8B',
    borderWidth: 3,
    paddingHorizontal: 10,
    marginBottom: 8,
    textAlignVertical: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  timeTitleContainer: {
    flexDirection: 'row',
  },
  timeText: {
    flex: 1,
    height: 40,
    borderColor: '#E30A8B',
    borderWidth: 3,
    paddingHorizontal: 10,
    marginRight: 8,
    textAlignVertical: 'center',
    fontSize: 16,
  },
  titleText: {
    flex: 2,
    height: 40,
    borderColor: '#E30A8B',
    borderWidth: 3,
    paddingHorizontal: 10,
    textAlignVertical: 'center',
    fontSize: 16,
  },
});

export default ScheduleTextBox;
