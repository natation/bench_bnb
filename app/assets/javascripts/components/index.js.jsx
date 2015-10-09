(function(root) {
  'use strict';
    root.Index = React.createClass({
    getInitialState: function () {
      return {benches: BenchStore.all()};
    },
    _onChange: function () {
      this.setState({benches: BenchStore.all()});
    },
    componentDidMount: function () {
      BenchStore.addChangeListener(this._onChange);
      ApiUtil.fetchBenches();
    },
    componentWillUnmount: function () {
      BenchStore.removeChangeListener(this._onChange);
    },
    render: function () {
      return (
        <h1>HI</h1>
      );
    }
  });
}(this));
