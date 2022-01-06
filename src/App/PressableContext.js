import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const PressableContext = ({state, countdownText, count}) => {
  if (state === '工作' || state === '小憩') {
    return (
      <View style={styles.countdownView}>
        <Text style={styles.countdownText}>{countdownText}</Text>
      </View>
    );
  }

  return (
    <View style={styles.centerTitleView}>
      <Text style={styles.centerTitleText}>
        {state === '结束铃' || state === '延迟' ? '短暂休息' : '集中精力'}
      </Text>
      <Text style={styles.centerSubTitleText}>
        今天已完成 {count} 个番茄时段
      </Text>
      {state === '结束铃' || state === '延迟' ? (
        <Text style={styles.restButton}>开始休息</Text>
      ) : (
        <Text style={styles.startButton}>开始集中精力</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  countdownView: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3f3f3f',
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  countdownText: {
    fontSize: 120,
    color: 'ghostwhite',
    textAlign: 'center',
  },
  centerTitleView: {
    flex: 1,
  },
  centerTitleText: {
    fontSize: 32,
    color: 'ghostwhite',
    marginBottom: 8,
    textAlign: 'center',
  },
  centerSubTitleText: {
    fontSize: 24,
    color: 'lightgray',
    textAlign: 'center',
    marginBottom: 16,
  },
  startButton: {
    display: 'flex',
    backgroundColor: 'crimson',
    paddingVertical: 24,
    paddingHorizontal: 64,
    fontSize: 32,
    color: 'white',
    borderRadius: 4,
  },
  restButton: {
    display: 'flex',
    backgroundColor: 'forestgreen',
    paddingVertical: 24,
    paddingHorizontal: 64,
    fontSize: 32,
    color: 'white',
    borderRadius: 4,
  },
});

export default React.memo(
  PressableContext,
  (p, n) =>
    p.state === n.state &&
    p.countdownText === n.countdownText &&
    p.count === n.count,
);
