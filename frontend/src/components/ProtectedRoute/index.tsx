// @Packages
import cogoToast from 'cogo-toast';
import { Redirect, RouteComponentProps, Route } from 'react-router-dom';
import Cookie from 'universal-cookie';

interface IProps { 
  component: any,
  path?: string
  exact?: boolean,
};

const PrivateRoute: React.FC<IProps> = ({
  component: Component,
  ...rest
}) => {
  const cookie = new Cookie();
  const token = cookie.get('token');

  const validateSession: Function = (): React.ReactNode => {
    if(token) {
      return (
        <Route 
          {...rest} 
          render={(props: RouteComponentProps) => <Component {...rest} {...props} />}
        />
      )
    }
    
    cogoToast.warn("You need an account to access this page.", {
      position: 'bottom-right',
      renderIcon: () => '👮🏻‍♀️',
      hideAfter: 3
    });
    return <Redirect to="/auth" />
  }

  return validateSession();
};

export default PrivateRoute;
