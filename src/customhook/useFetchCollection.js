import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import React, { useState } from "react";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { db } from "../firebase/Config";

const useFetchCollection = (collectionName) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    getCollection();
  }, []);
  let getCollection = () => {
    setIsLoading(true);

    try {
      const docRef = collection(db, collectionName);
      const q = query(docRef, orderBy("createdAt", "desc"));
      onSnapshot(q, (snapshot) => {
        const Alldata = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setData(Alldata);
        setIsLoading(false);
      });
    } catch(error) {
      setIsLoading(false);
      toast.error(error.message);
    }
  };
  return { data, isLoading };
};

export default useFetchCollection;
