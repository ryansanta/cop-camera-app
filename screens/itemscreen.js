import React, { useState } from 'react';
import { StyleSheet, Text, View, StatusBar, TouchableOpacity, Modal, Alert } from 'react-native';
import ModalScreen from '../screens/modalscreen';
import { TheCamera } from '../components/TheCamera'
import { storeData, getMulti } from '../components/asyncdb';


export default function ItemScreen({ navigation, route }) {

  const parentFolder = route.params.parentfolder;
  const item = route.params.item;
  let siteID = route.params.siteid;

  console.log('parentFolder:', parentFolder);
  console.log('item:', item);
  console.log('siteID:', siteID);


  function isComplete() {
    Alert.alert('COP Item Finished', 'Are you sure you\'ve taken all required photos?', [
      {
         text: 'Cancel',
         onPress: () => { return null },
         style: 'cancel',
       },
       { text: 'OK', onPress: () => { setComplete() } },
      ]);
  };


    async function setComplete() {
      let copList = await getMulti(siteID);
      let itemnum = item.id - 1;
      copList[itemnum]['complete'] = 1;
      item['complete'] = 1;
      await storeData(copList, siteID);
      // await getMulti(siteID);
    };



  return (
    <View style={styles.container}>
      <Text style={styles.header}>{route.params.item.id} : {route.params.item.name}</Text>
      <IsDescription/>
      <TouchableOpacity style={styles.buttonContainer} onPress={() => {
        navigation.navigate('Camera', { item: item, siteid: siteID, parentfolder: parentFolder });
      }}>
      <Text style={styles.buttonTitle}>Open Camera</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonContainer} onPress={() => { isComplete(); }}>
      <Text style={styles.buttonTitle}>Complete Item</Text>
      </TouchableOpacity>
    </View>
  )

  function IsDescription(): JSX.Element {
    if(route.params.item.notes !== null){
      return (
        <Text style={styles.text}>Description: {route.params.item.notes}</Text>
      );
    } else {
      return null;
    }
  }
}

export {ItemScreen};

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
    height: 100,
    borderWidth: 2,
    backgroundColor: 'green',
    borderColor: 'lightgrey',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10
  },
  buttonTitle: {
    fontSize: 35,
    color: 'white',
    alignItems: 'center'
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
