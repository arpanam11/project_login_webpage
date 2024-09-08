import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from '../common/layout';
import { Container, Grid, Card, CardContent, Typography } from '@mui/material';

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
  const getWeatherData = async () => {
    const apiKey = 'YOUR_OPENWEATHER_API_KEY'; // Replace with your OpenWeather API key

    const weatherPromises = projectData.map(async (item) => {
      const { city, country } = item.location;
      try {
        const response = await axios.get(
          //open weather API
          `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${apiKey}&units=metric`
        );
        return { city, weather: response.data };
      } catch (err) {
        console.error(`Failed to fetch weather for ${city}, ${country}:`, err);
        return { city, weather: null };
      }
    });

    const weatherResults = await Promise.all(weatherPromises);
    setWeatherData(weatherResults);
    console.log('Weather data fetched:', weatherResults);
  };
  const getWeatherForCity = (city) => {
    const weather = weatherData.find((data) => data.city === city);
    return weather ? weather.weather : null;
  };

  return (
    <Layout>
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={12} md={5}>
            <div className="cardBox">
              {projectData.map((item, index) => (
                <Card key={index} variant="outlined" style={{ marginBottom: '16px' }}>
                  <CardContent>
                    <Typography variant="h6">
                      {item.projectName}
                    </Typography>

                    <div className='d-flex'>
                      <div>      <img
                        src={item.image}
                        alt={item.projectName}
                        style={{ width: '90px', height: '90px', borderRadius: "10%" }}
                      /></div>
                      <div>  <p>  {item.location.country}</p>
                      {getWeatherForCity(item.location.city) ? (
                      <div>
                        <p>Temperature: {getWeatherForCity(item.location.city).main.temp} °C</p>
                        <p>Weather: {getWeatherForCity(item.location.city).weather[0].description}</p>
                        <p>Humidity: {getWeatherForCity(item.location.city).main.humidity}%</p>
                      </div>
                    ) : (
                      <p>Loading weather...</p>
                    )}
                      </div>
                    </div>



                  </CardContent>
                </Card>
              ))}
            </div>
          </Grid>
          <Grid item xs={12} md={7}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d14888.363567975939!2d79.07580304999999!3d21.1089422!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1722429864542!5m2!1sen!2sin"
              style={{ height: "400px", width: "100%" }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
};

export default Homepage;