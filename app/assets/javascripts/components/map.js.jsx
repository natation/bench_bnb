(function(root) {
  'use strict';
  root.Map = React.createClass({
    getInitialState: function () {
      return {benches: BenchStore.all()};
    },
    _onChange: function () {
      this.setState({benches: BenchStore.all()});
      this.state.benches.forEach(function (bench) {
      var pos = {lat: parseFloat(bench.lat), lng: parseFloat(bench.lng)};
      var marker = new google.maps.Marker({
        position: pos,
        map: this.map,
        title: bench.description
      });
      }.bind(this));
    },
    componentDidMount: function () {
      var map = React.findDOMNode(this.refs.map);
      var mapOptions = {
        center: {lat: 37.7758, lng: -122.435},
        zoom: 13
      };
      this.map = new google.maps.Map(map, mapOptions);
      BenchStore.addChangeListener(this._onChange);
    },
    render: function () {
      return (
        <div className="map" ref="map"></div>
      );
    }
  });
}(this));
