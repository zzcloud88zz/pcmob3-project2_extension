import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from '@expo/vector-icons';
import * as SQLite from "expo-sqlite";
import * as FileSystem from "expo-file-system";

const db = SQLite.openDatabase("notes.db");
console.log(FileSystem.documentDirectory);

// NotesScreen
export default function NotesScreen({ route, navigation }) {
  const [notes, setNotes] = useState([]);
  const [color, setColor] = useState("beige");

  function refreshNotes() {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM notes",
        null,
        (txObj, { rows: { _array } }) => setNotes(_array),
        (txObj, error) => console.log("Error ", error)
      );
    });
  }

  //When the component first mounts, we want to set up our DB
  useEffect(() => {
    db.transaction((tx) => {
        tx.executeSql(
          `CREATE TABLE IF NOT EXISTS notes
        (id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT,
        done INT)`
        );
      },
      null,
      refreshNotes
    );
  }, []);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity style={{ paddingRight: 10 }}>
          <Entypo
            onPress={addNote}
            name="new-message"
            size={40}
            color="black"
          />
        </TouchableOpacity>
      ),
    });
  });

  useEffect(() => {
    if (route.params?.text) {
      db.transaction((tx) => {
          tx.executeSql("INSERT INTO notes (done, title) VALUES (0, ?)", [
            route.params.text,
          ]);
        },
        null,
        refreshNotes
      );
    }
  }, [route.params?.text]);

  useEffect(() => {
      db.transaction((tx) => {
          tx.executeSql("UPDATE notes SET title=? WHERE id=?", [
            route.params?.textedit, route.params?.id
          ]);
        },
        null,
        refreshNotes
      );
    });

  function addNote() {
    navigation.navigate("Add Screen");
  }

  function renderItem({ item }) {
    return (
      <View>
      <TouchableOpacity
        style={{
          padding: 10,
          paddingTop: 20,
          paddingBottom: 20,
          borderBottomColor: "#ccc",
          borderBottomWidth: 1,
          flexDirection: "row",
          justifyContent: "space-between",
          backgroundColor: color,
        }}
      >
        <Text style={{ fontSize: 16 }}>
          {item.title}
        </Text>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity onPress={() => navigation.navigate("Edit", item)} style={{ paddingRight: 15 }}>
            <Feather name="edit" size={30} color="darkblue" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => deleteNote(item.id)} style={{ paddingRight: 10 }}>
            <AntDesign name="delete" size={30} color="maroon" />
          </TouchableOpacity>
        </View>
        </TouchableOpacity>
      </View>
    );
  }

  function deleteNote(id) {
    Alert.alert(
      "Hold On!",
      "Are you sure you want to delete?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => 
        db.transaction((tx) => {
          tx.executeSql("DELETE FROM notes WHERE id = ?", [id]);
        },
        null,
        refreshNotes
      )      
      }],
      { cancelable: false }
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        style={{ width: "100%" }}
        data={notes}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}

// styling
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "whitesmoke",
    alignItems: "center",
    justifyContent: "center",
  },
});
