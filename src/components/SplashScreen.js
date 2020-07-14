import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {color} from '../Styles/colors';
import {Icon} from 'native-base';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default function SplashScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Text style={styles.logoText}>-</Text>
        <Icon
          style={styles.exitIcon}
          name={'exit-run'}
          type={'MaterialCommunityIcons'}
        />
        <Text style={styles.logoText}>+</Text>
      </View>
      <Text style={styles.message}>Door Counter</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.background,
    justifyContent: 'center',
  },
  message: {
    textAlign: 'center',
    justifyContent: 'space-evenly',
    color: color.text,
    fontSize: hp('5.6%'),
    marginTop: hp('3.4%'),
    fontWeight: 'bold',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  exitIcon: {
    color: color.text,
    fontSize: hp('14.5%'),
  },
  logoText: {
    textAlign: 'center',
    justifyContent: 'space-evenly',
    color: color.text,
    fontSize: hp('10%'),
  },
});
