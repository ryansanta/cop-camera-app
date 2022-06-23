import React from 'react';
import { StyleSheet, Text, View, StatusBar, Image, Dimensions, SafeAreaView, FlatList } from 'react-native';





export default function ModalScreen({ route }) {

  const examplelist = require('../assets/examplephotos.js');
  const item = route.params.item;
  const windowWidth = Dimensions.get('window').width;

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

  const getItemLayout = (_, index, windowWidth) => {
    return {
      length: windowWidth,
      offset: windowWidth * (index),
      index,
    };
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleView}>
      <Text style={styles.title}>Example Photos:</Text>
      </View>
      <FlatList data={data} renderItem={renderItem} getItemLayout={getItemLayout}/>
    </SafeAreaView>
  );
};


export {ModalScreen};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  image: {
    resizeMode: 'contain',
    alignSelf: 'center',
    width: Dimensions.get('window').width,
    marginVertical: -100,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 10,
    marginBottom: 0,
    backgroundColor: '#4369ab',
    color: 'white'
  },
  titleView: {
    height: 50,
    justifyContent: 'center'
  }
});
