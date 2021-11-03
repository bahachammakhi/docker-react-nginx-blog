import React from "react";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FirebaseStore } from "../helper/firestore.js";

import "../styles.css";

export default function Login() {
    const history = useHistory();
    var datastore = new FirebaseStore("");

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const validate_email = (email) => {
        return /.+@csu\.fullerton\.edu$/.test(email);
    };

    const onSubmit = (data, e) => {
        e.target.reset();
        // This will transition us into the next React component
        // https://stackoverflow.com/questions/60516300/how-to-use-in-reactjs-functional-component-history-push
        // Thank you StackOverflow, I am forver in debt to you

        const [emailAddress, password] = Object.values(data);
        if (!validate_email(emailAddress)) {
            // FIXME
            // Make this look cooler
            alert(`Oops, ${emailAddress} is not apart of a valid email domain`);
            reset({
                emailAddress: "",
                passwordProvided: "",
            });
        } else {
            // NOTE: this is how you add USERS | IE a sign up feature

            // datastore.add(
            // { emailAddress: emailAddress, password: password },
            // "users"
            // );

            // Obtain all users

            // (async () => {
            //   console.log(await datastore.getAll("users"));
            // })();

            // Obtain all users based on an attribute

            //(async () => {
            //  console.log(await datastore.get(emailAddress, "users", "emailAddress"));
            //})();

            // README: THIS WORKS
            (async () => {
                const value = await datastore.get(
                    emailAddress,
                    "users",
                    "emailAddress"
                );
                if (value.password !== password) {
                    alert(`Cannot authenticate ${emailAddress}! Try again!`);
                    reset({
                        emailAddress: "",
                        passwordProvided: "",
                    });
                } else {
                    history.push({
                        pathname: "/landing",
                        state: {
                            response: "hey mom, no hands!",
                        },
                    });
                }
                console.log(value);
            })();

            // NOTE:  this is how you remove a user

            // (async () => {
            //   await datastore.remove(emailAddress, "users", "emailAddress");
            // })();

            // (async () => {
            //   const value = await datastore.get(
            //     emailAddress,
            //     "users",
            //     "emailAddress"
            //   );
            //   console.log(value);
            // })();
        }
    };
    // This takes place of the render function

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label>Email Address</label>
                <input
                    type="text"
                    {...register("emailAddress", { required: true })}
                />
                {errors.emailAddress && <p>This is required</p>}

                <label>Password</label>
                <input
                    type="text"
                    {...register("passwordProvided", { required: true })}
                />
                {errors.passwordProvided && <p>This is required</p>}

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
                            emailAddress: "jareddyreson@csu.fullerton.edu",
                            passwordProvided: "1234",
                        })
                    }
                    value="Reset with values"
                />
            </form>
        </div>
    );
}
