import React, {Component} from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import {color} from '../Styles/colors';
import ActionButton from './ActionButton';
import AsyncStorage from '@react-native-community/async-storage';
import {SlideAreaChart} from 'react-native-slide-charts';
import * as shape from 'd3-shape';
import ReportInfo from './ReportInfo';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

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
    } catch (e) {}
  };

  // Did mount <--------------
  async componentDidMount() {
    let counts = await this.getCounts();

    if (counts.length > 0) {
      let peopleCountList = counts.map((o) => {
        return o.y;
      });

      let maxCount = Math.max.apply(Math, peopleCountList);

      let averagePeople = Math.round(
        peopleCountList.reduce(function (a, b) {
          return a + b;
        }, 0) / counts.length,
      );

      let busiestTimeStamp = await counts[
        counts.findIndex((o) => o.y == maxCount)
      ].timeStamp;

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
          numberOfTicks: maxCount,
          interval: interval,
          maxPeopleInside: maxCount,
          totalCountedPeople: totalCountedPeople,
          busiestTime: busiestTime,
          averagePeopleInside: averagePeople,
        });
      }
    }
  }

  lerp = (x, y, a) => x * (1 - a) + y * a;

  createGraphMarker = (position) => {
    let markerTimeStamp = new Date(
      Math.round(
        this.lerp(
          this.state.counts[0].timeStamp,
          this.state.counts[this.state.counts.length - 1].timeStamp,
          position,
        ),
      ),
    );

    let hour = String(markerTimeStamp.getHours());
    Number(hour) < 10 ? (hour = '0' + hour) : null;

    let minute = String(markerTimeStamp.getMinutes());
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
          // height={200}
          height={hp('30%')}
          data={this.state.counts}
          axisWidth={40}
          axisHeight={40}
          paddingBottom={0}
          curveType={shape.curveLinear}
          cursorProps={{
            cursorMarkerHeight: 24,
          }}
          toolTipProps={{
            backgroundColor: 'red',
          }}
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
            message={'Total people counted'}
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
            width={wp('40%')}
            height={hp('9%')}
            fontSize={hp('3.5%')}
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
    paddingBottom: 20,
    paddingHorizontal: 10,
    paddingTop: 10,
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  reportInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButtonContainer: {
    flex: 1,
    justifyContent: 'center',
  },
});
