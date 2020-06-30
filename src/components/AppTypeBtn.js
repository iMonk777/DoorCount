import 'react-native-gesture-handler';
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {color} from '../Styles/colors';

const AppTypeBtn = ({message, connectionType}) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('InitSettings');
      }}>
      <View style={styles.container}>
        <Text style={styles.text}>{message}</Text>
        <Text style={styles.text}>{connectionType}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 88,
    backgroundColor: color.actionButton,
    padding: 10,
    borderRadius: 18,
    marginTop: 20,
  },
  text: {
    flex: 1,
    color: color.text,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    // borderWidth: 1,
  },
});

export default AppTypeBtn;
