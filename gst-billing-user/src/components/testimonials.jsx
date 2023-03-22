import React from "react";
import CustomizedAccordions from "./FAQ/CustomizedAccordions";
import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material'

export const Testimonials = (props) => {
  return (
    <div id="faq">
      <div className="container">
        <div className="section-title text-center">
          <h2>Frequently asked questions</h2>
        </div>
        <CustomizedAccordions />
      </div>
      
    </div>
  );
};
