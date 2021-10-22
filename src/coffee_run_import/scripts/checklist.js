(function (window) {
    "use strict";
    var App = window.App || {};
    var $ = window.jQuery;

    class CheckList {
        constructor(selector) {
            if (!selector) {
                throw new Error("No selector provided");
            }
            this.$element = $(selector);
            if (this.$element.length == 0) {
                throw new Error(
                    "Could not find element with selector: " + selector
                );
            }
        }
        addRow(order) {
            this.removeRow(order.emailAddress);
            var rowElement = new Row(order);
            this.$element.append(rowElement.$element);
        }
        removeRow(email) {
            this.$element
                .find(`[value="${email}"]`)
                .closest('[data-coffee-order="checkbox"]')
                .remove();
        }
        addClickHandler(func) {
            this.$element.on(
                "click",
                "input",
                function (event) {
                    var email = event.target.value;
                    func(email).then(
                        function () {
                            this.removeRow(email);
                        }.bind(this)
                    );
                }.bind(this)
            );
        }
    }

    function Row(order) {
        // NOTE: make a table in the firebase store
        // to hold the values of known locations
        // Much like a dictionary, but we query with latitude and longitude

        var sorted = Object.keys(order)
            .sort()
            .reduce(function (acc, key) {
                acc[key] = order[key];
                return acc;
            }, {});

        const [coffee_order, email, location] = Object.values(sorted);

        const [coffee, syrup, milk] = coffee_order;

        var $div = $("<div></div>", {
            "data-coffee-order": "checkbox",
            class: "checkbox",
        });
        var $label = $("<label></label>");

        var $checkbox = $("<input></input>", {
            type: "checkbox",
            value: email,
        });

        var description = `${coffee} w/ ${
            syrup ? "" : "no "
        }sweetner, ${milk} ${email}`;

        $label.append($checkbox);
        $label.append(description);
        $div.append($label);

        this.$element = $div;
    }
    App.CheckList = CheckList;
    window.App = App;
})(window);
