import React, {Component} from 'react';
import {Text, View, StyleSheet, Vibration} from 'react-native';
import ActionButton from './ActionButton';
import {color} from '../Styles/colors';
import CountDisplay from './CountDisplay';
import AsyncStorage from '@react-native-community/async-storage';
import {useIsFocused} from '@react-navigation/native';

export default class CountScreen extends Component {
  state = {
    countLimit: 30,
    currentPeople: 0,
    hapticFeedback: true,
    countOverLimit: true,
    isInitialSetting: true,
  };

  countUp = () => {
    if (
      this.state.countOverLimit == false &&
      this.state.currentPeople >= this.state.countLimit
    ) {
      return;
    }
    this.state.hapticFeedback == true ? Vibration.vibrate(50) : null;
    this.setState({
      currentPeople: this.state.currentPeople + 1,
    });
  };

  countDown = () => {
    this.state.hapticFeedback == true ? Vibration.vibrate(50) : null;
    this.state.currentPeople === 0
      ? null
      : this.setState({
          currentPeople: this.state.currentPeople - 1,
        });
  };

  getSettings = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('settings');
      let settings = JSON.parse(jsonValue);
      this.setState(settings);
    } catch (e) {
      // error reading value
    }
  };

  onFocusHandler = () => {
    this.getSettings();
  };

  async componentDidMount() {
    // this.getSettings();
    this.focusListener = this.props.navigation.addListener('focus', () => {
      this.onFocusHandler();
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <ActionButton
          message={'+'}
          width={'100%'}
          height={186}
          fontSize={72}
          action={this.countUp}
        />
        <CountDisplay
          counter={this.state.currentPeople}
          limit={this.state.countLimit}
        />
        <ActionButton
          message={'-'}
          width={'100%'}
          height={186}
          fontSize={72}
          action={this.countDown}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.background,
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
});
