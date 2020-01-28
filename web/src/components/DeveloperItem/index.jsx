import React, { useState } from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

import DeveloperEdit from '../DeveloperEdit';

import './styles.css';

const DeveloperItem = ({
  developer, onDelete, onEdit,
}) => {
  const [shouldOpenEditModal, setShouldOpenEditModal] = useState(false);

  const handleDelete = () => {
    const { githubUsername } = developer;
    onDelete(githubUsername);
  };

  const handleEdit = () => {
    setShouldOpenEditModal(true);
  };

  const renderEditModal = () => {
    if (shouldOpenEditModal) {
      return (
        <DeveloperEdit
          developer={developer}
          onModalClose={() => { setShouldOpenEditModal(false); }}
          onEdit={onEdit}
          onEditEnd={() => { setShouldOpenEditModal(false); }}
        />
      );
    }
    return null;
  };

  return (
    <>
      <li className="dev-item">
        <div className="dev-data">
          <header>
            <img src={developer.avatarUrl} alt={developer.name} />
            <div className="user-info">
              <strong>{developer.name}</strong>
              <span>{developer.technologies.join(', ')}</span>
            </div>
          </header>
          <p>{developer.bio}</p>
          <a href={`https://github.com/${developer.githubUsername}`}>Acessar perfil no GitHub</a>
        </div>
        <div className="actions">
          <IconButton
            aria-label="delete"
            onClick={handleDelete}
          >
            <DeleteIcon htmlColor="#999" />
          </IconButton>
          <IconButton
            aria-label="edit"
            onClick={handleEdit}
          >
            <EditIcon htmlColor="#999" />
          </IconButton>
        </div>
      </li>
      {renderEditModal()}
    </>
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
  onEdit: PropTypes.func.isRequired,
};

export default DeveloperItem;
