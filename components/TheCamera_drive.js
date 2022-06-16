import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, StatusBar, TouchableOpacity, Modal } from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import { Camera } from 'expo-camera';
import * as FileSystem from 'expo-file-system';
import { createImage } from './google/gHelpers';


export default function TheCamera({ route }): JSX.Element {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null)
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  const [ parentFolder, setParentFolder ] = useState(route.params.parentfolder);
  const [ count, setCount ] = useState(0);


  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={{ flex: 1 }}>
      <Camera style={{ flex: 1 }} type={cameraType} ref={ref => {
        setCameraRef(ref) ;
  }}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'transparent',
            justifyContent: 'flex-end'
          }}>
          <TouchableOpacity
            style={{
              flex: 0.1,
              alignSelf: 'flex-end',
              borderWidth: 1,
              borderColor: 'white',
              borderRadius: 10,
              marginBottom: 0,
              marginRight: 25,
              justifyContent: 'center',
              padding: 7,
            }}
            onPress={() => {
              setCameraType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}>
            <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'white' }}> FLIP </Text>
          </TouchableOpacity>
          <TouchableOpacity style={{alignSelf: 'center', marginBottom: 20}} onPress={async() => {

            if(cameraRef) {
              let photo = await cameraRef.takePictureAsync({ base64: false, exif: true });
              console.log('photo:', photo);
              console.log('Count before:', count);
              setCount(count + 1);
              console.log('Count after:', count);

              let parentFolder = route.params.parentfolder;
              let counter = ' (' + count + ')';
                if (count == 0) {
                  let name = route.params.item.id + '. ' + route.params.item.name;
                  console.log('Upload name:', name);
                  console.log('cameraParentFolder:', parentFolder);
                  let gUpload = await createImage(parentFolder, name, photo.uri);
                  console.log('gUpload:', gUpload);
                } else {
                  let name = route.params.item.id + '. ' + route.params.item.name + counter;
                  console.log('Upload name:', name);
                  console.log('cameraParentFolder:', parentFolder);
                  let gUpload = await createImage(parentFolder, name, photo.uri);
                  console.log('gUpload:', gUpload);
                }

              }
            }
          }>
            <View style={{
               borderWidth: 2,
               borderRadius:"50%",
               borderColor: 'white',
               height: 50,
               width:50,
               display: 'flex',
               justifyContent: 'center',
               alignItems: 'center'}}
            >
              <View style={{
                 borderWidth: 2,
                 borderRadius:"50%",
                 borderColor: 'white',
                 height: 40,
                 width:40,
                 backgroundColor: 'white'}} >
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  )
}

export {TheCamera};
