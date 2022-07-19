import React, { useEffect } from 'react';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import GDrive from "expo-google-drive-api-wrapper";
import { TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';

WebBrowser.maybeCompleteAuthSession();

export default function GAuth() {

  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: '920246655859-om302dr5g71151kpdjis0ueq6o4acnmq.apps.googleusercontent.com',
    iosClientId: '920246655859-4js16arlbuovg4e555pl71pu17g0o5f9.apps.googleusercontent.com',
    androidClientId: '920246655859-v4vdnvui7nsu2lsudc2jut96agr6h7j0.apps.googleusercontent.com',
    scopes: ['profile', 'email', 'https://www.googleapis.com/auth/drive'],
    // webClientId: 'GOOGLE_GUID.apps.googleusercontent.com',
  });

  function alertDriveSuccess() {
    Alert.alert('Google Drive', 'Google Drive is initialized. Login was successful!', [
      { text: 'OK', onPress: () => console.log('OK Pressed') },
    ]);
  };

  function alertDriveFail() {
    Alert.alert('Google Drive', 'Google Drive failed to initialize. Login was unsuccessful, please try again or use offline mode!', [
      { text: 'OK', onPress: () => console.log('OK Pressed') },
    ]);
  };

  useEffect(() => {
    if (response?.type === 'success') {
      const { authentication } = response;
        GDrive.setAccessToken(response.params.access_token);
        GDrive.init();
        GDrive.isInitialized() ? console.log('Google Drive is initialized!') & alertDriveSuccess() : console.log('Google Drive failed to initialize!') & alertDriveFail();
    }
  }, [response]);


  return (
    <TouchableOpacity
      style={styles.button}
      disabled={!request}
      title="Login"
      hitSlop={{top: 20, bottom: 20, left: 50, right: 50}}
      onPress={() => {
        promptAsync({useProxy: true, showInRecents: true})
        }}
    >
    <Text style={styles.buttonText}>LOGIN</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonText: {
    fontSize: 30,
    fontWeight: 'bold'
  },
  button: {
    borderWidth: 2,
    borderRadius: 10,
    backgroundColor: "lightgrey",
    width: 220,
    alignItems: 'center',
    padding: 20,
    marginBottom: 10,
    marginTop: 10
  }
});
