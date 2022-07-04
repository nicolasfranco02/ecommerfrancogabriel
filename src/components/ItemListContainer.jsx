
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ItemList from './ItemList'
import {collection , getDocs, getFirestore , query, where} from 'firebase/firestore';


function ItemListContainer() {
  const[loading,  setLoading]= useState(false)
  const[error, setError]= useState(false)
  const{id}= useParams();
  const [resultados, setResultado]=useState([])


 useEffect(()=>{
    const db= getFirestore();
    const prodColeccion= collection(db, 'item');

  if (id) {
    const q = query(prodColeccion , where('categoria','==',id));
    getDocs(q)
    .then((snapshot)=>{
      setResultado(snapshot.docs.map((doc)=>({...doc.data(), id: doc.id })));
     setLoading(true)
    })
     .catch((error)=>{
      setError(error)
    })
    .finally(()=>{
      setLoading(false)
    })
  }else{
  getDocs(prodColeccion)
  .then((snapshot)=>{
    setResultado(snapshot.docs.map((doc)=>({...doc.data(), id: doc.id })));
  })
   .catch((error)=>{
    setError(error)
      setLoading(false)
  })
  }
}, [id])


    return (
   <> 
   <div>{loading && "loading..."}</div>
   <div>{error && "hubo un error..."}</div>
    <div className='titulo'>
    <h1>nombre comercio</h1>
    </div>
    <div>
    <div className='titulo'>
      </div>
      <div className='titulo'>
    <h2>producto</h2>
    </div>
      <ItemList listaProd={resultados} />
    </div>
   
    </>
    );
    }

export default ItemListContainer;
