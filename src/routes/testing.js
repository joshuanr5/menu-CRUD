import React from 'react';
import { Form } from 'antd';

class Comp extends React.Component {
  state = {
    location: {
      lat: '10',
      lng: '11',
    },
  }

  componentWillMount() {
    const { onChange } = this.props;
    const initialValueProps = this.props['data-__meta'].initialValue;
    let initialValue = this.state.location;

    if (initialValueProps) {
      initialValue = initialValueProps;
      this.setState({
        location: initialValueProps,
      });
    }

    onChange(initialValue);
  }

  setLocation = (coord, e) => {
    const { onChange } = this.props;
    const { location } = this.state;

    this.setState({
      location: {
        ...location,
        [coord]: e.target.value,
      },
    }, () => {
      onChange(this.state.location);
    });
  }

  render = () => {
    const { location } = this.state;

    return (
      <div>
        <label>Lat</label>
        <input value={location.lat} onChange={this.setLocation.bind(null, 'lat')} />
        <label>Lng</label>
        <input value={location.lng} onChange={this.setLocation.bind(null, 'lng')} />
      </div>
    );
  }
}

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
          getFieldDecorator('name', {
            initialValue: { lat: '666', lng: '999' },
            valuePropName: 'location',
          })(<Comp />)
        }
      </Form.Item>
      <Form.Item>
        <button>Submit</button>
      </Form.Item>
    </Form>
  );
};

export default Form.create()(Testing);
