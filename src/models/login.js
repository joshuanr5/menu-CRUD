export default {
  namespace: 'login',
  state: {
    login: false,
  },
  effects: {
  },
  reducers: {
    changeLogin(state, { payload }) {
      const { login } = payload;
      return {
        ...state,
        login,
      };
    },
  },
  // en un subscription consulta el localStorage para el state default
};
