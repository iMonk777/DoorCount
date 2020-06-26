import React from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import {color} from '../Styles/colors';

export default function SettingsInput({message, placeholder, action}) {
  const changeText = (person) => {
    action(person);
  };
  return (
    <View style={styles.container}>
      <Text style={styles.message}>{message}</Text>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={color.textPlaceholder}
        keyboardType={'number-pad'}
        onChangeText={(person) => changeText(person)}></TextInput>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
    height: 154,
    backgroundColor: color.actionButton,
    borderRadius: 18,
    padding: 11,
  },
  message: {
    color: color.text,
    fontWeight: 'bold',
    fontSize: 24,
    width: '100%',
    textAlign: 'center',
    marginBottom: 10,
  },
  input: {
    height: 93,
    borderWidth: 1,
    borderRadius: 18,
    backgroundColor: color.background,
    fontSize: 48,
    textAlign: 'center',
    fontWeight: 'bold',
    color: color.text,
  },
});
