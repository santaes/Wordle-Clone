import { View, Text, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet,Platform } from "react-native";
import { useNavigation } from '@react-navigation/native';


const SettingsScreen = () => {
  const navigation = useNavigation();
  const clear = () => {
    AsyncStorage.removeItem('@game');
    
    navigation.navigate('Home');
    
  }
  return (
    <View style={styles.button}>
      <TouchableOpacity onPress={clear}>
        <Text  style={styles.text}>Clean Score</Text>
      </TouchableOpacity>
      
    </View>
  );
};
const styles = StyleSheet.create({
  button:{
    borderWidth:0.5,
    borderColor:'#000000',
    padding:10,
    height:40,
    backgroundColor:'#000000',
    margin:10,
    borderRadius:20,
    justifyContent:'center',
    alignItems:'center',
  },
  text:{
    alignSelf:'center',
    color:'#ffffff'
  }
});

export default SettingsScreen;
