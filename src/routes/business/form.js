import React from 'react';
import { Form, Input, InputNumber, Icon, Select, Button, Upload, Modal, Alert, Spin, Switch, Col, Row, Checkbox } from 'antd';
import omit from 'lodash/omit';
import FormMap from '../../components/map';
import TimePicker from '../../components/time_picker';
import UploadButton from '../../components/common/upload-button';
import { getInitialFileList, getUrlFromFileList } from '../../lib/helpers';

let con = 0;

const CheckboxGroup = Checkbox.Group;

const formItemLayout = {
  labelCol: {
    xs: { span: 25 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 11 },
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 14,
      offset: 0,
    },
  },
};

const FormItem = Form.Item;
const Option = Select.Option;

const children = [];
for (let i = 10; i < 36; i++) {
  children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}

function normFile(e) {
  if (Array.isArray(e)) {
    return e;
  }
  return e && e.fileList;
}

class FormProfile extends React.Component {
  componentWillMount() {
    con = 0;

    if (this.props.data.saveButtonEnabled) {
      this.props.enableSaveButton(false);
      con = -1;
    }
  }
  componentWillUpdate() {
    const { alertErrorVisible } = this.props.data;
    if (alertErrorVisible) {
      const { toggleAlertError } = this.props;
      toggleAlertError(false);
    }
  }

  getStartEndTime = () => {
    const { getFieldValue } = this.props.form;
    return {
      ...getFieldValue('working_time'),
    };
  }

  getWorkingTime = (days) => {
    const workingTime = {};

    days.map((day) => {
      workingTime[day] = this.getStartEndTime();
      return {
        [day]: this.getStartEndTime(),
      };
    });
    return workingTime;
  }

  getTimeFromProps = () => {
    const { data } = this.props;
    const days = data.workingTime;
    for (const key in days) {
      return days[key];
    }
  }

  getDaysFromProps = () => {
    const { data } = this.props;
    const { workingTime } = data;
    const days = [];
    for (const key in workingTime) {
      days.push(key);
    }
    return days;
  }

  checkTime = (rule, value, cb) => {
    const { getFieldValue } = this.props.form;

    const { start, end } = getFieldValue('working_time');
    if (start === '' || end === '') {
      cb('Por favor, seleccione todos los campos');
    } else if (start >= end) {
      cb('startTime tiene que ser menor que endTime');
    } else {
      cb();
    }
  }

  handleSubmit = (e) => {
    const { validateFields, getFieldValue, getFieldsValue } = this.props.form;
    const { toggleAlertError, updateData } = this.props;
    e.preventDefault();
    validateFields((errors, fieldsValue) => {
      if (errors) {
        toggleAlertError(true);
        return;
      }
      this.getDaysFromProps();
      const { currentAddress, currentLocation } = getFieldValue('searchMap');
      const payload = Object.assign({}, omit(getFieldsValue(), ['starttime', 'endtime', 'workingDays', 'searchMap']), {
        url_logo: getUrlFromFileList(getFieldValue('url_logo')),
        url_cover: getUrlFromFileList(getFieldValue('url_cover')),
        working_time: this.getWorkingTime(getFieldValue('workingDays')),
        address: currentAddress,
        coordinates: currentLocation,
      });
      console.log('OK:payload', payload);
      updateData(payload);
    });
  }

  render = () => {
    const {
      data,
      showPreview,
      closePreview,
      toggleAlertError,
      form: {
        getFieldDecorator,
        getFieldValue,
      },
    } = this.props;
    con += 1;
    return (
      <div>
        {
          data.alertErrorVisible
            ? (
              <Alert
                message="Por favor, corrija los errores antes de guardar los cambios"
                type="error"
                onClose={toggleAlertError.bind(null, false)}
                closable
                showIcon
              />
            )
            : null
        }
        <br />
        <Spin spinning={data.loading} tip="Actualizando información">
          <Form layout="horizontal">
            <FormItem {...formItemLayout}>
              <h3>Información Básica</h3>
            </FormItem>
            <FormItem {...formItemLayout} label="Nombre">
              {
                getFieldDecorator('alias', {
                  initialValue: data.name,
                  rules: [
                    {
                      required: true,
                      message: 'Por favor, ingrese el nombre del negocio',
                    },
                    {
                      max: 50,
                      whitespace: true,
                      message: 'El nombre debe contener caracteres válidos menores a 50',
                    },
                  ],
                })(<Input />)
              }
            </FormItem>
            <FormItem {...formItemLayout} label="Descripción">
              {
                getFieldDecorator('description', {
                  initialValue: data.description,
                  rules: [
                    {
                      max: 140,
                      message: 'La descripción no puede ser de más de 140 caracteres',
                    },
                    {
                      whitespace: true,
                      message: 'Por favor, ingrese caracteres válidos',
                    },
                  ],
                })(<Input type="textarea" />)
              }
            </FormItem>
            <FormItem {...formItemLayout} label="Categorias">
              {
                getFieldDecorator('categories', {
                  initialValue: data.categories,
                  rules: [
                    {
                      required: true,
                      message: 'Por favor, seleccione al menos una categoría',
                    },
                  ],
                })(<Select
                  mode="multiple"
                  style={{ width: '100%' }}
                  placeholder="Seleccione una o más categorias"
                >
                  {children}
                </Select>)
              }
            </FormItem>
            <FormItem {...formItemLayout} label="Página de Facebook">
              {
                getFieldDecorator('facebook_page', { // facebook_id
                  initialValue: data.facebookPage,
                  rules: [
                    {
                      max: 50,
                      message: 'El link de la página no debe superar la cantidad permitida de caracteres',
                    },
                    {
                      whitespace: true,
                      message: 'Por favor, ingrese caracteres válidos',
                    },
                  ],
                })(<Input placeholder="PizzaRaul" addonBefore="https://www.facebook.com/" />)
              }
            </FormItem>
            <FormItem {...formItemLayout}>
              <h3>Imágenes</h3>
            </FormItem>
            <FormItem {...formItemLayout} label="Logo">
              {
                getFieldDecorator('url_logo', {
                  initialValue: getInitialFileList(data.logoPhoto),
                  valuePropName: 'fileList',
                  getValueFromEvent: normFile,
                })(<Upload
                  name="logo"
                  listType="picture-card"
                  action="//jsonplaceholder.typicode.com/posts/"
                  headers={{ authorization: 'authorization-text' }}
                  onPreview={showPreview}
                >
                  {
                    !(getFieldValue('url_logo') || []).length
                      ? <UploadButton />
                      : null
                  }
                </Upload>)
              }
            </FormItem>
            <FormItem {...formItemLayout} label="Portada">
              {
                getFieldDecorator('url_cover', {
                  initialValue: getInitialFileList(data.coverPhoto),
                  valuePropName: 'fileList',
                  getValueFromEvent: normFile,
                })(<Upload
                  name="cover"
                  listType="picture-card"
                  action="//jsonplaceholder.typicode.com/posts/"
                  headers={{ authorization: 'authorization-text' }}
                  onPreview={showPreview}
                >
                  {
                    !(getFieldValue('url_cover') || []).length
                      ? <UploadButton />
                      : null
                  }
                </Upload>)
              }
            </FormItem>
            <FormItem {...formItemLayout}>
              <h3>Local</h3>
            </FormItem>
            <FormItem
              labelCol={{
                xs: { span: 24 },
                sm: { span: 0 },
              }}
              wrapperCol={{
                xs: { span: 24 },
                sm: { span: 17 },
              }}
            >
              {
                <Row type="flex" justify="end" >
                  {
                    getFieldDecorator('searchMap', {
                      initialValue: {
                        currentAddress: data.address,
                        currentLocation: data.coordinates,
                      },
                      valuePropName: 'searchMap',
                    })(<FormMap />)
                  }
                </Row>
              }
            </FormItem>
            <FormItem {...formItemLayout}>
              <h3>Horario de Atención</h3>
            </FormItem>
            <FormItem label="Horario de atención" {...formItemLayout} >
              {
                getFieldDecorator('working_time', {
                  initialValue: this.getTimeFromProps(),
                  rules: [{
                    validator: this.checkTime,
                  }, {
                    required: true,
                  }],
                })(<TimePicker />)
              }
            </FormItem>
            <FormItem
              label="Dias de atención"
              labelCol={{
                xs: { span: 24 },
                sm: { span: 6 },
              }}
              wrapperCol={{
                xs: { span: 24 },
                sm: { span: 18 },
              }}
            >
              <Row>
                <Col span={14}>
                  {
                    getFieldDecorator('workingDays', {
                      initialValue: this.getDaysFromProps(),
                      rules: [
                        {
                          required: true,
                          message: 'Por favor, elija un dia',
                        },
                      ],
                    })(<CheckboxGroup
                      options={[
                        { label: 'LU', value: 'MO' },
                        { label: 'MA', value: 'TU' },
                        { label: 'MI', value: 'WE' },
                        { label: 'JU', value: 'TH' },
                        { label: 'VI', value: 'FR' },
                        { label: 'SA', value: 'SA' },
                        { label: 'DO', value: 'SU' },
                      ]}
                    />)
                  }
                </Col>
              </Row>
            </FormItem>
            <FormItem {...formItemLayout}>
              <h3>Parámetros de delivery</h3>
            </FormItem>
            <FormItem
              {...formItemLayout}
              label={(
                <span>
                  Pedido mínimo&nbsp;<strong>(S/)</strong>
                </span>
              )}
            >
              {
                getFieldDecorator('minOrderValue', {
                  initialValue: data.minOrderValue,
                  rules: [
                    {
                      required: true,
                      message: 'Por favor, ingrese un monto',
                    },
                  ],
                })(<InputNumber min={0} max={50} />)
              }
            </FormItem>
            <FormItem
              {...formItemLayout}
              label={(
                <span>
                  Costo de delivery&nbsp;<strong>(S/)</strong>
                </span>
              )}
            >
              {
                getFieldDecorator('deliveryValue', {
                  initialValue: data.deliveryValue,
                  rules: [
                    {
                      required: true,
                      message: 'Por favor, ingrese un monto',
                    },
                  ],
                })(<InputNumber min={0} max={50} />)
              }
            </FormItem>
            <FormItem
              {...formItemLayout}
              label={(
                <span>
                  Tiempo máximo&nbsp;<strong>(min)</strong>
                </span>
              )}
            >
              {
                getFieldDecorator('deliveryTime', {
                  initialValue: data.deliveryTime,
                  rules: [
                    {
                      required: true,
                      message: 'Por favor, ingrese una cantidad',
                    },
                  ],
                })(<InputNumber min={0} max={90} />)
              }
            </FormItem>
            <FormItem {...formItemLayout}>
              <h3>Métodos de pago aceptados</h3>
            </FormItem>
            <FormItem
              {...formItemLayout}
              label={(
                <span>
                  Efectivo/Cash <Icon type="credit-card" />
                </span>
              )}
            >
              {
                getFieldDecorator('switchCash', {
                  initialValue: data.switchCash,
                  valuePropName: 'checked',
                })(<Switch />)
              }
            </FormItem>
            <FormItem
              {...formItemLayout}
              label={(
                <span>
                  Visa Crédito y Débito <Icon type="credit-card" />
                </span>
              )}
            >
              {
                getFieldDecorator('switchVisa', {
                  initialValue: data.switchVisa,
                  valuePropName: 'checked',
                })(<Switch />)
              }
            </FormItem>
            <FormItem
              {...formItemLayout}
              label={(
                <span>
                  MasterCard Crédito y Débito <Icon type="credit-card" />
                </span>
              )}
            >
              {
                getFieldDecorator('switchMastercard', {
                  initialValue: data.switchMastercard,
                  valuePropName: 'checked',
                })(<Switch />)
              }
            </FormItem>
            <FormItem
              {...formItemLayout}
              label={(
                <span>
                  Diners Club <Icon type="credit-card" />
                </span>
              )}
            >
              {
                getFieldDecorator('switchDiners', {
                  initialValue: data.switchDiners,
                  valuePropName: 'checked',
                })(<Switch />)
              }
            </FormItem>
            <FormItem {...tailFormItemLayout}>
              <Button
                type="primary"
                onClick={this.handleSubmit}
                size="large"
                loading={false}
                disabled={!data.saveButtonEnabled}
              >
                Guardar Cambios
            </Button>
            </FormItem>
          </Form>
        </Spin>
        <Modal
          visible={data.previewModalVisible}
          onCancel={closePreview}
          footer={null}
        >
          <img alt="example" style={{ width: '100%' }} src={data.previewImage} />
        </Modal>
      </div>
    );
  }
}
export default Form.create({
  onValuesChange({ enableSaveButton }) {
    if (con < 2) return;
    enableSaveButton(true);
  },
})(FormProfile);

// TODO:
// Reset state values on quit or in successfully save
