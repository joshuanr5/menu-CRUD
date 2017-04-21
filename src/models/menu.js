// const menu = {
//   sections: [
//     {
//       id: 's1',
//       sectionName: 'Lasagnas',
      // products: [
      //   {
      //     id: 'p1',
      //     productName: 'Carnibora',
      //     productDescription: 'Queso, carne, tomate',
      //     urlImage: 'http://unsplash.it/123',
      //     price: 20,
      //   },
      //   {
      //     ... other product
      //   },
//       ],
//     },
//     {
//       ... other section
//     },
//   ],
//   modalType: 'add',
//   modalShow: 'Section',
//   modalVisible: false,
// };
import uuid from 'uuid';
import { message } from 'antd';

const initialState = {
  modalType: '', // add || delete || edit
  modalShow: '', // sections, products
  modalVisible: false,
};

function newSection(sectionName) {
  return {
    id: uuid(),
    sectionName,
    products: [],
  };
}

export default {
  namespace: 'menu',
  state: {
    sections: [],
    ...initialState,
  },
  subscriptions: {},
  effects: {},
  reducers: {
    addSection(state, { payload }) {
      const { sectionName } = payload;
      const { sections } = state;
      const newSections = Object.assign([], sections, [...sections, newSection(sectionName)]);
      message.success('Se agregó la sección correctamente');
      return {
        ...state,
        ...initialState,
        sections: newSections,
      };
    },
    showModal(state, { payload }) {
      return {
        ...state,
        ...payload,
        modalVisible: true,
      };
    },
    closeModal(state) {
      return {
        ...state,
        ...initialState,
      };
    },
  },
};
