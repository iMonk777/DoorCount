/**
 * @format
 */
import * as React from 'react';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {Provider} from 'react-redux';
import {configureStore} from './src/components/HomeScreen';

const store = configureStore();

const ReduxApp = () => {
  return (
    <Provider store={store}>
      <App></App>
    </Provider>
  );
};

AppRegistry.registerComponent(appName, () => ReduxApp);
// AppRegistry.registerComponent(appName, () => App);
