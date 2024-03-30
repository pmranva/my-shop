import React from 'react'
import { selectProduct, store_products } from '../redux/Slices/productSlice';
import { useDispatch, useSelector } from 'react-redux';
import useFetchCollection from '../customhook/useFetchCollection';
import { useEffect } from 'react';
import ProductList from './ProductList';
import { selectFliterProducts } from '../redux/Slices/filterSlice';

const Product = () => {
  let { data, isLoading } = useFetchCollection('products');
  const products = useSelector(selectProduct);
  const fproducts=useSelector(selectFliterProducts)
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(store_products(data));
  }, [data, dispatch]);
  return (
    <>
    {fproducts.length !=0 ?
    <ProductList products={fproducts}/>
    :
    <ProductList products={products}/>

   
    }
     </>
    
   
  )
}

export default Product
