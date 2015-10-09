(function(root) {
  'use strict';
  var ApiUtil = root.ApiUtil = {
    fetchBenches: function () {
      $.getJSON(
        "/api/benches",
        function (benches) {
          ApiActions.receiveAll(benches);
        }
      );
    }
  };

}(this));
