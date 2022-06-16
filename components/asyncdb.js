import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const coplist = require('./coptitles.js');

export async function storeData (value, site) {
 try {
   await AsyncStorage.setItem(site, JSON.stringify(value))
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
      // return value;
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
     const data = JSON.parse(value);
     return data;
   }
 } catch(e) {
   console.log(e);
 }
}

export async function multiDelete(sites) {
  const keys = [
  sites
];
  console.log('keys:', keys);
  try {
    await AsyncStorage.multiRemove(keys);
  } catch(e) {
    console.log(e);
  }
  console.log('Done removing key(s).');
}
