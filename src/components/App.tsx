import React, { useEffect, useState } from 'react';
import AppRouter from './AppRouter';
import { authService } from '../fBase';
import { User } from 'firebase/auth';

const App: React.FunctionComponent = () => {
  const [initialized, setInitialized] = useState(false);
  const [userObj, setUserObj] = useState<User | null>(null);
  useEffect(() => {
    authService.onAuthStateChanged((user: any) => {
      if (user) {
        setUserObj(user);
      } else {
        setUserObj(null);
      }
      setInitialized(true);
    });
  }, []);
  return (
    <>
      {initialized ? <AppRouter isLoggedIn={Boolean(userObj)} userObj={userObj!} /> : 'Initializing...'}
      <footer>&copy; {new Date().getFullYear()} Twitter</footer>
    </>
  );
};

export default App;
