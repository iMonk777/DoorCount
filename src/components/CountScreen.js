import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import ActionButton from './ActionButton';
import {color} from '../Styles/colors';
import CountDisplay from './CountDisplay';

export default class CountScreen extends Component {
  state = {
    counter: 0,
  };

  countUp = () => {
    this.setState({
      counter: this.state.counter + 1,
    });
  };

  countDown = () => {
    this.state.counter === 0
      ? null
      : this.setState({
          counter: this.state.counter - 1,
        });
  };

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
        <CountDisplay message={this.state.counter} />
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
