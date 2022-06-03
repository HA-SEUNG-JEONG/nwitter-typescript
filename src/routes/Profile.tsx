import { authService } from 'fBase';
import React from 'react';
import { useHistory } from 'react-router-dom';

const Profile: React.FunctionComponent = () => {
  const history = useHistory();
  const onLogOutClick = () => {
    authService.signOut();
    history.push('/');
  };

  return (
    <>
      <button onClick={onLogOutClick}>Sign Out</button>
    </>
  );
};

export default Profile;
