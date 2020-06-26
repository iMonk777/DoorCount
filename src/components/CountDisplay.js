import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {color} from '../Styles/colors';
import {Icon} from 'react-native-vector-icons/FontAwesome';

export default function CountDisplay({message}) {
  return (
    <View style={styles.container}>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.background,
    flexDirection: 'column',
    borderWidth: 2,
    borderColor: 'white',
    justifyContent: 'center',
  },
  message: {
    color: color.text,
    fontSize: 144,
    textAlign: 'center',
    borderWidth: 3,
    borderColor: 'red',
  },
});
