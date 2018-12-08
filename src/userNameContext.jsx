import React from 'react';

export const UserNameContext = React.createContext();

export const withUserName = (Component) => {
  const ConnectedComponent = props => (
    <UserNameContext.Consumer>
      {userName => <Component {...props} userName={userName} />}
    </UserNameContext.Consumer>
  );
  return ConnectedComponent;
};
