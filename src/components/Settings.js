import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {color} from '../Styles/colors';
import SettingInput from './SettingsInput';
import SettingsToggle from './SettingsToggle';

export default class Settings extends Component {
  state = {
    countLimit: 100,
    currentPeople: 0,
    soundFeedback: true,
    buttonCount: true,
    countOverLimit: true,
  };
  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.container}>
          <SettingInput
            message={'Add a person limit'}
            people={60}
            placeholder={'100'}></SettingInput>
          <SettingInput
            message={'People currently inside'}
            people={4}
            placeholder={'0'}></SettingInput>
          <SettingsToggle message={'Sound feedback'}></SettingsToggle>
          <SettingsToggle
            message={'Count using volume buttons'}></SettingsToggle>
          <SettingsToggle message={'Allow count over limit'}></SettingsToggle>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.background,
    paddingTop: 50,
    paddingHorizontal: 20,
  },
});
