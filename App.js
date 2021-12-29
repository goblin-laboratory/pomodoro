import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';

import useApp from './useApp';

const App = () => {
  const {datetime} = useApp();
  if (!datetime) {
    return null;
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.datetime}>
        <View style={styles.dateView}>
          <Text style={styles.dateText}>{datetime.format('MMMM  dddd')}</Text>
          <Text style={styles.dateText}>
            {datetime.format('YYYY 年 MM 月 DD 日')}
          </Text>
        </View>
        <View style={styles.timeView}>
          <Text style={styles.timeText}>{datetime.format('HH:mm:ss')}</Text>
        </View>
      </View>
      <View style={styles.countdown}>
        <View style={styles.countdownView}>
          <Text style={styles.countdownText}>25 : 00</Text>
        </View>
      </View>
      <View style={styles.button}>
        <View style={styles.buttonView}>
          {/* <Text style={styles.buttonText}>25 : 00</Text>
          <Text style={styles.buttonText}>25 : 00</Text> */}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1f1c1d',
    flex: 1,
    padding: 16,
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
  timeView: {
    flex: 1,
  },
  timeText: {
    fontSize: 50,
    textAlign: 'right',
    fontWeight: '500',
    color: 'lightgray',
  },
  countdown: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  countdownView: {
    backgroundColor: '#333',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    padding: 16,
    paddingLeft: 32,
    paddingRight: 32,
  },
  countdownText: {
    fontSize: 120,
    color: 'ghostwhite',
    textAlign: 'center',
  },
  button: {
    minHeight: 64,
  },
});

export default App;
