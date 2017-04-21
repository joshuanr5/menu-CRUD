import React from 'react';
import { connect } from 'dva';
import { Button } from 'antd';
import ModalSection from './ModalSection';
import MenuList from './MenuList';

const Menu = ({ dispatch, menu }) => {
  const { sections, modalType, modalVisible, modalShow } = menu;
  const sectionId = '';

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
    onEditSection() {
      console.log('editSection');
    },
  };

  const menuModalSectionProps = {
    // item: ...
    visible: modalVisible && modalShow === 'sections',
    type: modalType,
    onOk(data) {
      dispatch({
        type: 'menu/addSection',
        payload: data,
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
    </div>
  );
};

export default connect(({ menu }) => ({ menu }))(Menu);
