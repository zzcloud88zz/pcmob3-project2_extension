import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { Entypo } from "@expo/vector-icons";
import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("notes.db");

// HomeScreen
function HomeScreen({ navigation }) {
  const [notes, setNotes] = useState([
    { title: "Cat walk human", done: false, id: "0" },
    { title: "Spiderpig~ spidepig~ ", done: false, id: "1" },
    { title: "Thanos is right", done: false, id: "1" },
  ]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Entypo onPress={addNote} name="new-message" size={50} color="black" />
      ),
    });
  });

  function addNote() {
    navigation.navigate("Add Screen");
  }

  function renderItem({ item }) {
    return (
      <View
        style={{
          padding: 10,
          paddingTop: 20,
          paddingBottom: 20,
          borderBottomColor: "#ccc",
          borderBottomWidth: 1,
        }}
      >
        <Text style={{ textAlign: "left", fontSize: 16 }}>{item.title}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        style={{ width: "100%" }}
        data={notes}
        renderItem={renderItem}
      />
    </View>
  );
}

// Modal Screen
const InnerStack = createStackNavigator();

function NotesStack() {
  return (
    <InnerStack.Navigator>
      <InnerStack.Screen
        name="Notes"
        component={NotesScreen}
        options={{
          headerTitle: "Notes, a Todo App",
          headerTitleStyle: {
            fontWeight: "bold",
            fontSize: 30,
          },
          headerStyle: {
            height: 120,
            backgroundColor: "yellow",
            borderBottomColor: "#ccc",
            borderBottomWidth: 1,
          },
        }}
      />
    </InnerStack.Navigator>
  );
}

function AddScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>This is the add screen</Text>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{ padding: 10 }}
      >
        <Text style={{ color: "orange" }}>GO BACK!</Text>
      </TouchableOpacity>
    </View>
  );
}

// Stack Nav
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{
            headerStyle: {
              height: 120,
              backgroundColor: "lightblue",
              borderBottomColor: "#ccc",
              borderBottomWidth: 1,
            },
          }}
          name="Notes App"
          component={HomeScreen}
        />
        <Stack.Screen name="Add Screen" component={AddScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// styling
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "beige",
    alignItems: "center",
    justifyContent: "center",
  },
});
