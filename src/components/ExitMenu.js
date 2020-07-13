import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {color} from '../Styles/colors';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default function ExitMenu({hideExitMenu, goToHomeScreen}) {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.message}>Are you sure you want to exit?</Text>
        <Text style={styles.message}>Your count will be lost</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={goToHomeScreen}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Yes</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={hideExitMenu}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>No</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: color.actionButton,
    borderRadius: hp('2%'),
    width: '100%',
    height: hp('20%'),
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  message: {
    color: color.text,
    fontSize: hp('2.6%'),
    fontWeight: 'bold',
  },
  textContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  button: {
    backgroundColor: color.background,
    borderRadius: hp('2%'),
    width: hp('14.5%'),
    height: hp('7%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: color.text,
    fontSize: hp('3.3%'),
    fontWeight: 'bold',
  },
});
