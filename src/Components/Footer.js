import React from 'react'
import './CSS/footer.css'
const Footer = () => {
  return (
    <div className='footbar' >
     <ul className='foot-items'>
        {/* <li>Contact</li> */}
      </ul>
      <div style={{ textAlign: 'center', color: 'white', fontSize: '1.5rem', padding: '10px 0' }}>
        © Ziva. All rights reserved.
      </div>
    </div>
  )
}

export default Footer