import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Platform,
  ScrollView,
  Alert,
  TouchableOpacity,
  Vibration,
} from 'react-native';
import { colors, CLEAR, ENTER, colorsToEmoji } from './src/constants.js';
import Keyboard from './src/components/Keyboard';
import * as Haptics from 'expo-haptics';
import { AntDesign, Entypo, Ionicons } from '@expo/vector-icons';
import * as Linking from 'expo-linking';
import { useNavigation, NavigationContainer } from '@react-navigation/native';
import * as Clipboard from 'expo-clipboard';

const NUMBER_OF_TRIES = 6;
const copyArray = (arr) => {
  return [...arr.map((rows) => [...rows])];
};
const getDayOfYear = () => {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now - start;
  const oneDay = 1000 * 60 * 60 * 24;
  const day = Math.floor(diff / oneDay);
  return day;
};
const DayOfTheYear = getDayOfYear();
const words = [
  'hello',
  'world',
  'zalupa',
  'nastyushka',
  'hello',
  'world',
  'zalupa',
  'nastyushka',
  'hello',
  'world',
  'zalupa',
  'nastyushka',
  'hello',
  'world',
  'zalupa',
  'nastyushka',
  'hello',
  'world',
  'zalupa',
  'nastyushka',
  'hello',
  'world',
  'zalupa',
  'nastyushka',
  'hello',
  'world',
  'zalupa',
  'nastyushka',
  'hello',
  'world',
  'zalupa',
  'nastyushka',
  'hello',
  'world',
  'zalupa',
  'nastyushka',
  'hello',
  'world',
  'zalupa',
  'nastyushka',
  'hello',
  'world',
  'zalupa',
  'nastyushka',
  'hello',
  'world',
  'zalupa',
  'nastyushka',
  'hello',
  'world',
  'zalupa',
  'nastyushka',
  'hello',
  'world',
  'zalupa',
  'nastyushka',
  'hello',
  'world',
  'zalupa',
  'nastyushka',
  'hello',
  'world',
  'zalupa',
  'nastyushka',
  'hello',
  'world',
  'zalupa',
  'nastyushka',
  'hello',
  'world',
  'zalupa',
  'nastyushka',
  'hello',
  'world',
  'zalupa',
  'nastyushka',
  'hello',
  'world',
  'zalupa',
  'nastyushka',
  'hello',
  'world',
  'zalupa',
  'nastyushka',
  'hello',
  'world',
  'zalupa',
  'nastyushka',
  'hello',
  'world',
  'zalupa',
  'nastyushka',
  'hello',
  'world',
  'zalupa',
  'nastyushka',
  'hello',
  'world',
  'zalupa',
  'nastyushka',
  'hello',
  'world',
  'zalupa',
  'nastyushka',
];

export default function App() {
  const word = words[DayOfTheYear];
  const letters = word.split('');

  const [rows, setRows] = useState(
    new Array(NUMBER_OF_TRIES).fill(new Array(letters.length).fill('')),
  );
  const [curRow, setCurRow] = useState(0);
  const [curCol, setCurCol] = useState(0);
  const [gameState, setGameState] = useState('playing'); // won , lost, playing

  useEffect(() => {
    if (curRow > 0) {
      checkGameState();
    }
  }, [curRow]);

  const checkGameState = () => {
    if (checkIfWon() && gameState != 'won') {
      Alert.alert('Побэда!!!', 'Поздравляшки!!! Ти Харош!!!', [
        { text: 'Share', onPress: shareScore },
        {
          text: 'Back',
          onPress: setGameState('won'),
        },
      ]);
      
      Vibration.vibrate(1 * 1000);
      setGameState('won');
    } else if (checkIfLost() && gameState != 'lost') {
      Alert.alert('Бля :(', 'Ти проэбав, приходь завтра');
      Vibration.vibrate(0.5 * 1000, 0.5 * 1000);
      setGameState('lost');
    }
  };

  const shareScore = () => {
    const textMap = rows
      .map((row, i) =>
        row.map((cell, j) => colorsToEmoji[getCellBGColor(i, j)]).join(''),
      )
      .filter((row) => row)
      .join('\n');
    const textToShare = `Wordle \n${textMap}`;
    Clipboard.setString(textToShare);
    Alert.alert('Copied successfully', 'Share your Score');
  };

  const checkIfWon = () => {
    const row = rows[curRow - 1];

    return row.every((letter, i) => letter === letters[i]);
  };

  const checkIfLost = () => {
    return !checkIfWon() && curRow === rows.length;
  };

  const onKeyPressed = (key) => {
    if (gameState != 'playing') {
      return;
    }
    const updatedRows = copyArray(rows);

    if (key === CLEAR) {
      const prevCol = curCol - 1;
      if (prevCol >= 0) {
        updatedRows[curRow][prevCol] = '';
        setRows(updatedRows);
        setCurCol(prevCol);
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      }

      return;
    }

    if (key === ENTER) {
      if (curCol === rows[0].length) {
        setCurRow(curRow + 1);
        setCurCol(0);
      }
      if (curCol < rows[0].length) {
        Alert.alert('Васяяя!!!!', 'надо заполнить все квадратики');
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
      }

      return;
    }

    if (curCol < rows[0].length) {
      updatedRows[curRow][curCol] = key;
      setRows(updatedRows);
      setCurCol(curCol + 1);
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
  };
  const isCellActive = (row, col) => {
    return row === curRow && col === curCol;
  };
  const getCellBGColor = (row, col) => {
    const letter = rows[row][col];
    if (row >= curRow) {
      return colors.black;
    }
    if (letter === letters[col]) {
      return colors.primary;
    }
    if (letters.includes(letter)) {
      return colors.secondary;
    }
    return colors.darkgrey;
  };
  const onFAQPressed = () => {
    Linking.openURL('https://www.vulture.com/2022/01/wordle-tips-tricks.html');
  };

  const onRatingPressed = () => {
    Linking.openURL('https://i.blogs.es/723dde/wordle-atajo/840_560.jpeg');
  };

  const getAllLettersWithColor = (color) => {
    return rows.flatMap((row, i) =>
      row.filter((cell, j) => getCellBGColor(i, j) === color),
    );
  };
  const greenCaps = getAllLettersWithColor(colors.primary);
  const yellowCaps = getAllLettersWithColor(colors.secondary);
  const greyCaps = getAllLettersWithColor(colors.darkgrey);

  return (
    <NavigationContainer>
      <SafeAreaView style={styles.container}>
        <StatusBar style='auto' />

        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'space-between',
            marginTop: Platform.OS === 'android' ? 35 : 0,
          }}
        >
          <TouchableOpacity
            style={{ marginHorizontal: 10 }}
            onPress={onFAQPressed}
          >
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
            <TouchableOpacity>
              <Ionicons name='settings-sharp' size={24} color={colors.grey} />
            </TouchableOpacity>
          </View>
        </View>
        <Text style={styles.title}>
          WORDLE
          <Text
            style={{ fontSize: 16, color: colors.lightgrey, letterSpacing: 2 }}
          >
            {' '}
            By Batsol
          </Text>
        </Text>

        <ScrollView style={styles.map}>
          {rows.map((row, i) => (
            <View key={`row-${i}`} style={styles.row}>
              {row.map((letter, j) => (
                <View
                  key={`cell-${i}-${j}`}
                  style={[
                    styles.cell,
                    {
                      borderColor: isCellActive(i, j)
                        ? colors.grey
                        : colors.darkgrey,
                      backgroundColor: getCellBGColor(i, j),
                    },
                  ]}
                >
                  <Text style={styles.cellText}>{letter.toUpperCase()}</Text>
                </View>
              ))}
            </View>
          ))}
        </ScrollView>
        <Keyboard
          onKeyPressed={onKeyPressed}
          greenCaps={greenCaps}
          yellowCaps={yellowCaps}
          greyCaps={greyCaps}
        />
      </SafeAreaView>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
    alignItems: 'center',
  },
  title: {
    color: colors.lightgrey,
    fontSize: 42,
    fontWeight: 'bold',
    letterSpacing: 5,
  },
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
});
