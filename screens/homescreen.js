import React, { useState } from 'react';
import { StyleSheet, Text, View,
         TextInput, Image, TouchableOpacity,
         KeyboardAvoidingView, Alert, Keyboard, TouchableWithoutFeedback } from 'react-native';
import GAuth from '../components/google/gAuth';
import logo from '../assets/images/logo.png';
import GDrive from "expo-google-drive-api-wrapper";
import { storeData, getAllKeys, multiDelete, getKeyInfo, getMulti } from '../components/asyncdb';
import { listFile, createFolder } from '../components/google/gHelpers';



export default function HomeScreen({ navigation, route, item }) {

  const thecoplist = require('../components/coptitles.js');
  const [ siteID, setSiteID ] = useState('');
  console.log('siteID:', siteID);
  let parentFolder;

  // multiDelete();

  async function checkParent() {

    const check = await listFile(siteID);
    console.log('check:', check['files']);

    if (check['files'].length == 0) {
      console.log('Folder doesn\'t exist yet.');
      // await multiDelete(siteID);
      // console.log('Old data cleaned up.');
      await createFolder(siteID)
      const check = await listFile(siteID);
      // console.log('Check, no exist:', check);
      const check1 = check['files'][0]['id'];
      const parentFolder = check1.toString();
      console.log('parentFolderExists:', parentFolder);
      return parentFolder;

    } else if (check['files'].length > 0) {
        console.log("Folder already exists!");
        // console.log('Check if exist:', check['files']);
        const check1 = check['files'][0]['id'];
        const parentFolder = check1.toString();
        console.log('parentFolderExists:', parentFolder);
        return parentFolder;
      }
  }


  async function checkGoogle() {
    if (GDrive.isInitialized() === true) {
      let check = await checkParent();
      let parentFolder = check;
      navAuth(parentFolder);
    } else {
      Alert.alert('Google Drive', 'Did you want to login and upload to Google Drive?', [
      {
        text: 'Offline Mode',
        onPress: () => navAuth(null)
      },
      { text: 'OK', onPress: () => console.log('OK Pressed') },
    ]);
    }
  }

  async function navAuth(parentFolder) {
    if (await getKeyInfo(siteID) === null) {
      await storeData(thecoplist.coparray, siteID);
      let item = await getMulti(siteID);
      navigation.navigate('COP Photo List', { siteid: siteID, parentfolder: parentFolder, item: item  });
    } else {
      let item = await getMulti(siteID);
      navigation.navigate('COP Photo List', { siteid: siteID, parentfolder: parentFolder, item: item });
    }
  };



      // await multiDelete();
      // console.log(await getAllKeys());



  return (
            <KeyboardAvoidingView behavior={'position'} style={styles.container}>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={styles.container}>
            <Image source={logo} style={styles.logo} />
            <Text style={styles.titleText}>Please enter the SiteID:</Text>
            <TextInput value={siteID} style={styles.textarea} placeholder='e.g. 1248-VZW' onChangeText={(thesiteid) => setSiteID(thesiteid)} textAlign={'center'} />
              <GAuth />
              <TouchableOpacity style={styles.button} onPress={checkGoogle} hitSlop={{top: 20, bottom: 20, left: 50, right: 50}}>
              <Text style={styles.buttonText}>START SITE</Text>
              </TouchableOpacity>
            </View>
            </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
         )
}

export {HomeScreen};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  titleText: {
    fontSize: 26,
    color: "#000",
    backgroundColor: "#fff",
    alignItems: 'center',
    padding: 10
  },
  buttonText: {
    fontSize: 30,
    fontWeight: 'bold'
  },
  button: {
    borderWidth: 2,
    borderRadius: 10,
    backgroundColor: "lightgrey",
    width: 220,
    alignItems: 'center',
    padding: 20,
    marginBottom: 30,
    marginTop: 5
  },
  textarea: {
    width: 300,
    borderWidth: 2.5,
    borderRadius: 10,
    borderColor: "#000",
    fontSize: 24,
    padding: 10,
    marginBottom: 20
  },
  logo: {
    flex: 1,
    width: 340,
    height: 340,
    resizeMode: 'contain',
    backgroundColor: '#fff',
    marginBottom: 10
  }
});
