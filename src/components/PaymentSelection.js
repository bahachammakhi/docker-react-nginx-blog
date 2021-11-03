import React from "react";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FirebaseStore } from "../helper/firestore.js";

// Images
var CreditCardGlyph = require("./assets/creditcard-solid-resize.png");
var PayPalGlyph = require("./assets/paypal-71-889557-resize.png");

// import "../styles.css";

/*
 * TODO
 * Make this page great again
 * Send the user to the next screen
 */

function PaymentLayout() {
  const history = useHistory();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const onSubmit = (data, event) => {
    history.push({
      pathname: "/landing", // this should go to the next screen, which is filling out information regardnig the payment
      state: {
        response: "hey mom, no hands!",
        data: data // pass this to the next page
      }
    });
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <div>
          <img src={CreditCardGlyph} alt="logo" />
          <input
            id="cc"
            type="radio"
            value="credit_card"
            name="payment-type"
            {...register("payment", { required: true })}
          />
          <label for="cc">Credit Card</label>
        </div>
        <div>
          <img src={PayPalGlyph} alt="logo" />
          <input
            id="cc"
            type="radio"
            value="paypal"
            name="payment-type"
            {...register("payment", { require: true })}
          />
          <label for="cc">PayPal</label>
        </div>
      </div>
      <input type="submit" />
    </form>
  );
}
export default function Payment() {
  const history = useHistory();
  var datastore = new FirebaseStore("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm();

  const Title = () => (
    <h1>
      <b>Payment Method</b>
    </h1>
  );

  const onSubmit = (data, e) => {
    e.target.reset();
  };

  return (
    <div>
      <PaymentLayout />
    </div>
  );
}
