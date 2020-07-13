import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {color} from '../Styles/colors';
import {Icon} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default function CountDisplay({
  counter,
  limit,
  showExitMenu,
  storeCountsToAsync,
}) {
  const counterStyles = StyleSheet.create({
    counter: {
      color:
        counter < limit * 0.8
          ? color.countHappy
          : counter > limit
          ? color.countSad
          : color.countNeutral,
      fontSize: hp('15%'),
      textAlign: 'center',
    },
  });

  const navigation = useNavigation();

  const navigateToReport = async () => {
    await storeCountsToAsync();
    navigation.navigate('ReportScreen');
  };

  return (
    <View style={styles.container}>
      <View style={styles.settingsAndGraph}>
        <TouchableOpacity
          style={styles.topIconContainer}
          onPress={showExitMenu}>
          <Icon
            style={styles.exitIcon}
            name={'exit-run'}
            type={'MaterialCommunityIcons'}
          />
        </TouchableOpacity>
        <View style={styles.topIconContainer}>
          {counter >= limit * 0.8 ? (
            <View>
              <Icon
                style={styles.limitIcon}
                name={'triangle'}
                type={'Feather'}
              />
              <Text style={styles.limitText}>{limit}</Text>
            </View>
          ) : null}
        </View>
      </View>

      <Text style={counterStyles.counter}>{counter}</Text>
      <View style={styles.settingsAndGraph}>
        <TouchableOpacity
          style={styles.bottomIconContainer}
          onPress={navigateToReport}>
          <Icon style={styles.icon} name={'graph'} type={'SimpleLineIcons'} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.bottomIconContainer}
          onPress={() => {
            navigation.navigate('InAppSettings', {currentPeople: counter});
          }}>
          <Icon style={styles.icon} name={'md-settings'} type={'Ionicons'} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.background,
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: wp('5%'),
  },
  bottomIconContainer: {
    alignSelf: 'flex-end',
    height: hp('10%'),
    justifyContent: 'flex-end',
  },
  topIconContainer: {
    alignSelf: 'flex-end',
    height: hp('10%'),
    justifyContent: 'center',
  },
  settingsAndGraph: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  icon: {
    color: color.text,
    fontSize: hp('5.5%'),
  },
  exitIcon: {
    color: color.text,
    fontSize: hp('5.5%'),
    transform: [{rotateY: '180deg'}],
  },
  limitIcon: {
    color: color.countSad,
    fontSize: hp('9%'),
    alignSelf: 'center',
  },
  limitText: {
    position: 'absolute',
    bottom: '25%',
    color: color.text,
    alignSelf: 'center',
    fontSize: hp('2%'),
    fontWeight: 'bold',
  },
});
