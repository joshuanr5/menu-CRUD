import React from 'react';
import omit from 'lodash/omit';
import GoogleApiComponent from '../../lib/google/GoogleApiComponent';
import Map from './Map';
// import LocalList from '../components/LocalList';

const __GAPI_KEY__ = 'AIzaSyDyeDEjXziWUwb6po-q1vy47vsw2QjYiQI';

class MapContainer extends React.Component {
  constructor(props) {
    super(props);
    const { currentAddress } = props.mapInfo;
    const { currentLocation } = props.mapInfo;
    this.state = {
      render: false,
      currentAddress,
      currentLocation: {
        lat: currentLocation.lat || '-12.054432177698004',
        lng: currentLocation.lng || '-77.1039048501953',
      },
    };

    this.handleLatChange = this.handleLatChange.bind(this);
    this.handleLngChange = this.handleLngChange.bind(this);
    this.handleFind = this.handleFind.bind(this);
    this.handleDragend = this.handleDragend.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleSave = this.handleSave.bind(this);
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


  handleSave() {
    const { lat, lng } = this.state.currentLocation;
    const address = this.state.currentAddress;

    if (address === '') return;

    // const local = {
    //   address,
    //   location: {
    //     lat,
    //     lng,
    //   },
    // };

    // this.props.dispatch({ type: 'mapInfo/saveLocal', payload: local });
    this.setState({
      locals: [...this.state.locals, { id, address, lat, lng }],
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
    const { currentLocation } = this.state;
    return (
      <div>
        {!this.props.loaded && 'loagind...'/* TODO: replace for a spin*/}
        {this.props.loaded &&
          <Map
            google={this.props.google}
            onFind={this.handleFind}
            onDragend={this.handleDragend}
            mustRender={this.state.render}
            getLocation={this.setLocation}
            setAddress={this.setAddress}
            changeRender={this.changeRender}
          />
        }
        {/*
          <hr />
          <span>lat: </span>
          <input
            className="lat"
            type="text"
            value={currentLocation.lat}
            onChange={this.handleLatChange}
            onBlur={this.handleBlur}
          />
          <span style={{ marginLeft: '2em' }}>lng: </span>
          <input
            className="lng"
            type="text"
            value={currentLocation.lng}
            onChange={this.handleLngChange}
            onBlur={this.handleBlur}
          />
          <hr />
          <LocalList locals={this.state.locals} onShowClick={this.handleShowClick} />
        */}
        <button style={{ marginLeft: '53em' }} onClick={this.handleSave}>Saves local</button>
      </div>
    );
  }
}

export default GoogleApiComponent({
  apiKey: __GAPI_KEY__,
})(MapContainer);

