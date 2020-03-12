import React, { Component, createContext, useContext } from 'react';
import PropTypes from 'prop-types';

const AuthContext = createContext();

class AuthProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
      user: null,
      loading: false,
    };
  }

  render() {
    return (
      <AuthContext.Provider value={{ state: this.state }}>
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}

// function withAuthContext(SomeComponent) {
//   return function UseAuth(props) {
//     return (
//       <AuthContext.Consumer>
//         {state => <SomeComponent {...props} context={state}></SomeComponent>}
//       </AuthContext.Consumer>
//     );
//   };
// }

function withAuthContext(childComponent) {
  return (
    <AuthContext.Consumer>
      {context => {
        if (context === undefined) {
          throw new Error('withAuthContext must be used within a AuthProvider');
        }
        return childComponent(context);
      }}
    </AuthContext.Consumer>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within a AuthProvider.');
  }
  return context;
}

export { AuthProvider, withAuthContext, useAuth };
