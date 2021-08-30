// @Packages
import { getByTestId } from '@testing-library/react';
import { render, screen, done, fireEvent } from 'jest-utils';

// @Project
import ProfileBadge, { Menu, Option } from '../index';

describe('ProfileBadge component', () => {
  it('Should match snapshot', () => {
    const { container } = render(<ProfileBadge />);

    expect(container).toMatchSnapshot();
  });

  it('Should open menu on click', () => {
    const profileBadgeTestId = 'profilebadge-testid';
    const profileBadgeMenuTestId = 'profilebadge-menu-testid';

    const { container } = render(<ProfileBadge />);

    const profileBadge = getByTestId(container, profileBadgeTestId);

    fireEvent.click(profileBadge);

    const profileBadgeMenu = getByTestId(container, profileBadgeMenuTestId);
    
    expect(profileBadgeMenu).not.toBeNull();
  });

  it('Menu receives "options" prop', () => {
    const OPTIONS: Option[] = [
      {
        title: "Opcion 1",
        action: () => { }
      }
    ];

    const { container } = render(<Menu options={OPTIONS} />);
    const optionsNodes = container.getElementsByClassName("profilebadge__menu-item");

    expect(optionsNodes.length).toBe(OPTIONS.length)
  });

  it('Menu option action must be fired on click', () => {
    const MOCK_FN = jest.fn();
    const OPTIONS: Option[] = [
      {
        title: "Opcion 1",
        action: MOCK_FN
      }
    ];

    const { container } = render(<Menu options={OPTIONS} />);
    const optionNode = container.getElementsByClassName("profilebadge__menu-item")[0];

    fireEvent.click(optionNode);

    expect(MOCK_FN).toHaveBeenCalledTimes(1);
  })
})