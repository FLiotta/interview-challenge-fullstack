// @Packages
import { render, screen } from 'jest-utils';

// @Project
import { appendAccounts } from 'actions/accounts';
import store from 'store';
import AccountSelector from '../index';
import { Account } from 'interfaces';
import { fireEvent, getByTestId } from '@testing-library/react';

const accounts: Account[] = [
  {
    id: 1,
    owner_id: 1,
    name: "Mi billetera",
    currency_id: 2,
    funds: 500,
    deposit_address: "MKWEQROLQ"
  },
  {
    id: 2,
    owner_id: 1,
    name: "Ahorros",
    currency_id: 2,
    funds: 501,
    deposit_address: "MQKWEMQWX"
  }
];

describe('AccountSelector component', () => {
  beforeAll(() => {
    store.dispatch(appendAccounts(accounts));
  })
  
  it('Should match snapshot', () => {
    const { container } = render(
      <AccountSelector
        onAccountSelect={jest.fn}
      />
    );

    expect(container).toMatchSnapshot();
  });

  it('Opens selector on placeholder click', () => {
    render(
      <AccountSelector
        onAccountSelect={jest.fn}
      />
    );

    const selector = screen.getByTestId('account-selector-testid');

    fireEvent.click(selector);

    const dropdown = getByTestId(selector, 'account-dropdown-testid');

    expect(dropdown).toBeInTheDocument();
  });

  it('Loads accounts from redux store', () => {
    const mockFn = jest.fn();
    
    render(
      <AccountSelector
        onAccountSelect={mockFn}
      />
    );

    const selector = screen.getByTestId('account-selector-testid');

    fireEvent.click(selector);

    const accountsItems = screen.queryAllByTestId("account-item-testid");

    expect(accountsItems.length).toBe(accounts.length)
  });

  it('fires onAccountSelect', () => {
    const mockFn = jest.fn();
    
    render(
      <AccountSelector
        onAccountSelect={mockFn}
      />
    );

    const selector = screen.getByTestId('account-selector-testid');

    fireEvent.click(selector);

    const accountsItems = screen.queryAllByTestId("account-item-testid");

    fireEvent.click(accountsItems[0]);

    expect(mockFn).toHaveBeenCalledTimes(1);
  });
})