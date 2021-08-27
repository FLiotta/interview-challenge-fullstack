// @Packages
import React, { useState } from 'react';
import cn from 'classnames';

// @Project
import { Account } from 'interfaces';
// @Own
import MockData from './mock_data.json';
import './styles.scss';

interface IAccountSelectorDropdown {
  selectedAccountId?: number,
  onAccountSelect: (acc: Account) => void
}

interface IAccountSelector {
  onAccountSelect: (acc: Account) => void
}

const AccountSelectorList: React.FC<IAccountSelectorDropdown> = ({
  selectedAccountId,
  onAccountSelect
}) => {
  const [accounts, setAccounts] = useState<Account[]>(MockData)

  return (
    <div className="account-dropdown">
      {accounts.map((acc) => (
        <div
          key={`${acc.id}`}
          onClick={() => onAccountSelect(acc)}
          className={cn("account-dropdown__item", {
            "account-dropdown__item--selected": acc.id === selectedAccountId
          })}
        >
          <h5 className="account-dropdown__item-symbol">{acc.currency?.symbol}</h5>
          <h5 className="account-dropdown__item-name">{acc.name}</h5>
          <h5 className="account-dropdown__item-funds">${acc.funds}</h5>
        </div>
      ))}
    </div>
  )
}

const AccountSelector: React.FC<IAccountSelector> = ({
  onAccountSelect
}) => {  
  const [selectedAccount, setSelectedAccount] = useState<Account | undefined>();
  const [dropdownVisible, setDropdownVisible] = useState<boolean>(false);

  const handleOnAccountSelect = (acc: Account) => {
    setDropdownVisible(false);
    onAccountSelect(acc);
    setSelectedAccount(acc);
  }

  return (
    <div
      className="account-selector"
      onClick={() => setDropdownVisible(!dropdownVisible)}
    >
      {dropdownVisible && (
        <AccountSelectorList
          selectedAccountId={selectedAccount?.id}
          onAccountSelect={handleOnAccountSelect}
        />
      )} 
      <div className="account-selector__image">
        {selectedAccount && (
          <h1 className="account-selector__image-symbol">{selectedAccount.currency?.symbol}</h1>
        )}
      </div>
      {selectedAccount
        ? (
          <div className="account-selector__info">
            <div>
              <h4 className="account-selector__name">{selectedAccount.name}</h4>
              <p className="account-selector__date">
                <small>18 Feb. 1999</small>
              </p>
            </div>
            <h4 className="account-selector__funds">
              {selectedAccount.currency?.symbol} {selectedAccount.funds}
            </h4>

          <h6 className="account-selector__id">#{selectedAccount.id}</h6>
          </div>
        )
        : (
          <div className="account-selector__placeholder">
            <h4 className="account-selector__placeholder-text">Select an account</h4>
          </div>
        )}
    </div>
  )
}

export default AccountSelector;