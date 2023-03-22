import React from 'react'
import './ContactTitleContainer.css'

const ContactTitleContainer = () => {
    const hightlightColor = {
        color: "#3654ff"
    }
  return (
    <div className='contactTitle'>
        <div className='contactTitleContainer'>
            <span className='contactTitle'>Simple Invoicing, Payments and GST app 🇮🇳</span>
            <div className='contactSubTitleContainer'>
                <div className='contactSubTitles'>
                    <span>
                        Don't wait to <span style={hightlightColor}>contact us!</span>
                    </span>
                    <span>We are ready whenever you are.</span>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ContactTitleContainer