import React from 'react'
import './ContactFieldContainer.css'

import Field from '../field/Field'

const ContactFieldContainer = () => {
  return (
    <div className='contactFieldContainer'>
        <div className='contactInnerField'>
          <div className='contactForm'>
            <div className='formFieldContainer'>
              <Field title="Name" width="95" height="5" astrich="1" />
              <Field title="Phone" width="95" height="5" astrich="1" />
              <Field title="City" width="95" height="5" />
              <Field title="Country" width="95" height="5" />
             
              <Field title="Message" width="200" height="20" astrich="1" textarea="1" />
              <div className='submitButtonContainer'>
                <div className='submit-button'>Submit</div>
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default ContactFieldContainer