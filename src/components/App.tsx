import React, { useEffect, useState } from 'react';
import AppRouter from 'components/AppRouter';
import { authService } from '../fBase';

interface userObjData {
  [key: string]: any;
}

const App: React.FunctionComponent = () => {
  const [initialized, setInitialized] = useState(false);
  const [userObj, setUserObj] = useState<userObjData | null>(null);
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
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
      {initialized ? <AppRouter isLoggedIn={Boolean(userObj)} userObj={userObj} /> : 'Initializing...'}
      <footer>&copy; {new Date().getFullYear()} Hitter</footer>
    </>
  );
};

export default App;
