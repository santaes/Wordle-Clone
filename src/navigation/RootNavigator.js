import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SettingsScreen from '../screens/SettingsScreen';
import App from '../../App';


const Stack = createNativeStackNavigator();

function Navigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
          <Stack.Screen name="Home" component={App} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigator;