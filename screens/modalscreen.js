import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';


export default function ModalScreen() {

  return (
    <View style={styles.container}>
      <Text style={styles.text}>This is where the example pictures go.</Text>
    </View>

  )
}

export {ModalScreen};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  text: {
    padding: 10,
    fontSize: 20,
  }
});
