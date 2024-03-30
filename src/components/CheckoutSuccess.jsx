import React from 'react'
import { Link } from 'react-router-dom'

const CheckoutSuccess = () => {
  return (
    <div className='container mt-5 p-3 shadow col-6'>
     <h3>Thank You For Your Order...</h3>  <hr />
      <Link type="button" class="btn btn-primary" to='/'>Shop Now</Link>
    </div>
  )
}

export default CheckoutSuccess
