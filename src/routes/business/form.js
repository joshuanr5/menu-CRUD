import React from 'react';
import { Form, Input, InputNumber, Icon, Select, Button, Upload, Modal, Alert, Spin, Switch, Col, TimePicker } from 'antd';
import moment from 'moment';
import FormMap from '../../components/map';
import UploadButton from '../../components/common/upload-button';
import { getInitialFileList, getUrlFromFileList } from '../../lib/helpers';

const InputGroup = Input.Group;

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
    validateFields((errors) => {
      if (errors) {
        toggleAlertError(true);
        return;
      }

      const payload = { // TODO: make working on aws image upload
        ...getFieldsValue(),
        logoPhoto: getUrlFromFileList(getFieldValue('logoPhoto')),
        coverPhoto: getUrlFromFileList(getFieldValue('coverPhoto')),
      };

      console.log('OK:payload', payload);
      updateData(payload);
    });
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
          <FormMap mapInfo={mapProps} />
          <FormItem
            label="Horario de atención"
            {...formItemLayout}
          >
            <Col span="6">
              <FormItem >
                {
                  getFieldDecorator('starttime', {
                    initialValue: moment('00:00', 'HH:mm'), //TODO: put the prop starTime
                    getValueFromEvent: (a, b) => {console.log('a',a);console.log('b',b);},
                    rules: [
                      {
                        required: true,
                        message: 'Por favor, poner starTime', //TODO: changes the message
                      },
                    ],
                  })(<TimePicker placeholder="start time" format="HH:mm" />)
                }
              </FormItem>
            </Col>
            <Col span="1">
              <p className="ant-form-split">a</p>
            </Col>
            <Col span="6">
              <FormItem>
                {
                  getFieldDecorator('endtime', {
                    initialValue: moment('23:00', 'HH:mm'), // TODO: put the prop endTime
                    rules: [
                      {
                        required: true,
                        message: 'Por favor, poner endTime', // TODO: changes the message
                      },
                    ],
                  })(<TimePicker placeholder="end time" format="HH:mm" />)
                }
              </FormItem>
            </Col>
          </FormItem>
          {/*
          <FormItem {...formItemLayout} label="Horario de atención">
            {
              getFieldDecorator('starttime', {
                initialValue: '',
                rules: [
                  {
                    required: true,
                    message: 'ocs starttime',
                  },
                ],
              })(
                <InputGroup>
                  <Col span={4}>
                    <Input />
                  </Col>
                  <Col span={1}>
                    {'a'}
                  </Col>
                  <Col span={4}>
                    <Input />
                  </Col>
                </InputGroup>,
                )
            }
          </FormItem>
          <Row gutter={8}>
            <Col span={3}>asd</Col>
            <Col span={12}>
              <Row gutter={4} justify="start">
                <Col span={10}>
                  <FormItem {...formItemLayout} label="Horario de atención">
                    {
                      getFieldDecorator('starttime', {
                        initialValue: '',
                        rules: [
                          {
                            required: true,
                            message: 'ocs starttime',
                          },
                        ],
                      })(
                        <InputGroup>
                          <Col span={4}>
                            asd
                          </Col>
                          <Col span={8}>
                            asd
                          </Col>
                        </InputGroup>,
                      )
                    }
                  </FormItem>
                </Col>
                <Col span={2}>a</Col>
                <Col span={10}>
                  <FormItem {...formItemLayout} colon={false}>
                    {
                      getFieldDecorator('endtime', {
                        initialValue: '',
                        rules: [
                          {
                            required: true,
                            message: 'ocs starttime',
                          },
                        ],
                      })(<Input />)
                    }
                  </FormItem>
                </Col>
              </Row>
            </Col>
            <Col span={8}>asd</Col>
          </Row>
            <FormItem {...formItemLayout} label="Dirección">
              {
                getFieldDecorator('address', {
                  initialValue: data.address,
                  rules: [
                    {
                      required: true,
                      whitespace: true,
                      message: 'Por favor, ingrese la dirección del negocio',
                    },
                    {
                      max: 200,
                      message: 'La dirección no puede ser de más de 200 caracteres',
                    },
                  ],
                })(<Input />)
              }
            </FormItem>
          */}

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
