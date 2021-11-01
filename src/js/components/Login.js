/*
 * Login Portal
 * Example boiler plate React Component, please  base others off this model
 */

import React from "react";
import LocalDatastore from "../helper/localdatastore.js";

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.name = "Login";
        this.state = { value: "", password: "" };

        this.example = new LocalDatastore.LocalDataStore("");
        this.example.add("jareddyreson@csu.fullerton.edu", "order"); // test data

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    checkUser(user) {
        if (!this.validateEmail(user)) {
            alert("oops, this email is not allowd!");
        } else {
            if (!this.example.contains(user)) {
                alert("oops, could not find you!");
            } else {
                alert(`Access granted ${user}`);
            }
        }
    }

    validateEmail(email) {
        /*
         * Emails in the CSUF domain are the only ones allowed
         */
        return /.+@csu\.fullerton\.edu$/.test(email);
    }

    handleChange(event) {
        /*
         * Store the value from the form
         */
        //this.state[value]
        this.setState({ value: event.target.value });
    }

    handleSubmit(event) {
        /*
         * Validate the user
         */

        console.log(this.state.value);
        this.checkUser(this.state.value);
        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={handleSubmit(onSubmit)}>
                <label>First name</label>
                <input
                    type="text"
                    {...register("firstName", { required: true })}
                />
                {errors.firstName && <p>This is required</p>}

                <label>Last name</label>
                <input type="text" {...register("lastName")} />

                <input type="submit" />
                <input
                    style={{ display: "block", marginTop: 20 }}
                    type="reset"
                    value="Standard Reset Field Values"
                />
                <input
                    style={{ display: "block", marginTop: 20 }}
                    type="button"
                    onClick={() =>
                        reset({
                            firstName: "bill",
                            lastName: "luo",
                        })
                    }
                    value="Reset with values"
                />
            </form>
        );
    }
}
export default Login;
