import React, { useEffect, useState } from "react";
import { FaPenAlt, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import useFetchCollection from "../../customhook/useFetchCollection";
import { useDispatch, useSelector } from "react-redux";
import { selectProduct, store_products } from "../../redux/Slices/productSlice";
import Loader from "../../Loader";
import { deleteDoc,doc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { storage } from "../../firebase/Config";
import { db } from "../../firebase/Config";

const ViewProducts = () => {
  let { data, isLoading } = useFetchCollection('products');
  const products = useSelector(selectProduct);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(store_products(data));
  }, [data, dispatch]);

  let handleDelete = async(id,imageURL) => {
    // Implement your delete functionality here
    //let deleteProduct=async(id,imageURL)=>{
      if(window.confirm('Are you sure you want to delete this')){
          try{
              await deleteDoc(doc(db,"products",id))
              await deleteObject(ref(storage,imageURL))
              toast.success("product deleted successfully")
          }
          catch(err){
            toast.error(err.message)
          }
      }
    }

  return (
    <div className="shadow p-3">
       {isLoading && <Loader/>}
      <h1 className="text-primary">All Products</h1>
      <hr />
     
      <div className="table-responsive">
        <table className="table table-bordered table-striped table-hover">
          <thead>
            <tr>
              <th scope="col">id</th>
              <th scope="col">name</th>
              <th scope="col">brand</th>
              <th scope="col">imageURL</th>
              <th scope="col">price</th>
              <th scope="col">countInStock</th>
              
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 ? (
              <tr>
                <td colSpan={9}>No Product Found</td>
              </tr>
            ) : (
              products.map((productb, i) => {
                let { id, name, imageURL, price, qty,brand,dese} = productb;
                return (
                  <tr key={i}>
                    <td>{id}</td>
                    <td>{name}</td>
                    <td>{brand}</td>
                    <td>
                      <img
                        src={imageURL}
                        style={{ width: "50px", height: "50px" }}
                        alt={name}
                      />
                    </td>
                    <td>{price}</td>
                    <td>{qty}</td>
                
                   
                    <td>
                      <Link
                        type="button"
                        className="btn btn-success me-2"
                        to={`/admin/edit/${id}`}
                      >
                        <FaPenAlt />
                      </Link>
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => handleDelete(id,imageURL)}
                      >
                        <FaTrashAlt />
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewProducts;
