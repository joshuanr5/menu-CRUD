import axios from 'axios';

export default {
  namespace: 'login',
  state: {
    login: false,
    username: '',
    loginLoaded: false,
  },
  effects: {
    *login({ payload }, { call, put }) {
      console.log('changeload');
      yield put({
        type: 'changeLoad',
        payload: {
          loginLoaded: true,
        },
      });
      const response = yield call(() => {
        // TODO: fix problems with the backend
        return axios.post('http://localhost:4000/login', {
          ...payload,
        });
      });
      const { login, username } = response.data.data;
      console.log('changeload');
      yield put({
        type: 'changeLoad',
        payload: {
          loginLoaded: false,
        },
      });
      yield put({
        type: 'changeLogin',
        payload: {
          login,
          username,
        },
      });
    },
  },
  reducers: {
    changeLoad(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
    changeLogin(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
  // en un subscription consulta el localStorage para el state default
};
