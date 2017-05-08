import React from 'react';
import omit from 'lodash/omit';
import { Spin } from 'antd';
import GoogleApiComponent from '../../lib/google/GoogleApiComponent';
import Map from './Map';

const __GAPI_KEY__ = 'AIzaSyDyeDEjXziWUwb6po-q1vy47vsw2QjYiQI';

class MapContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      render: false,
      currentAddress: '',
      currentLocation: {
        lat: '',
        lng: '',
      },
    };

    this.handleFind = this.handleFind.bind(this);
    this.handleDragend = this.handleDragend.bind(this);
    this.setAddress = this.setAddress.bind(this);
    this.changeRender = this.changeRender.bind(this);
    this.setLocation = this.setLocation.bind(this);
  }

  componentWillMount() {
    const initialValueProps = this.props['data-__meta'].initialValue;
    let initialValue = omit(this.state, ['render']);

    if (initialValueProps) {
      initialValue = initialValueProps;
      this.setState({
        ...initialValueProps,
      });
      const { currentAddress } = initialValueProps;
      this.setAddress(currentAddress);
    }
    // this.props.onChange(initialValue);
  }

  setAddress(address) {
    this.setState({
      currentAddress: address,
    }, () => {
      const dataChange = omit(this.state, ['render']);
      this.props.onChange(dataChange);
    });
  }

  setLocation() {
    return {
      location: this.state.currentLocation,
      address: this.state.currentAddress,
    };
  }

  handleFind(location) {
    const lat = location.lat().toString();
    const lng = location.lng().toString();
    this.setState({
      render: false,
      currentLocation: {
        lat,
        lng,
      },
    });
  }
  handleDragend(location) {
    const lat = location.lat().toString();
    const lng = location.lng().toString();
    this.setState({
      render: false,
      currentLocation: {
        lat,
        lng,
      },
    });
  }

  changeRender() {
    this.setState({
      render: false,
    });
  }

  render() {
    const location = this.state.currentLocation;
    const address = this.state.currentAddress;
    return (
      <Spin spinning={!this.props.loaded}>
        {!this.props.loaded}
        {this.props.loaded &&
          <div>
            <Map
              google={this.props.google}
              onFind={this.handleFind}
              onDragend={this.handleDragend}
              mustRender={this.state.render}
              getLocation={{ location, address }}
              setAddress={this.setAddress}
              changeRender={this.changeRender}
              currentAddress={this.state.currentAddress}
            />
          </div>
        }
      </Spin>
    );
  }
}

export default GoogleApiComponent({
  apiKey: __GAPI_KEY__,
})(MapContainer);

