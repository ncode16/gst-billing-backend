import React from "react";

export const Component1= (props) => {
  return (
    <div id="about">
      <div className="container">
        <div className="row">
         
          <div className="col-xs-12 col-md-6">
            <div className="about-text">
             
              <h2>GST filings made easy</h2>
              <p>{props.data ? props.data.paragraph : "loading..."}</p>
              <h3>Using Swipe, you can quickly generate GST reports to instantly file your returns.</h3>
            </div>
          </div>
          <div className="col-xs-12 col-md-6">
            {" "}
            <img src="https://getswipe.in/static/img/gst_filings.jpeg" className="img-responsive" alt="" />{" "}
          </div>
        </div>
      </div>
    </div>
  );
};