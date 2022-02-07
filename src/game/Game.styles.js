import { StyleSheet,Platform } from "react-native";
import { colors } from "../constants";
export default StyleSheet.create({
    
        map: {
          alignSelf: 'stretch',
      
          marginVertical: 20,
        },
        row: {
          alignSelf: 'stretch',
          justifyContent: 'center',
          flexDirection: 'row',
        },
        cell: {
          flex: 1,
          aspectRatio: 1,
          borderWidth: 2,
          borderColor: colors.darkgrey,
          margin: 3,
          maxWidth: 70,
          justifyContent: 'center',
          alignItems: 'center',
        },
        cellText: {
          color: colors.lightgrey,
          fontSize: 28,
          fontWeight: 'bold',
        },
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
          alignSelf:'center'
          
        },
     
});
