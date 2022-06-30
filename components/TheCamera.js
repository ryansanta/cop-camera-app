import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, StatusBar, TouchableOpacity, Modal } from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import { Camera } from 'expo-camera';
// import Constants from 'expo-constants';
import * as FileSystem from 'expo-file-system';
import { createImage } from './google/gHelpers';
import ZoomView from '../components/ZoomView';


export default function TheCamera({ route }): JSX.Element {
  const [ hasPermission, setHasPermission ] = useState(null);
  const [ mlPermission, setMLHasPermission ] = useState(null);
  const [ cameraRef, setCameraRef ] = useState(null)
  const [ cameraType, setCameraType ] = useState(Camera.Constants.Type.back);
  const [ parentFolder, setParentFolder ] = useState(route.params.parentfolder);
  const [ theZoom, setTheZoom ] = useState(0);


  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      setMLHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera!</Text>;
  }

  if (mlPermission === null) {
    return <View />;
  }
  if (mlPermission === false) {
    return <Text>No access to Library!</Text>;
  }

  let onGesturePinch = (p) => {
    let p2 = p - 1;

    if(p2 > 0 && p2 > 0.007){
      let _prevPinch = p;
      setTheZoom(Math.min(theZoom + 0.007, 1))
    }
    else if (p2 < 0 && p2 < -0.007){
      let _prevPinch = p;
      setTheZoom(Math.max(theZoom - 0.007, 0))
    }
  }

  return (

    <View style={{ flex: 1 }}>
      <ZoomView
          onPinchStart={() => {}}
          onPinchEnd={() => {}}
          onPinchProgress={onGesturePinch}>
      <Camera style={{ flex: 1 }} type={cameraType} ref={ref => {
        setCameraRef(ref) ;
  }} zoom={theZoom} flashMode={'auto'} >
        <View
          style={{
            flex: 1,
            backgroundColor: 'transparent',
            justifyContent: 'flex-end'
          }}>
          <TouchableOpacity
            style={{
              flex: 0.2,
              alignSelf: 'flex-end',
              borderWidth: 2,
              borderColor: 'white',
              borderRadius: 10,
              marginBottom: 0,
              marginRight: 20,
              justifyContent: 'center',
              padding: 7,
            }}
            onPress={() => {
              setCameraType(
                cameraType === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}>
            <Text style={{ fontSize: 30, fontWeight: 'bold', color: 'white' }}> FLIP </Text>
          </TouchableOpacity>
          <TouchableOpacity style={{alignSelf: 'center', marginBottom: 20}} onPress={async() => {

            if(cameraRef) {
              // take photo and upload to drive
              let photo = await cameraRef.takePictureAsync({ base64: false, exif: true, quality: 0.8 });
              console.log('photo:', photo);
              let parentFolder = route.params.parentfolder;
              let name = route.params.item.id + ' ' + route.params.item.name;
              let gUpload = await createImage(parentFolder, name, photo.uri);

              // check if that directory exists
              let newDirName = FileSystem.documentDirectory + route.params.siteid;
              let checker = await FileSystem.getInfoAsync(newDirName);
              // console.log('Check FS dir exists:', checker);

              // if new directory
              if (checker.exists === false) {
                // make directory
                let makeDir = await FileSystem.makeDirectoryAsync(newDirName, { intermediates: true });
                // check directory info
                let newDir = await FileSystem.getInfoAsync(newDirName);
                // console.log('newDir:', newDir);
                // set new photo path
                let newPhoto = newDir.uri + route.params.item.id + ' ' + route.params.item.name + '.jpg';
                let newPhotoNoSpaces = newPhoto.split(' ').join('_');
                // set options and move photo from cache to new directory
                let options = {
                  from: photo.uri,
                  to: newPhotoNoSpaces,
                }
                // move
                let moved = await FileSystem.moveAsync(options);

                // check then make gallery with photo
                let checkGal = await MediaLibrary.getAlbumAsync(route.params.siteid);
                // console.log('checkGal:', checkGal);
                if (checkGal !== null) {
                  let final = await MediaLibrary.createAssetAsync(newPhotoNoSpaces);
                  let addit = await MediaLibrary.addAssetsToAlbumAsync(final, checkGal.id);
                } else if (checkGal === null) {
                  let final = await MediaLibrary.createAssetAsync(newPhotoNoSpaces);
                  MediaLibrary.createAlbumAsync(route.params.siteid, final);
                }

              } else if (checker.exists === true) {
                // set new photo path
                let newPhoto = checker.uri + route.params.item.id + ' ' + route.params.item.name + '.jpg';
                let newPhotoNoSpaces = newPhoto.split(' ').join('_');
                // set options and move photo to existing directory
                let options = {
                  from: photo.uri,
                  to: newPhotoNoSpaces,
                }
                // move
                let moved = await FileSystem.moveAsync(options);

                // check then make gallery with photo
                let checkGal = await MediaLibrary.getAlbumAsync(route.params.siteid);
                // console.log('checkGal:', checkGal);
                if (checkGal !== null) {
                  let final = await MediaLibrary.createAssetAsync(newPhotoNoSpaces);
                  let addit = await MediaLibrary.addAssetsToAlbumAsync(final, checkGal.id);
                } else if (checkGal === null) {
                  let final = await MediaLibrary.createAssetAsync(newPhotoNoSpaces);
                  MediaLibrary.createAlbumAsync(route.params.siteid, final);
                }
              }
            }
          }
        }>
            <View style={{
               borderWidth: 2,
               borderRadius: 75,
               borderColor: 'white',
               height: 150,
               width: 150,
               display: 'flex',
               justifyContent: 'center',
               alignItems: 'center'}}
            >
              <View style={{
                 borderWidth: 2,
                 borderRadius: 75,
                 borderColor: 'white',
                 height: 120,
                 width: 120,
                 backgroundColor: 'white'}} >
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </Camera>
      </ZoomView>
    </View>

  )
}

export {TheCamera};
