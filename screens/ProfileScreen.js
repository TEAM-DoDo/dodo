import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <Image
          source={require('../assets/profile-user.png')}
          style={styles.avatar}
        />
        <Text style={styles.name}>User</Text>
        <Text style={styles.infoValue}>선호 지역</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.infoLabel}>소개</Text>
        <Text style={styles.infoValue}>Input the Text</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.infoLabel}>my Do</Text>
        <Text style={styles.infoValue}>Input the Text</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.infoLabel}>내 관심사</Text>
        <Text style={styles.infoValue}>Input the Text</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 180,
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  avatarContainer: {
    alignItems: 'center',
    marginTop: 20,
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
});

export default ProfileScreen;

