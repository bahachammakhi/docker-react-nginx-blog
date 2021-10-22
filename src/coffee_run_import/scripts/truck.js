(function (window) {
    "use strict";
    var App = window.App || {};

    class Truck {
        constructor(truckId, dataBase) {
            this.truckId = truckId;
            this.dataBase = dataBase;
        }

        createOrder(order) {
            var sorted = Object.keys(order)
                .sort()
                .reduce(function (acc, key) {
                    acc[key] = order[key];
                    return acc;
                }, {});

            const [
                cardnumber,
                coffee,
                email,
                expiration,
                size,
                strength,
                syrup,
                usercard,
            ] = Object.values(sorted);

            var message = `${size}${
                syrup.length > 0 ? " " + syrup : " "
            } ${coffee} , (${email}) [${strength}]`;

            var payload = {
                // change syrup to be a string in Firebase
                coffee: [coffee, syrup !== "None", "Coconut"],
                emailAddress: email,
                size: size,
                location: { h_: -118.01146, u_: 33.91685 },
            };

            var payment = {
                cardNumber: cardnumber,
                emailAddress: email,
                expiration: usercard,
            };
            // TODO : auto populate payment too
            return this.dataBase.add(email, payload);
        }
        deliverOrder(customer) {
            return this.dataBase.remove(customer);
        }

        getOrderCount() {
            return Object.keys(this.dataBase.data).length;
        }

        printOrders(printFunction) {
            return this.dataBase.getAll().then(
                function (orders) {
                    var customerIds = Object.keys(orders);
                    customerIds.forEach(
                        function (id) {
                            //console.log(orders[id]);
                            if (printFunction) {
                                printFunction(orders[id]);
                            }
                        }.bind(this)
                    );
                }.bind(this)
            );
        }
    }

    App.Truck = Truck;
    window.App = App;
})(window);
