import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import NotesScreen from "./NotesScreen";

  // Modal Screen
  const InnerStack = createStackNavigator();
  export default function NotesStack() {
    return (
      <InnerStack.Navigator>
        <InnerStack.Screen
          name="Notes"
          component={NotesScreen}
          options={{
            headerTitle: "To Do List",
            headerTitleStyle: {
              fontWeight: "bold",
              fontSize: 30,
            },
            headerStyle: {
              height: 120,
              backgroundColor: "tomato",
              borderBottomColor: "#ccc",
              borderBottomWidth: 1,
            },
          }}
        />
      </InnerStack.Navigator>
    );
  }