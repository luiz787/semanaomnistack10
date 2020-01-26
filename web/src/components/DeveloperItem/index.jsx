import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

import './styles.css';

const DeveloperItem = ({ developer, onDelete }) => {
  const handleDelete = () => {
    const { githubUsername } = developer;
    onDelete(githubUsername);
  };

  return (
    <li className="dev-item">
      <header>
        <div className="user-data">
          <img src={developer.avatarUrl} alt={developer.name} />
          <div className="user-info">
            <strong>{developer.name}</strong>
            <span>{developer.technologies.join(', ')}</span>
          </div>
        </div>
        <IconButton
          aria-label="delete"
          onClick={handleDelete}
        >
          <DeleteIcon />
        </IconButton>
      </header>
      <p>{developer.bio}</p>
      <a href={`https://github.com/${developer.githubUsername}`}>Acessar perfil no GitHub</a>
    </li>
  );
};

DeveloperItem.propTypes = {
  developer: PropTypes.shape({
    avatarUrl: PropTypes.string,
    name: PropTypes.string.isRequired,
    technologies: PropTypes.arrayOf(PropTypes.string),
    bio: PropTypes.string,
    githubUsername: PropTypes.string.isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default DeveloperItem;
