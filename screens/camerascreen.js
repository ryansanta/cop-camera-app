import React from 'react';
import { TheCamera } from '../components/TheCamera';
import { StyleSheet, Text, View, ScrollView, StatusBar, TouchableOpacity } from 'react-native';


export default function CameraScreen({ navigation, route }) {

  const parentFolder = route.params.parentfolder;
  const item = route.params.item;
  const siteID = route.params.siteid;


  return (
    <View style={styles.container}>
      <TheCamera route={route} navigation={navigation} parentfolder={parentFolder} item={item} siteid={siteID} />
    </View>
  )

}

export {CameraScreen};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  text: {
    padding: 12,
    fontSize: 18,
  },
  buttonContainer: {
    borderWidth: 2,
    backgroundColor: 'green',
    borderColor: 'lightgrey',
    alignItems: 'center',
    padding: 10
  },
  buttonTitle: {
    fontSize: 16,
    color: 'white',
  },
  header: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 10,
    marginBottom: 5,
    backgroundColor: '#4369ab',
    color: 'white'
  }
});
