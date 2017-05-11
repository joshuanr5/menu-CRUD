// import React from 'react';
// import { Form } from 'antd';

// class Comp extends React.Component {
//   state = {
//     location: {
//       lat: '10',
//       lng: '11',
//     },
//   }

//   componentWillMount() {
//     const { onChange } = this.props;
//     const initialValueProps = this.props['data-__meta'].initialValue;
//     let initialValue = this.state.location;

//     if (initialValueProps) {
//       initialValue = initialValueProps;
//       this.setState({
//         location: initialValueProps,
//       });
//     }

//     onChange(initialValue);
//   }

//   setLocation = (coord, e) => {
//     const { onChange } = this.props;
//     const { location } = this.state;

//     this.setState({
//       location: {
//         ...location,
//         [coord]: e.target.value,
//       },
//     }, () => {
//       onChange(this.state.location);
//     });
//   }

//   render = () => {
//     const { location } = this.state;

//     return (
//       <div>
//         <label>Lat</label>
//         <input value={location.lat} onChange={this.setLocation.bind(null, 'lat')} />
//         <label>Lng</label>
//         <input value={location.lng} onChange={this.setLocation.bind(null, 'lng')} />
//       </div>
//     );
//   }
// }

// const Testing = ({
//   form: {
//     getFieldDecorator,
//   getFieldsValue,
//   },
// }) => {
//   function checkSubmit(e) {
//     e.preventDefault();
//     const data = getFieldsValue();

//     console.log(data);
//   }

//   return (
//     <Form onSubmit={checkSubmit}>
//       <Form.Item>
//         {
//           getFieldDecorator('name', {
//             initialValue: { lat: '666', lng: '999' },
//             valuePropName: 'location',
//           })(<Comp />)
//         }
//       </Form.Item>
//       <Form.Item>
//         <button>Submit</button>
//       </Form.Item>
//     </Form>
//   );
// };

// export default Form.create()(Testing);


import React from 'react';
import { connect } from 'dva';
import { withRouter } from 'dva/router';
import { Button } from 'antd';
import omit from 'lodash/omit';
import ModalLocal from './ModalLocal';

class Test extends React.Component {
  // componentDidMount() {
  //   this.props.router.setRouteLeaveHook(this.props.route, () => {
  //     if (true) {
  //       return '¿Seguro que quieres dejar el formulario sin guardar?';
  //     }
  //   });
  // }
  handleClick = () => {
    this.props.dispatch({
      type: 'business/showModal',
    });
  }
  convertBusinessToProps = () => {

  }

  render = () => {
    const { dispatch } = this.props;
    const { business_addresses, modalLocalVisible } = this.props.business;
    const district = business_addresses[0].district;
    const data = {
      ...omit(business_addresses[0], ['creation_date', 'status', 'id', 'business_id', 'district_id', 'district']),
      district: omit(district, ['city_id', 'id']),
    };
    const modalLocalProps = {
      data,
      // visible: modalLocalVisible,
      visible: true,
      onOk(dataSaved) {
        dispatch({
          type: 'business/editLocal',
          payload: dataSaved,
        });
      },
      onCancel() {
        dispatch({
          type: 'business/closeModal',
        });
      },
    };
    return (
      <div>
        <Button onClick={this.handleClick}>Open modal</Button>
        <ModalLocal {...modalLocalProps} />
      </div>
    );
  }

}

export default connect(({ business }) => ({ business }))(withRouter(Test));

