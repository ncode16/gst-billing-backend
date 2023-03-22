import React from 'react'
import './WhatsAppNumber.css'

const WhatsAppNumber = () => {
  const rightStyle = {
    display: "flex",
    justifyContent: "right"
  }
  return (
    <div className='whatsAppNumber rightAlign' style={rightStyle}>
        <div className='NumberContainer'>
            <span class="fa fa-whatsapp fa-x whatsapp-icon"></span>
            <span className='whatsapp-number'>
                <a>+121344555555</a>
            </span>
        </div>
    </div>
  )
}

export default WhatsAppNumber