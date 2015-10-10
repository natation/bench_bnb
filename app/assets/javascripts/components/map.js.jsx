(function(root) {
  'use strict';

  root.Map = React.createClass({
    getInitialState: function () {
      return {benches: BenchStore.all()};
    },
    _handleIdle: function () {
      var bounds = generateBounds(this.map);
      ApiUtil.fetchBenches(bounds);
      this._markers = updateMarkers(this._markers, bounds);
    },
    _onChange: function () {
      this.setState({benches: BenchStore.all()});
      this.state.benches.forEach(function (bench) {
        var marker = generateMarker(bench, this.map);
        addMarker(marker, this._markers);
      }, this);
    },
    componentDidMount: function () {
      var map = React.findDOMNode(this.refs.map);
      var sfLoc = {lat: 37.7758, lng: -122.435};
      var mapOptions = {
        center: sfLoc,
        zoom: 13
      };
      this.map = new google.maps.Map(map, mapOptions);
      this._markers = [];
      this.map.addListener("idle", this._handleIdle);
      BenchStore.addChangeListener(this._onChange);
    },
    render: function () {
      return (
        <div className="map" ref="map"></div>
      );
    }
  });

  function generateBounds (map) {
    var latLngBounds = map.getBounds(),
        northEastLatLng = latLngBounds.getNorthEast(),
        southWestLatLng = latLngBounds.getSouthWest(),
        nELat = northEastLatLng.lat(),
        nELng = northEastLatLng.lng(),
        sWLat = southWestLatLng.lat(),
        sWLng = southWestLatLng.lng();
    return {northEast: {lat: nELat, lng: nELng},
            southWest: {lat: sWLat, lng: sWLng}};
  }

  function updateMarkers (markers, bounds) {
    markers = _.filter(markers, function (marker) {
      var nELat = bounds.northEast.lat;
      var nELng = bounds.northEast.lng;
      var sWLat = bounds.southWest.lat;
      var sWLng = bounds.southWest.lng;
      var curLat = marker.position.lat();
      var curLng = marker.position.lng();
      var isInBounds = (curLat >= sWLat && curLat <= nELat) &&
                       (curLng >= sWLng && curLng <= nELng);
      if (!isInBounds) {
        marker.setMap(null);
      }
      return isInBounds;
    });
    return markers;
  }

  function addMarker (curMarker, markers) {
    var foundMarker = _.find(markers, function (marker) {
      var lat = marker.position.lat();
      var lng = marker.position.lng();
      var curLat = curMarker.position.lat();
      var curLng = curMarker.position.lng();
      return curLat === lat && curLng === curLng;
    });
    if (typeof foundMarker === 'undefined') {
      markers.push(curMarker);
    } else {
      curMarker.setMap(null);
    }
  }

  function generateMarker (bench, map) {
    var pos = {lat: parseFloat(bench.lat), lng: parseFloat(bench.lng)};
    var marker = new google.maps.Marker({
      position: pos,
      map: map,
      title: bench.description
    });
    return marker;
  }
}(this));
