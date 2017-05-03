import React from 'react';
import { Form, Input, InputNumber, Icon, Select, Button, Upload, Modal, Alert, Spin, Switch, Col, Row, Checkbox } from 'antd';
import moment from 'moment';
import omit from 'lodash/omit';
import FormMap from '../../components/map';
import TimePicker from '../../components/time_picker';
import UploadButton from '../../components/common/upload-button';
import { getInitialFileList, getUrlFromFileList } from '../../lib/helpers';

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

const FormProfile = ({
  data,
  updateData,
  showPreview,
  closePreview,
  toggleAlertError,
  form: {
    getFieldDecorator,
    getFieldValue,
    getFieldsValue,
    validateFields,
  },
}) => {
  function handleSubmit(e) {
    e.preventDefault();
    validateFields((errors, fieldsValue) => {
      if (errors) {
        toggleAlertError(true);
        return;
      }

      console.log(getFieldValue('workingTime'))
      const payload = { // TODO: make working on aws image upload
        ...getFieldsValue(),
        logoPhoto: getUrlFromFileList(getFieldValue('logoPhoto')),
        coverPhoto: getUrlFromFileList(getFieldValue('coverPhoto')),
        workingTime: getWorkingTime(getFieldValue('workingDays')),
      };
      console.log(Object.assign({}, omit(getFieldsValue(), ['starttime', 'endtime', 'workingDays']), {
        logoPhoto: getUrlFromFileList(getFieldValue('logoPhoto')),
        coverPhoto: getUrlFromFileList(getFieldValue('coverPhoto')),
        workingTime: getWorkingTime(getFieldValue('workingDays')),
      }));
      console.log('OK:payload', payload);
      updateData(payload);
    });
  }

  function checkTime(rule, value, cb) {
    const { start, end } = getFieldValue('workingTime');
    if (start === '' || end === '') {
      cb('Por favor, seleccione todos los campos');
    } else if (start >= end) {
      cb('startTime tiene que ser menor que endTime');
    } else {
      cb();
    }
  }
  function getStartEndTime() {
    return {
      ...getFieldValue('workingTime'),
    };
  }

  function getWorkingTime(days) {
    const workingTime = {};

    days.map((day) => {
      workingTime[day] = getStartEndTime();
      return {
        [day]: getStartEndTime(),
      };
    });
    return workingTime;
  }

  const mapProps = {
    currentAddress: '',
    currentLocation: {
      lat: '',
      lng: '',
    },
  };

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
        <Form layout="horizontal" onSubmit={handleSubmit}>
          <FormItem {...formItemLayout}>
            <h3>Información Básica</h3>
          </FormItem>
          <FormItem {...formItemLayout} label="Nombre">
            {
              getFieldDecorator('name', {
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
              getFieldDecorator('facebookPage', {
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
              getFieldDecorator('logoPhoto', {
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
                  !(getFieldValue('logoPhoto') || []).length
                    ? <UploadButton />
                    : null
                }
              </Upload>)
            }
          </FormItem>
          <FormItem {...formItemLayout} label="Portada">
            {
              getFieldDecorator('coverPhoto', {
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
                  !(getFieldValue('coverPhoto') || []).length
                    ? <UploadButton />
                    : null
                }
              </Upload>)
            }
          </FormItem>
          <FormItem {...formItemLayout}>
            <h3>Local</h3>
          </FormItem>
          <FormItem>
            {
              getFieldDecorator('searchMap', {
                initialValue: {
                  currentAddress: 'asdasd',
                  currentLocation: {
                    lat: '12',
                    lng: '10',
                  },
                },
                valuePropName: 'searchMap',
              })(<FormMap mapInfo={mapProps} />)
            }
          </FormItem>
          <FormItem {...formItemLayout}>
            <h3>Horario de Atención</h3>
          </FormItem>
          <FormItem label="Horario de atención" {...formItemLayout}>
            {
              getFieldDecorator('workingTime', {
                initialValue: {
                  start: '08:00',
                  end: '22:00',
                },
                rules: [{
                  validator: checkTime,
                }, {
                  required: true,
                  message: 'hola',
                },
                ],
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
                    initialValue: null,
                    rules: [
                      {
                        required: true,
                        message: 'Por favor, elija un dia',
                      },
                    ]
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
              })(<InputNumber min={0} max={90}></InputNumber>)
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
              htmlType="submit"
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
};

export default Form.create({
  onValuesChange({ enableSaveButton }) {
    enableSaveButton();
  },
})(FormProfile);

// TODO:
// Reset state values on quit or in successfully save
