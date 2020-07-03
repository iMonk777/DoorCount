import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {color} from '../Styles/colors';
import {Icon} from 'native-base';
import {useNavigation} from '@react-navigation/native';

export default function CountDisplay({counter, limit}) {
  const counterStyles = StyleSheet.create({
    counter: {
      color:
        counter < limit * 0.8
          ? color.countHappy
          : counter > limit
          ? color.countSad
          : color.countNeutral,
      fontSize: 144,
      textAlign: 'center',
    },
  });

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        {counter >= limit * 0.8 ? (
          <View>
            <Icon style={styles.limitIcon} name={'triangle'} type={'Feather'} />
            <Text style={styles.limitText}>{limit}</Text>
          </View>
        ) : null}
      </View>

      <Text style={counterStyles.counter}>{counter}</Text>
      <View style={styles.settingsAndGraph}>
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => {
            navigation.navigate('ReportScreen');
          }}>
          <Icon style={styles.icon} name={'graph'} type={'SimpleLineIcons'} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.iconContainer}
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
    // borderWidth: 2,
    // borderColor: 'white',
    padding: 20,
  },
  iconContainer: {
    // borderWidth: 3,
    // borderColor: 'red',
    alignSelf: 'flex-end',
    height: 90,
    justifyContent: 'flex-end',
  },
  settingsAndGraph: {
    // borderWidth: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  icon: {
    color: color.text,
    fontSize: 50,
    alignSelf: 'flex-end',
  },
  limitIcon: {
    color: color.countSad,
    fontSize: 80,
    alignSelf: 'center',
  },
  limitText: {
    position: 'absolute',
    bottom: '30%',
    color: color.text,
    alignSelf: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
