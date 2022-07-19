import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, FlatList, StatusBar } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { getMulti } from '../components/asyncdb';
import { listFolder } from '../components/google/gHelpers';
import { useFocusEffect } from '@react-navigation/native';



export default function COPListScreen({ route, navigation, item }) {

  const [ siteID, setSiteID ] = useState(route.params.siteid);
  const [ parentFolder, setParentFolder ] = useState(route.params.parentfolder);
  let [ copList, setCopList ] = useState(null);


  async function setList() {
    let thelist = await getMulti(siteID);
    setCopList(thelist);
    console.log('copList has been set.');
  };

  if ( copList === null ) {
    setList();
  };



  function Item({ item, onPress, backgroundColor }) {
    function ItemStarted() {
      let isStarted = item.started;
      let isComplete = item.complete;
      if (isStarted === '1' && isComplete === '0') {
        return (
          <FontAwesome
            name="play-circle"
            size={25}
            color="darkred"
            style={{ marginLeft: 15, alignSelf: 'center' }}
          />
        )
      } else {
        return(null)
      }
    }
    return (
      <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
        <Text style={styles.buttonTitle}>{item.id} : {item.name}</Text>
        <ItemStarted />
      </TouchableOpacity>
    );
  };


  const renderItem = ({ item, naviagation, route }) => {
    let backgroundColor = item['complete'] === '0' ? item.color : '#d9f9b1';
    return (
      <Item
        item={item}
        onPress={() => {
          navigation.navigate('ItemScreen', { item: item, siteid: siteID, parentfolder: parentFolder });
        }}
        backgroundColor={{backgroundColor}}
      />
    );
  };


  return (
    <SafeAreaView style={styles.container}>
     <Text style={styles.header}>
       SiteID: {siteID}
     </Text>
     <FlatList
       data={copList}
       renderItem={renderItem}
       keyExtractor={item => item.id.toString()}
     />
    </SafeAreaView>
  );
};


  export {COPListScreen};


  const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: StatusBar.currentHeight || 0,
    },
    item: {
      flex: 1,
      flexDirection: 'row',
      padding: 20,
      marginVertical: 4,
      marginHorizontal: 10,
      borderRadius: 12,
      alignItems: 'center'
    },
    buttonTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      color: 'black',
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
