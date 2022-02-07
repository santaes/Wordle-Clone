import { useEffect, useState } from 'react';

import {
  Text,
  View,
  ScrollView,
  Alert,
  Vibration,
  ActivityIndicator,
  SafeAreaView
} from 'react-native';
import { colors, CLEAR, ENTER, colorsToEmoji } from '../constants';
import Keyboard from '../components/Keyboard';
import * as Haptics from 'expo-haptics';
import Buttons from '../components/buttons';

import * as Clipboard from 'expo-clipboard';
import words from '../words';
import styles from './Game.styles';
import { copyArray, getDayOfYear } from '../utils';
import AsyncStorage from '@react-native-async-storage/async-storage';

const NUMBER_OF_TRIES = 6;

const DayOfTheYear = getDayOfYear();

const Game = () => {
  
  const word = words[DayOfTheYear];
  const letters = word.split('');

  const [rows, setRows] = useState(
    new Array(NUMBER_OF_TRIES).fill(new Array(letters.length).fill('')),
  );
  const [curRow, setCurRow] = useState(0);
  const [curCol, setCurCol] = useState(0);
  const [gameState, setGameState] = useState('playing'); // won , lost, playing
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (curRow > 0) {
      checkGameState();
    }
  }, [curRow]);

  useEffect(() => {
    if (loaded) {
      persistState();
    }
  }, [rows, curCol, curRow, gameState]);

  useEffect(() => {
    readState();
  }, []);

  const persistState = async () => {
    // write all the state variables to async storage
    const data = {
      rows,
      curRow,
      curCol,
      gameState,
    };
    const dataString = JSON.stringify(data);

    console.log(data);
    await AsyncStorage.setItem('@game', dataString);
  };

  const readState = async () => {
    const dataString = await AsyncStorage.getItem('@game');
    try {
      const data = JSON.parse(dataString);
      setRows(data.rows);
      setCurCol(data.curCol);
      setCurRow(data.curRow);
      setGameState(data.gameState);
    } catch (e) {
      console.log('couldnt parse the state', e);
    }

    setLoaded(true);
  };

  const checkGameState = () => {
    if (checkIfWon() && gameState != 'won' && loaded) {
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

  const getAllLettersWithColor = (color) => {
    return rows.flatMap((row, i) =>
      row.filter((cell, j) => getCellBGColor(i, j) === color),
    );
  };
  const greenCaps = getAllLettersWithColor(colors.primary);
  const yellowCaps = getAllLettersWithColor(colors.secondary);
  const greyCaps = getAllLettersWithColor(colors.darkgrey);

  if (!loaded) {
    return <ActivityIndicator />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <Buttons />
      <Text style={styles.title}>
        WORDLZ
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
  );
};

export default Game;
