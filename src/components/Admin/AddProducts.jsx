import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { db, storage } from "../../firebase/Config";
import Loader from "../../Loader";
import { Timestamp, addDoc, collection, doc, setDoc } from "firebase/firestore";
import { useSelector } from "react-redux";
import { selectProduct } from "../../redux/Slices/productSlice";

const AddProducts = () => {
  const { id } = useParams();

  let categories = [
    "Men",
    "Women",
    "Kids",
    "Electronics",
    "Grocery",
    "Sports",
    "food",
  ];
  let initialState = {
    category: "",
    name: "",
    brand: "",
    price: "",
    dese: "",
    imageURL: "",
    qty: "",
  };
  
  let [product, setProduct] = useState({ ...initialState });
  let [uploadProgress, setUploadProgess] = useState(0);
  let [isLoading, setIsLoding] = useState(false);
  const navigate = useNavigate();
  let handleImage = (e) => {
    let file = e.target.files[0];
    const storageRef = ref(storage, `my-shop/${Date.now()}${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progess = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgess(progess);
      },
      (error) => {
        toast.error(error.message);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setProduct({ ...product, imageURL: downloadURL });
        });
      }
    );
  };

  const product1 = useSelector(selectProduct);
  const productEdit = product1.find((item) => item.id == id);
  console.log(productEdit);

  // useEffect(() => {
  //   const fetchData = [];
  //   db.database().ref().on('value', (snapshot) => {
  //     fetchData.push(snapshot.val());
  //     setData({ fetchData });
  //   });
  // }, []);


  useEffect(() => {
    if (id) {
      setProduct(productEdit);
    } else {
      setProduct({ ...initialState });
    }
  }, [id]);

  let handleProduct = (e) => {
    e.preventDefault();
    // alert(JSON.stringify(product));
    console.log(product);
    setIsLoding(true);
    if (!id) {
      try {
        addDoc(collection(db, "products"), {
          category: product.category,
          name: product.name,
          brand: product.brand,
          price: product.price,
          dese: product.dese,
          imageURL: product.imageURL,
          qty: product.qty,
          createdAt: Timestamp.now().toDate(),
        });

        setIsLoding(false);
        toast.success("product added");
        navigate("/admin/viewproducts");
      } catch (error) {
        setIsLoding(false);
        toast.error(error.message);
      }
    } else {
      if (product.imageURL != productEdit.imageURL) {
        deleteObject(ref(storage, productEdit.imageURL));
      }
      try {
        setDoc(doc(db, "products",id), {
          category: product.category,
          name: product.name,
          brand: product.brand,
          price: product.price,
          dese: product.dese,
          imageURL: product.imageURL,
          qty: product.qty,
          createdAt: productEdit.createdAt,
          editAt: Timestamp.now().toDate(),
        });

        setIsLoding(false);
        toast.success("product updeted");
        navigate("/admin/viewproducts");
      } catch (error) {
        setIsLoding(false);
        toast.error(error.message);
      }
    }
  };

  return (
    <div className="row shadow p-3">
      <div className="col-md-12">
        {isLoading && <Loader />}
        <form onSubmit={handleProduct}>
          <h1>{id ? "Edit" : "Add"} Product</h1>
          <hr />
          <div class="mb-3">
            <select
              class="form-select"
              name="category"
              value={product.category}
              onChange={(e) =>
                setProduct({ ...product, category: e.target.value })
              }
            >
              <option selected disabled value="">
                ------Choose Category------
              </option>
              {categories.map((c, i) => (
                <option key={i}>{c}</option>
              ))}
            </select>
          </div>

          <div className="row">
            <div class="form-floating mb-3 col-6">
              <input
                type="text"
                class="form-control"
                name="name"
                value={product.name}
                onChange={(e) =>
                  setProduct({ ...product, name: e.target.value })
                }
              />
              <label>Name</label>
            </div>

            <div class="form-floating mb-3 col-6">
              <input
                type="text"
                class="form-control"
                name="brand"
                value={product.brand}
                onChange={(e) =>
                  setProduct({ ...product, brand: e.target.value })
                }
              />
              <label>Brand</label>
            </div>
          </div>
          <div className="row">
            <div class="form-floating mb-3 col-6">
              <input
                type="number"
                class="form-control"
                name="price"
                value={product.price}
                onChange={(e) =>
                  setProduct({ ...product, price: e.target.value })
                }
              />
              <label>Price</label>
            </div>

            <div class="form-floating mb-3 col-6">
              <input
                type="number"
                class="form-control"
                name="qty"
                value={product.qty}
                onChange={(e) =>
                  setProduct({ ...product, qty: e.target.value })
                }
              />
              <label>Quantity</label>
            </div>
          </div>
          {uploadProgress == 0 ? null : (
            <div
              class="progress"
              role="progressbar"
              aria-label="Basic example"
              aria-valuenow="0"
              aria-valuemin="0"
              aria-valuemax="100"
            >
              <div class="progress-bar" style={{ width: `${uploadProgress}%` }}>
                {uploadProgress < 100
                  ? `uploading ${uploadProgress}`
                  : `upload complete ${uploadProgress}%`}
              </div>
            </div>
          )}
          <div class="form-floating mb-3 mt-2">
            <input
              type="file"
              class="form-control"
              name="imageURL"
              placeholder=""
              onChange={handleImage}
            />
            <label>Image</label>
          </div>
          {id && (
            <img
              src={product.imageURL}
              style={{ height: "50px", width: "50px" }}
            />
          )}
          <div class="mb-3">
            <label for="" class="form-label">
              Description
            </label>
            <textarea class="form-control" name="desc" rows="3"></textarea>
          </div>
          <button type="submit" class="btn btn-primary">
            {id ? "Update" : "Add"} product
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProducts;
