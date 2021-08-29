// @Packages
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactTooltip from 'react-tooltip';

// @Project
import DepositModal from 'components/DepositModal';
import { selectProfile } from 'selectors/profile';
import AccountSelector from 'components/AccountSelector';
import Balance from 'components/Balance';
import { Account } from 'interfaces';
import { openDepositModal } from 'components/DepositModal/actions';
import { selectAccount, fetchOperations } from 'actions/selectedAccount';
import { selectOperations, selectSelectedAccount } from 'selectors/selectedAccounts';

// @Own
import './styles.scss';
import cogoToast from 'cogo-toast';

const Dashboard: React.FC<any> = () => {
  const profile = useSelector(selectProfile);
  const selectedAccount = useSelector(selectSelectedAccount);
  const selectedOperations = useSelector(selectOperations);

  const [depositModalVisible, setDepositModalVisible] = useState<boolean>(false);

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
    // TODO: Remplazar por direccion cuando se edite el modelo
    const copyToClipboard = `Propietario: ${profile.first_name} ${profile.last_name}\nCuenta N°${selectedAccount?.id}\nDireccion para depositar: Panqueques.zapatilla.corbata\nDivisa: ${selectedAccount?.currency?.name}`

    navigator.clipboard.writeText(copyToClipboard);

    cogoToast.success("La direccion de tu cuenta fue copiada a tu portapapeles!", {
      position: 'bottom-right'
    })
  }

  const handleSend = () => { }

  const onAccountSelect = (acc: Account) => {
    dispatch(selectAccount(acc));
    dispatch(fetchOperations())
  }

  const onDepositModalSuccess = () => {
    dispatch(fetchOperations());
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