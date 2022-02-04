import { Text } from "react-native";
import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from 'expo-linear-gradient';

const GradientText = (props) => {
    return (
      <MaskedView maskElement={<Text {...props} />}>
        <LinearGradient
           colors={[  '#00ff00','red','yellow','transparent']}
          
        >
          <Text {...props} style={[props.style, { opacity: 0 }]} />
        </LinearGradient>
      </MaskedView>
    );
  };
  
  export default GradientText;