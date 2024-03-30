import React from "react";
import useFetchCollection from "../customhook/useFetchCollection";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, store_users } from "../redux/Slices/UsersSlice";
import { useEffect } from "react";
import Loader from "../Loader";
import { toast } from "react-toastify";
import { deleteObject, ref } from "firebase/storage";
import { db, storage } from "../firebase/Config";
import { deleteDoc, doc } from "firebase/firestore";
import { FaPenAlt, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const ViewUsers = () => {
    let { data, isLoading } = useFetchCollection('users');
    const products = useSelector(selectUser);
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(store_users(data));
    }, [data, dispatch]);
  
    let handleDelete = async(id,imageURL) => {
      // Implement your delete functionality here
      //let deleteProduct=async(id,imageURL)=>{
        if(window.confirm('Are you sure you want to delete this')){
            try{
                await deleteDoc(doc(db,"users",id))
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
        <h1 className="text-primary">All Users</h1>
        <hr />
       
        <div className="table-responsive">
          <table className="table table-bordered table-striped table-hover">
            <thead>
              <tr>
                <th scope="col">id</th>
                <th scope="col">name</th>
                <th scope="col">email</th>
                <th scope="col">role</th>
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
                  let { id,username, imageURL, price, qty,brand,dese,email,role} = productb;
                  return (
                    <tr key={i}>
                      <td>{id}</td>
                      <td>{username}</td>
                      <td>{email}</td>
                      <td>{role}</td>
                     
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

export default ViewUsers;
