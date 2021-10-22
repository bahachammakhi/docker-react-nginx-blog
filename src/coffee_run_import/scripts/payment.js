(function (window) {
    var App = window.App || {};

    class Payment {
        constructor(provider, number, expiration) {
            this.provider = provider;
            this.number = number;
            this.expiration = expiration;
        }
    }
    App.Payment = Payment;
    Window.App = App;
})(window);
