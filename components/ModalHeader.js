import React from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';


export default function ModalHeader({ navigation, route }) {
  return (
    <View style={styles.header}>
      <View>
      </View>
      <Pressable
        onPress={() => navigation.navigate('Modal', { headerTitle: route.params.item.id.concat(' : ', route.params.item.name), item: route.params.item })}
        style={({ pressed }) => ({
          opacity: pressed ? 0.5 : 1,
        })}>
        <FontAwesome
          name="info-circle"
          size={35}
          color="#cd040b"
          style={{ marginRight: 15 }}
        />
      </Pressable>
    </View>
  )
}

export {ModalHeader};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  headerTitle: {
    flexDirection: 'row',
    fontSize: 20,
    alignSelf: 'center',
    justifyContent: 'center'
  }
});
