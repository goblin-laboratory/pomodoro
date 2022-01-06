import React from 'react';
import {SafeAreaView, StyleSheet, Text, View, Pressable} from 'react-native';
import useApp from './useApp';
import useRing from '../ring/useRing';
import Button from '../Button';
import PressableContext from './PressableContext';

const App = () => {
  const {
    date,
    time,
    month,
    state,
    count,
    countdownText,
    // title,
    onPress,
    onCancelClick,
    onIgnoreClick,
  } = useApp();

  useRing({
    src: require('../ring/school-bells.mp3'),
    paused: state !== '开始铃',
    // volume: 1.0,
  });

  useRing({
    src: require('../ring/clock.mp3'),
    paused: state !== '工作',
    // volume: 0.8,
  });

  useRing({
    src: require('../ring/church-bells.mp3'),
    paused: state !== '结束铃',
    // volume: 1.0,
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.topLeftView}>
          <Text style={styles.topLeftText}>{month}</Text>
          <Text style={styles.topLeftText}>{date}</Text>
        </View>
        <View style={styles.topRightView}>
          <Text style={styles.topRightText}>{time}</Text>
        </View>
      </View>
      <View style={styles.main}>
        <Pressable style={styles.mainView} onPress={onPress}>
          <PressableContext
            state={state}
            countdownText={countdownText}
            count={count}
          />
        </Pressable>
      </View>
      <View style={styles.footer}>
        <View style={styles.footerLeft}>
          <Text style={styles.footerText}>
            {state}
            {/* <Text style={styles.textHighlight}>
              &nbsp;&nbsp;{countdownText}
            </Text> */}
          </Text>
        </View>
        <View style={styles.footerCenter}>
          <Text style={styles.footerText}>
            今天已完成
            <Text style={styles.textHighlight}>
              &nbsp;&nbsp;{count}&nbsp;&nbsp;
            </Text>
            个番茄时段
          </Text>
        </View>
        <View style={styles.footerRight}>
          <View style={styles.footerRightView}>
            {(state === '结束铃' || state === '延迟') && (
              <Button
                style={styles.footerRightButton}
                text={{fontSize: 16, color: 'lightgray'}}
                onPress={onCancelClick}
                title="取消"
              />
            )}
            {(state === '开始铃' || state === '推迟') && (
              <Button
                style={styles.footerRightButton}
                text={{fontSize: 16, color: 'lightgray'}}
                onPress={onIgnoreClick}
                title="忽略"
              />
            )}
            <Button
              style={styles.footerRightButton}
              text={{fontSize: 16, color: 'lightgray'}}
              // onPress={onRestClick}
              title="设置"
            />
          </View>
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
  header: {
    height: 64,
    display: 'flex',
    alignItems: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  topLeftView: {
    flex: 1,
    display: 'flex',
  },
  topLeftText: {
    fontSize: 16,
    color: 'darkgray',
  },
  topRightView: {
    flex: 1,
  },
  topRightText: {
    fontSize: 36,
    textAlign: 'right',
    fontWeight: '400',
    color: 'lightgray',
  },
  main: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  mainView: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '60%',
  },
  footer: {
    height: 64,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 16,
  },
  footerLeft: {
    flex: 2,
    display: 'flex',
    justifyContent: 'flex-end',
  },
  footerText: {
    fontSize: 16,
    color: 'darkgray',
  },
  textHighlight: {
    fontSize: 24,
    color: 'crimson',
    paddingHorizontal: 8,
  },
  footerCenter: {
    flex: 2,
    textAlign: 'center',
  },
  footerRight: {
    flex: 2,
    display: 'flex',
  },
  footerRightView: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  footerRightButton: {
    backgroundColor: '#2f2f2f',
    paddingHorizontal: 24,
    paddingVertical: 12,
    marginLeft: 16,
    fontSize: 16,
  },
});

export default App;
