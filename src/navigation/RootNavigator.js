import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SettingsScreen from '../screens/SettingsScreen';

import Game from '../game/Game';

const Stack = createNativeStackNavigator();

const Navigator = () => {
  return (
    
      <Stack.Navigator>
        <Stack.Screen name='Home' component={Game} options={{headerShown:false}}/>
        <Stack.Screen name='Settings' component={SettingsScreen} />
      </Stack.Navigator>
    
  );
};

export default Navigator;
