import React, {Component} from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import {color} from '../Styles/colors';
import ActionButton from './ActionButton';
import AsyncStorage from '@react-native-community/async-storage';
import {SlideAreaChart} from 'react-native-slide-charts';

export default class ReportScreen extends Component {
  state = {
    counts: [],
    numberOfTicks: 0,
    interval: 0,
  };

  goBack = async () => {
    this.props.navigation.goBack();
    // this.storeEmpty();
  };

  storeEmpty = async () => {
    await AsyncStorage.setItem('counts', JSON.stringify([]));
  };

  getCounts = async () => {
    try {
      const jsonCounts = await AsyncStorage.getItem('counts');
      const parsedCounts = jsonCounts != null ? JSON.parse(jsonCounts) : null;
      console.log('this is from report', parsedCounts);
      console.log(parsedCounts);

      return await parsedCounts;
    } catch (e) {
      console.log(e);
    }
  };

  logState = () => {
    console.log('count state is:', this.state.counts);
  };

  async componentDidMount() {
    let counts = await this.getCounts();
    let maxCount = Math.max.apply(
      Math,
      counts.map(function (o) {
        return o.y;
      }),
    );

    let interval;
    if (maxCount <= 10) {
      interval = 1;
    } else if (maxCount <= 30 && maxCount > 10) {
      interval = 2;
    } else if (maxCount <= 50 && maxCount > 30) {
      interval = 5;
    } else if (maxCount <= 100 && maxCount > 50) {
      interval = 10;
    } else if (maxCount <= 200 && maxCount > 100) {
      interval = 20;
    } else if (maxCount <= 500 && maxCount > 200) {
      interval = 50;
    } else if (maxCount <= 1000 && maxCount > 500) {
      interval = 100;
    } else {
      interval = 1000;
    }

    if (typeof counts === 'object' && counts.length !== 0) {
      this.setState({
        counts: counts,
        numberOfTicks: maxCount / 2,
        interval: interval,
      });
    }
  }

  createGraphMarker = (position) => {
    let time =
      String(
        new Date(
          this.state.counts[
            Math.round((this.state.counts.length - 1) * position)
          ].timeStamp,
        ).getHours(),
      ) +
      ':' +
      String(
        new Date(
          this.state.counts[
            Math.round((this.state.counts.length - 1) * position)
          ].timeStamp,
        ).getMinutes(),
      );
    return time;
  };

  getNumberOfTicks = () => {
    let maxCount = null;
  };

  render() {
    return (
      <View style={styles.container}>
        <SlideAreaChart
          // Average people by time
          scrollable
          style={{
            marginTop: 32,
            backgroundColor: color.text,
            borderRadius: 18,
          }}
          chartLineColor={color.actionButton}
          shouldCancelWhenOutside={false}
          width={Dimensions.get('window').width - 40}
          height={300}
          data={this.state.counts}
          axisWidth={40}
          axisHeight={40}
          paddingBottom={0}
          yAxisProps={{
            interval: this.state.interval,
            verticalLineWidth: 1,
            axisLabel: 'People',
            axisLabelAlignment: 'middle',
            rotateAxisLabel: true,
            numberOfTicks: this.state.numberOfTicks,
            labelLeftOffset: 10,
          }}
          xAxisProps={{
            axisMarkerLabels:
              this.state.counts.length > 1
                ? [
                    this.createGraphMarker(0),
                    this.createGraphMarker(0.25),
                    this.createGraphMarker(0.5),
                    this.createGraphMarker(0.75),
                    this.createGraphMarker(1),
                  ]
                : [],
            axisLabelAlignment: 'middle',
            axisLabel: 'Time',
            labelBottomOffset: 20,
          }}
          toolTipProps={{
            toolTipTextRenderers: [
              ({scaleY, y}) => ({
                text: scaleY.invert(y).toFixed(1).toString(),
              }),
            ],
          }}
        />
        <ActionButton
          message={'Back'}
          width={150}
          height={60}
          fontSize={22}
          action={this.goBack}
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
  lineChart: {
    height: 300,
    width: '100%',
    backgroundColor: color.actionButton,
    borderRadius: 18,
    justifyContent: 'flex-end',
    // textSize: 50,
  },
});
