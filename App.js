import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from "react";
import { StyleSheet, Text, View, Button } from 'react-native';
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { Entypo } from '@expo/vector-icons';
import * as SQLite from 'expo-sqlite';

function HomeScreen({ navigation }) {
  function message(){
    return console.log("lai lai lai, Durian $1!!!")
  }

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <Entypo onPress={message} name="new-message" size={50} color="black" />
    });
  });

  return (
    <View style={styles.container}>
      <Text>Homepage</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
        options={{
        headerStyle: {
          height: 120,
          backgroundColor: "yellow",
          borderBottomColor: "#ccc",
          borderBottomWidth: 1,
        },
      }}
        name="Notes App"
        component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// styling
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightyellow',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
