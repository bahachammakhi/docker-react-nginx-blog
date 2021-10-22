(function (window) {
    "use strict";
    var App = window.App || {};

    window.FirebaseConfig = {
        apiKey: "AIzaSyA7RlUev9QF-28_vVFdjPpJQVpDVeM1ANU",

        authDomain: "coffeerunbackend.firebaseapp.com",

        projectId: "coffeerunbackend",

        storageBucket: "coffeerunbackend.appspot.com",

        messagingSenderId: "808358809443",

        appId: "1:808358809443:web:65ee44e006515414a00d56",

        measurementId: "G-TFHDTLZNTL",
    };

    firebase.initializeApp(window.FirebaseConfig);

    const firestore = firebase.firestore();

    App.Firestore = firestore;
    window.App = App;
})(window);
