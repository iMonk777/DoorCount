import React from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import {color} from '../Styles/colors';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default function SettingsInput({message, placeholder, action}) {
  const changeText = (person) => {
    let cleanPerson = person
      .replace(/-/g, '')
      .replace(/ /g, '')
      .replace(/,/g, '')
      .replace(/\./g, '');
    Number(cleanPerson) < 9999 ? action(cleanPerson) : action(9999);
    // action(person);
  };
  return (
    <View style={styles.container}>
      <Text style={styles.message}>{message}</Text>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={color.textPlaceholder}
        keyboardType={'number-pad'}
        onChangeText={(person) => changeText(person)}
        contextMenuHidden={true}></TextInput>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
    height: hp('17%'),
    backgroundColor: color.actionButton,
    borderRadius: hp('2%'),
    padding: 11,
    justifyContent: 'space-evenly',
  },
  message: {
    color: color.text,
    fontWeight: 'bold',
    fontSize: hp('2.5%'),
    width: '100%',
    textAlign: 'center',
    marginBottom: 10,
  },
  input: {
    height: hp('10%'),
    borderRadius: hp('2%'),
    backgroundColor: color.background,
    fontSize: hp('7%'),
    textAlign: 'center',
    textAlignVertical: 'center',
    padding: 0,
    fontWeight: 'bold',
    color: color.text,
  },
});
