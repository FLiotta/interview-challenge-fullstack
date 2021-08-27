// @Packages
import React, { useEffect } from 'react';
import { Switch, BrowserRouter, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// @Project
import { selectSessionToken } from 'selectors/session';
import { fetchProfile } from 'actions/profile';

import BaseLayout from 'components/BaseLayout';
import ProtectedRoute from 'components/ProtectedRoute';
import Auth from 'pages/Auth';
import Dashboard from 'pages/Dashboard';

const AppRouter: React.FC<any> = () => {
  const dispatch = useDispatch();
  const sessionToken = useSelector(selectSessionToken);

  useEffect(() => {
    if(sessionToken) {
      dispatch(fetchProfile())
    }
  }, [sessionToken]);

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/auth" component={Auth} />
        <BaseLayout>
          <ProtectedRoute path="/" component={Dashboard} exact />
        </BaseLayout>
      </Switch>
    </BrowserRouter>
  )
}

export default AppRouter;