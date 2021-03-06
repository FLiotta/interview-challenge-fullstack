// @Packages
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactTooltip from 'react-tooltip';

// @Project
import CreateAccountModal from 'components/CreateAccountModal';
import TransferMoneyModal from 'components/TransferMoneyModal';
import DepositModal from 'components/DepositModal';
import { selectProfile } from 'selectors/profile';
import AccountSelector from 'components/AccountSelector';
import Balance from 'components/Balance';
import { Account } from 'interfaces';
import { fetchAccounts, updateAccountValue } from 'actions/accounts';
import { selectAccount, fetchOperations } from 'actions/selectedAccount';
import { selectOperations, selectSelectedAccount } from 'selectors/selectedAccounts';

// @Own
import './styles.scss';
import cogoToast from 'cogo-toast';

const Dashboard: React.FC<any> = () => {
  const profile = useSelector(selectProfile);
  const selectedAccount = useSelector(selectSelectedAccount);
  const selectedOperations = useSelector(selectOperations);

  const [transferModalVisible, setTransferModalVisible] = useState<boolean>(false);
  const [depositModalVisible, setDepositModalVisible] = useState<boolean>(false);
  const [createAccountModalVisible, setCreateAccountModalVisible] = useState<boolean>(false);
  const dispatch = useDispatch();

  useEffect(() => {
    document.title = "PiggyBank | Dashboard"

    ReactTooltip.rebuild();
  }, []);

  const handleDeposit = () => { 
    if(selectedAccount) {
      setDepositModalVisible(true)
    }
  }

  const handleReceive = () => {
    const copyToClipboard = `Propietario: ${profile.first_name} ${profile.last_name}\nCuenta N°${selectedAccount?.id}\nDireccion para depositar: ${selectedAccount?.deposit_address}\nDivisa: ${selectedAccount?.currency?.name}`

    navigator.clipboard.writeText(copyToClipboard);

    cogoToast.success("La direccion de tu cuenta fue copiada a tu portapapeles!", {
      position: 'bottom-right'
    })
  }

  const handleSend = () => {
    setTransferModalVisible(true);
  }

  const onAccountSelect = (acc: Account) => {
    dispatch(selectAccount(acc));
    setTimeout(() => {
      dispatch(fetchOperations())
    }, 1);
  }

  const onDepositModalSuccess = (amountDeposited: number) => {
    if(selectedAccount) {
      dispatch(fetchOperations());
      dispatch(updateAccountValue(selectedAccount.id, amountDeposited, 'increase'))
    }
  }

  const onTransferModalSuccess = (transferedMount: number) => {
    if(selectedAccount) {
      setTransferModalVisible(false);
      dispatch(fetchOperations());
      dispatch((updateAccountValue(selectedAccount.id, transferedMount, 'decrease')));
    }
   }

  const onCreateAccountModalSuccess = () => {
    dispatch(fetchAccounts())
    setCreateAccountModalVisible(false);
  }

  return (
    <div className="dashboard">
      {selectedAccount && (
        <DepositModal
          visible={depositModalVisible}
          onClose={() => setDepositModalVisible(false)}
          onSuccess={onDepositModalSuccess}
          account={selectedAccount}
        />
      )}
      {selectedAccount && (
        <TransferMoneyModal
          visible={transferModalVisible}
          onClose={() => setTransferModalVisible(false)}
          onSuccess={onTransferModalSuccess}
          account={selectedAccount}
        />
      )}
      <CreateAccountModal
        visible={createAccountModalVisible}
        onClose={()=> setCreateAccountModalVisible(false)}
        onSuccess={onCreateAccountModalSuccess}
      />
      <div className="dashboard__upper-ctas">
        <button 
          className="btn btn-link btn-sm text-decoration-none"
          onClick={() => setCreateAccountModalVisible(true)}
        >
          Crear cuenta
        </button>
      </div>
      <AccountSelector onAccountSelect={onAccountSelect} />
      <div className="dashboard__ctas btn-group">
        <button
          disabled={!selectedAccount} 
          className="btn btn-brand-secondary"
          onClick={handleReceive}
          data-tip="Copiar direccion al portapapeles."
          data-for="ttip-solid-top"
        >
          Recibir
        </button>
        <button
          disabled={!selectedAccount} 
          className="btn btn-brand-secondary"
          onClick={handleSend}
        >
          Enviar
        </button>
        <button
          disabled={!selectedAccount} 
          className="btn btn-brand"
          onClick={handleDeposit}
        >
          Depositar
        </button>
      </div>
      <Balance
        operations={selectedOperations}
        account={selectedAccount}
      />
    </div>
  )
}

export default Dashboard;