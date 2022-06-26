import { authService, dbService } from '../fBase';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { getDocs } from 'firebase/firestore';

interface ProfileProps {
  userObj: {
    uid: string;
  };
}

const Profile = ({ userObj }: ProfileProps) => {
  const history = useHistory();
  const onLogOutClick = () => {
    authService.signOut();
    history.push('/');
  };

  const getMyTweets = async () => {
    const tweets = await dbService.collection('tweets').where('creatorId', '==', userObj.uid).orderBy('asc');
    const querySnapshot = await getDocs(tweets);
    querySnapshot.forEach((doc) => {
      console.log(doc.id, '=>', doc.data());
    });
  };
  useEffect(() => {
    getMyTweets();
  }, []);
  return (
    <>
      <button onClick={onLogOutClick}>Sign Out</button>
    </>
  );
};

export default Profile;
