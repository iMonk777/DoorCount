import 'react-native-gesture-handler';
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {color} from '../Styles/colors';
import AppTypeBtn from './AppTypeBtn';

const Home = ({navigation}) => {
  return (
    <View style={styles.home}>
      <AppTypeBtn
        message={'One person use'}
        connectionType={'(offline)'}></AppTypeBtn>
      {/* <AppTypeBtn
        message={'Use with colleagues'}
        connectionType={'(online)'}
        navigation={navigation}></AppTypeBtn> */}
    </View>
  );
};

const styles = StyleSheet.create({
  home: {
    flex: 1,
    backgroundColor: color.background,
    paddingTop: 50,
    paddingHorizontal: 20,
  },
});

export default Home;
