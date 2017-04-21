import React from 'react';
import { connect } from 'dva';
import { Button } from 'antd';
import ModalSection from './ModalSection';

const Menu = ({ dispatch, menu }) => {
  const { sections, modalType, modalVisible, modalShow } = menu;
  const sectionId = '';
  console.log(menu);

  function onAddSection() {
    dispatch({
      type: 'menu/showModal',
      payload: {
        modalType: 'add',
        modalShow: 'sections',
      },
    });
  }
  function onEditSection() {

  }

  const menuModalSectionProps = {
    visible: modalVisible && modalShow === 'sections',
    type: modalType,
    onOk() {
      console.log('OK');
    },
    onCancel() {
      dispatch({
        type: 'menu/closeModal',
      });
    },
  };


  return (
    <div>
      <Button type="primary" onClick={onAddSection} >Crear sección</Button>
      <ModalSection {... menuModalSectionProps} />
    </div>
  );
};

export default connect(({ menu }) => ({ menu }))(Menu);
