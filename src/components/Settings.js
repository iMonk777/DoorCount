import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {color} from '../Styles/colors';

export default class Settings extends Component {
  render() {
    return (
      <View>
        <Text> textInComponent </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  home: {
    flex: 1,
    backgroundColor: color.background,
    paddingTop: 50,
    paddingHorizontal: 20,
  },
});
