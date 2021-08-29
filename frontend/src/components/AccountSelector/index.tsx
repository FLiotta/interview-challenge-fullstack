// @Packages
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import cn from 'classnames';
import ReactTooltip from 'react-tooltip';
import dayjs from 'dayjs';

// @Project
import { useClickOutside } from 'hooks/useClickOutside';
import { Account } from 'interfaces';
import { selectAccounts } from 'selectors/accounts';

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
  const accounts: Account[] = useSelector(selectAccounts);

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
          <div className="account-dropdown__item-symbol">
            <span>{acc.currency?.symbol}</span>
          </div>
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
  const AccountSelectorRef = useRef<any>();

  useClickOutside(AccountSelectorRef, () => {
    setDropdownVisible(false)
  });

  const handleOnAccountSelect = (acc: Account) => {
    setDropdownVisible(false);
    onAccountSelect(acc);
    setSelectedAccount(acc);
  }

  useEffect(() => {
    ReactTooltip.rebuild();
  }, [selectedAccount])

  return (
    <div
      className="account-selector"
      onClick={() => setDropdownVisible(!dropdownVisible)}
      ref={AccountSelectorRef}
    >
      {dropdownVisible && (
        <AccountSelectorList
          selectedAccountId={selectedAccount?.id}
          onAccountSelect={handleOnAccountSelect}
        />
      )} 
      <div className="account-selector__image" data-for="ttip-solid-top" data-tip={selectedAccount?.currency?.name}>
        {selectedAccount && (
          <h1 className="account-selector__image-symbol">{selectedAccount.currency?.symbol}</h1>
        )}
      </div>
      {selectedAccount
        ? (
          <div className="account-selector__info">
            <div>
              <h4 className="account-selector__name" data-for="ttip-solid-right" data-tip="Nombre de la cuenta">{selectedAccount.name}</h4>
              <p className="account-selector__date" data-for="ttip-solid-right" data-tip="Fecha de creacion">
                <small>{dayjs(selectedAccount.created_at).format('DD MMM YYYY')}</small>
              </p>
            </div>
            <h4 className="account-selector__funds">
              {selectedAccount.currency?.symbol} {selectedAccount.funds}
            </h4>

          <h6 className="account-selector__id" data-for="ttip-solid-right" data-tip="Número de cuenta">#{selectedAccount.id}</h6>
          </div>
        )
        : (
          <div className="account-selector__placeholder">
            <h4 className="account-selector__placeholder-text">Selecciona una cuenta</h4>
          </div>
        )}
    </div>
  )
}

export default AccountSelector;