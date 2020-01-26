import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const DeveloperForm = ({ onSubmit }) => {
  const [lat, setLatitude] = useState('');
  const [long, setLongitude] = useState('');
  const [githubUsername, setGithubUsername] = useState('');
  const [technologies, setTechnologies] = useState('');

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLatitude(latitude);
        setLongitude(longitude);
      },
      () => { },
      {
        timeout: 30000,
      },
    );
  }, []);

  const clearInputs = () => {
    setGithubUsername('');
    setTechnologies('');
  };

  const handleInputTechnologies = (event) => {
    const technologyList = event.target.value
      .split(',')
      .map((str) => str.trim());
    setTechnologies(technologyList);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await onSubmit({
      githubUsername,
      technologies,
      latitude: lat,
      longitude: long,
    });
    clearInputs();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="input-block">
        <label htmlFor="githubUsername">
          Usuário do GitHub
          <input
            id="githubUsername"
            name="githubUsername"
            required
            value={githubUsername}
            onChange={(event) => setGithubUsername(event.target.value)}
          />
        </label>
      </div>
      <div className="input-block">
        <label htmlFor="technologies">
          Tecnologias
          <input
            id="technologies"
            name="technologies"
            required
            value={technologies}
            onChange={handleInputTechnologies}
          />
        </label>
      </div>
      <div className="input-group">
        <div className="input-block">
          <label htmlFor="latitude">
            Latitude
            <input
              type="text"
              id="latitude"
              name="latitude"
              required
              value={lat}
              onChange={(event) => setLatitude(event.target.value)}
            />
          </label>
        </div>
        <div className="input-block">
          <label htmlFor="longitude">
            Longitude
            <input
              type="text"
              id="longitude"
              name="longitude"
              required
              value={long}
              onChange={(event) => setLongitude(event.target.value)}
            />
          </label>
        </div>
      </div>
      <button type="submit">Salvar</button>
    </form>
  );
};

DeveloperForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default DeveloperForm;
