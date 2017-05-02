import React from 'react';
import { Input, Icon, Button, Form } from 'antd';

const FormItem = Form.Item;

const LoginTab = ({
  onSubmit,
  form: {
    getFieldDecorator,
    validateFieldsAndScroll,
  },
}) => {
  function handleSubmit(e) {
    e.preventDefault();
    validateFieldsAndScroll((err, values) => {
      if (!err) {
        // aqui hacer la consulta y que me retorne true o false
        // guardar la respuesta en localStore
        // console.log('submit ->', values);
        // setTimeout(() => {
        //   onSubmit();
        // }, 300);
        onSubmit(values);
      }
    });
  }

  return (
    <Form style={{ paddingTop: '20px' }} onSubmit={handleSubmit}>
      <FormItem hasFeedback>
        {
          getFieldDecorator('email', {
            rules: [
              {
                required: true,
                message: 'Por favor, ingrese su e-mail',
              },
              {
                type: 'email',
                message: 'Por favor, ingrese un e-mail valido',
              },
            ],
          })(<Input prefix={<Icon type="mail" style={{ fontSize: 13 }} />} placeholder="Correo electronico" />)
        }
      </FormItem>
      <FormItem hasFeedback>
        {
          getFieldDecorator('password', {
            rules: [
              {
                required: true,
                message: 'Por favor, ingrese su contraseña',
              },
              {
                min: 8,
                whitespaces: true,
                message: 'La constraseña debe ser como minimo de 8 caracteres',
              },
            ],
          })(<Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="Contraseña" />)
        }
      </FormItem>
      <FormItem>
        <Button type="primary" htmlType="submit">Iniciar seccion</Button>
      </FormItem>
    </Form>
  );
};

export default Form.create()(LoginTab);
