import React, {Component} from 'react';
import {View, StyleSheet, Vibration} from 'react-native';
import ActionButton from './ActionButton';
import {color} from '../Styles/colors';
import CountDisplay from './CountDisplay';
import AsyncStorage from '@react-native-community/async-storage';
import ExitMenu from './ExitMenu';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {connect} from 'react-redux';
import {logOut} from './HomeScreen';

class CountScreen extends Component {
  state = {
    countLimit: 30,
    currentPeople: 0,
    hapticFeedback: true,
    countOverLimit: true,
    isInitialSetting: true,
    startTime: null,
    isExit: false,
    oneHanded: true,
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

  goToHomeScreen = async () => {
    await AsyncStorage.setItem('isLoggedIn', JSON.stringify(false));
    this.storeEmpty();
    this.props.logOut();
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

    this.blurListener = this.props.navigation.addListener('blur', () => {
      this.onBlurHandler();
    });
  }

  async componentWillUnmount() {
    console.log(this.state);
    const jsonSettings = JSON.stringify(this.state);
    await AsyncStorage.setItem('settings', jsonSettings);
  }

  render() {
    return this.state.oneHanded == true ? (
      <View style={styles.container}>
        <CountDisplay
          counter={this.state.currentPeople}
          limit={this.state.countLimit}
          showExitMenu={this.showExitMenu}
          storeCountsToAsync={this.storeCountsToAsync}
        />
        {this.state.isExit == true ? (
          <ExitMenu
            hideExitMenu={this.hideExitMenu}
            goToHomeScreen={this.goToHomeScreen}
            oneHanded={this.state.oneHanded}
          />
        ) : (
          <ActionButton
            message={'+'}
            width={'100%'}
            height={hp('20%')}
            fontSize={hp('10%')}
            action={this.countUp}
            oneHanded={this.state.oneHanded}
          />
        )}
        <ActionButton
          message={'-'}
          width={'100%'}
          height={hp('20%')}
          fontSize={hp('10%')}
          action={this.countDown}
          oneHanded={this.state.oneHanded}
        />
      </View>
    ) : (
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
          storeCountsToAsync={this.storeCountsToAsync}
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

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logOut: () => dispatch(logOut()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CountScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.background,
    paddingBottom: 20,
    paddingHorizontal: 20,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
});
