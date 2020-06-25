import React from 'react';
import {View, Text, Switch, StyleSheet} from 'react-native';
import {color} from '../Styles/colors';

export default function SettingsToggle({message}) {
  return (
    <View style={styles.container}>
      <Text style={styles.message}>{message}</Text>
      <Switch style={styles.toggle}></Switch>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 50,
    margin: 10,
    borderWidth: 2,
    flexDirection: 'row',
  },
  message: {
    color: color.text,
    fontSize: 28,
    // flexWrap: 'wrap',
    flex: 4,
    borderWidth: 2,
    fontWeight: 'bold',
  },
  toggle: {
    flex: 1,
  },
});
