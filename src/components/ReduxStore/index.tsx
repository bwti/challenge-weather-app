import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { store, persistor } from '@store/index';

interface ReduxStoreProps {
  children: any;
}

const ReduxStore = (props: ReduxStoreProps) => {
  const { children } = props;

  if (!store || !persistor) {
    return null;
  }

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        {children}
      </PersistGate>
    </Provider>
  );
};

export { ReduxStore };
