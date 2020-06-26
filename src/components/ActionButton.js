import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {color} from '../Styles/colors';

export default function ActionButton({
  message,
  width,
  height,
  fontSize,
  action,
}) {
  const styles = StyleSheet.create({
    touchable: {
      width: width,
      height: height,
      alignSelf: 'center',
    },
    container: {
      backgroundColor: color.actionButton,
      borderRadius: 18,
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
