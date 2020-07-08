import React, {Component} from 'react';
import {Text, View, StyleSheet, Vibration} from 'react-native';
import ActionButton from './ActionButton';
import {color} from '../Styles/colors';
import CountDisplay from './CountDisplay';
import AsyncStorage from '@react-native-community/async-storage';
import {useIsFocused} from '@react-navigation/native';
import ExitMenu from './ExitMenu';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {getStatusBarHeight} from 'react-native-status-bar-height';

export default class CountScreen extends Component {
  state = {
    countLimit: 30,
    currentPeople: 0,
    hapticFeedback: true,
    countOverLimit: true,
    isInitialSetting: true,
    records: [],
    startTime: null,
    isExit: false,
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
    this.counts.length == 5 ? this.storeCountsToAsync() : null;
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

  countUp = async () => {
    if (
      (this.state.countOverLimit == false &&
        this.state.currentPeople >= this.state.countLimit) ||
      this.state.currentPeople == 9999
    ) {
      return;
    }
    this.state.hapticFeedback == true ? Vibration.vibrate(50) : null;
    await this.setState({
      currentPeople: this.state.currentPeople + 1,
    });
    this.storeToCountsArray();
  };

  countDown = async () => {
    if (this.state.currentPeople === 0) {
      return;
    }
    this.state.hapticFeedback == true ? Vibration.vibrate(50) : null;
    await this.setState({
      currentPeople: this.state.currentPeople - 1,
    });
    this.storeToCountsArray();
  };

  getSettings = async (shouldSetState) => {
    try {
      const jsonValue = await AsyncStorage.getItem('settings');
      let settings = JSON.parse(jsonValue);
      shouldSetState == true ? this.setState(settings) : null;

      return settings;
    } catch (e) {
      console.log(e);
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

  showExitMenu = () => {
    this.setState({
      isExit: true,
    });
  };

  hideExitMenu = () => {
    this.setState({
      isExit: false,
    });
  };

  goToHomeScreen = () => {
    this.props.navigation.navigate('InitSettings');
    this.storeEmpty();
  };

  storeEmpty = async () => {
    await AsyncStorage.setItem('counts', JSON.stringify([]));
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
        {this.state.isExit == true ? (
          <ExitMenu
            hideExitMenu={this.hideExitMenu}
            goToHomeScreen={this.goToHomeScreen}
          />
        ) : (
          <ActionButton
            message={'+'}
            width={'100%'}
            height={hp('20%')}
            fontSize={hp('10%')}
            action={this.countUp}
          />
        )}

        <CountDisplay
          counter={this.state.currentPeople}
          limit={this.state.countLimit}
          showExitMenu={this.showExitMenu}
        />
        <ActionButton
          message={'-'}
          width={'100%'}
          height={hp('20%')}
          fontSize={hp('10%')}
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
    paddingTop: getStatusBarHeight() + 5,
    paddingBottom: 20,
    paddingHorizontal: 20,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
});
