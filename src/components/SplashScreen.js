import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {color} from '../Styles/colors';

export default function SplashScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.message}>This is the splash screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.background,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  message: {
    textAlign: 'center',
    justifyContent: 'space-evenly',
    color: color.text,
    fontSize: 30,
  },
});
