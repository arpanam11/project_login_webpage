import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from '../common/layout'; 

const Homepage = () => {
  const [projectData, setProjectData] = useState([]); 

  useEffect(() => {
    getProjectSite();
  }, []);

  const getProjectSite = async () => {
    try {
      const response = await axios.get('http://localhost:5000/project');
      setProjectData(response.data);
      console.log('Project data fetched:', response.data);
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Layout> 
      <div className='container'>
        <div className="row">
          <div className='col-lg-5 col-md-5 col-sm flex-container'>
            <div className="cardBox">
              {projectData.map((item, index) => (
                <div key={index}>
                  <p>{item.projectName}</p>
                </div>
              ))}
            </div>
          </div>
          <div className='col-lg-7 col-md-5 col-sm flex-container'>
            <p>fhi</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Homepage;
