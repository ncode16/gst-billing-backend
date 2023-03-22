import React,{useState, useEffect} from 'react'

import {Navigation} from '../../components/navigation'
import { Header } from "../header";
import { Features } from "../features";
import { Gallery } from "../gallery";
import { Faqs } from "../faqs";
import { Contact } from "../contact";
import { Component1 } from "../login";
import { Login2 } from "../login2";

import JsonData from "../../data/data.json";
import Footer from '../footer.jsx/footer';


const Home = () => {
    const [landingPageData, setLandingPageData] = useState({});
    useEffect(() => {
        setLandingPageData(JsonData);
    }, []);

  return (
    <div className='home'>
        <Navigation />
        {landingPageData && (<><Header data={landingPageData.Header} />
        <Features data={landingPageData.Features} />
        <Gallery data={landingPageData.Gallery} />
        <Component1 data={landingPageData.About} />
        <Faqs data={landingPageData.Testimonials} />
        <Contact data={landingPageData.Contact} /></> )}
        <Footer/>
       
    </div>
  )
}

export default Home