import React, {Component} from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import {color} from '../Styles/colors';
import ActionButton from './ActionButton';
import AsyncStorage from '@react-native-community/async-storage';
import {SlideAreaChart} from 'react-native-slide-charts';
import ReportInfo from './ReportInfo';

export default class ReportScreen extends Component {
  state = {
    counts: [],
    numberOfTicks: 0,
    interval: 0,
    maxPeopleInside: 0,
    totalCountedPeople: 0,
    busiestTime: '--:--',
    averagePeopleInside: 0,
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
      return await parsedCounts;
    } catch (e) {
      console.log(e);
    }
  };

  // Did mount <--------------
  async componentDidMount() {
    let counts = await this.getCounts();
    let peopleCountList = counts.map((o) => {
      return o.y;
    });

    let maxCount = Math.max.apply(Math, peopleCountList);

    let averagePeople = Math.round(
      peopleCountList.reduce(function (a, b) {
        return a + b;
      }, 0) / counts.length,
    );

    let busiestTimeStamp =
      counts[counts.findIndex((o) => o.y == maxCount)].timeStamp;

    let busiestTimeHour = await String(new Date(busiestTimeStamp).getHours());
    let busiestTimeMinute = await String(
      new Date(busiestTimeStamp).getMinutes(),
    );
    Number(busiestTimeHour) < 10
      ? (busiestTimeHour = '0' + busiestTimeHour)
      : null;
    Number(busiestTimeMinute) < 10
      ? (busiestTimeMinute = '0' + busiestTimeMinute)
      : null;

    let busiestTime = `${busiestTimeHour}:${busiestTimeMinute}`;

    let newPeople = [];
    for (let i = 1; i < counts.length; i++) {
      if (counts[i].y > counts[i - 1].y) {
        newPeople.push(counts[i].y - counts[i - 1].y);
      }
    }
    let totalCountedPeople = newPeople.reduce((a, b) => a + b, 0) + 1;

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
        maxPeopleInside: maxCount,
        totalCountedPeople: totalCountedPeople,
        busiestTime: busiestTime,
        averagePeopleInside: averagePeople,
      });
    }
  }

  createGraphMarker = (position) => {
    let hour = String(
      new Date(
        this.state.counts[
          Math.round((this.state.counts.length - 1) * position)
        ].timeStamp,
      ).getHours(),
    );
    Number(hour) < 10 ? (hour = '0' + hour) : null;

    let minute = String(
      new Date(
        this.state.counts[
          Math.round((this.state.counts.length - 1) * position)
        ].timeStamp,
      ).getMinutes(),
    );
    Number(minute) < '10' ? (minute = '0' + minute) : null;

    let time = `${hour}:${minute}`;
    return time;
  };

  render() {
    return (
      <View style={styles.container}>
        <SlideAreaChart
          // Average people by time
          scrollable
          style={{
            marginTop: 15,
            backgroundColor: color.text,
            borderRadius: 18,
            marginBottom: 8,
            alignSelf: 'center',
          }}
          chartLineColor={color.actionButton}
          shouldCancelWhenOutside={false}
          width={Dimensions.get('window').width - 36}
          height={200}
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
        <View style={styles.reportInfoContainer}>
          <ReportInfo
            message={'Max people inside'}
            value={this.state.maxPeopleInside}
          />
          <ReportInfo
            message={'Total counted people'}
            value={this.state.totalCountedPeople}
          />
        </View>
        <View style={styles.reportInfoContainer}>
          <ReportInfo message={'Busiest time'} value={this.state.busiestTime} />
          <ReportInfo
            message={'Average people inside'}
            value={this.state.averagePeopleInside}
          />
        </View>
        <View style={styles.reportInfoContainer}>
          <ReportInfo
            message={'First custommer'}
            value={
              this.state.counts.length > 0 ? this.createGraphMarker(0) : '--:--'
            }
          />
          <ReportInfo
            message={'Last custommer'}
            value={
              this.state.counts.length > 0 ? this.createGraphMarker(1) : '--:--'
            }
          />
        </View>
        <View style={styles.actionButtonContainer}>
          <ActionButton
            message={'Back'}
            width={150}
            height={60}
            fontSize={22}
            action={this.goBack}
          />
        </View>
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
    paddingHorizontal: 10,
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  lineChart: {
    height: 300,
    width: '100%',
    backgroundColor: color.actionButton,
    borderRadius: 18,
    justifyContent: 'flex-end',
  },
  reportInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButtonContainer: {
    // borderWidth: 1,
    flex: 1,
    justifyContent: 'flex-end',
  },
});
