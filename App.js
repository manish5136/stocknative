import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import DrawerNavigator from './allComponents/DrawerNavigator';
import { AuthProvider } from './allComponents/AuthContext';
import { Provider } from 'react-redux';
import store from './reduxComponents/store';

const App = () => {
  return (
    <Provider store={store}>
      <AuthProvider>
        <NavigationContainer>
          <DrawerNavigator />
        </NavigationContainer>
      </AuthProvider>
    </Provider>
  );
};

export default App;
