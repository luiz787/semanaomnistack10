import React, { useEffect, useState } from 'react';

import api from './services/api';
import './global.css';
import './App.css';
import './Sidebar.css';
import './Main.css';
import DeveloperItem from './components/DeveloperItem';
import DeveloperForm from './components/DeveloperForm';

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
            />
          ))}
        </ul>
      </main>
    </div>
  );
};

export default App;
