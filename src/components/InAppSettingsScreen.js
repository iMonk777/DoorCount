import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
} from 'react-native';
import {color} from '../Styles/colors';
import SettingInput from './SettingsInput';
import SettingsToggle from './SettingsToggle';
import ActionButton from './ActionButton';
import AsyncStorage from '@react-native-community/async-storage';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {set} from 'react-native-reanimated';

export default class InAppSettingsScreen extends Component {
  state = {
    countLimit: 100,
    currentPeople: 0,
    hapticFeedback: true,
    countOverLimit: true,
    isInitialSetting: true,
  };

  getSettings = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('settings');
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      // error reading value
    }
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

  goBack = async () => {
    await this.storeSettings(this.state);
    this.props.navigation.goBack();
  };

  goToCountScreen = () => {
    this.props.navigation.navigate('CountScreen');
  };

  notState = {};

  async componentDidMount() {
    let settings = await this.getSettings();

    settings = {
      ...settings,
      currentPeople: this.props.route.params.currentPeople,
    };
    this.notState = settings;
    this.setState(settings);
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <KeyboardAvoidingView
          behavior={Platform.OS == 'ios' ? 'padding' : null}
          style={styles.container}>
          <SettingInput
            message={'Add a person limit'}
            people={60}
            placeholder={String(this.notState.countLimit)}
            action={(limit) => {
              this.changelimit(limit);
            }}
          />
          <SettingInput
            message={'People currently inside'}
            people={4}
            placeholder={String(this.notState.currentPeople)}
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
              message={'Save'}
              width={wp('40%')}
              height={hp('9%')}
              fontSize={hp('3.5%')}
              action={this.goBack}
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
