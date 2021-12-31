import React from 'react';
import {SafeAreaView, StyleSheet, Text, View, Pressable} from 'react-native';
import useApp from './useApp';
import useRing from '../ring/useRing';
import Button from '../Button';

const App = () => {
  const {
    date,
    time,
    month,
    state,
    count,
    countdownText,
    title,
    onPress,
    onCancelClick,
    onIgnoreClick,
  } = useApp();

  useRing({
    src: require('../ring/clock.mp3'),
    paused: state !== '工作',
    volume: 0.8,
  });

  useRing({
    src: require('../ring/church-bells.mp3'),
    paused: state !== '结束铃',
    volume: 1.0,
  });

  useRing({
    src: require('../ring/church-bells.mp3'),
    paused: state !== '开始铃',
    volume: 0.8,
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.dateView}>
          <Text style={styles.dateText}>{month}</Text>
          <Text style={styles.dateText}>{date}</Text>
        </View>
        <View style={styles.countdownView}>
          <Text style={styles.countdownText}>
            {state} {countdownText}
          </Text>
        </View>
      </View>
      <View style={styles.time}>
        <Pressable style={styles.timeView} onPress={onPress}>
          <Text style={styles.timeText}>{time}</Text>
        </Pressable>
      </View>
      <View style={styles.footer}>
        <View style={styles.footerLeft}>
          <Text style={styles.footerLeftText}>
            今天已完成
            <Text style={styles.textHighlight}>
              &nbsp;&nbsp;{count}&nbsp;&nbsp;
            </Text>
            个番茄时段
          </Text>
          <Text style={styles.footerLeftText}>
            离长休还有
            <Text style={styles.textHighlight}>
              &nbsp;&nbsp;{4 - (count % 4)}&nbsp;&nbsp;
            </Text>
            个番茄时段
          </Text>
        </View>
        <View style={styles.footerCenter}>
          <Button
            style={styles.footerCenterButton}
            text={{fontSize: 28, fontWeight: 'normal'}}
            onPress={onPress}
            title={title}
          />
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
  dateView: {
    flex: 1,
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
    fontSize: 36,
    textAlign: 'right',
    fontWeight: '400',
    color: 'lightgray',
  },
  time: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  timeLeftView: {
    flex: 1,
  },
  timeRightView: {
    flex: 1,
  },
  timeView: {
    backgroundColor: '#3f3f3f',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingHorizontal: 40,
  },
  timeText: {
    fontSize: 120,
    color: 'ghostwhite',
    textAlign: 'center',
  },
  footer: {
    height: 84,
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
  footerLeftText: {
    fontSize: 10,
    color: 'darkgray',
  },
  textHighlight: {
    fontSize: 20,
    color: 'crimson',
    paddingHorizontal: 8,
  },
  footerCenter: {
    flex: 2,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 32,
  },
  footerCenterButton: {
    display: 'flex',
    backgroundColor: 'crimson',
    minHeight: 56,
    width: '100%',
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
