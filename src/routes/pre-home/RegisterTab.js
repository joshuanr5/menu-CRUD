import React from 'react';
import { Form, Input, Button } from 'antd';
import './index.less';

const message = 'Por favor, no deje el campo vacio';
const FormItem = Form.Item;


class RegisterTab extends React.Component {
  state = {
    confirmDirty: false,
  };

  handleSubmit = (e) => {
    const { form } = this.props;
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('onSubmit -> ', values);
      }
    });
  }

  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({
      confirmDirty: this.state.confirmDirty || !!value,
    });
  }

  checkConfirm = (rule, value, callback) => {
    const { form } = this.props;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  }

  checkPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('password')) {
      callback('La contraseña no concuerda');
    } else {
      callback();
    }
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form style={{ paddingTop: '0px' }} onSubmit={this.handleSubmit}>
        <FormItem hasFeedback label="Nombres completos">
          {
            getFieldDecorator('fullName', {
              rules: [
                {
                  required: true,
                  message,
                },
              ],
            })(<Input />)
          }
        </FormItem>
        <FormItem hasFeedback label="Correo electronico">
          {
            getFieldDecorator('email', {
              rules: [
                {
                  required: true,
                  message,
                },
                {
                  type: 'email',
                  message: 'Por favor, ingrese un e-mail valido',
                },
              ],
            })(<Input />)
          }
        </FormItem>
        <FormItem hasFeedback label="Contraseña">
          {
            getFieldDecorator('password', {
              rules: [
                {
                  required: true,
                  message,
                },
                {
                  validator: this.checkConfirm,
                },
              ],
            })(<Input type="password" />)
          }
        </FormItem>
        <FormItem hasFeedback label="Confirmar contraseña">
          {
            getFieldDecorator('confirm', {
              rules: [
                {
                  required: true,
                  message,
                },
                {
                  validator: this.checkPassword,
                },
              ],
            })(<Input type="password" onBlur={this.handleConfirmBlur} />)
          }
        </FormItem>

        <FormItem>
          <Button type="primary" htmlType="submit">Registrarse</Button>
        </FormItem>
      </Form>
    );
  }
}

export default Form.create()(RegisterTab);
