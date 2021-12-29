import React from 'react';
import dayjs from 'dayjs';

const initialState = {
  datetime: null,
};

const reducer = (state, action) => {
  if (action.type === 'reset') {
    return {...initialState, ...action.payload};
  }
  return {...state, ...action.payload};
};

function useApp() {
  const [{datetime}, dispatch] = React.useReducer(reducer, initialState);

  React.useEffect(() => {
    const id = global.setInterval(() => {
      dispatch({type: 'update', payload: {datetime: dayjs()}});
    }, 400);
    return () => {
      global.clearInterval(id);
    };
  }, [dispatch]);

  return {datetime};
}

export default useApp;
