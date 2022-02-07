import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, Platform, View,SafeAreaView } from 'react-native';
import { colors } from './src/constants.js';
import {NavigationContainer} from '@react-navigation/native';
import Navigator from './src/navigation/RootNavigator';
import Game from './src/game/Game.js';
import Buttons from './src/components/buttons.js';

import 'react-native-gesture-handler';



export default function App() {
  return (
    <NavigationContainer>
     
      <StatusBar style='auto' />
      
        <Navigator/>
     
    
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
    alignItems: 'center',
    marginTop: Platform.OS === 'android' ? 35 : 0,
  },
  title: {
    color: colors.lightgrey,
    fontSize: 42,
    fontWeight: 'bold',
    letterSpacing: 5,
  },
});
