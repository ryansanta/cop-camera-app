import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';


export default function Header({ route }) {

  return (
    <View style={styles.header}>
      <Text style={styles.headerText}>{route.params.name}</Text>
    </View>
  )
}

export {Header};

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 24,
    color: 'black',
    letterSpacing: 1,
    padding: 5,
    alignSelf: 'center'

  },
});
