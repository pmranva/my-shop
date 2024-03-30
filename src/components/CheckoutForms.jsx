import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CheckoutSummary from "./CheckoutSummary";
import { toast } from "react-toastify";
import { selectEmail, selectUserId } from "../redux/Slices/authSlice";
import { EMPTY_CART, selectCart, selectTotal } from "../redux/Slices/cartSlice";
import { selectcheckout } from "../redux/Slices/checkoutSlice";
import { Timestamp, addDoc, collection } from "firebase/firestore";
import { db } from "../firebase/Config";
import emailjs from "@emailjs/browser";

const CheckoutForms = () => {
  let [message, setMessage] = useState(null);
  let [isLoading, setIsLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client-secret"
    );
  }, [stripe]);

  let handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    setIsLoading(true);
    const confirmpayment = await stripe
      .confirmPayment({
        elements,
        confirmParams: {
          return_url: "http://localhost:3001/checkout-success",
        },
        redirect: "if_required",
      })
      .then((result) => {
        if (result.error) {
          toast.error(result.error.message);
          setMessage(result.error.message);
          return;
        }
        if (result.paymentIntent) {
          if (result.paymentIntent.status == "succeeded") {
            setIsLoading(false);
            toast.success("payment success");
            saveorder();
          }
        }
      });
    setIsLoading(false);
  };
  const userId = useSelector(selectUserId);
  const userEmail = useSelector(selectEmail);
  const cartItems = useSelector(selectCart);
  const totalAmount = useSelector(selectTotal);
  const shippingAddress = useSelector(selectcheckout);

  let saveorder = () => {
    const today = new Date();
    const date = today.toLocaleDateString();
    const time = today.toLocaleTimeString();
    const orderConfig = {
      userId,
      userEmail,
      totalAmount,
      cartItems,
      shippingAddress,
      orderDate: date,
      orderTime: time,
      orderStatus: "order placed",
      createdAt: Timestamp.now().toDate(),
    };
    try {
      addDoc(collection(db, "orders"), orderConfig);
      dispatch(EMPTY_CART());
      toast.success("order placed");
      emailjs
        .send(
          "service_q393d4r",
          "template_wni70ww",
          {
            user_email: orderConfig.userEmail,
            order_status: orderConfig,
            amount: orderConfig.totalAmount,
          },
          "N6MT6vStx-pErVhi9"
        )
        .then(
          (result) => {
            toast.success('order status updated')
            navigate("/checkout-success");
          },
          (error) => {
            console.log(error.text);
          }
        );
      
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="container ">
      <div className="row mt-5 p-3 shadow">
        <div className="col-6">
          <CheckoutSummary />
        </div>
        <div className="col-6">
          <form action="" onSubmit={handleSubmit}>
            <h1>Stripe Checkout</h1>
            <hr />
            <PaymentElement id="paymentelemnet"></PaymentElement>
            <div class="d-grid gap-2 mt-2">
              <button type="submit" name="" id="" class="btn btn-primary">
                {isLoading ? (
                  <div class="spinner-border text-warning" role="status">
                    <span class="sr-only"></span>
                  </div>
                ) : (
                  <span>(Pay Now)</span>
                )}
              </button>
            </div>
          </form>
          {message && <h5>{message}</h5>}
        </div>
      </div>
    </div>
  );
};

export default CheckoutForms;
