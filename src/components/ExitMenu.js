import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {color} from '../Styles/colors';

export default function ExitMenu({hideExitMenu, goToHomeScreen}) {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.message}>Are you sure you want to exit?</Text>
        <Text style={styles.message}>Your counts will be lost</Text>
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
    borderRadius: 18,
    width: '100%',
    height: 186,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  message: {
    color: color.text,
    fontSize: 23,
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
    borderRadius: 18,
    width: 128,
    height: 61,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: color.text,
    fontSize: 30,
    fontWeight: 'bold',
  },
});
