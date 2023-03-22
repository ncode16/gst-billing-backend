import React from 'react'
import './ContactUs.css'

// import WhatsAppNumber from './whatsAppNumber/WhatsAppNumber'
import ContactTitleContainer from './contactTitleContainer/ContactTitleContainer'
import ContactFieldContainer from './contactFieldContainer/ContactFieldContainer'
import ContactDetails from './contactDetails/ContactDetails'

const ContactUs = () => {
  return (
    <div className='contactUs'>
      <ContactTitleContainer />
      <ContactFieldContainer />
      <ContactDetails />
    </div>
  )
}

export default ContactUs