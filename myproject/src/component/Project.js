import React, { useState, useEffect } from 'react';
import '../style/from.css';
import Layout from '../common/layout';
import axios from 'axios';

const Project = () => {
  const [projectName, setProjectName] = useState('');
  const [fromData, setFromData] = useState([]);
  const [country, setCountry] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await axios.get('http://localhost:5000/project');
      setFromData(response.data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const projectData = {
      projectName,
      location: {
        country,
        state,
        city
      }
    };

    try {
      const response = await axios.post('http://localhost:5000/project', projectData);
      if (response.status === 201) {
        alert('Project added successfully!');
        fetchProjects(); // Refresh the project list
        setProjectName('');
        setCountry('');
        setState('');
        setCity('');
        setIsModalOpen(false);
      } else {
        alert('Failed to add project.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while adding the project.');
    }
  };

  return (
    <Layout>
      <div className='container'>
        <div className='card'>
          <div className='card-title'>
            <h2 className='text-center mt-4'>Project Listing</h2>
          </div>
          <div className='card-body'>
            <div className='d-flex justify-content-end mb-4'>
              <button className='btn btn-info text-white' onClick={() => setIsModalOpen(true)}>Create (+)</button>
            </div>
            <table className='table table-bordered'>
              <thead className='bg-dark text-white'>
                <tr>
                  <td>Project Name</td>
                  <td>Country</td>
                  <td>State</td>
                  <td>City</td>
                </tr>
              </thead>
              <tbody>
                {fromData.map((project) => (
                  <tr key={project.id}>
                    <td>{project.projectName}</td>
                    <td>{project.location.country}</td>
                    <td>{project.location.state}</td>
                    <td>{project.location.city}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setIsModalOpen(false)}>&times;</span>
            <div className="project-form">
              <h2>Add Project</h2>
              <form onSubmit={handleSubmit}>
                <div>
                  <label>Project Name:</label>
                  <input
                    type="text"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label>Country:</label>
                  <input
                    type="text"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label>State:</label>
                  <input
                    type="text"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label>City:</label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                  />
                </div>
                <button type="submit">Add Project</button>
              </form>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Project;
