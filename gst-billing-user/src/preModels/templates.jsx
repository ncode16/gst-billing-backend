import React from "react";
import { useState } from "react";
import { useEffect } from "react";

     const Nav= () => {
        const[image , setImage]=useState([])
    
        useEffect(()=>{
        fetch("https://api.github.com/users")
        .then((responce)=>responce.json())
        .then((data)=>setImage(data))
        },[]);
    
  return (
    <div id="team" className="text-center">
      <div className="container">
        <div className="col-md-8 col-md-offset-2 section-title">
          <h2>Our Templates</h2>

        </div>
        <div id="row">
          { image.map((d, i) => {
            return(
                <div key={`${d.name}-${i}`} className="col-md-3 col-sm-6 team">
                  <div className="thumbnail">
                    {" "}
                    <img src={d.avatar_url} alt="..." className="team-img" />
                  </div>
                </div>
           ) })
            }
        </div>
      </div>
    </div>
  );
};

export default Nav;