import 'react-native-gesture-handler';
import * as React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import InitSettingsScreen from './InitSettingsScreen';
import CountScreen from './CountScreen';
import InAppSettingsScreen from './InAppSettingsScreen';
import ReportScreen from './ReportScreen';
import SplashScreen from './SplashScreen';
import AsyncStorage from '@react-native-community/async-storage';
import {createStore, combineReducers} from 'redux';
import {connect} from 'react-redux';

// function counter(state = 0, action) {
//   switch (action.type) {
//     case 'INCREMENT':
//       return state + 1;
//     case 'DECREMENT':
//       return state - 1;
//     default:
//       return state;
//   }
// }

// export const store = createStore(counter);

// store.subscribe(() => console.log(store.getState()));

// store.dispatch({type: 'INCREMENT'});
// store.dispatch({type: 'INCREMENT'});
// store.dispatch({type: 'DECREMENT'});

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

  testVar = () => {
    console.warn('it works');
  };

  async componentDidMount() {
    try {
      const jsonValue = await AsyncStorage.getItem('isLoggedIn');
      let isLoggedIn = JSON.parse(jsonValue);
      console.log('this is the log state: ', isLoggedIn);

      isLoggedIn == true
        ? this.setState({
            isLoading: false,
          })
        : this.setState({
            isLoading: false,
          });

      isLoggedIn == true ? this.props.logIn() : null;
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    console.log('these are the props', this.props);
    return this.state.isLoading ? (
      <SplashScreen></SplashScreen>
    ) : (
      <NavigationContainer>
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
    );
  }
}

const mapStateToProps = (state) => {
  console.log(state);
  return {
    isLoggedIn: state.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logIn: () => dispatch(logIn()),
  };
};

// export default HomeScreen;
export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);

const styles = StyleSheet.create({
  home: {
    flex: 1,
    // backgroundColor: color.background,
    paddingTop: 50,
    paddingHorizontal: 20,
  },
});
