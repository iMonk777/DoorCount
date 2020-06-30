import React from 'react';
import {View, Text, Switch, StyleSheet} from 'react-native';
import {color} from '../Styles/colors';

export default function SettingsToggle({message, action, value}) {
  return (
    <View style={styles.container}>
      <Text style={styles.message}>{message}</Text>
      <Switch
        style={styles.toggle}
        value={value}
        onChange={action}
        trackColor={{
          false: color.background,
          true: color.actionButton,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 60,
    marginHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  message: {
    color: color.text,
    fontSize: 22,
    flexWrap: 'wrap',
    flex: 4,
    fontWeight: 'bold',
  },
});
