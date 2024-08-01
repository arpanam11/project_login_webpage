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
          <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d14888.363567975939!2d79.07580304999999!3d21.1089422!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1722429864542!5m2!1sen!2sin" style={{height:"200px" , width:"500px"}}  allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Homepage;
