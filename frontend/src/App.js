import React, { useState } from 'react';
import './App.css';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import Auth from './pages/Auth';
import Events from './pages/Events';
import Bookings from './pages/Bookings';
import MainNavigation from './components/Navigation/MainNavigation';
import AuthContext from './contexts/auth-context';

function App() {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const login = (token, userId, tokenExpiration) => {
    setToken(token);
    setUserId(userId);
  };
  const logout = () => {
    setToken(null);
    setUserId(null);
  };
  return (
    <BrowserRouter>
      <AuthContext.Provider
        value={{
          token: token,
          userId: userId,
          login: login,
          logout: logout,
        }}
      >
        <MainNavigation />
        <main className="main-content">
          <Switch>
            {token && <Redirect path='/' to='/events' exact />}
            {token && <Redirect path='/auth' to='/events' exact />}
            {!token && <Route path='/auth' component={Auth} />}
            <Route path='/events' component={Events} />
            {token && <Route path='/bookings' component={Bookings} />}
            {!token && <Redirect to='/auth' exact />}
          </Switch>
        </main>
      </AuthContext.Provider>
    </BrowserRouter>
  );
}

export default App;
