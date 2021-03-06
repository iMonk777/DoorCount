import 'react-native-gesture-handler';
import * as React from 'react';
import {View, StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import InitSettingsScreen from './InitSettingsScreen';
import CountScreen from './CountScreen';
import InAppSettingsScreen from './InAppSettingsScreen';
import ReportScreen from './ReportScreen';
import SplashScreen from './SplashScreen';
import AsyncStorage from '@react-native-community/async-storage';
import {createStore} from 'redux';
import {connect} from 'react-redux';
import {color} from '../Styles/colors';
import {getStatusBarHeight} from 'react-native-status-bar-height';

//Actions
const LOG_IN = 'LOG_IN';
const LOG_OUT = 'LOG_OUT';

//Real Actions
export const logIn = () => ({
  type: LOG_IN,
});
export const logOut = () => ({
  type: LOG_OUT,
});

//Initial State
const initState = {
  isLoggedIn: false,
};

//Reducer
export const LogReducer = (state = initState, action) => {
  switch (action.type) {
    case LOG_IN:
      return {
        isLoggedIn: true,
      };
    case LOG_OUT:
      return {
        isLoggedIn: false,
      };
    default:
      return state;
  }
};

//Export the store
export const configureStore = () => createStore(LogReducer);

const Stack = createStackNavigator();

class HomeScreen extends React.Component {
  state = {
    isLoading: true,
    isLoggedIn: false,
  };

  getLoginState = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('isLoggedIn');
      let isLoggedIn = JSON.parse(jsonValue);

      isLoggedIn == true ? this.props.logIn() : null;
      isLoggedIn == true
        ? this.setState({
            isLoading: false,
          })
        : this.setState({
            isLoading: false,
          });
    } catch (e) {
      console.log(e);
    }
  };

  async componentDidMount() {
    await setTimeout(this.getLoginState, 800);
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          paddingTop: getStatusBarHeight() + 5,
          backgroundColor: color.background,
        }}>
        {this.state.isLoading ? (
          <SplashScreen></SplashScreen>
        ) : (
          <NavigationContainer>
            <StatusBar
              barStyle="light-content"
              backgroundColor={color.background}></StatusBar>
            {this.props.isLoggedIn == true ? (
              <Stack.Navigator initialRouteName="CountScreen">
                <Stack.Screen
                  name="CountScreen"
                  component={CountScreen}
                  options={{headerShown: false}}
                />
                <Stack.Screen
                  name="InAppSettings"
                  component={InAppSettingsScreen}
                  options={{headerShown: false}}
                />
                <Stack.Screen
                  name="ReportScreen"
                  component={ReportScreen}
                  options={{headerShown: false}}
                />
              </Stack.Navigator>
            ) : (
              <Stack.Navigator initialRouteName="InitSettings">
                <Stack.Screen
                  name="InitSettings"
                  component={InitSettingsScreen}
                  options={{headerShown: false}}
                />
              </Stack.Navigator>
            )}
          </NavigationContainer>
        )}
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
    logIn: () => dispatch(logIn()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
