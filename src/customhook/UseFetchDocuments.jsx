import { doc, getDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { db } from '../firebase/Config'

const UseFetchDocuments = (collectionname,documentId) => {
    let [document,setDocument]=useState(null)
    useEffect(()=>{
        getdocumentData()
    },[])
    let getdocumentData=async()=>{
        const docref=doc(db,collectionname,documentId)
        const docsnap=await getDoc(docref)
        if(docsnap.exists()){
            const obj={id:documentId,...docsnap.data()}
            setDocument(obj)
            console.log(obj)
        }else{
            toast.error("Document not found")
        }
    }
  return (
   {document}
  )
}

export default UseFetchDocuments
