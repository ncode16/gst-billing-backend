import React, { useEffect } from "react";
import { Box } from "@mui/system";
import axios from "axios";
import { useState } from "react";


export const Features = () => {
  const [feature, setFeature] = useState([])

  const url = '/api/list/feature';


  useEffect(() => {
    axios.get(`${url}`)
      .then((res) => {
        setFeature(res?.data?.data)
      })

      .catch((e) => console.log("eee", e));

  }, [])
  console.log("ppp", Image.data);




  return (
    <div id="features" className=" ">
      <div className="container">
        <div className="section-title  text-center">
          <h2>Features</h2>
        </div>
        <div  >

          {/* {
            feature&& feature.length > 0 && feature.map((d,i)=>(
              <div>{d.feature_name}</div>
            ))
          } */}
          <div class="row">
  <div class="col">{
            feature&& feature.length > 0 && feature.map((d,i)=>(
             <div>
               <img className="img4" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSa4l64LHxwo_VxnQZPzahtYRfvJ9M8jOes1w&usqp=CAU" width={'20px'}/>
              <span className="feature-3">{d.feature_name}</span>
             </div>
            ))
          }</div>
</div>
          {/* <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' }}>
            <div>{feature && feature.length > 0 && feature.map((d, i) => (
              <div>
                
               <ul><li className="img4" key={`${d}-${i}`}>
               <p> <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSa4l64LHxwo_VxnQZPzahtYRfvJ9M8jOes1w&usqp=CAU" width={'20px'}/>
               </p>
                 <p> {d.feature_name}</p>
                 </li></ul>
              </div>

            ))}</div>


          </Box> */}




        </div>
      </div>
    </div>

  )
}






// useEffect(()=>{
//   axios.get("http://adf5-122-179-159-115.ngrok.io/api/get/feature-and-faq-details")
//    .then((res) => console.log("rrr", res))
//    .catch((e) => console.log("eee", e));

//  },[])
// {
//   feature&& feature.length > 0 && feature.map((d,i)=>(
//     <div>{d.feature_name}</div>
//   ))
// }