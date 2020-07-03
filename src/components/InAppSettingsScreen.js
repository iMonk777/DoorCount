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

  goHome = () => {
    this.props.navigation.navigate('Home');
  };

  async componentDidMount() {
    let settings = await this.getSettings();

    settings = {
      ...settings,
      currentPeople: this.props.route.params.currentPeople,
    };

    this.setState(settings);
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.container}>
          <SettingInput
            message={'Add a person limit'}
            people={60}
            placeholder={String(this.state.countLimit)}
            action={(limit) => {
              this.changelimit(limit);
            }}
          />
          <SettingInput
            message={'People currently inside'}
            people={4}
            placeholder={String(this.state.currentPeople)}
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
              width={150}
              height={60}
              fontSize={22}
              action={this.goBack}
            />
            <ActionButton
              message={'Exit'}
              width={200}
              height={87}
              fontSize={36}
              action={this.goHome}
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
