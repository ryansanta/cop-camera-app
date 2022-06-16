import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, StatusBar, TouchableOpacity, Modal, Constants } from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import { Camera, CameraType } from 'expo-camera';
import * as FileSystem from 'expo-file-system';
// import { createImage } from './google/gHelpers';


export default function TheCamera({ route }): JSX.Element {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null)
  const [type, setType] = useState(CameraType.back);
  const [ parentFolder, setParentFolder ] = useState(route.params.parentfolder);


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
      <Camera style={{ flex: 1 }} type={type} ref={ref => {
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
                setType(type === CameraType.back ? CameraType.front : CameraType.back);
              }}>
              <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'white' }}> FLIP </Text>
          </TouchableOpacity>
          <TouchableOpacity style={{alignSelf: 'center', marginBottom: 20}} onPress={async() => {

            if(cameraRef) {
              let photo = await cameraRef.takePictureAsync({ base64: false, exif: true });
              console.log('photo:', photo);

              // set directory name
              let newDirName = FileSystem.documentDirectory + route.params.siteid;
              console.log('newDirName', newDirName);
              // check if that directory exists
              let checker = await FileSystem.getInfoAsync(newDirName);
              console.log('check exists:', checker);

              // if new directory
              if (checker.exists === false) {
                // make directory
                let makeDir = await FileSystem.makeDirectoryAsync(newDirName, { intermediates: true });
                // check directory info
                let newDir = await FileSystem.getInfoAsync(newDirName);
                console.log('newDir:', newDir);
                // set new photo path
                let newPhoto = newDir.uri + route.params.item.name + '.jpg';
                console.log('newPhoto:', newPhoto);
                // set options and move photo from cache to new directory
                let options = {
                  from: photo.uri,
                  to: newPhoto,
                }
                // move
                let moved = await FileSystem.moveAsync(options);

              } else if (checker.exists === true) {
                // set new photo path
                let newPhoto = checker.uri + route.params.item.name + '.jpg';
                console.log('newPhoto:', newPhoto);
                // set options and move photo to existing directory
                let options = {
                  from: photo.uri,
                  to: newPhoto,
                }
                // move
                let moved = await FileSystem.moveAsync(options);
                // ?
                let final = await MediaLibrary.createAssetAsync(newPhoto)
                MediaLibrary.createAlbumAsync(route.params.siteid, final);
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
