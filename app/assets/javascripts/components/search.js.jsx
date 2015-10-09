(function(root) {
  'use strict';
  root.Search = React.createClass({
    render: function () {
      return (
        <div>
          <Map/>
          <Index/>
        </div>
      );
    }
  });
}(this));
