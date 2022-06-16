import React from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';


export default function MyBackButton({ navigation, backgroundColor, siteID, route }) {
  return (
    <View style={styles.header}>
      <View>
      </View>
      <Pressable
        hitSlop={20}
        onPress={() => navigation.navigate('COP Photo List', { siteid: siteID, route: route,  backgroundColor: backgroundColor })}
        style={({ pressed }) => ({
          opacity: pressed ? 0.5 : 1,
        })}>
        <FontAwesome
          name="angle-left"
          size={36}
          color="rgb(0, 129, 249)"
          style={{ marginLeft: 8, left: 0, bottom: 1 }}
        />
      </Pressable>
      <Pressable
        hitSlop={20}
        onPress={() => navigation.navigate('COP Photo List', { siteid: siteID, route: route, backgroundColor: backgroundColor })}
        style={({ pressed }) => ({
          opacity: pressed ? 0.5 : 1,
        })}>
        <Text style={{ marginLeft: 6, marginTop: 0, fontSize: 17, color: 'rgb(0, 129, 249)' }}>COP List</Text>
      </Pressable>

    </View>
  )
}

export {MyBackButton};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  }});
