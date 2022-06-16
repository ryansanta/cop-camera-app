import React from 'react';
import { Pressable } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from '../screens/homescreen';
import { COPListScreen } from '../screens/coplistscreen';
import { ItemScreen } from '../screens/itemscreen';
import { ModalScreen } from '../screens/modalscreen';
import { ModalHeader } from '../components/ModalHeader';
import { CameraScreen } from '../screens/camerascreen';
import { Header } from '../components/Header';
import { FontAwesome } from '@expo/vector-icons';
import { MyBackButton } from '../components/CustomBack'


export default function HomeStack({ navigation, route, item }) {

  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={() => ({ headerTitle: 'SkyTower - Verizon Closeouts', headerTitleStyle: {
            fontWeight: 'bold',
          },})}/>
        <Stack.Screen name="COP Photo List" component={COPListScreen} />
        <Stack.Screen name="ItemScreen" component={ItemScreen} options={({ navigation, route }) => ({
              headerLeft: () => <MyBackButton navigation={navigation} />,
              headerRight: () => <ModalHeader navigation={navigation} route={route} />,
              headerTitle: 'Item Screen',
            })
        } />
        <Stack.Screen name="Modal" component={ModalScreen} options={({ route }) => ({
            headerTitle: route.params.headerTitle,
            presentation: 'modal'
          })} />
        <Stack.Screen name="Camera" component={CameraScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export {HomeStack};
