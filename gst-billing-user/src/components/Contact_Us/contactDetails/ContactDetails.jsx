import React from 'react'
import WhatsAppNumber from '../whatsAppNumber/WhatsAppNumber'
import './ContactDetails.css'

const ContactDetails = () => {
    const rightAlign = {
        display: "flex",
        justifyContent: "center",
        position: "relative",
        left: "5vw"
    }
  return (
    <div className='contactDetails'>
        <div className='DetailsContainer'>
            <div className='details'>
                <span className='email2'>Email: <span className='email'>team@gstbilling.in</span></span>
            </div>
            <div className='details'>
                <div className='whatsAppNumber' style={rightAlign}>
                    <div className='NumberContainer'>
                        <span class="fa fa-whatsapp fa-x whatsapp-icon"></span>
                        <span className='whatsapp-number'>
                            <a>+121344555555</a>
                        </span>
                    </div>
                </div>
            </div>
            <div className='details'>
                <span>Join us to build a better tomorrow!</span>
            </div>
            <div className='details'>
                <span>Give us a call anytime, we endeavour to answer all enquiries.</span>
            </div>
        </div>
    </div>
  )
}

export default ContactDetails