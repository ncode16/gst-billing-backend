import React from 'react'
import './Field.css'

const Field = ({title,width,height,astrich,textarea}) => {
    const fieldStyle = {
        width: `${width}%`,
        height: `${height}vw`
    }
  return (
    <div className='field' style={fieldStyle}>
        <div className='fieldTitleContainer'>
            <div className='fieldTitle'>
                { astrich && <span>*</span> }
                <span>{title}</span>
            </div>
        </div>
        <div className='fieldAreaContainer'>
            <div className='fieldArea'>
                {
                    textarea ? <textarea className='fieldAreaInput'></textarea> :
                    <input className='fieldAreaInput' type='text'/>
                }
            </div>
        </div>
    </div>
  )
}

export default Field