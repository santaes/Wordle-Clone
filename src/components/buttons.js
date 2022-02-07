import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { AntDesign, Entypo, Ionicons } from '@expo/vector-icons';
import * as Linking from 'expo-linking';
import { colors } from '../constants';
import { useNavigation } from '@react-navigation/native';

const Buttons = () => {
  const onFAQPressed = () => {
    Linking.openURL('https://www.vulture.com/2022/01/wordle-tips-tricks.html');
  };

  const onRatingPressed = () => {
    Linking.openURL('https://i.blogs.es/723dde/wordle-atajo/840_560.jpeg');
  };
  const navigation = useNavigation();

  const onSettingsPressed = () => {
     navigation.navigate('Settings');
  };
  return (
    <View
      style={{
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        marginTop:5,
      }}
    >
      <TouchableOpacity style={{ marginHorizontal: 10 }} onPress={onFAQPressed}>
        <AntDesign name='questioncircleo' size={24} color={colors.grey} />
      </TouchableOpacity>
      <View
        style={{
          flexDirection: 'row',
          marginHorizontal: 10,
          flex: 1,
          justifyContent: 'flex-end',
          alignItems: 'center',
        }}
      >
        <TouchableOpacity onPress={onRatingPressed}>
          <Entypo
            name='bar-graph'
            size={24}
            color={colors.grey}
            style={{ marginHorizontal: 20 }}
          />
        </TouchableOpacity>
        <TouchableOpacity  onPress={onSettingsPressed}>
          <Ionicons
            name='settings-sharp'
            size={24}
            color={colors.grey}
           
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Buttons;
