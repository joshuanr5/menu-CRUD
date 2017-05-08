// TODO: exportar el componente TimePIcker
// TODO: importarlo en el form y aumentar la funcion checkTIme

import React from 'react';
import { TimePicker as TimePickerAntd, Row, Col, Form, Button } from 'antd';
import moment from 'moment';


class TimePicker extends React.Component {
  state = {
    workingTime: {
      start: '06:00',
      end: '22:00',
    },
  };
  componentWillMount() {
    const { onChange } = this.props;
    const initialValueProps = this.props['data-__meta'].initialValue;
    let initialValue = this.state.workingTime;

    if (initialValueProps) {
      initialValue = initialValueProps;
      this.setState({
        workingTime: initialValueProps,
      });
    }
    // onChange(initialValue);  // Al usar el onChange activa el boton submit
  }

  handleChange = (type, e) => {
    const { onChange } = this.props;
    this.disabledMinutes();
    if (!e) {
      this.setState({
        workingTime: {
          ...this.state.workingTime,
          [type]: '',
        },
      }, () => {
        onChange(this.state.workingTime);
      });
      return;
    }
    const { workingTime } = this.state;
    this.setState({
      workingTime: {
        ...workingTime,
        [type]: e.format('HH:mm'),
      },
    }, () => {
      // onChange(this.state.workingTime);
    });
  };

  disabledMinutes = () => {
    const minutes = [];
    let i = 0;
    while (i < 60) {
      if (i % 15 !== 0) {
        minutes.push(i);
      }
      i++;
    }
    return minutes;
  }
  render = () => {
    const { start, end } = this.state.workingTime;
    return (
      <Row >
        <Col span={5} >
          <TimePickerAntd
            defaultValue={moment(start, 'HH:mm')}
            disabledMinutes={this.disabledMinutes}
            hideDisabledOptions
            placeholder="start time"
            format="HH:mm"
            onChange={this.handleChange.bind(null, 'start')}
          />
        </Col>
        <Col span={1} >
          <p className="ant-form-split">a</p>
        </Col>
        <Col span={5} >
          <TimePickerAntd
            defaultValue={moment(end, 'HH:mm')}
            disabledMinutes={this.disabledMinutes}
            hideDisabledOptions
            placeholder="end time"
            format="HH:mm"
            onChange={this.handleChange.bind(null, 'end')}
          />
        </Col>
      </Row>
    );
  }
}

export default TimePicker;

// const Testing = ({
//   form: {
//     getFieldDecorator,
//     getFieldValue,
//     validateFieldsAndScroll,
//   },
// }) => {
//   function checkSubmit(e) {
//     e.preventDefault();
//     validateFieldsAndScroll((err, values) => {
//       if (!err) {
//         console.log('onSubmit ->', values);
//       }
//     });
//   }
//   function checkTime(rule, value, cb) {
//     const { start, end } = getFieldValue('workingTime');
//     if (start === '' || end === '') {
//       cb('Por favor, seleccione todos los campos');
//     } else if (start >= end) {
//       cb('startTime tiene que ser menor que endTime');
//     } else {
//       cb();
//     }
//   }
//   return (
//     <Form onSubmit={checkSubmit}>
//       <Form.Item>
//         {
          // getFieldDecorator('workingTime', {
          //   initialValue: {
          //     start: '08:00',
          //     end: '22:00',
          //   },
          //   rules: [{
          //     validator: checkTime,
          //   }, {
          //     required: true,
          //     message: 'hola',
          //   },
          //   ],
          // })(<TimePicker />)
//         }
//       </Form.Item>
//       <Form.Item>
//         <Button htmlType="submit">Submit</Button>
//       </Form.Item>
//     </Form>
//   );
// };

// export default Form.create()(Testing);

