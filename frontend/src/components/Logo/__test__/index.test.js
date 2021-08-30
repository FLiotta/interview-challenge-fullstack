// @Package
import { findByTestId, getByTestId, render } from '@testing-library/react';

// @Project
import Logo from '../index';

describe('Logo component', () => {
  it('Should match snapshot', () =>{
    const { container } = render(<Logo tag="p" />);

    expect(container).toMatchSnapshot();
  });

  it('Receives "className" prop', () => {
    const CLASSNAME = "prueba";
    
    const { container } = render(
      <Logo
        tag="p"
        className={CLASSNAME}
      />
    );

    expect(container.firstChild).toHaveClass(CLASSNAME);
  });

  it('Receives "tag" prop', () => {
    const TAG = "h1";

    const { container } = render(
      <Logo
        tag={TAG}
      />
    );

    const LogoWithTag = getByTestId(container, 'logo-testid');

    expect(LogoWithTag).toBeInTheDocument();
  });

  it('Receives "brandColor" prop', () => {
    const { container } = render(
      <Logo
        brandColor
        tag="h1"
      />
    );

    const LogoWithTag = getByTestId(container, 'logo-testid');

    expect(LogoWithTag).toHaveClass('logo--brand-color')
  })
});