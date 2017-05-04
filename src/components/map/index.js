import React from 'react';
import omit from 'lodash/omit';
import { Spin } from 'antd';
import GoogleApiComponent from '../../lib/google/GoogleApiComponent';
import Map from './Map';
// import LocalList from '../components/LocalList';

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

    this.handleLatChange = this.handleLatChange.bind(this);
    this.handleLngChange = this.handleLngChange.bind(this);
    this.handleFind = this.handleFind.bind(this);
    this.handleDragend = this.handleDragend.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    // this.handleSave = this.handleSave.bind(this);
    this.setAddress = this.setAddress.bind(this);
    this.handleShowClick = this.handleShowClick.bind(this);
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
    this.props.onChange(initialValue);
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

  handleLatChange(e) {
    const lat = e.target.value;
    const fc = lat[0] || '';
    const rs = lat.substr(1, lat.length - 1);

    if (fc === '-' || !isNaN(fc) || fc === '') {
      if (!isNaN(rs) || rs === '') {
        this.setState({
          render: false,
          currentLocation: { ...this.state.currentLocation, lat },
        });
      }
    }
  }

  handleLngChange(e) {
    const lng = e.target.value;
    const fc = lng[0] || '';
    const rs = lng.substr(1, lng.length - 1);

    if (fc === '-' || !isNaN(fc) || fc === '') {
      if (!isNaN(rs) || rs === '') {
        this.setState({
          render: false,
          currentLocation: { ...this.state.currentLocation, lng },
        });
      }
    }
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

  handleBlur() {
    this.setState({
      render: true,
    });
  }

  handleShowClick(local) {
    const { address, lat, lng } = local;

    this.setState({
      render: true,
      currentAddress: address,
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
    return (
      <Spin spinning={!this.props.loaded}>
        {this.props.loaded &&
          <Map
            google={this.props.google}
            onFind={this.handleFind}
            onDragend={this.handleDragend}
            mustRender={this.state.render}
            getLocation={this.setLocation}
            setAddress={this.setAddress}
            changeRender={this.changeRender}
            currentAddress={this.state.currentAddress}
          />
        }
      </Spin>
    );
  }
}

// MapContainer.defaultProps = {
//   google: GOOGLE,
// };

export default GoogleApiComponent({
  apiKey: __GAPI_KEY__,
})(MapContainer);

