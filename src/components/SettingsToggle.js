import React from 'react';
import {View, Text, Switch, StyleSheet} from 'react-native';
import {color} from '../Styles/colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default function SettingsToggle({message, action, value}) {
  return (
    <View style={styles.container}>
      <Text style={styles.message}>{message}</Text>
      <Switch
        value={value}
        onChange={action}
        trackColor={{
          false: color.background,
          true: color.actionButton,
        }}
        thumbColor={color.text}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 60,
    height: hp('7%'),
    marginHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  message: {
    color: color.text,
    fontSize: 22,
    fontSize: hp('2.5%'),
    flexWrap: 'wrap',
    flex: 4,
    fontWeight: 'bold',
  },
});
