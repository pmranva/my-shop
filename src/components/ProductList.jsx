import React from 'react'
import ProductItem from './ProductItem'
import Loader from '../Loader'

const ProductList = ({products}) => {
  return (
    <>
  {products.length==0 && <Loader/>}
  <div className='container'>
  <div className='row'>
  {products.map((product,i)=><ProductItem key={i} product={product}/>)}
  </div>
  </div>
   </>
  )
}

export default ProductList
