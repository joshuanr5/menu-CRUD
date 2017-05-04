// /* eslint-disable */
// import React, { PropTypes as T } from 'react'
// import ReactDOM from 'react-dom'

// // import cache from './ScriptCache'
// import GoogleApi from './GoogleApi'

// let mapCache = null;
// let googleCache = null;
// const defaultMapConfig = {}
// export const wrapper = (options) => (WrappedComponent) => {
//   const apiKey = options.apiKey;
//   const libraries = options.libraries || ['places'];

//   class Wrapper extends React.Component {
//     constructor(props, context) {
//       super(props, context);

//       this.state = {
//         loaded: false,
//         map: null,
//         google: null
//       }
//     }


//     componentDidMount() {
//       const refs = this.refs;
//       console.log(window);
//       if (window.google && window.google.maps) {
//         googleCache = window.google;
//         mapCache = window.google.maps;
//       }
//       const maps = mapCache;
//       console.log('const maps')
//       const props = Object.assign({}, this.props, {
//         loaded: this.state.loaded
//       });

//       const mapRef = refs.map;

//       const node = ReactDOM.findDOMNode(mapRef);
//       let center = new maps.LatLng(this.props.lat, this.props.lng)

//       let mapConfig = Object.assign({}, defaultMapConfig, {
//         center, zoom: this.props.zoom
//       })

//       this.map = new maps.Map(node, mapConfig);

//       this.setState({
//         loaded: true,
//         map: this.map,
//         google: googleCache,
//       })
//     }

//     componentWillMount() {
//       const gsoogle = GoogleApi({
//         apiKey,
//         libraries,
//       });
//     }

//     render() {
//       const props = Object.assign({}, this.props, {
//         loaded: this.state.loaded,
//         map: this.state.map,
//         google: this.state.google,
//         mapComponent: this.refs.map
//       })
//       return (
//         <div>
//           <WrappedComponent {...props} />
//           <div ref='map' />
//         </div>
//       )
//     }
//   }

//   return Wrapper;
// }

// export default wrapper;

/* eslint-disable */
import React, { PropTypes as T } from 'react'
import ReactDOM from 'react-dom'

import cache from './ScriptCache'
import GoogleApi from './GoogleApi'

let mapsCache;
let googleCache;

const defaultMapConfig = {}
export const wrapper = (options) => (WrappedComponent) => {
  const apiKey = options.apiKey;
  const libraries = options.libraries || ['places'];

  class Wrapper extends React.Component {
    constructor(props, context) {
      super(props, context);

      this.state = {
        loaded: false,
        map: null,
        google: null
      }
    }

    componentDidMount() {
      const refs = this.refs;
      this.scriptCache.google.onLoad((err, tag) => {
        if (window.google && window.google.maps) {
          mapsCache = window.google.maps;
          googleCache = window.google;
        }
        const maps = mapsCache;
        const props = Object.assign({}, this.props, {
          loaded: this.state.loaded
        });

        const mapRef = refs.map;

        const node = ReactDOM.findDOMNode(mapRef);
        let center = new maps.LatLng(this.props.lat, this.props.lng)

        let mapConfig = Object.assign({}, defaultMapConfig, {
          center, zoom: this.props.zoom
        })

        this.map = new maps.Map(node, mapConfig);

        this.setState({
          loaded: true,
          map: this.map,
          google: googleCache,
        })
      });
    }

    componentWillMount() {
      this.scriptCache = cache({
        google: GoogleApi({
          apiKey: apiKey,
          libraries: libraries
        })
      });
    }

    render() {
      const props = Object.assign({}, this.props, {
        loaded: this.state.loaded,
        map: this.state.map,
        google: this.state.google,
        mapComponent: this.refs.map
      })
      return (
        <div>
          <WrappedComponent {...props} />
          <div ref='map' />
        </div>
      )
    }
  }

  return Wrapper;
}

export default wrapper;
