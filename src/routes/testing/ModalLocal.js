import React from 'react';
import { Checkbox, Form, Modal, Row, Col } from 'antd';
import TimePicker from '../../components/time_picker';
import FormMap from '../../components/map';

const FormItem = Form.Item;
const CheckboxGroup = Checkbox.Group;

const daysValues = {
  MO: 'Lunes',
  TU: 'Martes',
  WE: 'Miercoles',
  TH: 'Jueves',
  FR: 'Viernes',
  SA: 'Sabado',
  SU: 'Domingo',
};

const ModalLocal = ({
  data,
  visible,
  onOk,
  onCancel,
  form: {
    validateFields,
    getFieldValue,
    getFieldDecorator,
  },
}) => {
  // save data
  const onOkData = () => {
    validateFields((err, fieldsValue) => {
      if (err) return;
      const { currentAddress, currentLocation } = fieldsValue.searchMap;
      const payload = {
        address_name: currentAddress,
        business_alias: 'Central',
        coordinates: currentLocation,
        working_time: getWorkingTime(fieldsValue.workingDays, fieldsValue.working_time),
        district: data.district,

      };
      console.log('datos Guardados ->', payload);
      // onOk();
    });
  };

  // validator to TimePicker
  const checkTime = (rule, value, cb) => {
    const { start, end } = getFieldValue('working_time');
    if (start === '' || end === '') {
      cb('Por favor, seleccione todos los campos');
    } else if (start >= end) {
      cb('startTime tiene que ser menor que endTime');
    } else {
      cb();
    }
  };

  // validator to searchBox
  const checkSearchBox = (rule, value, cb) => {
    const { currentAddress } = getFieldValue('searchMap');
    if (currentAddress === '') {
      cb('Ingrese direccion');
    } else {
      cb();
    }
  };

  // convert prop data to Array ['MO','TU']
  const getDaysFromProps = () => {
    const days = [];
    const { working_time } = data;
    for (const day of working_time) {
      days.push(day.day_code);
    }
    return days;
  };

  const getWorkingTime = (workingDays, workingHours) => {
    const workingTime = [];
    for (const days of workingDays) {
      // console.log(days, daysValues[days],{
      //   day_code: days,
      //   day_name: daysValues[days],
      //   working_hours: workingHours,
      // })
      workingTime.push({
        day_code: days,
        day_name: daysValues[days],
        working_hours: workingHours,
      });
    }
    return workingTime;
  };

  const modalProps = {
    title: 'Titulo del modal',
    visible,
    okText: 'Guardar',
    cancelText: 'Cancelar',
    onOk: onOkData,
    onCancel,
  };

  const formItemLayout = {
    labelCol: {
      xs: { span: 25 },
      sm: { span: 7 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 11 },
    },
  };
  return (
    <Modal {...modalProps}>
      <Form layout="horizontal" >
        <FormItem {...formItemLayout}>
          <h3>Local</h3>
        </FormItem>
        <FormItem>
          {
            getFieldDecorator('searchMap', {
              initialValue: {
                currentAddress: data.address_name,
                currentLocation: data.coordinates,
              },
              valuePropName: 'searchMap',
              rules: [{
                validator: checkSearchBox,
              }],
            })(<FormMap />)
          }
        </FormItem>
        <FormItem {...formItemLayout}>
          <h3>Horario de Atención</h3>
        </FormItem>
        <FormItem label="Horario de atención"  >
          {
            getFieldDecorator('working_time', {
              initialValue: data.working_time[0].working_hours,
              rules: [{
                validator: checkTime,
              }, {
                required: true,
              }],
            })(<TimePicker />)
          }
        </FormItem>
        <FormItem
          label="Dias de atención"
        >
          <Row>
            <Col >
              {
                getFieldDecorator('workingDays', {
                  initialValue: getDaysFromProps(),
                  rules: [
                    {
                      required: true,
                      message: 'Por favor, elija un dia',
                    },
                  ],
                })(<CheckboxGroup
                  options={[
                    { label: 'Lun', value: 'MO' },
                    { label: 'Mar', value: 'TU' },
                    { label: 'Mie', value: 'WE' },
                    { label: 'Jue', value: 'TH' },
                    { label: 'Vie', value: 'FR' },
                    { label: 'Sab', value: 'SA' },
                    { label: 'Dom', value: 'SU' },
                  ]}
                />)
              }
            </Col>
          </Row>
        </FormItem>
      </Form>
    </Modal>
  );
};

export default Form.create()(ModalLocal);
