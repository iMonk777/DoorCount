import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {color} from '../Styles/colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default function ActionButton({
  message,
  width,
  height,
  fontSize,
  action,
  oneHanded,
}) {
  const styles = StyleSheet.create({
    touchable: {
      width: width,
      height: height,
      alignSelf: 'center',
      marginVertical: oneHanded ? hp('1%') : null,
    },
    container: {
      backgroundColor: color.actionButton,
      borderRadius: hp('2%'),
      width: width,
      height: height,
      justifyContent: 'center',
      alignItems: 'center',
    },
    message: {
      color: color.text,
      fontSize: fontSize,
      fontWeight: 'bold',
    },
  });

  return (
    <TouchableOpacity style={styles.touchable} onPress={action}>
      <View style={styles.container}>
        <Text style={styles.message}>{message}</Text>
      </View>
    </TouchableOpacity>
  );
}
