import React, { useContext, useEffect } from "react";
import { FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { ADD_TO_CART, CALCULATE_TOTAL, DECREASE, EMPTY_CART, REMOVE_FROM_CART, SAVE_URL, selectCart, selectTotal } from "../redux/Slices/cartSlice";
import { selectIsLoggedIn } from "../redux/Slices/authSlice";
import { useNavigate } from "react-router-dom";

 const Cart = () => {
 let cart=useSelector(selectCart)
 let total=useSelector(selectTotal)
 let loggdin=useSelector(selectIsLoggedIn)
 let navigate=useNavigate()

 let dispatch=useDispatch()
  useEffect(() => {
    dispatch(CALCULATE_TOTAL())
  },[cart]);
  let url=window.location.href
  let handleCart=()=>{
   if(loggdin){
    navigate('/checkoutDetails')
   }else{
    dispatch(SAVE_URL(url))
    navigate('/login')
   }
  }

  return (
    <div className="container mt-md-4 p-2 shadow">
      <h1> My Cart</h1>
      <hr />
      <div class="table-responsive mt-md-4">
        <table class="table table-bordered table-stiped">
          <thead>
            <tr>
              <th scope="col">Sr. no</th>
              <th scope="col">Name</th>
              <th scope="col">Image</th>
              <th scope="col">Price</th>
              <th scope="col">Quantity</th>
              <th scope="col">Total</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {cart.length === 0 ? (
              <tr>
                <td colSpan={7}>No Product in cart</td>
              </tr>
            ) : (
              <>
                {cart.map((c, i) => (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{c.name}</td>
                    <td>
                      <img
                        src={c.imageURL}
                        style={{ width: "50px", height: "50px" }}
                      />
                    </td>
                    <td>{c.price}</td>
                    <td>
                      <button onClick={()=>dispatch(DECREASE(c))}>-</button>
                      <input
                        value={c.cartqty}
                        readOnly
                        style={{ width: "40px" }}
                        className="text-center "
                      />
                      <button onClick={()=>dispatch(ADD_TO_CART(c))}>+</button>
                    </td>
                    <td>{c.price * c.cartqty}</td>
                    <td>
                      <button
                        type="button"
                        class="btn btn-danger"
                        onClick={()=>dispatch(REMOVE_FROM_CART(i))}
                        
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </>
            )}
          </tbody>
        </table>
      </div>
      <div className="row">
        <div className="col-md-2">
          <button
            type="button"
            class="btn btn-danger btn-lg mt-3"
            onClick={()=>dispatch(EMPTY_CART())}
          >
            Clear Cart
          </button>
        </div>
        <div class="col-md-3 offset-7 shadow p-3   ">
          <h3>
            Total :-<span class="float-end">{total}</span>
          </h3>
          <hr />
          <div class="d-grid gap-2 col-md-3">
            <button type="button" name="" id="" class="btn btn-warning" onClick={handleCart}>
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;