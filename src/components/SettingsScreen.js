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

export default class Settings extends Component {
  state = {
    countLimit: 100,
    currentPeople: 0,
    soundFeedback: true,
    volumeCount: true,
    countOverLimit: true,
  };

  changelimit = (limit) => {
    this.setState({
      countLimit: limit,
    });
  };

  setCurrentPeople = (people) => {
    this.setState({
      currentPeople: people,
    });
  };
  toggleSoundFeedback = () => {
    this.setState({
      soundFeedback: !this.state.soundFeedback,
    });
  };
  toggleVolumeCount = () => {
    this.setState({
      volumeCount: !this.state.volumeCount,
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

  goToCountScreen = () => {
    this.props.navigation.navigate('CountScreen');
  };

  startCount = () => {};

  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.container}>
          <SettingInput
            message={'Add a person limit'}
            people={60}
            placeholder={'100'}
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
            message={'Sound feedback'}
            value={this.state.soundFeedback}
            action={this.toggleSoundFeedback}
          />
          <SettingsToggle
            message={'Count using volume buttons'}
            value={this.state.volumeCount}
            action={this.toggleVolumeCount}
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
