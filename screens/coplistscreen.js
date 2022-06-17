import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, FlatList, StatusBar } from 'react-native';
import { getMulti } from '../components/asyncdb';
import { listFolder } from '../components/google/gHelpers';
import { useFocusEffect } from '@react-navigation/native';



export default function COPListScreen({ route, navigation, item }) {

  const [ siteID, setSiteID ] = useState(route.params.siteid);
  const [ copList, setCopList ] = useState(null);
  const [ parentFolder, setParentFolder ] = useState(route.params.parentfolder);


  async function setList() {
    let thelist: string[] = [];
    thelist = await getMulti(siteID);
    setCopList(thelist);
    console.log('setlist ran');
    // console.log('Async list:', thelist[0]);
  };

  if ( copList === null ) {
    setList();
  };


   function Item({ item, onPress, backgroundColor }): JSX.Element {
     return (
       <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
         <Text style={styles.buttonTitle}>{item.id} : {item.name}</Text>
       </TouchableOpacity>
     );
   };


   const renderItem = ({ item, naviagation, route }) => {
     let backgroundColor = item['complete'] === '0' ? '#ff7f7f' : '#d9f9b1';
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
      padding: 12,
      marginVertical: 4,
      marginHorizontal: 5,
      borderRadius: 12
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
