// @Packages
import React from 'react';
import { Switch, BrowserRouter, Route } from 'react-router-dom';

// @Project
import BaseLayout from 'components/BaseLayout';
import ProtectedRoute from 'components/ProtectedRoute';
import Auth from 'pages/Auth';
import Dashboard from 'pages/Dashboard';

const AppRouter: React.FC<any> = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/auth" component={Auth} />
      <BaseLayout>
        <ProtectedRoute path="/" component={Dashboard} exact />
      </BaseLayout>
    </Switch>
  </BrowserRouter>
)

export default AppRouter;