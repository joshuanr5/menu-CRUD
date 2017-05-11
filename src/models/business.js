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

    business_addresses: [
      {
        business_alias: 'Central',
        address_name: 'Av. Aramburu 856',
        coordinates: {
          lat: -12.102469,
          lng: -77.0236594,
        },
        working_time: [
          {
            day_code: 'MO',
            day_name: 'Lunes',
            working_hours: {
              start: '09:00',
              end: '15:00',
            },
          },
          {
            day_code: 'SU',
            day_name: 'Domingo',
            working_hours: {
              start: '09:00',
              end: '20:00',
            },
          },
        ],
        creation_date: '2017-05-08T17:25:45.835Z',
        status: 'active',
        id: '5910cc32c018311596f94fbd',
        business_id: '5910a93c8f078c10a34e0fd7',
        district_id: '5910cb58c018311596f94f9f',
        district: {
          name: 'Ate',
          id: '5910cb58c018311596f94f9f',
          city_id: '5910cb00c018311596f94f9d',
        },
      },
    ],
    minOrderValue: 2,
    deliveryValue: 0,
    deliveryTime: 25,
    switchCash: false,
    switchVisa: false,
    switchMastercard: false,
    switchDiners: true,

    modalLocalVisible: false,

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
    enableSaveButton(state, { payload }) {
      console.log(payload);
      return {
        ...state,
        saveButtonEnabled: payload.buttonEnabled,
      };
    },
    editLocal(state, { payload }) {
      return {
        ...state,
        ...payload,
        modalLocalVisible: false,
      };
    },
    showModal(state) {
      return {
        ...state,
        modalLocalVisible: true,
      };
    },
    closeModal(state) {
      return {
        ...state,
        modalLocalVisible: false,
      };
    },
  },
};
