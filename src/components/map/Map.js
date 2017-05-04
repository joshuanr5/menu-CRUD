import React from 'react';
import ReactDOM from 'react-dom';
import './Map.less';

const mapStyles = [
  {
    featureType: 'all',
    stylers: [
      { saturation: -50 },
    ],
  }, {
    featureType: 'road.arterial',
    elementType: 'geometry',
    stylers: [
      { hue: '#00ffee' },
      { saturation: 30 },
    ],
  }, {
    featureType: 'poi.business',
    elementType: 'labels',
    stylers: [
      { visibility: 'on' },
    ],
  },
];


class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputStyle: {
        margin: '10px',
        padding: '5px',
        width: '25em',
        fontSize: 'large',
      },
    };
  }

  componentDidMount() {
    this.loadMap();
    this.loadSearchBox(this.props.currentAddress);
    this.loadMarker();
    this.loadCircle();
  }

  shouldComponentUpdate(nextProps, nextState) {
    let mustRender = nextProps.mustRender;
    if (JSON.stringify(this.state.inputStyle) !== JSON.stringify(nextState.inputStyle)) {
      mustRender = true;
    }
    return mustRender;
  }

  componentWillUpdate(nextProps) {
    if (nextProps.mustRender) {
      const { location, address } = nextProps.getLocation();
      const { lat, lng } = location;
      const center = new this.props.google.maps.LatLng(lat, lng);

      this.refs.autocomplete.value = address;

      this.circle.setCenter(center);

      this.map.setCenter(center);
      this.map.setZoom(19);

      this.marker.setPosition(center);

      this.props.changeRender();
    }
  }

  setAddress(location) {
    const { google } = this.props;
    const geocoder = new google.maps.Geocoder();

    geocoder.geocode({ location }, (results, status) => {
      if (status === this.props.google.maps.GeocoderStatus.OK) {
        const address = results[0].formatted_address;
        this.refs.autocomplete.value = address;
        this.props.setAddress(address);
      }
    });
  }

  loadMap() {
    if (this.map) return;
    const { google } = this.props;
    const maps = google.maps;
    const mapRef = this.refs.map;
    const nodeMap = ReactDOM.findDOMNode(mapRef);
    const zoom = this.map ? this.map.zoom : 12;
    const { location } = this.props.getLocation();
    const { lat, lng } = location;
    const center = new maps.LatLng(lat, lng);
    const mapConfig = {
      center,
      zoom,
      mapTypeControl: false,
      streetViewControl: false,
      styles: mapStyles,
    };
    this.map = new maps.Map(nodeMap, mapConfig);
  }

  loadMarker() {
    if (this.marker) return;
    const { google } = this.props;

    this.marker = new google.maps.Marker({
      map: this.map,
      draggable: true,
      icon: 'http://i.imgur.com/QZ81aYS.png',
    });

    this.marker.setPosition(this.map.getCenter());

    google.maps.event.addListener(this.marker, 'dragend', (e) => {
      const latLng = e.latLng;
      const lastLocation = this.circle.getCenter();
      const distance = this.props.google.maps.geometry.spherical.computeDistanceBetween(lastLocation, latLng);

      if (distance > 100) {
        this.circle.setCenter(latLng);
        this.setAddress({ lat: latLng.lat(), lng: latLng.lng() });
      }

      this.map.setCenter(latLng);
      this.props.onDragend(latLng);
    });
  }

  loadCircle() {
    if (this.circle) return;
    this.circle = new this.props.google.maps.Circle({
      map: this.map,
      radius: 100,
      fillCOlor: '#FF0000',
      fillOpacity: 0.15,
    });
    this.circle.setCenter(this.map.getCenter());
  }

  loadSearchBox(initialAddress) {
    if (this.searchBox) return;

    const { google } = this.props;
    const searchBoxNode = ReactDOM.findDOMNode(this.refs.autocomplete);

    this.searchBox = new google.maps.places.SearchBox(searchBoxNode);
    this.searchBox.bindTo('bounds', this.map);

    this.map.controls[google.maps.ControlPosition.LEFT_TOP].push(searchBoxNode);
    this.refs.autocomplete.value = initialAddress;

    google.maps.event.addListener(this.searchBox, 'places_changed', () => {
      if (this.timer) {
        clearTimeout(this.timer);
      }

      const places = this.searchBox.getPlaces();
      const place = places[0];
      if (!place) return;

      this.map.setCenter(place.geometry.location);
      this.map.setZoom(18);

      this.circle.setCenter(place.geometry.location);

      this.marker.setPosition(place.geometry.location);

      this.props.onFind(place.geometry.location);
      this.props.setAddress(this.refs.autocomplete.value);
    });
  }


  changeColor(color) {
    this.setState({
      inputStyle: { ...this.state.inputStyle, outlineColor: color },
    });
  }

  hanleChange = (e) => {
    const value = e.target.value;

    if (this.timer) {
      clearTimeout(this.timer);
    }

    this.timer = setTimeout(() => {
      this.functionTimer(value);
      this.props.setAddress(value);
    }, 500);
  }

  functionTimer(value) {
    if (value === '') {
      this.changeColor('black');
      return;
    }

    const { google } = this.props;
    const service = new google.maps.places.AutocompleteService();
    service.getPlacePredictions({ input: value }, (prediction, status) => {
      if (status === google.maps.places.PlacesServiceStatus.ZERO_RESULTS) {
        this.changeColor('red');
      } else {
        this.changeColor('black');
      }
    });
  }

  render() {
    const mapStyle = {
      width: '50%',
      height: '500px',
      minWidth: '500px',
    };
    return (
      <div ref="map" style={mapStyle} onClick={this.handleClick}>
        <input className="search-box" ref="autocomplete" type="text" style={this.state.inputStyle} placeholder="Escriba el lugar a buscar" onChange={this.hanleChange} />
      </div>
    );
  }
}

export default Map;
