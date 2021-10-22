(function (window) {
    "use strict";
    var App = window.App || {};
    var $ = window.jQuery;
    function FormHandler(selector) {
        if (!selector) {
            throw new Error("No selector provided!");
        }
        this.$formElement = $(selector);
        if (this.$formElement.length === 0) {
            throw new Error(
                "Could not find element with selector: " + selector
            );
        }
    }

    FormHandler.prototype.addSubmitHandler = function (fn) {
        this.$formElement.on("submit", function (event) {
            event.preventDefault();
            var data = {};
            $(this)
                .serializeArray()
                .forEach(function (item) {
                    data[item.name] = item.value;
                });
            fn(data).then(
                function () {
                    this.reset();
                    this.elements[0].focus();
                }.bind(this)
            );
        });
    };
    FormHandler.prototype.addInputHandler = function (fn) {
        console.log("Setting input handler for form");
        this.$formElement.on(
            "input",
            '[name="emailAddress"]',
            function (event) {
                var emailAddress = event.target.value;
                event.target.setCustomValidity(
                    fn(emailAddress)
                        ? `${emailAddress} is not an authorized email address!`
                        : ""
                );
            }
        );
    };
    App.FormHandler = FormHandler;
    window.App = App;
})(window);
