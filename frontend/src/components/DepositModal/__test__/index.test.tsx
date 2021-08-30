// @Packages
import { getByTestId } from '@testing-library/react';
import { render, fireEvent } from 'jest-utils';
import ReactModal from 'react-modal';

// @Project
import { Account } from 'interfaces';
import DepositModal from '../index';
import ReactDOM from 'react-dom';

const MOCKACCOUNT: Account = {
  id: 1,
  funds: 0,
  deposit_address: "KQWEMRKFWEQRMKWQER"
}

describe('DepositModal component', () => {

  it('Should match snapshot', () => {
    const { container } = render(
      <DepositModal
        visible
        onClose={() => {}}
        onSuccess={() => {}}
        account={MOCKACCOUNT}
      />,
      { 
        container: document.body
      }
    )

    expect(container).toMatchSnapshot();
  });

  it('Fires onClose on close button click', () => {
    const mockedFn = jest.fn();
    const closeBtnTestId = 'depositmodal-closebtn-testid'
    
    const { container } = render(
      <DepositModal
        visible
        onClose={mockedFn}
        onSuccess={() => {}}
        account={MOCKACCOUNT}
      />, {
        container: document.body,
      }
    );

    const closeBtn = getByTestId(container, closeBtnTestId);

    fireEvent.click(closeBtn);

    expect(mockedFn).toHaveBeenCalledTimes(1);
  });
})