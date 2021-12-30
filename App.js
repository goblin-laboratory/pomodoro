import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
// import numeral from 'numeral';
import useApp from './useApp';
import useRing from './useRing';
import Button from './Button';
// import Ring from './Ring';
// import clock from './clock.mp3';

const App = () => {
  const {
    date,
    time,
    month,
    state,
    count,
    countdownText,
    onStartClick,
    onFinishClick,
    onCancelClick,
    onIgnoreClick,
    // onRestClick,
  } = useApp();

  useRing({
    src: require('./ring/滴答.mp3'),
    paused: state !== '工作',
    volume: 0.8,
  });

  useRing({
    src: require('./ring/教堂钟声.mp3'),
    paused: state !== '结束铃',
    volume: 1.0,
  });

  useRing({
    src: require('./ring/教堂钟声.mp3'),
    paused: state !== '开始铃',
    volume: 0.8,
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.datetime}>
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
        {/* <View style={styles.timeLeftView} /> */}
        <View style={styles.timeView}>
          <Text style={styles.timeText}>{time}</Text>
        </View>
        {/* <View style={styles.timeRightView}>
          <Ring src={require('./clock.mp3')} />
        </View> */}
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
          {(state === '休息' ||
            state === '开始铃' ||
            state === '推迟' ||
            state === '小憩' ||
            state === '忽略') && (
            <Button
              style={styles.footerCenterButton}
              text={{fontSize: 32}}
              onPress={onStartClick}
              title="开始"
            />
          )}
          {state === '工作' && (
            <Button
              style={styles.footerCenterButton}
              text={{fontSize: 32}}
              onPress={onCancelClick}
              title="取消"
            />
          )}
          {(state === '结束铃' || state === '延迟') && (
            <Button
              style={styles.footerCenterButton}
              text={{fontSize: 32}}
              onPress={onFinishClick}
              title="开始休息"
            />
          )}
        </View>
        <View style={styles.footerRight}>
          <View style={styles.footerRightView}>
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
  datetime: {
    height: 64,
    display: 'flex',
    alignItems: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'space-between',
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
    flex: 3,
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
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginLeft: 16,
    fontSize: 16,
  },
});

export default App;
