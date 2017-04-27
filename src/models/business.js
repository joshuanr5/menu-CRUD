import { message } from 'antd';

const initialHelperStates = { // TODO: merge with existing state
  previewImage: '',
  previewModalVisible: false,
  alertErrorVisible: false,
  saveButtonEnabled: false,
  loading: false,
};

export default {
  namespace: 'business',
  state: {
    // entity vars
    name: 'Diegos Pizza',
    description: 'Nueva pizzeria por tu barrio',
    categories: ['a10', 'c12'],
    facebookPage: null,
    logoPhoto: 'http://unsplash.it/341',
    coverPhoto: 'http://unsplash.it/342',
    address: 'Jr. Alfonso Ugarte 115, La Merced, Comas',
    coordinates: {
      lat: 12.232323,
      lng: -10.1231231,
    },
    workingTime: {
      MO: {
        start: '12:00',
        end: '22:00',
      },
    },
    minOrderValue: 2,
    deliveryValue: 0,
    deliveryTime: 25,
    switchCash: false,
    switchVisa: false,
    switchMastercard: false,
    switchDiners: true,

    // ui vars
    previewImage: '',
    previewModalVisible: false,
    alertErrorVisible: false,
    saveButtonEnabled: false,
    loading: false,
  },
  subscriptions: {},
  effects: {
    *updateData({ payload }, { put, call }) {
      yield put({ type: 'showLoading' });
      yield call(timeout => new Promise(resolve => setTimeout(resolve, timeout)), 500);
      yield put({ type: 'querySuccess', payload });
      message.success('Se actualizó el perfil correctamente');
    },
  },
  reducers: {
    showLoading(state) {
      return {
        ...state,
        loading: true,
      };
    },
    querySuccess(state, { payload }) {
      return {
        ...state,
        ...payload,
        previewModalVisible: false,
        alertErrorVisible: false,
        saveButtonEnabled: false,
        loading: false,
      };
    },
    showPreviewModal(state, { payload }) {
      return {
        ...state,
        ...payload,
        previewModalVisible: true,
      };
    },
    closePreviewModal(state) {
      return {
        ...state,
        previewModalVisible: false,
      };
    },
    toggleAlertError(state, { payload }) {
      return {
        ...state,
        alertErrorVisible: payload.showAlert,
      };
    },
    enableSaveButton(state) {
      return {
        ...state,
        saveButtonEnabled: true,
      };
    },
  },
};
