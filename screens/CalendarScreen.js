//npm install --save react-native-calendars
//yarn add react-native-calendars
import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Calendar } from 'react-native-calendars';

const CalendarScreen = () => {
  const [selectedDate, setSelectedDate] = useState('');

  const handleDayPress = (day) => {
    setSelectedDate(day.dateString);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Do Calendar</Text>
      <Calendar
        onDayPress={handleDayPress}
        markedDates={{ [selectedDate]: { selected: true } }}
      />
      <Text style={styles.selectedDate}>{selectedDate}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  selectedDate: {
    marginTop: 20,
    fontSize: 18,
  },
});

export default CalendarScreen;
