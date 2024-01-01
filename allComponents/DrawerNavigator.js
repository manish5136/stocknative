import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import { Button } from 'react-native';
import Home from './Home';
import ContactUs from './ContactUs';
import Login from './Login';
import AboutUs from './AboutUs';
import MyDashboard from './MyDashboard';
import RealTimeStockData from './RealTimeStockData';
import StockDataChart from './StockDataChart';
import Register from './Register';
import FavoriteChart from './FavoriteChart';
import { useAuth } from './AuthContext';

const Drawer = createDrawerNavigator();

const CustomDrawerContent = (props) => {
  const { isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    // Perform logout actions here (e.g., clear tokens, reset state)
    logout();
    // Handle navigation to login or any other screen after logout
    // For example, navigation.navigate('Login');
  };

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      {isAuthenticated && (
        <View style={{ marginHorizontal: 16, marginTop: 10 }}>
          <Button title="Logout" onPress={handleLogout} />
        </View>
      )}
    </DrawerContentScrollView>
  );
};


const DrawerNavigator = () => {
  const { isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <Drawer.Navigator initialRouteName="Home" >
      <Drawer.Screen
        name="Home"
        component={Home}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />

      {!isAuthenticated && (
        <Drawer.Screen
          name="Register"
          component={Register}
          options={{
            drawerIcon: ({ color, size }) => (
              <Ionicons name="person-add-outline" size={size} color={color} />
            ),
          }}
        />
      )}

      {isAuthenticated && (
        <Drawer.Screen
          name="Market Pulse"
          component={RealTimeStockData}
          options={{
            drawerIcon: ({ color, size }) => (
              <Ionicons name="pulse-outline" size={size} color={color} />
            ),
          }}
        />
      )}

      {isAuthenticated && (
        <Drawer.Screen
          name="My Dashboard"
          component={MyDashboard}
          options={{
            drawerIcon: ({ color, size }) => (
              <Ionicons name="apps-outline" size={size} color={color} />
            ),
          }}
        />
      )}

      {isAuthenticated && (
        <Drawer.Screen
          name="All Stocks Chart"
          component={StockDataChart}
          options={{
            drawerIcon: ({ color, size }) => (
              <Ionicons name="stats-chart-outline" size={size} color={color} />
            ),
          }}
        />
      )}

      {isAuthenticated && (
        <Drawer.Screen
          name="Favorite Stocks Chart"
          component={FavoriteChart}
          options={{
            drawerIcon: ({ color, size }) => (
              <Ionicons name="stats-chart-outline" size={size} color={color} />
            ),
          }}
        />
      )}

      <Drawer.Screen
        name="About Us"
        component={AboutUs}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="information-circle-outline" size={size} color={color} />
          ),
        }}
      />

      <Drawer.Screen
        name="Contact Us"
        component={ContactUs}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="mail-outline" size={size} color={color} />
          ),
        }}
      />

      {!isAuthenticated &&
        <Drawer.Screen
          name="Login"
          component={Login}
          options={{
            drawerIcon: ({ color, size }) => (
              <Ionicons name="log-in-outline" size={size} color={color} />
            ),
          }}
        />}

      {isAuthenticated && (
        <Drawer.Screen
          name="Logout"
          options={{
            drawerIcon: ({ color, size }) => (
              <Ionicons name="log-out-outline" size={size} color={color} />
            ),
          }}
          component={() => <Button title="Logout" onPress={handleLogout} />}
        />
      )}

      <Drawer.Screen
        name="Stock Market Pulse"
        component={RealTimeStockData} // Replace with your desired component
        options={{ drawerLabel: () => null }} // Hide the label in the drawer
      />
    </Drawer.Navigator>

  );
};

export default DrawerNavigator;
