(function(root) {
  'use strict';
  var _benches = [];
  var CHANGE_EVENT = "CHANGE_EVENT";

  var resetBenches = function (benches) {
    _benches = benches;
  };

  var BenchStore = root.BenchStore = $.extend({}, EventEmitter.prototype, {
    all: function () {
      return _benches.slice();
    },
    addChangeListener: function (callback) {
      BenchStore.on(CHANGE_EVENT, callback);
    },
    removeChangeListener: function (callback) {
      BenchStore.removeListener(CHANGE_EVENT, callback);
    },
    dispatcherId: AppDispatcher.register(function (payload) {
      switch (payload.actionType) {
        case BenchConstants.BENCHES_RECEIVED:
          resetBenches(payload.benches);
          BenchStore.emit(CHANGE_EVENT);
          break;
      }
    })
  });
}(this));
