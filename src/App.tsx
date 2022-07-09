import React, { useEffect } from 'react';
import SplashScreen from 'react-native-splash-screen';

import { ReduxStore } from '@components/ReduxStore';
import { Home } from '@screens/Home';

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <ReduxStore>
      <Home />
    </ReduxStore>
  );
};

export default App;
