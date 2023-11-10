import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";

import "../assets/images/sign-pic.jpg";
import "../components/Checkout/Checkout.css";

let stripePromise;

const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe('pk_test_51OAHHnHW6n5vZM7uXqcZcCBoooa5mM5zwlL9twRWoSXZ9Dfd8eqWaEKiDXQdGrmbpIIDusqpLcOtZiSmJYU3KNJZ00Z6wH7tzM');
  }

  return stripePromise;
};

const Checkout = () => {
  const [stripeError, setStripeError] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const item = {
    price: "price_1OAHKiHW6n5vZM7ugXgyodCu",
    quantity: 1
  };

  const checkoutOptions = {
    lineItems: [item],
    mode: "subscription",
    successUrl: `${window.location.origin}/success`,
    cancelUrl: `${window.location.origin}/cancel`
  };

  const redirectToCheckout = async () => {
    setLoading(true);
    console.log("redirectToCheckout");

    const stripe = await getStripe();
    const { error } = await stripe.redirectToCheckout(checkoutOptions);
    console.log("Stripe checkout error", error);

    if (error) setStripeError(error.message);
    setLoading(false);
  };

  if (stripeError) alert(stripeError);

  return (
    <div className="checkout">
      <h1>FitHub</h1>
      <p className="checkout-title">Contribution conformation</p>
      <img src="../assets/images/sign-pic.jpg" alt="motivational picture"></img>
      <h1 className="checkout-price">$3.99/month</h1>
      <p className="checkout-description">
      By clicking Accept below, you acknowledge that you will be making a recurring contribution of $3.99, plus any applicable taxes, to FitHub until you choose to cancel.
      </p>
      <button
        className="checkout-button"
        onClick={redirectToCheckout}
        disabled={isLoading}
      >
        <div className="grey-circle">
          <div className="purple-circle">
          </div>
        </div>
        <div className="text-container">
          <p className="text">{isLoading ? "Loading..." : "Accept"}</p>
        </div>
      </button>
    </div>
  );
};

export default Checkout;


