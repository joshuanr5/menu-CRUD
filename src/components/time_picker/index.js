import React from 'react';
import { TimePicker as TimePickerAntd, Row, Col, Form, Button } from 'antd';

const TimePicker = () => {
  return (
    <Row style={{ backgroundColor: 'red' }}>
      <Col span={4} style={{ backgroundColor: 'black' }}>
        <TimePickerAntd />
      </Col>
      <Col span={1} style={{ backgroundColor: 'black' }}>
        <p className="ant-form-split">a</p>
      </Col>
      <Col span={4} style={{ backgroundColor: 'black' }}>
        <TimePickerAntd />
      </Col>
    </Row>
  );
};

const Testing = ({
  form: {
    getFieldDecorator,
    getFieldsValue,
  },
}) => {
  function checkSubmit(e) {
    e.preventDefault();
    const data = getFieldsValue();
    console.log(data);
  }
  return (
    <Form onSubmit={checkSubmit}>
      <Form.Item>
        {
          getFieldDecorator('timePicker', {
            valuePropName: 'asd',
          })(<TimePicker />)
        }
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit">Submit</Button>
      </Form.Item>
    </Form>
  );
};

export default Form.create()(Testing);

