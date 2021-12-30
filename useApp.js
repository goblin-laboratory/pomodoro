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
  state: 'sleep', // 'sleep', 'reminding', 'waiting', 'working', 'ringing', 'rest', 'ignore'
  count: 0,
  countdown: '25:00',
  countdownText: '25:00',
};

const reducer = (state, action) => {
  if (action.type === 'reset') {
    return {...initialState, ...action.payload};
  }
  return {...state, ...action.payload};
};

function useApp() {
  const [
    {date, time, month, state, count, countdown, countdownText},
    dispatch,
  ] = React.useReducer(reducer, initialState);
  const ref = React.useRef({});

  const check = React.useCallback(datetime => {
    const payload = {};
    if (!datetime) {
      return payload;
    }
    switch (ref.current.state) {
      case 'sleep':
        const index = (ref.current.list || []).findIndex(it =>
          datetime.isBetween(it.min, it.max),
        );
        if (index >= 0) {
          payload.state = 'reminding';
          ref.current.countdown = dayjs().add(30, 'second');
        }
        break;
      case 'reminding':
        if (datetime.isAfter(ref.current.countdown)) {
          payload.state = 'waiting';
          ref.current.countdown = dayjs().add(10, 'minute');
        }
        break;
      case 'waiting':
        if (datetime.isAfter(ref.current.countdown)) {
          payload.state = 'reminding';
          ref.current.countdown = dayjs().add(30, 'second');
        }
        break;
      case 'working':
        if (datetime.isAfter(ref.current.countdown)) {
          payload.state = 'ringing';
          ref.current.countdown = dayjs().add(5, 'second');
        }
        break;
      case 'ringing':
        if (datetime.isAfter(ref.current.countdown)) {
          payload.state = 'working';
          ref.current.countdown = dayjs().add(10, 'minute');
        }
        break;
      case 'rest':
        if (datetime.isAfter(ref.current.countdown)) {
          payload.state = 'waiting';
          ref.current.countdown = dayjs().add(10, 'second');
        }
        break;
      case 'ignore':
        break;
      default:
      //
    }
    if (ref.current.countdown) {
      ref.current.countdownText = dayjs
        .duration(ref.current.datetime.diff(ref.current.countdown))
        .format('mm:ss');
    }
    return payload;
  }, []);

  const update = React.useCallback(() => {
    ref.current.datetime = dayjs();
    const payload = check(ref.current.datetime);
    dispatch({
      type: 'update',
      payload: {
        date: ref.current.datetime.format('YYYY 年 MM 月 DD 日'),
        time: ref.current.datetime.format('HH:mm'),
        ...payload,
      },
    });
  }, [dispatch, check]);

  const onStartClick = React.useCallback(() => {
    ref.current.countdown = dayjs().add(25, 'minute');
    dispatch({type: 'update', payload: {state: 'working'}});
  }, [dispatch]);

  const onStopClick = React.useCallback(() => {
    ref.current.countdown = dayjs().add(5, 'minute');
    dispatch({type: 'update', payload: {state: 'rest'}});
  }, []);

  const onCancelClick = React.useCallback(() => {
    ref.current.countdown = dayjs().add(5, 'minute');
    dispatch({type: 'update', payload: {state: 'rest'}});
  }, []);

  const onIgnoreClick = React.useCallback(() => {
    delete ref.current.countdown;
    dispatch({type: 'update', payload: {state: 'ignore'}});
  }, []);

  React.useEffect(() => {
    ref.current.state = state;
    // ref.current.countdown = countdown;
  }, [state]);

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
      state: 'sleep',
      count: 0,
    };
    dispatch({type: 'update', payload});
  }, [dispatch, date]);

  return {
    date,
    time,
    month,
    state,
    count,
    countdown,
    countdownText,
    onStartClick,
    onStopClick,
    onCancelClick,
    onIgnoreClick,
  };
}

export default useApp;
