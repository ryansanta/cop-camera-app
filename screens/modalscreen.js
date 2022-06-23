import React from 'react';
import { StyleSheet, Text, View, StatusBar, Image, Dimensions, SafeAreaView, FlatList } from 'react-native';





export default function ModalScreen({ route }) {

  const examplelist = require('../assets/examplephotos.js');
  const item = route.params.item;

  let a = examplelist.examplearray.find((x) => x.id === item.id);
  let data = splitItem(a);

  function splitItem(item) {
    if (item !== undefined) {
      let b = Object.values(item);
      let c = b.slice(1);
      console.log('c:', c);
      return c;
    }
  };

  function Item({ photo }) {
    return (
      <Image source={photo} style={styles.image} />
    )
  };

  const renderItem = ({ item }) => <Item photo={item} />;

  return (
    <SafeAreaView style={styles.container}>
      <FlatList data={data} renderItem={renderItem} />
    </SafeAreaView>
  );
};


export {ModalScreen};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  image: {
    resizeMode: 'contain',
    alignSelf: 'center',
    width: Dimensions.get('window').width,
    marginVertical: -100,

  }
});
