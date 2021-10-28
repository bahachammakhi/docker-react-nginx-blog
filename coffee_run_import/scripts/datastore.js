(function (window) {
    "use strict";
    var App = window.App || {};
    function DataStore() {
        this.data = {};
    }

    DataStore.prototype.add = function (email, order) {
        this.data[email] = order;
    };

    DataStore.prototype.get = function (email) {
        return this.data[email];
    };

    DataStore.prototype.getAll = function () {
        return this.data;
    };

    DataStore.prototype.remove = function (email) {
        delete this.data[email];
    };
    App.DataStore = DataStore;
    window.App = App;
})(window);
