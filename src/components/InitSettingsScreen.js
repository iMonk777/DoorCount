import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  StatusBar,
  KeyboardAvoidingView,
} from 'react-native';
import {color} from '../Styles/colors';
import SettingInput from './SettingsInput';
import SettingsToggle from './SettingsToggle';
import ActionButton from './ActionButton';
import AsyncStorage from '@react-native-community/async-storage';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {getStatusBarHeight} from 'react-native-status-bar-height';

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
        <KeyboardAvoidingView
          behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
          style={styles.container}>
          <StatusBar barStyle="light-content"></StatusBar>
          <SettingInput
            message={'Add a person limit'}
            placeholder={'30'}
            action={(limit) => {
              this.changelimit(limit);
            }}
          />
          <SettingInput
            message={'People currently inside'}
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
              message={'Start'}
              width={wp('45%')}
              height={hp('10%')}
              fontSize={hp('4.3%')}
              action={this.goToCountScreen}
            />
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.background,
    paddingTop: getStatusBarHeight() + 5,
    paddingHorizontal: 20,
  },
  actionButtons: {
    flex: 1,
    justifyContent: 'space-evenly',
  },
});
