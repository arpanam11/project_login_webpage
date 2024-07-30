import React from 'react'
import Sidebar from './Sidebar'
import Navbar from './Navbar'

const layout = ({children}) => {
  return (
    <div>
      <div className='main'>
        <div className='layout'>
          <Sidebar />
          <div className='contain'>
            <Navbar/>
            <div className='body-content'>
              {children}
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default layout