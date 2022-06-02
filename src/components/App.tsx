import React, { useState } from 'react';
import AppRouter from 'components/AppRouter';
import { authService } from '../fBase';

export interface LoggedData {
  isLoggedIn: boolean; //optional
}

const App: React.FunctionComponent = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(Boolean(authService.currentUser));

  return (
    <>
      <AppRouter isLoggedIn={isLoggedIn} />
      <footer>&copy; Twitter {new Date().getFullYear()}</footer>
    </>
  );
};

export default App;
