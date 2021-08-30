// @Package
import { render, getByTestId } from '@testing-library/react';

// @Project
import Avatar from '../index';

describe('Avatar Component', () => {
  it('Should match snapshot', () => {
    const { container } = render(<Avatar />);

    expect(container).toMatchSnapshot();
  })

  it('Receives "width" prop', () => {
    const WIDTH = 50;
    
    const { container } = render(<Avatar width={WIDTH} />);

    const avatar = getByTestId(container, 'avatar-testid')

    expect(avatar.style.width).toBe(`${WIDTH}px`)
  })

  it('Receives "height" prop', () => {
    const HEIGHT = 50;
    
    const { container } = render(<Avatar height={HEIGHT} />);

    const avatar = getByTestId(container, 'avatar-testid')

    expect(avatar.style.height).toBe(`${HEIGHT}px`)
  })

  it('Receives "userId" prop', () => {
    const USERID = 500;

    const { container } = render(<Avatar userId={USERID} />)

    const avatarFill = getByTestId(container, 'avatar-fill-testid');

    expect(avatarFill).toHaveClass(`avatar__fill--${USERID}`);
  })
})