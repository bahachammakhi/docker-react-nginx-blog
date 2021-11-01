import React from "react";
import { useHistory } from "react-router-dom"; // needs to redirect to the drink selector
import { useForm } from "react-hook-form";
import { LocalDataStore } from "../helper/localdatastore.js"; // needs to have data passed in rather than hardcoded!
import { Location } from "../helper/location.js";
import { FirebaseStore } from "../helper/firestore.js";

import "../styles.css";

export default async function LocationSelectionMenu() {
  // either acquire the locations in sorted order or do it in this function
  // this data will come from Firestore
  // TODO: hook Firestore into the application

  var datastore = new FirebaseStore("");
  var container = [];

  async function gatherInformation() {
    // code
    var locations = await datastore.getAll("locations");
    locations.forEach((document) => {
      var sorted = Object.keys(document)
        .sort()
        .reduce(function (acc, key) {
          acc[key] = document[key];
          return acc;
        }, {});
      console.log(sorted);
      const [address, company, geolocation, queue_length] = Object.values(
        sorted
      );
      container.push(
        new Location(
          address,
          company,
          geolocation["_lat"],
          geolocation["_long"],
          queue_length
        )
      );
    });
    console.log("before container");
    console.log(container);
    // https://stackoverflow.com/questions/15593850/sort-array-based-on-object-attribute-javascript
    // Thank you ^
    container.sort(function (a, b) {
      return a.queue_length > b.queue_length
        ? 1
        : b.queue_length > a.queue_length
        ? -1
        : 0;
    });
    return container;
  }
  const Title = () => (
    <h1>
      <b>Select Location</b>
    </h1>
  );

  const Row = (packet) => (
    <p style={{ color: "white" }}>
      {packet.address} | {packet.name}
    </p>
  );
  async function parseInformation() {
    const information = await gatherInformation();
    var rows = [];

    information.forEach((document) => {
      rows.push(new Row(document));
    });
    return (
      <div>
        <Title />
        <div>Somthing</div>;
      </div>
    );
  }
  return await parseInformation();
}
