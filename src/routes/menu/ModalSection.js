import React from 'react';
import { Modal, Form, Input } from 'antd';

const Item = Form.Item;

const ModalSection = ({
  // item = {},
  visible,
  type,
  onOk,
  onCancel,
  form: {
    validateFields,
    getFieldsValue,
    getFieldDecorator,
  },
}) => {

  const modalTextType = type === 'add' ? 'Crear' : 'Editar';
  const modalProps = {
    title: `${modalTextType} sección`,
    okText: modalTextType,
    closable: false,
    maskClosable: false,
    cancelText: 'Cancelar',
    visible,
    onOk,
    onCancel,
  };

  return (
    <Modal {...modalProps} >
      <Form layout="horizontal" >
        <Item label="Título de sección" extra="ejempls...">
          {
            getFieldDecorator('sectionName', {
              initialValue: '',
              rules: [
                {
                  required: true,
                  message: 'Por favor, ingrese el nombre de la sección',
                },
                {
                  max: 100,
                  whitespaces: true,
                  message: 'El título debe contener 100 caracteres como maximo',
                },
              ],
            })(<Input />)
          }
        </Item>
      </Form>
    </Modal>
  );
};

export default Form.create()(ModalSection);
