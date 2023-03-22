
import React from "react";
import { Box } from "@mui/system";


export const About1 = () => {
    const arr =['Create invoice within 10 seconds',"Multiple invoice templates",

   " Delivery Challan",
    
   ' GSTR report',
    
    'Credit note',
    
    'Share invoices on WhatsApp and Email',
    
    'Payment reminders',
    
    'Integrated payment gateway',
    
    'Payment ledger',
    
    'POS billing',
    
   ' Thermal printing'];

   const arr2 =['Create invoice within 10 seconds',"Multiple invoice templates",

   " Delivery Challan",
    
   ' GSTR report',
    
    'Credit note',
    
    'Share invoices on WhatsApp and Email',
    
    'Payment reminders',
    
    'Integrated payment gateway',
    
    'Payment ledger',
    
    'POS billing',
    
   ' Thermal printing']

   return(
    <div id="features2">
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' }}>
  <div>{arr  ? arr.map((d, i) => ( <li key={`${d}-${i}`}>{d}</li>
                    ))  : "loading"}</div>
  <div>{arr  ? arr.map((d, i) => ( <li key={`${d}-${i}`}>{d}</li>
                    ))  : "loading"}</div>
                     <div>{arr  ? arr.map((d, i) => ( <ul key={`${d}-${i}`}><li>{d}</li></ul>
                    ))  : "loading"}</div>
   </Box>
    </div>
   )
}
    
//   return (
//     <div id="about">
//       <div className="container">
//         <div className="row">
//           <div>
//             {" "}
//             </div>
//           <div className="col-xs-12 col-md-6">
//             <div className="about-text">
//               <h3>Why Choose Us?</h3>
//               <div className="list-style">
//                 <div className="col-lg-6 col-sm-6 col-xs-12">
//                   <ul>
//                     {arr
//                       ? arr.map((d, i) => (
//                           <li key={`${d}-${i}`}>{d}</li>
//                         ))
//                       : "loading"}
//                   </ul>
//                 </div>
//                 <div className="col-lg-6 col-sm-6 col-xs-12">
//                   <ul>
//                     {arr2
//                       ? arr2.map((d, i) => (
//                           <li key={`${d}-${i}`}> {d}</li>
//                         ))
//                       : "loading"}
//                   </ul>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
