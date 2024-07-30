import React, { useState, useEffect } from 'react';
import '../style/homepage.css'
import axios from 'axios';

const Homepage = () => {
  const [projectdata, setprojectdata] = useState([])

  useEffect(() => {
    getProjectsite()
  }, [])


  const getProjectsite = async () => {
    try {
      const response = await axios.get('http://localhost:5000/project');
      setprojectdata(response.data)
      console.log('Login successful:', response.data);


    } catch (err) {
      console.error(err.message);
    }
  }
  return (
<div className='container'>
    <div className="row">
      <div className='col-lg-5 col-md-5 col-sm flex-container'>
        <div className="cardBox">
          {projectdata.map((item, index) => (
            <div key={index}>
              {
                <p>{item.projectName}</p>
              }
            </div>
          ))}
        </div>
      </div>
      <div className='col-lg-7 col-md-5 col-sm flex-container'>

      </div>
    </div>
    </div>

  )
}


export default Homepage;