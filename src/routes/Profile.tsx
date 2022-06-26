import { authService, dbService } from '../fBase';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { getDocs } from 'firebase/firestore';
import { async } from '@firebase/util';
import { updateProfile, User } from 'firebase/auth';

interface ProfileProps {
  userObj: User;
}

const Profile = ({ userObj }: ProfileProps) => {
  const history = useHistory();
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName!);
  const onLogOutClick = () => {
    authService.signOut();
    history.push('/');
  };

  // const getMyTweets = async () => {
  //   const tweets = await dbService.collection('tweets').where('creatorId', '==', userObj.uid).orderBy('asc');
  //   const querySnapshot = await getDocs(tweets);
  //   querySnapshot.forEach((doc) => {
  //     console.log(doc.id, '=>', doc.data());
  //   });
  // };
  // useEffect(() => {
  //   getMyTweets();
  // }, []);

  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setNewDisplayName(value);
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (userObj.displayName !== newDisplayName) {
      const response = await updateProfile(userObj, { displayName: newDisplayName });
      console.log(response);
    }
  };
  return (
    <>
      <form onSubmit={onSubmit}>
        <input type="text" placeholder="Display Name" onChange={onChange} value={newDisplayName} />
        <input type="submit" value="Update Profile" />
      </form>
      <button onClick={onLogOutClick}>Sign Out</button>
    </>
  );
};

export default Profile;
