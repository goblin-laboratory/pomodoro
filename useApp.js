import React from 'react';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import duration from 'dayjs/plugin/duration';

dayjs.extend(isBetween);
dayjs.extend(duration);

const initialState = {
  datetime: null,
  date: '',
  time: '00:00',
  month: '',
  // state: 'sleep', // 'sleep', 'reminding', 'waiting', 'working', 'ringing', 'rest', 'ignore'
  state: '休息', // '休息', '开始铃', '推迟', '工作', '延迟', '结束铃', '小憩', '忽略'
  count: 0,
  // countdown: '25:00',
  countdownText: '25:00',
};

const reducer = (state, action) => {
  if (action.type === 'reset') {
    return {...initialState, ...action.payload};
  }
  return {...state, ...action.payload};
};

function useApp() {
  const [{date, time, month, state, count, countdownText}, dispatch] =
    React.useReducer(reducer, initialState);
  const ref = React.useRef({});

  const nextList = React.useMemo(
    () => ({
      休息: {state: '开始铃', value: 4, unit: 'second'},
      开始铃: {state: '推迟', value: 10, unit: 'minute'},
      小憩: {state: '开始铃', value: 4, unit: 'second'},
      推迟: {state: '开始铃', value: 4, unit: 'second'},
      工作: {state: '结束铃', value: 2, unit: 'second'},
      延迟: {state: '结束铃', value: 2, unit: 'second'},
      结束铃: {state: '延迟', value: 10, unit: 'minute'},
      忽略: {state: '休息', value: 30, unit: 'minute'},
    }),
    [],
  );

  const isRestFinished = React.useCallback(datetime => {
    const index = (ref.current.list || []).findIndex(it =>
      datetime.isBetween(it.min, it.max),
    );
    return index !== -1;
  }, []);

  const isFinished = React.useCallback(
    (currentTime, countdownTime) =>
      currentTime && countdownTime && currentTime.isAfter(countdownTime),
    [],
  );

  const getRestCountdown = React.useCallback(currentTime => {
    if (!ref.current.list || ref.current.list.length === 0) {
      return dayjs().hour(24).minute(0).second(0).millisecond(0);
    }
    const item = ref.current.list.find(it => it.min.isAfter(currentTime));
    if (item) {
      return item.min.clone();
    }
    return ref.current.list[0].min
      .clone()
      .hour(24)
      .minute(0)
      .second(0)
      .millisecond(0);
  }, []);

  const checkCountdown = React.useCallback(
    datetime => {
      if (!datetime) {
        return;
      }
      const info = nextList[ref.current.state];
      if (!info) {
        return;
      }
      if (ref.current.state === '休息') {
        if (isRestFinished(datetime)) {
          ref.current.countdown = dayjs().add(info.value, info.unit);
          dispatch({type: 'update', payload: {state: info.state}});
        }
      } else if (ref.current.state === '忽略') {
        if (!isRestFinished(datetime)) {
          ref.current.countdown = getRestCountdown(datetime);
          dispatch({type: 'update', payload: {state: info.state}});
        }
      } else if (ref.current.state === '开始铃') {
        // 开始铃结束后检查是否时休息时间
        // 如果是休息时间则状态切换为休息，否者切换为延迟
        if (isFinished(datetime, ref.current.countdown)) {
          if (isRestFinished(datetime)) {
            ref.current.countdown = dayjs().add(info.value, info.unit);
            dispatch({type: 'update', payload: {state: info.state}});
          } else {
            ref.current.countdown = getRestCountdown(datetime);
            dispatch({type: 'update', payload: {state: '休息'}});
          }
        }
      } else if (isFinished(datetime, ref.current.countdown)) {
        ref.current.countdown = dayjs().add(info.value, info.unit);
        dispatch({type: 'update', payload: {state: info.state}});
      }
      if (ref.current.countdown) {
        const du = dayjs.duration(ref.current.countdown.diff(datetime));
        dispatch({
          type: 'update',
          payload: {countdownText: du.format('HH:mm:ss').replace(/^00:/, '')},
        });
      }
    },
    [nextList, isRestFinished, isFinished, getRestCountdown],
  );

  const update = React.useCallback(() => {
    const datetime = dayjs();
    ref.current.datetime = datetime;
    const dateText = ref.current.datetime.format('YYYY 年 MM 月 DD 日');
    const timeText = ref.current.datetime.format('HH:mm');
    dispatch({type: 'update', payload: {date: dateText, time: timeText}});
    checkCountdown(datetime);
  }, [dispatch, checkCountdown]);

  const onStartClick = React.useCallback(() => {
    // console.log('onStartClick');
    ref.current.countdown = dayjs().add(25, 'minute');
    dispatch({type: 'update', payload: {state: '工作'}});
  }, [dispatch]);

  const onFinishClick = React.useCallback(() => {
    const finished = ref.current.count + 1;
    const value = finished % 4 === 0 ? 15 : 5;
    ref.current.countdown = dayjs().add(value, 'minute');
    dispatch({type: 'update', payload: {state: '小憩', count: finished}});
  }, []);

  const onRestClick = React.useCallback(() => {
    ref.current.countdown = dayjs().add(15, 'minute');
    dispatch({type: 'update', payload: {state: '小憩'}});
  }, []);

  const onCancelClick = React.useCallback(() => {
    ref.current.countdown = dayjs().add(5, 'minute');
    dispatch({type: 'update', payload: {state: '小憩'}});
  }, []);

  const onIgnoreClick = React.useCallback(() => {
    delete ref.current.countdown;
    dispatch({type: 'update', payload: {state: '忽略'}});
  }, []);

  React.useEffect(() => {
    ref.current.state = state;
    ref.current.count = count;
  }, [state, count]);

  React.useEffect(() => {
    const id = global.setInterval(() => {
      update();
    }, 500);
    return () => {
      global.clearInterval(id);
    };
  }, [update]);

  React.useEffect(() => {
    if (!ref.current.datetime) {
      return;
    }
    console.log('新的一天开始了！！！');
    ref.current.list = [
      {
        min: dayjs().hour(9).minute(20).second(0).millisecond(0),
        max: dayjs().hour(12).minute(0).second(0).millisecond(0),
      },
      {
        min: dayjs().hour(14).minute(20).second(0).millisecond(0),
        max: dayjs().hour(18).minute(0).second(0).millisecond(0),
      },
    ];
    const payload = {
      month: ref.current.datetime.format('MMMM  dddd'),
      state: '休息',
      count: 0,
      countdownText: '00:00',
    };
    // TODO: 休息也显示倒计时
    ref.current.countdown = getRestCountdown(ref.current.datetime);
    dispatch({type: 'update', payload});
  }, [dispatch, date, getRestCountdown]);

  return {
    date,
    time,
    month,
    state,
    count,
    // countdown,
    countdownText,
    onStartClick,
    onFinishClick,
    onCancelClick,
    onIgnoreClick,
    onRestClick,
  };
}

export default useApp;
