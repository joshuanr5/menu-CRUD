// const menu = {
// sections: [
//   {
//     id: 's1',
//     sectionName: 'Lasagnas',
//     products: [
//       {
//         id: 'p1',
//         productName: 'Carnibora',
//         productDescription: 'Queso, carne, tomate',
//         urlImage: 'http://unsplash.it/123',
//         productPrice: 20,
//       },
//       {
//         ... other product
//       },
//     ],
//   },
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
  currentSectionId: '',
  currentProductId: '',
};

function newSection(sectionName) {
  return {
    id: uuid(),
    sectionName,
    products: [],
  };
}

function newProduct(productName, productDescription, productPrice) {
  return {
    id: uuid(),
    productName,
    productDescription,
    productPrice,
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
      const { sectionName } = payload.data;
      const { sections } = state;
      const newSections = Object.assign([], sections, [...sections, newSection(sectionName)]);
      message.success('Se agregó la sección correctamente');
      return {
        ...state,
        ...initialState,
        sections: newSections,
      };
    },
    deleteSection(state, { payload }) {
      const { id } = payload;
      const { sections } = state;
      const newSections = sections.filter(section => section.id !== id);
      message.success('Se eliminó la sección correctamente');
      return {
        ...state,
        sections: newSections,
      };
    },
    editSection(state, { payload }) {
      const { data: { sectionName }, id } = payload;
      const { sections } = state;
      const newSections = sections.map((section) => {
        if (section.id === id) {
          return {
            id,
            sectionName,
            products: section.products,
          };
        }
        return section;
      });
      message.success('Se editó la sección correctamente');
      return {
        ...state,
        ...initialState,
        sections: newSections,
      };
    },
    addProduct(state, { payload }) {
      const { data: { productName, productDescription, productPrice } } = payload;
      const product = newProduct(productName, productDescription, productPrice);
      const { currentSectionId, sections } = state;
      message.success('Se agregó el producto correctamente');
      return {
        ...state,
        ...initialState,
        sections: sections.map((section) => {
          if (section.id === currentSectionId) {
            return {
              ...section,
              products: [...section.products, product],
            };
          }
          return section;
        }),
      };
    },
    deleteProduct(state, { payload }) {
      const { sectionId, productId } = payload;
      const { sections } = state;
      message.success('Se eliminó el producto correctamente');
      return {
        ...state,
        sections: sections.map((section) => {
          if (section.id === sectionId) {
            const { products } = section;
            return {
              ...section,
              products: products.filter(product => (product.id !== productId)),
            };
          }
          return section;
        }),
      };
    },
    editProduct(state, { payload }) {
      console.log(payload);
      const { data, sectionId, productId } = payload;
      const { sections } = state;
      return {
        ...state,
        ...initialState,
        sections: sections.map((section) => {
          if (section.id === sectionId) {
            const { products } = section;
            return {
              ...section,
              products: products.map((product) => {
                if (product.id === productId) {
                  return Object.assign({}, product, data);
                }
                return product;
              }),
            };
          }
          return section;
        }),
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
