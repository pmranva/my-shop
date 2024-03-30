import React, { useEffect, useState } from "react";
import CheckoutSummary from "./components/CheckoutSummary";
import { CountryDropdown } from "react-country-region-selector";
import { useDispatch, useSelector } from "react-redux";
import { selectcheckout, store_checkouts } from "./redux/Slices/checkoutSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CheckoutDetails = () => {
    let initialState={name:'',line1:'',line2:'',city:'',state:'',country:'',mobile:'',postal_code:''}
    let [shipingAddress,setShipingAddress]=useState({...initialState})
    let address=useSelector(selectcheckout)
    useEffect(()=>{
      setShipingAddress({...address})
    },[])
    let dispatch=useDispatch()
    let navigate=useNavigate()
    let handleSubmit=(e)=>{
     e.preventDefault()

    //  fetch('http://localhost:1000')
    //   .then((res)=>res.json().then((data)=>console.log(data)))
    //   .catch((err)=>{
    //     console.log(err)
    //     //toast.error(err)
    //   })
      
    dispatch(store_checkouts(shipingAddress))
       navigate('/checkout')
      
    }
   
  return (
    <div className="container">
      <div className="row shadow mt-5 p-3">
        <div className="col-6">
          <h1>Checkout Details</h1><hr />
          <form action="" onSubmit={handleSubmit}>
            
            <div class="form-floating mb-3">
              <input
                type="text"
                class="form-control" name="name" id="formId1" placeholder="" 
                value={shipingAddress.name} onChange={(e)=>setShipingAddress({...shipingAddress,name:e.target.value})}/>
              <label for="formId1">Name</label>
            </div>
            <div className="row">
            <div class="form-floating mb-3 col-6">
              <input
                type="text"
                class="form-control" name="line1" id="formId1" placeholder=""
                value={shipingAddress.line1} onChange={(e)=>setShipingAddress({...shipingAddress,line1:e.target.value})}/>
              <label for="formId1">Line1</label>
            </div>
       
           
            <div class="form-floating mb-3 col-6">
              <input
                type="text"
                class="form-control" name="line2" id="formId1" placeholder=""
                value={shipingAddress.line2} onChange={(e)=>setShipingAddress({...shipingAddress,line2:e.target.value})}/>
              <label for="formId1">Line2</label>
            </div>
            </div>
            <div className="row">
            <div class="form-floating mb-3 col-6">
              <input
                type="text"
                class="form-control" name="city" id="formId1" placeholder="" 
                value={shipingAddress.city} onChange={(e)=>setShipingAddress({...shipingAddress,city:e.target.value})}/>
              <label for="formId1">city</label>
            </div>
            
           
            <div class="form-floating mb-3 col-6">
              <input
                type="text"
                class="form-control" name="state" id="formId1" placeholder="" 
                value={shipingAddress.state} onChange={(e)=>setShipingAddress({...shipingAddress,state:e.target.value})}/>
              <label for="formId1">State</label>
            </div>
            </div>
            <div class="mb-3">
            <label for="formId1" className="">  Country</label>
            <CountryDropdown value={shipingAddress.country}  
             onChange={(val)=>setShipingAddress({...shipingAddress,country:val})} class='form-select' valueType="short">
              <input
                type="text"
                class="form-control" name="country" id="formId1" placeholder="" 
              />
              </CountryDropdown>
            </div>
           
            <div className="row">
            <div class="form-floating mb-3 col-6">
              <input
                type="number"
                class="form-control" name="mobile" id="formId1" placeholder="" 
                value={shipingAddress.mobile} onChange={(e)=>setShipingAddress({...shipingAddress,mobile:e.target.value})}/>
              <label for="formId1">Mobile</label>
            </div>
            <div class="form-floating mb-3 col-6">
              <input
                type="number"
                class="form-control" name="postal_code" id="formId1" placeholder="" 
                value={shipingAddress.postal_code} onChange={(e)=>setShipingAddress({...shipingAddress,postal_code:e.target.value})}/>
              <label for="formId1">Postal_code</label>
            </div>
            </div>
            <div class="d-grid gap-2">
              <button type="submit" name="" id="" class="btn btn-primary">proceed to Checkout</button>
            </div>
          </form>
        </div>
        <div className="col-6">
         <CheckoutSummary/>
        </div>
      </div>
    </div>
  );
};

export default CheckoutDetails;
