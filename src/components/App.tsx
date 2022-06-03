import React, { useEffect, useState } from 'react';
import AppRouter from 'components/AppRouter';
import { authService } from '../fBase';

export interface LoggedData {
  isLoggedIn: boolean; //optional
}

const App: React.FunctionComponent = () => {
  const [initialized, setInitialized] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(Boolean(authService.currentUser));
  // console.log(authService.currentUser); //처음에는 null(비로그인 상태)

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      setInitialized(true);
    });
  }, []);
  return (
    <>
      {initialized ? <AppRouter isLoggedIn={isLoggedIn} /> : 'Initializing...'}
      <footer>&copy; Twitter {new Date().getFullYear()}</footer>
    </>
  );
};

export default App;
