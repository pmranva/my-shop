import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectCart, selectTotal } from "../redux/Slices/cartSlice";
import { selectcheckout } from "../redux/Slices/checkoutSlice";
import { selectEmail } from "../redux/Slices/authSlice";
import { toast } from "react-toastify";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForms from "./CheckoutForms";
const stripePromise = loadStripe(
  "pk_test_51O8z4GSItEJQzouWpXio8218IL8wRiNmcQv3fKPifDumhIKyEc8dxZBzhqAtv8Q96VY71JuTpi75Y09QCMg4eznC00xj6fXDpP"
);
const Checkout = () => {
  const [message, setMessage] = useState("initializing Checkoout");
  const [clientSecret, setClientSecret] = useState("");

  const cartItems = useSelector(selectCart);
  const totalAmount = useSelector(selectTotal);
  const shippingAddress = useSelector(selectcheckout);
  const userEmail = useSelector(selectEmail);
  const description = `myshop description email:${userEmail}`;

  useEffect(() => {
    fetch("http://localhost:1000/payment", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        cartItems,
        userEmail,
        shippingAddress,
        description,
        totalAmount,
      }),
    })
      .then((res) => {
        return res.json().then((data) => {
          console.log(data);
          setClientSecret(data.clientSecret);
        });
      })
      .catch(() => {
        setMessage("something went wrong");
        toast.error("something went wrong");
      });
  }, []);
  const apperance = { theme: "stripe" };
  const option = { clientSecret, apperance };
  return (
    <div className="container">
      {!clientSecret && <h1>{message}</h1>}
      {clientSecret && (
        <Elements options={option} stripe={stripePromise}>
          <CheckoutForms />
        </Elements>
      )}
    </div>
  );
};

export default Checkout;
