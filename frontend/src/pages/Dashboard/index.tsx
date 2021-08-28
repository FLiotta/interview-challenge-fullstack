// @Packages
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactTooltip from 'react-tooltip';

// @Project
import { selectProfile } from 'selectors/profile';
import AccountSelector from 'components/AccountSelector';
import Balance from 'components/Balance';
import { Account } from 'interfaces';
import { openDepositModal } from 'components/DepositModal/actions';

// @Own
import './styles.scss';
import cogoToast from 'cogo-toast';

const Dashboard: React.FC<any> = () => {
  const profile = useSelector(selectProfile);
  const [selectedAccount, setSelectedAccount] = useState<Account | undefined>();
  const dispatch = useDispatch();

  useEffect(() => {
    document.title = "PiggyBank | Dashboard"

    ReactTooltip.rebuild();
  }, []);

  const handleDeposit = () => { 
    if(selectedAccount) {
      dispatch(openDepositModal(selectedAccount));
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

  return (
    <div className="dashboard">
      <AccountSelector onAccountSelect={setSelectedAccount} />
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
      <Balance />
    </div>
  )
}

export default Dashboard;