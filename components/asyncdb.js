import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';


export async function storeData (value, site) {
 try {
   await AsyncStorage.setItem(site, await JSON.stringify(value))
   console.log('STORED!');
 } catch (e) {
   console.log(e);
 }
}

export async function getKeyInfo (key) {
  try {
    const value = await AsyncStorage.getItem(key, JSON.stringify(value))
    if(value !== null) {
      console.log('Key Found!');
      return value;
    } else {
      console.log('Key doesn\'t exist!');
      return null;
    }
  } catch (e) {
    console.log(e);
  }
}

export async function getAllKeys() {
 let keys: string[] = []
 try {
   keys = await AsyncStorage.getAllKeys()
 } catch(e) {
   console.log(e);
 }
 console.log('All keys:', keys);
}

export async function getMulti(key) {
 try {
   const value = await AsyncStorage.getItem(key)
   if(value !== null) {
     // console.log('Done getting data.', JSON.parse(value));
     const data = await JSON.parse(value);
     return data;
   }
 } catch(e) {
   console.log(e);
 }
}

export async function multiDelete(sites) {
  try {
    const keys = sites.split(',');
    console.log('keys:', keys);
    await AsyncStorage.multiRemove(keys);
  } catch(e) {
    console.log(e);
  }
  console.log('Done removing key(s).');
}
