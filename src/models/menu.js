// const menu = {
//   sections: [
//     {
//       id: 's1',
//       sectionName: 'Lasagnas',
//       products: [
//         {
//           id: 'p1',
//           productName: 'Carnibora',
//           productDescription: 'Queso, carne, tomate',
//           urlImage: 'http://unsplash.it/123',
//           price: 20,
//         },
//         {
//           ... other product
//         },
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

export default {
  namespace: 'menu',
  state: {
    sections: [],
    modalType: '', // add || delete || edit
    modalShow: '', // sections, products
    modalVisible: false,
  },
  subscriptions: {},
  effects: {},
  reducers: {},
};
