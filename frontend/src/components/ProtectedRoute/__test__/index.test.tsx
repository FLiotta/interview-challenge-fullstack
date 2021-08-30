// @Packages
import { render } from 'jest-utils';
import Cookie from 'universal-cookie';
import { createMemoryHistory } from 'history';
import { Router, Switch } from 'react-router-dom';

// @Project
import ProtectedRoute from '../index';
import { getByTestId } from '@testing-library/react';

const MockPage: React.FC = () => {
  return (
    <div data-testid="mock-page-testid">
      <p>Mock page</p>
    </div>
  )
}

describe('ProtectedRoute component', () => {
  it('Redirects to /auth on unauthorized', () => {
    const history = createMemoryHistory ({ initialEntries: ["/mockroute"] });

    render(
      <Router history={history}>
        <Switch>
          <ProtectedRoute path="/mockroute" component={MockPage} exact />
        </Switch>
      </Router>
    );

    expect(history.location.pathname).toBe('/auth');
  })

  it('Renders component when token is provided', () => {
    const MOCKUP_PAGE_ID = "mock-page-testid";
    const cookie = new Cookie();

    cookie.set('token', 'mock_token');

    const history = createMemoryHistory ({ initialEntries: ["/mockroute"] });

    const { container } = render(
      <Router history={history}>
        <Switch>
          <ProtectedRoute path="/mockroute" component={MockPage} exact />
        </Switch>
      </Router>
    );
      
    expect(history.location.pathname).toBe('/mockroute');

    const MockedPage = getByTestId(container, MOCKUP_PAGE_ID)
    expect(MockedPage).toBeInTheDocument();
  })
})