import React from "react";
import { useSelector } from "react-redux";
import { selectCart, selectTotal } from "../redux/Slices/cartSlice";
import { Link } from "react-router-dom";
import { FaArrowAltCircleLeft } from "react-icons/fa";

const CheckoutSummary = () => {
  const cartitem = useSelector(selectCart);
  const total = useSelector(selectTotal);

  return (
    <>
      <h1>Checkout Summary</h1>
      <hr />
      {cartitem.length == 0 ? (
        <>
          no item in cart <br />
          <Link to="/" className="btn btn-primary">
            <FaArrowAltCircleLeft /> Back to Shopping
          </Link>
        </>
      ) : (
        <>
          <div className="card p-2">
            <h4> Toal Item :- {cartitem.length}</h4>
            <h4> Cart Total :- {total}</h4>
            {cartitem.map((c, i) => 
               <div className="card p-2 mb-2" key={i}>
                <p>Item Name : {c.name}</p>
                <p>Item Price : {c.price}</p>
                <p>Total Quantity : {c.cartqty}</p>
                 </div>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default CheckoutSummary;
