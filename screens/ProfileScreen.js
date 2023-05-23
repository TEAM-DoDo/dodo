import React, { useState } from 'react';

import { ScrollView, View, Text, TextInput, Image, StyleSheet, Pressable } from 'react-native';

import { AntDesign } from '@expo/vector-icons';

function ProfileScreen ({navigation}) {
  
  const [intro, setIntro] = useState('Input the Text');
  // const [myDo, setMyDo] = useState('Input the Text');
  const [interests, setInterests] = useState('Input the Text');

  function moveToSelectInterestScreen() { // 관심사 선택 화면 이동
    navigation.navigate('SelectInterestScreen');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.avatarContainer}>
        <Image
          source={require('../assets/profile-user.png')} // TO DO : add profile edit function
          style={styles.avatar}
        />
        <Text style={styles.name}>User</Text>
        <Text style={styles.infoValue}>선호 지역</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.infoLabel}>소개</Text>
        <TextInput
          style={styles.infoValue}
          value={intro}
          onChangeText={(text) => setIntro(text)}
          editable={true}
        />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.infoLabel}>my Do</Text> 
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.infoLabel}>내 관심사</Text>
        <Pressable onPress={moveToSelectInterestScreen} style={styles.editButton}>
        <AntDesign name="pluscircleo" size={20} color="black" />
        </Pressable>
        <Text style={styles.infoValue}>Input the Text</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
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
  editButton: {
    position: 'absolute',
    right: 0,
    top: 0,
    padding: 10,
  },
});

export default ProfileScreen;

