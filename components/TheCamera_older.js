import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, StatusBar, TouchableOpacity, Modal } from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import { Camera } from 'expo-camera';
import * as FileSystem from 'expo-file-system';


export default function TheCamera({ route }): JSX.Element {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null)
  const [type, setType] = useState(Camera.Constants.Type.back);

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
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}>
            <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'white' }}> FLIP </Text>
          </TouchableOpacity>
          <TouchableOpacity style={{alignSelf: 'center', marginBottom: 20}} onPress={async() => {
            if(cameraRef){

              let photo = await cameraRef.takePictureAsync({ base64: false });
              console.log('photo:', photo);
              let newDirName = FileSystem.documentDirectory + route.params.siteid;
              console.log('newDirName', newDirName);
              let checker = await FileSystem.getInfoAsync(newDirName);
              console.log('check exists:', checker);

              if (checker.exists === false) {
                let makeDir = await FileSystem.makeDirectoryAsync(newDirName, { intermediates: true });
                let newDir = await FileSystem.getInfoAsync(newDirName);
                console.log('newDir:', newDir);
                console.log('before:', await FileSystem.readDirectoryAsync(newDir.uri));
                let newPhoto = newDir.uri + route.params.item.name;
                console.log('newPhoto:', newPhoto);
                let options = {
                  from: photo.uri,
                  to: newDir.uri + route.param.item.name + '.jpg',
                }
                let moved = await FileSystem.moveAsync(options);
                console.log('exists after:', await FileSystem.readDirectoryAsync(checker.uri));

              } else if (checker.exists === true) {
                let newPhoto = checker.uri + route.params.item.name + '.jpg';
                console.log('newPhoto:', newPhoto);
                let newPhotoNoSpaces = newPhoto.split(' ').join('_');
                console.log('newPhotoNoSpaces:', newPhotoNoSpaces);
                console.log('exists before:', await FileSystem.readDirectoryAsync(checker.uri));
                let options = {
                  from: photo.uri,
                  to: newPhoto,
                }
                let moved = await FileSystem.moveAsync(options);
                console.log('exists after:', await FileSystem.readDirectoryAsync(checker.uri));
                let final = await MediaLibrary.createAssetAsync(newPhoto)
                MediaLibrary.createAlbumAsync(route.params.siteid, final);
              }









              // await FileSystem.deleteAsync(checker.uri);

            }
          }}>
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
