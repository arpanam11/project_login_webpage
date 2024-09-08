import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from '../common/layout';
import {
  Container,
  Card,
  CardContent,
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import Swal from 'sweetalert2';
import Select from 'react-select'; // For dropdowns
import { Country, State, City } from 'country-state-city'; // For country-state-city data
import Fileupload from '../common/Fileupload';

const Project = () => {
  const [projectName, setProjectName] = useState('');
  const [country, setCountry] = useState(null);
  const [state, setState] = useState(null);
  const [city, setCity] = useState(null);
  const [image, setImage] = useState(null); // New state for image
  const [formData, setFormData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProjectId, setCurrentProjectId] = useState(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await axios.get('http://localhost:5000/project');
      setFormData(response.data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  const handleImageChange = (file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result); // Store the Base64 string
    };
    reader.readAsDataURL(file); // Convert the image to Base64 format
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const projectData = {
      projectName,
      location: {
        country: country ? country.name : '',
        state: state ? state.name : '',
        city: city ? city.name : '',
      },
      image, // Add the Base64 image string here
    };

    try {
      if (isEditing) {
        await axios.put(`http://localhost:5000/project/${currentProjectId}`, projectData);
        Swal.fire('Success', 'Project updated successfully!', 'success');
      } else {
        await axios.post('http://localhost:5000/project', projectData);
        Swal.fire('Success', 'Project added successfully!', 'success');
      }
      fetchProjects();
      resetForm();
    } catch (error) {
      console.error('Error:', error);
      Swal.fire('Error', 'An error occurred while saving the project.', 'error');
    }
  };

  const resetForm = () => {
    setProjectName('');
    setCountry(null);
    setState(null);
    setCity(null);
    setImage(null);
    setIsModalOpen(false);
    setIsEditing(false);
    setCurrentProjectId(null);
  };

  const handleEdit = (project) => {
    const selectedCountry = Country.getAllCountries().find((c) => c.name === project.country);
    const selectedState = selectedCountry ? State.getStatesOfCountry(selectedCountry.isoCode).find((s) => s.name === project.state) : null;
    const selectedCity = selectedState ? City.getCitiesOfState(selectedCountry.isoCode, selectedState.isoCode).find((c) => c.name === project.city) : null;

    setProjectName(project.projectName);
    setCountry(selectedCountry);
    setState(selectedState);
    setCity(selectedCity);
    setImage(project.image);
    setCurrentProjectId(project.id);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "Do you want to delete this project?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`http://localhost:5000/project/${id}`);
        Swal.fire('Deleted!', 'Project deleted successfully!', 'success');
        fetchProjects();
      } catch (error) {
        console.error('Error deleting project:', error);
        Swal.fire('Error', 'An error occurred while deleting the project.', 'error');
      }
    }
  };

  const columns = [
    {
      field: 'image',
      headerName: 'Image',
      width: 150,
      renderCell: (params) => (
        <img src={params.row.image} alt={params.row.projectName} style={{ width: '50px', height: '50px', borderRadius: '50%' }} />
      ),
    },
    { field: 'projectName', headerName: 'Project Name', width: 200 },
    { field: 'country', headerName: 'Country', width: 150 },
    { field: 'state', headerName: 'State', width: 150 },
    { field: 'city', headerName: 'City', width: 150 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 200,
      renderCell: (params) => (
        <>
          <Button
            variant="contained"
            color="success"
            onClick={() => handleEdit(params.row)}
            style={{ marginRight: '10px' }}
          >
            Edit
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => handleDelete(params.row.id)}
          >
            Delete
          </Button>
        </>
      ),
    },
  ];

  const rows = formData.map((project) => ({
    id: project.id,
    projectName: project.projectName,
    country: project.location.country,
    state: project.location.state,
    city: project.location.city,
    image: project.image,
  }));

  return (
    <Layout>
      <Container>
        <Card>
          <CardContent>
            <Typography variant="h4" className="text-center mt-4">
              Project Listing
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => { setIsModalOpen(true); setIsEditing(false); }}
              style={{ marginBottom: '20px', marginTop: '20px' }}
            >
              Create (+)
            </Button>
            <div style={{ height: 372, width: '100%' }}>
              <DataGrid
                rows={rows}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                checkboxSelection={false}
                pagination
              />
            </div>
          </CardContent>
        </Card>

        <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <DialogTitle>{isEditing ? 'Edit Project' : 'Add Project'}</DialogTitle>
          <DialogContent>
            <form onSubmit={handleSubmit} className='myform'>
              <TextField
                label="Project Name"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                required
                fullWidth
                margin="normal"
              />
              <br />
              <label>Location</label>
              <Select
                options={Country.getAllCountries().map((country) => ({ value: country, label: country.name }))}
                value={country ? { value: country, label: country.name } : null}
                onChange={(selectedOption) => {
                  setCountry(selectedOption.value);
                  setState(null);
                  setCity(null);
                }}
                placeholder="Select Country"
                isClearable
                required
              />
              {country && (
                <Select
                  options={State.getStatesOfCountry(country.isoCode).map((state) => ({ value: state, label: state.name }))}
                  value={state ? { value: state, label: state.name } : null}
                  onChange={(selectedOption) => {
                    setState(selectedOption.value);
                    setCity(null);
                  }}
                  placeholder="Select State"
                  isClearable
                  required
                />
              )}
              {state && (
                <Select
                  options={City.getCitiesOfState(country.isoCode, state.isoCode).map((city) => ({ value: city, label: city.name }))}
                  value={city ? { value: city, label: city.name } : null}
                  onChange={(selectedOption) => setCity(selectedOption.value)}
                  placeholder="Select City"
                  isClearable
                  required
                />
              )}
              <br />
              <label>Project Image</label>
              <Fileupload
                onChange={handleImageChange}
                image={image}
              />
              <DialogActions className='mt-5'>
                <Button onClick={() => setIsModalOpen(false)} color="error" variant="contained">
                  Cancel
                </Button>
                <Button type="submit" color="primary" variant="contained">
                  {isEditing ? 'Update Project' : 'Add Project'}
                </Button>
              </DialogActions>
            </form>
          </DialogContent>
        </Dialog>
      </Container>
    </Layout>
  );
};

export default Project;
