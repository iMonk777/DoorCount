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
    records: [],
    startTime: null,
  };

  counts = [];

  storeToCountsArray = () => {
    this.counts = [
      ...this.counts,
      {
        x: Math.round((Date.now() - this.state.startTime) / 100),
        y: this.state.currentPeople,
        timeStamp: Date.now(),
      },
    ];
    // console.warn(this.counts);
  };

  storeCountsToAsync = async () => {
    let storedAsyncCounts = [];
    try {
      const jsonCounts = await AsyncStorage.getItem('counts');
      storedAsyncCounts = jsonCounts == null ? [] : JSON.parse(jsonCounts);
    } catch (e) {
      console.log(e);
    }

    storedAsyncCounts = [...storedAsyncCounts, ...this.counts];

    try {
      const jsonCounts = JSON.stringify(storedAsyncCounts);
      await AsyncStorage.setItem('counts', jsonCounts);
      this.counts = [];
    } catch (e) {
      console.log(e);
    }
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
    this.storeToCountsArray();
    this.counts.length == 5 ? this.storeCountsToAsync() : null;
  };

  countDown = () => {
    if (this.state.currentPeople === 0) {
      return;
    }
    this.state.hapticFeedback == true ? Vibration.vibrate(50) : null;
    this.setState({
      currentPeople: this.state.currentPeople - 1,
    });
    this.storeToCountsArray();
    this.counts.length == 5 ? this.storeCountsToAsync() : null;
  };

  getSettings = async (shouldSetState) => {
    try {
      const jsonValue = await AsyncStorage.getItem('settings');
      let settings = JSON.parse(jsonValue);
      shouldSetState == true ? this.setState(settings) : null;

      return settings;
    } catch (e) {
      // error reading value
    }
  };

  storePeople = async () => {
    let settings = await this.getSettings(false);
    try {
      const jsonValue = JSON.stringify({
        ...settings,
        currentPeople: this.state.currentPeople,
      });
      await AsyncStorage.setItem('settings', jsonValue);
    } catch (e) {}
  };

  onFocusHandler = () => {
    this.getSettings(true);
  };
  onBlurHandler = () => {
    this.storePeople();
  };

  async componentDidMount() {
    this.focusListener = this.props.navigation.addListener('focus', () => {
      this.onFocusHandler();
    });
    this.focusListener = this.props.navigation.addListener('blur', () => {
      this.onBlurHandler();
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
