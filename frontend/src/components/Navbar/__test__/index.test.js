// @Package
import { render } from 'jest-utils';
import { Provider } from 'react-redux';

// @Project
import Navbar from '../index';

describe('Navbar component', () => {
  it('Should match snapshot', () => {
    const { container } = render(
      <Navbar />
    );

    expect(container).toMatchSnapshot();
  })
})