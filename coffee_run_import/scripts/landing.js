(function (window) {
    "use strict";

    var App = window.App || {};
    var $ = window.jQuery;

    function Landing(selector) {
        if (!selector) {
            throw new Error("No selector provided");
        }
        this.$element = $(selector);
        if (this.$element.lenght == 0) {
            throw new Error(`Could not find element with selector ${selector}`);
        }
    }

    Landing.prototype.addModal = function (data) {
        var message = `Thank you for your payment ${data["emailAddress"]}`;
        var $p = $("<p></p>");
        $p.append(message);
        this.$element.append($p);
    };

    Landing.prototype.invokeModal = function () {
        this.$element.modal();
    };

    App.Landing = Landing;
    window.App = App;
})(window);
