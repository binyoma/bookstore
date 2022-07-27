import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import TabNavigator from './navigation/TabNavigator';
import {Provider} from 'react-native-paper';
import Header from './components/Header';

const App = () => {
  return (
    <Provider>
      <NavigationContainer>
        <Header/>
        <TabNavigator />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
