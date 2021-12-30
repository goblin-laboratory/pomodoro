import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
// import numeral from 'numeral';
import useApp from './useApp';

const App = () => {
  const {
    date,
    time,
    month,
    state,
    count,
    // countdown,
    countdownText,
    // onStartClick,
    // onStopClick,
    // onCancelClick,
    // onIgnoreClick,
  } = useApp();
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.datetime}>
        <View style={styles.dateView}>
          <Text style={styles.dateText}>{month}</Text>
          <Text style={styles.dateText}>{date}</Text>
        </View>
        <View style={styles.countdownView}>
          <Text style={styles.countdownText}>{countdownText}</Text>
        </View>
      </View>
      <View style={styles.time}>
        <View style={styles.timeView}>
          <Text style={styles.timeText}>{time}</Text>
        </View>
      </View>
      <View style={styles.button}>
        <View style={styles.buttonView}>
          <Text style={styles.buttonText}>{state}</Text>
          <Text style={styles.buttonText}>{count}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1f1c1d',
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 16,
    display: 'flex',
    justifyContent: 'space-between',
  },
  datetime: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  dateView: {
    display: 'flex',
  },
  dateText: {
    fontSize: 16,
    color: 'darkgray',
  },
  countdownView: {
    flex: 1,
  },
  countdownText: {
    fontSize: 50,
    textAlign: 'right',
    fontWeight: '500',
    color: 'lightgray',
  },
  time: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  timeView: {
    backgroundColor: '#333',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    padding: 16,
    paddingLeft: 32,
    paddingRight: 32,
  },
  timeText: {
    fontSize: 120,
    color: 'ghostwhite',
    textAlign: 'center',
  },
  button: {
    minHeight: 64,
  },
  buttonText: {
    fontSize: 16,
    color: 'darkgray',
  },
});

export default App;
