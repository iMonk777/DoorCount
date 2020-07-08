import React from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import {color} from '../Styles/colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default function ReportInfo({message, value}) {
  return (
    <View style={styles.container}>
      <View style={styles.messageContainer}>
        <Text style={styles.message}>{message}</Text>
      </View>
      <View style={styles.valueContainer}>
        <Text style={styles.value}>{value}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: hp('13.4%'),
    flex: 1,
    backgroundColor: color.background,
    flexDirection: 'column',
    backgroundColor: color.actionButton,
    borderRadius: hp('2%'),
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingBottom: 8,
    margin: 8,
    margin: hp('0.8%'),
  },
  messageContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  message: {
    color: color.text,
    fontSize: hp('2%'),
    fontWeight: 'bold',
    textAlign: 'center',
  },
  valueContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: color.background,
    borderRadius: hp('1.7%'),
    width: '100%',
  },
  value: {
    color: color.textPlaceholder,
    fontSize: hp('4%'),
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
