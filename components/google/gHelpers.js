import React from 'react';
import GDrive from "expo-google-drive-api-wrapper";
import * as FileSystem from 'expo-file-system';


export async function createImage(parents, name, thePhoto){
  try {
    const fileBase64 = await FileSystem.readAsStringAsync(thePhoto, { encoding: 'base64' });
    const contents = fileBase64;
    const b64 = true;
    const upload = await GDrive.files.createFileMultipart(
    contents,
    "image/jpg", {
        parents: [parents],
        name: name + '.jpg'
    }, b64);
    // console.log(contents);
  } catch (error) {
    console.log(error.message);
  }
}

export async function updateFile(){
  try {
    const fileId = '1CWOShMWfHeQNj25lNt94xoHdMJ2R2ikG';
    const parentId = '16qPcOhXX-YjkZQ_R2wsfKxyXrjj0mmiv';
    const result = await GDrive.files.update(fileId, {
       removeParents: parentId,
   });
   const data = await result.json();
   console.log(data);
 } catch (error) {
   console.log(error.message);
 }
}

export async function createFile(){
  try {
    const contents = 'My text file contents';
    const result = await GDrive.files.createFileMultipart(
    contents,
    "text/plain", {
        parents: ["root"],
        name: "test.txt"
    }, true);
  } catch (error) {
    console.log(error.message);
  }
}

export async function createFolder(folderName){
  try {
    let theName = folderName + ' _cop';
    let result = await GDrive.files.safeCreateFolder({
    name: theName,
    parents: ["16TcTOdgQe6Qbw-TUu0XcDqMu5u1eccr9"]
});
    return result;
  } catch (error) {
    console.log(error.message);
  }
}

export async function listFile(query) {
  try {
    // const fileId = '1fYu898nJMdbaQZia68kfS2Fnx13lhmfO';
    let queryText = 'name = ' + '\"' + query + ' _cop\"';
    console.log('queryText:', queryText);
    const result = await GDrive.files.list({ q: queryText });
    let data = result.json();
    return data;

  } catch(error) {
    console.log(error.message);
  }
}

export async function listFolder(fileId, item) {
  try {
    let queryText = '\"' + fileId + '\"' + ' in parents and name contains ' + item;
    const result = await GDrive.files.list({ q: queryText });
    const data = result.json();
    console.log('listFolder data:', data);
    return data;

  } catch(error) {
    console.log(error.message);
  }
}
