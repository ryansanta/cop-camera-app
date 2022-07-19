import React, { useState } from 'react';
import { StyleSheet, Text, View, StatusBar, TouchableOpacity, Modal, Alert, Dimensions } from 'react-native';
import ModalScreen from '../screens/modalscreen';
import { TheCamera } from '../components/TheCamera'
import { storeData, getMulti } from '../components/asyncdb';


export default function ItemScreen({ navigation, route }) {

  const parentFolder = route.params.parentfolder;
  const siteID = route.params.siteid;
  let item = route.params.item;
  let bgColor = item['complete'] === '0' ? '#ff7f7f' : '#d9f9b1';
  let textChange = item['complete'] === '0' ? 'Complete Item' : 'Item Completed';
  let [ buttonColor, changeButtonColor ] = useState(bgColor);
  let [ completeText, changeCompleteText ] = useState(textChange);
  let [ copList, setCopList ] = useState(null);

  console.log('parentFolder:', parentFolder);
  console.log('item:', item);
  console.log('siteID:', siteID);

  async function setList() {
    let thelist: string[] = [];
    thelist = await getMulti(siteID);
    setCopList(thelist);
    console.log('copList has been set.');
  };

  if ( copList === null ) {
    setList();
  };


  function isComplete() {
    Alert.alert('COP Item Finished', 'Are you sure you\'ve taken all required photos?', [
      {
         text: 'Cancel',
         onPress: () => { return null },
         style: 'cancel',
       },
       { text: 'OK', onPress: () => { setComplete(); } },
      ]);
  };


  async function setComplete() {
    let itemnum = item.id - 1;
    copList[itemnum]['complete'] = '1';
    item['complete'] = '1';
    changeButtonColor('#d9f9b1');
    changeCompleteText('Item Completed');
    storeData(copList, siteID);
  };



  return (
    <View style={styles.container}>
      <Text style={styles.header}>{route.params.item.id} : {route.params.item.name}</Text>
      <IsDescription/>
      <TouchableOpacity style={[ styles.buttonContainer, { backgroundColor: '#43ada0' } ]} onPress={() => {
        navigation.navigate('Camera', { item: item, siteid: siteID, parentfolder: parentFolder });
      }}>
      <Text style={styles.buttonTitle}>Open Camera</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[ styles.buttonContainer, { backgroundColor: buttonColor } ]} onPress={async() => { await isComplete(); }}>
      <Text style={styles.buttonTitle}>{completeText}</Text>
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
    marginTop: StatusBar.currentHeight || 0
  },
  text: {
    padding: 12,
    fontSize: 18,
    alignSelf: 'center'
  },
  buttonContainer: {
    width: Dimensions.get('window').width - 20,
    height: 100,
    borderWidth: 0,
    borderColor: 'lightgrey',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 15,
    marginVertical: 8
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
