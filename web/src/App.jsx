import React, { useEffect, useState } from 'react';

import api from './services/api';
import './global.css';
import './App.css';
import './Sidebar.css';
import './Main.css';
import DeveloperItem from './components/DeveloperItem';
import DeveloperForm from './components/DeveloperForm';

const filterDevByName = (dev, githubUsername) => dev.githubUsername !== githubUsername;

const App = () => {
  const [developers, setDevelopers] = useState([]);

  useEffect(() => {
    async function loadDevelopers() {
      const response = await api.get('/developers');
      setDevelopers(response.data);
    }
    loadDevelopers();
  }, []);

  const handleAddDeveloper = async (data) => {
    const response = await api.post('/developers', data);
    setDevelopers([...developers, response.data]);
  };

  const onEdit = async (developer) => {
    const { githubUsername } = developer;
    await api.put(`/developers/${githubUsername}`, developer);
    const location = {
      coordinates: [developer.longitude, developer.latitude],
    };
    const editedDeveloper = {
      ...developer,
      location,
    };
    const editedIndex = developers.findIndex((dev) => dev.githubUsername === githubUsername);
    const newDeveloperList = [...developers.slice(0, editedIndex),
      editedDeveloper, ...developers.slice(editedIndex + 1),
    ];
    setDevelopers(newDeveloperList);
  };

  const onDelete = async (githubUsername) => {
    await api.delete(`/developers/${githubUsername}`);
    setDevelopers(developers.filter((dev) => filterDevByName(dev, githubUsername)));
  };

  return (
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <DeveloperForm onSubmit={handleAddDeveloper} />
      </aside>
      <main>
        <ul>
          {developers.map((developer) => (
            <DeveloperItem
              key={developer.githubUsername}
              developer={developer}
              onDelete={onDelete}
              onEdit={onEdit}
            />
          ))}
        </ul>
      </main>
    </div>
  );
};

export default App;
