import React, { useEffect } from 'react'
import useFetchCollection from '../customhook/useFetchCollection'
import { useDispatch, useSelector } from 'react-redux'
import { selectorder, store_orders } from '../redux/Slices/oredrsSlice'
import { selectUserId } from '../redux/Slices/authSlice'
import Loader from '../Loader'

const MyOrders = () => {
  const {data,isLoading}=useFetchCollection('orders')
  const dispatch=useDispatch()

  useEffect(()=>{
      dispatch(store_orders(data))
  },[data])

  const userid=useSelector(selectUserId)
  const orders=useSelector(selectorder)
 const filterProducts= orders.filter((item)=>item.userId==userid)
  return (
    <div className='container shadow mt-3 p-3'>
      {isLoading && <Loader/>}
      <h1>My Orders</h1><hr />
      {filterProducts.length == 0 ? 
      <>no orders</>
    :
    <>
    <table className='table table-bordered table-hover'>
      <thead>
        <tr>
          <th>s/n</th>
          <th>Date</th>
          <th>Order Id</th>
          <th>Order Amount</th>
          <th>Order Status</th>
          <th>View</th>
        </tr>
      </thead>
      {filterProducts.map((order,i)=>{
        const{id,orderDate,orderTime,totalAmount,orderStatus}=order;
        return(
          <tr key={id}>
            <td>{i + 1}</td>
            <td>{orderDate} at {orderTime}</td>
            <td>{id}</td>
            <td>{'$'}{totalAmount}</td>
            <td>
              <p className={
                orderStatus !=="Delivered"
                ? "text-danger":"text-success"

              }>{orderStatus}</p>
            </td>
           <td>
              <button type="button" class="btn btn-primary">View</button>
           </td>
          </tr>
          
        )
      })}

    </table>
    </>}
    </div>
  )
}

export default MyOrders
