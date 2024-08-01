
import React ,{useState} from 'react'

import Layout from '../common/layout'

const Project = () => {
  const [projectName, setProjectName] = useState('');
  const [country, setCountry] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');

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
      const response = await fetch('http://localhost:5000/project', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(projectData)
      });

      if (response.ok) {
        alert('Project added successfully!');
        // Clear form fields
        setProjectName('');
        setCountry('');
        setState('');
        setCity('');
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
    </Layout>
  );
};
export default Project