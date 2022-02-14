import React, { useEffect, useState } from "react";
import {
  StatusBar,
  TextInput,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Button,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import CalculateScreen from "./Screens/CalculateScreen";
import customData from "./assets/2021.json";
import test from "./assets/test.json";

const Drawer = createDrawerNavigator();

const App = () => {
  let dict = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
    8: 0,
    9: 0,
    10: 0,
    11: 0,
    12: 0,
  };

  useEffect(() => {
    for (const paymentRecord of customData) {
      if (paymentRecord?.partnerAccount?.number === "2001337368") {
        // Alert('run');
        let date = parseInt(paymentRecord.booking.split("-")[1]);
        dict[date] = paymentRecord.amount.value;
        // Alert.alert(JSON.stringify(dict[date]));
      }
    }

    for (var i = 1; i <=12; i++ ) {
      Alert.alert(i + ' ' + JSON.stringify(dict[i]));
    }
  }, []);

  return (
    <NavigationContainer>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content"></StatusBar>
        <Drawer.Navigator initialRouteName="Year2020">
          <Drawer.Screen
            name="Year2020"
            component={CalculateScreen}
            initialParams={{ year: 2020, incomeInEachMonth: dict }}
          />
          <Drawer.Screen
            name="Year2021"
            component={CalculateScreen}
            initialParams={{ year: 2021 }}
          />
          <Drawer.Screen
            name="Year2022"
            component={CalculateScreen}
            initialParams={{ year: 2022 }}
          />
        </Drawer.Navigator>
      </SafeAreaView>
    </NavigationContainer>
  );
};

const MoneyMonthScreen = () => {
  return (
    <View style={{ flex: 1, backgroundColor: "red", textAlign: "center" }}>
      <Text> Test</Text>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textInput: {},
});
