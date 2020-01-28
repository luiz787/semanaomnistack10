import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';

import './styles.css';

const modalStyle = () => {
  const top = 50;
  const left = 50;

  return {
    width: '50%',
    display: 'flex',
    flexDirection: 'column',
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
};

const PurpleButton = withStyles({
  root: {
    maxWidth: 100,
    alignSelf: 'center',
    backgroundColor: '#8e4dff',
    color: 'white',
    '&:hover': {
      backgroundColor: '#5a2ea6',
    },
  },
})(Button);

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #999',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const DeveloperEdit = ({
  developer, onModalClose, onEdit, onEditEnd,
}) => {
  const classes = useStyles();
  const [name, setName] = useState(developer.name);
  const [avatarUrl, setAvatarUrl] = useState(developer.avatarUrl);
  const [technologies, setTechnologies] = useState(developer.technologies.join(', '));
  const [bio, setBio] = useState(developer.bio || '');
  const [longitude, setLongitude] = useState(developer.location.coordinates[0]);
  const [latitude, setLatitude] = useState(developer.location.coordinates[1]);

  const handleSave = async (e) => {
    e.preventDefault();
    const dev = {
      name,
      avatarUrl,
      technologies: technologies.split(',').map((str) => str.trim()),
      bio,
      githubUsername: developer.githubUsername,
      latitude,
      longitude,
    };
    await onEdit(dev);
    onEditEnd();
  };

  return (
    <Modal
      open
      className={classes}
      onClose={onModalClose}
    >
      <form style={modalStyle()} className={`form ${classes.paper}`}>
        <TextField
          label="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          label="URL do avatar"
          value={avatarUrl}
          onChange={(e) => setAvatarUrl(e.target.value)}
        />
        <TextField
          label="Tecnologias"
          value={technologies}
          onChange={(e) => setTechnologies(e.target.value)}
        />
        <TextField
          label="Bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        />
        <TextField
          label="Latitude"
          value={latitude}
          onChange={(e) => setLatitude(e.target.value)}
        />
        <TextField
          label="Longitude"
          value={longitude}
          onChange={(e) => setLongitude(e.target.value)}
        />
        <PurpleButton
          variant="text"
          type="submit"
          onClick={handleSave}
          startIcon={<SaveIcon />}
        >
          Salvar
        </PurpleButton>
      </form>
    </Modal>
  );
};

DeveloperEdit.propTypes = {
  developer: PropTypes.shape({
    avatarUrl: PropTypes.string,
    name: PropTypes.string.isRequired,
    technologies: PropTypes.arrayOf(PropTypes.string),
    bio: PropTypes.string,
    githubUsername: PropTypes.string.isRequired,
    location: PropTypes.shape({
      coordinates: PropTypes.arrayOf(PropTypes.number),
    }),
  }).isRequired,
  onEditEnd: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onModalClose: PropTypes.func.isRequired,
};

export default DeveloperEdit;
