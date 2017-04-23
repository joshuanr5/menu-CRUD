import React from 'react';
import { connect } from 'dva';
import ModalSection from './ModalSection';
import ModalProduct from './ModalProduct';
import MenuList from './MenuList';

const Menu = ({ dispatch, menu }) => {
  const { sections, modalType, modalVisible, modalShow, currentSectionId, currentProductId } = menu;

  const menuListProps = {
    sections,
    onAddSection() {
      dispatch({
        type: 'menu/showModal',
        payload: {
          modalType: 'add',
          modalShow: 'sections',
        },
      });
    },
    onEditSection(sectionId) {
      dispatch({
        type: 'menu/showModal',
        payload: {
          modalType: 'edit',
          modalShow: 'sections',
          currentSectionId: sectionId,
        },
      });
    },
    onDeleteSection(sectionId) {
      dispatch({
        type: 'menu/deleteSection',
        payload: {
          id: sectionId,
        },
      });
    },
    onAddProduct(sectionId) {
      dispatch({
        type: 'menu/showModal',
        payload: {
          modalType: 'add',
          modalShow: 'products',
          currentSectionId: sectionId,
        },
      });
    },
    onDeleteProduct(sectionId, productId) {
      dispatch({
        type: 'menu/deleteProduct',
        payload: {
          sectionId,
          productId,
        },
      });
    },
    onEditProduct(sectionId, productId) {
      dispatch({
        type: 'menu/showModal',
        payload: {
          modalType: 'edit',
          modalShow: 'products',
          currentSectionId: sectionId,
          currentProductId: productId,
        },
      });
    },
  };

  const menuModalSectionProps = {
    item: sections.filter(section => section.id === currentSectionId)[0] || {},
    visible: modalVisible && modalShow === 'sections',
    type: modalType,
    onOk(data, type) {
      dispatch({
        type: `menu/${type}Section`,
        payload: {
          data,
          id: menu.currentSectionId,
        },
      });
    },
    onCancel() {
      dispatch({
        type: 'menu/closeModal',
      });
    },
  };
  let product = null;
  if (sections.length > 0 && currentSectionId && currentProductId) {
    const products = sections.filter(section => section.id === currentSectionId)[0].products;
    product = products.filter(prod => prod.id === currentProductId)[0];
  }
  const menuModalProductProps = {
    item: product || {},
    visible: modalVisible && modalShow === 'products',
    type: modalType,
    onOk(data, type) {
      dispatch({
        type: `menu/${type}Product`,
        payload: {
          data,
        },
      });
    },
    onCancel() {
      dispatch({
        type: 'menu/closeModal',
      });
    },
  };

  return (
    <div>
      <MenuList {...menuListProps} />
      <ModalSection {...menuModalSectionProps} />
      <ModalProduct {...menuModalProductProps} />
    </div>
  );
};

export default connect(({ menu }) => ({ menu }))(Menu);
