import React, { useState, useEffect } from "react"; // importing useEffect here

import { useHistory } from "react-router-dom"; // needs to redirect to the drink selector
import { Location } from "../helper/location.js";
import { FirebaseStore } from "../helper/firestore.js";

async function gatherInformation() {
    var container = [];
    var datastore = new FirebaseStore("");

    var locations = await datastore.getAll("locations");
    locations.forEach((document) => {
        var sorted = Object.keys(document)
            .sort()
            .reduce(function (acc, key) {
                acc[key] = document[key];
                return acc;
            }, {});
        const [address, company, geolocation, queue_length] =
            Object.values(sorted);
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

/*
 * Sub components inside the LocationSelectionMenu
 */

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

const GatheredInformation = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    // useEffect with an empty dependency array works the same way as componentDidMount
    useEffect(async () => {
        try {
            // set loading to true before calling API
            setLoading(true);
            const data = await gatherInformation();
            setData(data);
            // switch loading to false after fetch is complete
            setLoading(false);
        } catch (error) {
            // add error handling here
            setLoading(false);
            console.log(error);
        }
    }, []);

    // return a Spinner when loading is true
    if (loading) return <span>Loading</span>;

    // data will be null when fetch call fails
    if (!data) return <span>Data not available</span>;

    var rows = [];
    data.forEach((doc) => {
        rows.push(Row(doc));
    });

    // when data is available, title is shown
    return <div id="divElement">{rows}</div>;
};

/*
 * Main component
 */

export default function LocationSelectionMenu() {
    // either acquire the locations in sorted order or do it in this function
    // this data will come from Firestore
    // TODO: hook Firestore into the application

    return (
        <div>
            <Title />
            <GatheredInformation />
        </div>
    );
}
