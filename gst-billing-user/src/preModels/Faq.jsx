import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
 
const Features2=()=>{
    const[features, setFeatures]= useState('');

    const url = 'http://10.16.16.11:8000/api/list/feature';
    useEffect(()=>{
        getApi();
    },[])
    const getApi=()=>{
        axios.get(`${url}`)
        .then((responce)=>{
            const abc= responce.data.features.abc;
            setFeatures(abc);
        })
        .catch(error=> console.error('error',error));
    }
    console.log('result',features )
    return(
        <div>
 <h1>welcome</h1>
        </div>
    )
}
export default Features2;