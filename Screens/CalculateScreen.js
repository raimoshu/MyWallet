import React, { useEffect, useState, useCallback } from "react";
import {
  SafeAreaView,
  TextInput,
  Button,
  Alert,
  TouchableOpacity,
} from "react-native";
import WalletPropertyText from "../WalletPropertyText";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Picker } from "@react-native-picker/picker";

const CalculateScreen = ({ navigation, route }) => {
  const [selectedMonth, setSelectedMonth] = useState();

  const {year, incomeInEachMonth }  = route.params;
  Alert.alert(JSON.stringify(incomeInEachMonth[10]));
  // useEffect(() => {
  //   const firstLoad = async () => {
  //     try {
  //       const jsonValue = await AsyncStorage.getItem(
  //         "@IncomeAmount_" + JSON.stringify(year)
  //       );
  //       setAmount(JSON.parse(jsonValue));
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  //   firstLoad();
  // }, []);

  const [amount, setAmount] = useState(0);

  const dph = (amount * 21) / 121;
  const amountWithoutTax = amount - dph;
  const netProfit = amountWithoutTax * 0.4;
  const taxBase = amountWithoutTax * 0.4 * 0.5;
  const vzp = taxBase * 0.135;
  const ossz = taxBase * 0.292;
  const dan = netProfit * 0.21 - 2320;
  const afterTaxes = amountWithoutTax - (vzp + ossz + dan);

  return (
    <SafeAreaView
      style={{ flexDirection: "column", justifyContent: "flex-start", flex: 1 }}
    >
      <TextInput
        placeholder="Enter Amount"
        onChangeText={(newAmount) => setAmount(newAmount)}
        style={{
          textAlign: "center",
          marginTop: 50,
          fontSize: 50,
        }}
      >
        {amount}
      </TextInput>
      <WalletPropertyText>
        Amount without Tax {amountWithoutTax.toFixed(2)}
      </WalletPropertyText>
      <WalletPropertyText>DPH {dph.toFixed(2)} </WalletPropertyText>
      <WalletPropertyText>VZP {vzp.toFixed(2)}</WalletPropertyText>
      <WalletPropertyText>OSSZ {ossz.toFixed(2)}</WalletPropertyText>
      <WalletPropertyText>Dane {dan.toFixed(2)}</WalletPropertyText>
      <WalletPropertyText>Zustatek {afterTaxes.toFixed(2)}</WalletPropertyText>
      <Button
        title="Save"
        onPress={() => storeData(amount, JSON.stringify(monthId))}
      />
      <Button title="Get" onPress={() => getData()} />
      <Picker
        selectedValue={selectedMonth}
        onValueChange={(itemValue, itemIndex) => setSelectedMonth(itemValue)}
      >
        <Picker.Item label="January" value="1" />
        <Picker.Item label="February" value="2" />
        <Picker.Item label="March" value="3" />
        <Picker.Item label="April" value="4" />
        <Picker.Item label="May" value="5" />
        <Picker.Item label="June" value="6" />
        <Picker.Item label="July" value="7" />
        <Picker.Item label="August" value="8" />
        <Picker.Item label="September" value="9" />
        <Picker.Item label="October" value="10" />
        <Picker.Item label="November" value="11" />
        <Picker.Item label="December" value="12" />
      </Picker>
    </SafeAreaView>
  );
};

const storeData = async (value, monthId) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem("@Amount_" + monthId, jsonValue);
  } catch (e) {
    // saving error
  }
};

const getData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem("@Amount_January");
    setAmount(JSON.parse(jsonValue));
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    //error reading
  }
};
export default CalculateScreen;
