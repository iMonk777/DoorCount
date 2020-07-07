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
import ActionButton from './ActionButton';
import AsyncStorage from '@react-native-community/async-storage';

export default class InitSettingsScreen extends Component {
  state = {
    countLimit: 30,
    currentPeople: 0,
    hapticFeedback: true,
    countOverLimit: true,
    isInitialSetting: true,
    startTime: Date.now(),
  };

  storeSettings = async (settings) => {
    try {
      const jsonValue = JSON.stringify(settings);
      await AsyncStorage.setItem('settings', jsonValue);
    } catch (e) {}
  };

  changelimit = (limit) => {
    this.setState({
      countLimit: Number(limit),
    });
  };

  setCurrentPeople = (people) => {
    this.setState({
      currentPeople: Number(people),
    });
  };
  toggleHapticFeedback = () => {
    this.setState({
      hapticFeedback: !this.state.hapticFeedback,
    });
  };
  toggleCountOverLimit = () => {
    this.setState({
      countOverLimit: !this.state.countOverLimit,
    });
  };

  goBack = () => {
    this.props.navigation.goBack();
  };

  goToCountScreen = async () => {
    await this.storeSettings(this.state);
    this.props.navigation.navigate('CountScreen');
    this.storeEmpty();
  };

  storeEmpty = async () => {
    await AsyncStorage.setItem('counts', JSON.stringify([]));
  };

  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.container}>
          <SettingInput
            message={'Add a person limit'}
            people={60}
            placeholder={'30'}
            action={(limit) => {
              this.changelimit(limit);
            }}
          />
          <SettingInput
            message={'People currently inside'}
            people={4}
            placeholder={'0'}
            action={(people) => {
              this.setCurrentPeople(people);
            }}
          />
          <SettingsToggle
            message={'Haptic feedback'}
            value={this.state.hapticFeedback}
            action={this.toggleHapticFeedback}
          />
          <SettingsToggle
            message={'Allow count over limit'}
            value={this.state.countOverLimit}
            action={this.toggleCountOverLimit}
          />
          <View style={styles.actionButtons}>
            <ActionButton
              message={'Back'}
              width={150}
              height={60}
              fontSize={22}
              action={this.goBack}
            />
            <ActionButton
              message={'Start'}
              width={200}
              height={87}
              fontSize={36}
              action={this.goToCountScreen}
            />
          </View>
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
  actionButtons: {
    flex: 1,
    justifyContent: 'space-evenly',
  },
});
