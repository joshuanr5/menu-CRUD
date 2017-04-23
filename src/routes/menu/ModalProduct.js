import React from 'react';
import { Form, Modal, Input, InputNumber } from 'antd';

const Item = Form.Item;

const ModalProduct = ({
  item: {
    productName,
    productDescription,
    productPrice,
  },
  type,
  visible,
  onOk,
  onCancel,
  form: {
    validateFields,
    getFieldsValue,
    getFieldDecorator,
    resetFields,
  },
}) => {
  const onOkData = () => {
    validateFields((err) => {
      if (err) return;
      const data = {
        ...getFieldsValue(),
      };
      onOk(data, type);
      resetFields();
    });
  };

  const modalTextType = type === 'add' ? 'Crear' : 'Editar';
  const modalProductProps = {
    title: `${modalTextType} producto`,
    okText: modalTextType,
    closable: false,
    maskClosable: false,
    cancelText: 'Cancelar',
    visible,
    onOk: onOkData,
    onCancel() {
      onCancel();
      resetFields();
    },
  };

  return (
    <Modal {...modalProductProps}>
      <Form >
        <Item label="Nombre del producto">
          {
            getFieldDecorator('productName', {
              initialValue: productName,
              rules: [
                {
                  required: true,
                  message: 'Por favor, ingrese el nombre del producto',
                }, {
                  max: 100,
                  whitespaces: true,
                  message: 'El nombre debe contener 100 caracteres como maximo',
                },
              ],
            })(<Input />)
          }
        </Item>
        <Item label="Descripción del producto">
          {
            getFieldDecorator('productDescription', {
              initialValue: productDescription,
              rules: [
                {
                  required: true,
                  message: 'Por favor, ingrese la descripcion del producto',
                },
              ],
            })(<Input type="textarea" autosize={{ minRows: 2, maxRows: 4 }} />)
          }
        </Item>
        <Item label="Precio" labelCol={{ span: 3, offset: 0 }} >
          {
            getFieldDecorator('productPrice', {
              initialValue: productPrice,
              validationTrigger: ['onChange', 'onBlur'],
              rules: [
                {
                  required: true,
                  message: 'Llene el campo',
                },
              ],
            })(<InputNumber placeholder="0" min={0} max={50} />)
          }
        </Item>
      </Form>
    </Modal>
  );
};

export default Form.create()(ModalProduct);
