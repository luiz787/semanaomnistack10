import React from 'react';
import PropTypes from 'prop-types';

import './styles.css';

const DeveloperItem = ({ developer }) => (
  <li className="dev-item">
    <header>
      <img src={developer.avatarUrl} alt={developer.name} />
      <div className="user-info">
        <strong>{developer.name}</strong>
        <span>{developer.technologies.join(', ')}</span>
      </div>
    </header>
    <p>{developer.bio}</p>
    <a href={`https://github.com/${developer.githubUsername}`}>Acessar perfil no GitHub</a>
  </li>
);

DeveloperItem.propTypes = {
  developer: PropTypes.shape({
    avatarUrl: PropTypes.string,
    name: PropTypes.string.isRequired,
    technologies: PropTypes.arrayOf(PropTypes.string),
    bio: PropTypes.string,
    githubUsername: PropTypes.string.isRequired,
  }).isRequired,
};

export default DeveloperItem;
