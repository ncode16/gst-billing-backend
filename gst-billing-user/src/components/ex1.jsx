import { useEffect } from "react";
import { useState } from "react";

export default function App(){
    const[user ,setUser]= useState([]);

    useEffect(()=>{
        fetch("https://api.github.com/users")
        .then((responce)=>
            responce.json())
        .then((data)=>{
            setUser(data);
        })
    },[])
    return(
        <div id="1234">
            {
                user.map((users)=>{
              return(
                <div>
                    <span>
                        <img src={users.avatar_url} width={"30px"}/>
                    </span>
                    <span>{users.login.toUpperCase()}</span>
                </div>
              )
                })
            }
        </div>
    )
}