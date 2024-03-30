import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { selectProduct } from "../redux/Slices/productSlice";
import ReactImageMagnify from "react-image-magnify";
import UseFetchDocuments from "../customhook/UseFetchDocuments";
import Loader from "../Loader";
import { ADD_TO_CART, DECREASE, selectCart } from "../redux/Slices/cartSlice";

const ProductDetails = () => {
  const { id } = useParams();
  const products = useSelector(selectProduct);
  let dispatch = useDispatch();
  let cartItem = useSelector(selectCart);
  let cartIndex = cartItem.findIndex((item) => item.id == id);
  let cartData= cartItem.find((item) => item.id == id);

  //const productdetails = products.find((item) => item.id == id);
  let [product, setProduct] = useState(null);
  const { document } = UseFetchDocuments("products", id);
  // let { name, imageURL, price, brand } = productdetails;
  useEffect(() => {
    setProduct(document);
  }, [document]);

  return (
    <>
      {product == null ? (
        <Loader />
      ) : (
        <div className="container">
          <div className="row  mt-5 shadow p-3">
            <div className="col-6">
              {/* <img src={imageURL} alt="" className='img-fluid' /> */}

              <ReactImageMagnify
                {...{
                  smallImage: {
                    alt: product.name,
                    isFluidWidth: true,
                    src: product.imageURL,
                  },
                  largeImage: {
                    src: product.imageURL,
                    width: 1200,
                    height: 1800,
                  },
                }}
              />
            </div>
            <div className="col-6">
              <h4>{product.name}</h4>
              <p>{product.brand}</p>
              <p>{product.price}</p>
              {cartIndex == -1 ? (
                <>
                  <button class="btn btn-danger" onClick={()=>dispatch(ADD_TO_CART
                    (product))}>Add to cart</button>
                </>
              ) : (
                <>
                  <button onClick={()=>dispatch(DECREASE(product))}>-</button>
                  <input
                  value={cartData.cartqty}
                    readOnly
                    style={{ width: "40px" }}
                    className="text-center "
                  />
                  <button onClick={()=>dispatch(ADD_TO_CART(product))}>+</button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductDetails;
