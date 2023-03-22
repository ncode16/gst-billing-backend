import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

    export const Gallery= () => {
        const[image, setImage]=useState([])
        
  
        const url='/api/list/template';
        
      
        useEffect(()=>{
            axios.get(`${url}`)
             .then((res) =>{
              setImage(res?.data?.data)
             })
              
             .catch((e) => console.log("eee", e));
          
           },[])
        // console.log("ppp",image.data);
    
        // useEffect(()=>{
        // fetch("https://api.github.com/users")
        // .then((responce)=>responce.json())
        // .then((data)=>setImage(data))
        // },[]);

        // const four= image. splice(0,8);
    
  return (
    <div id="team" className="text-center">
      <div className="container">
        <div className="col-md-8 col-md-offset-2 section-title">
          <h2>Our Templates</h2>
        </div>
        <div id="row">
          {  image&& image.length > 0 && image.map((d, i) => {
            return(
                <div key={`${d.name}-${i}`} className="col-md-3 col-sm-6 team">
                  <div className="thumbnail">
                    {" "}
                    <img src={d.template_image} alt="..." className="team-img" />
                  </div>
                </div>
           ) })
            }
        </div>
      </div>
    </div>
  );
};
