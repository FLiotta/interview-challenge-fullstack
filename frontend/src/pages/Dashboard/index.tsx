// @Packages
import React, { useEffect, useState } from 'react';

// @Packages
import AccountSelector from 'components/AccountSelector';
import Balance from 'components/Balance';
import { Account } from 'interfaces';

// @Own
import './styles.scss';

const Dashboard: React.FC<any> = () => {
  const [selectedAccount, setSelectedAccount] = useState<Account | undefined>();

  useEffect(() => {
    document.title = "PiggyBank | Dashboard"
  }, []);

  const handleDeposit = () => { }
  const handleReceive = () => { }
  const handleSend = () => { }

  return (
    <div className="dashboard">
      <AccountSelector onAccountSelect={setSelectedAccount} />
      <div className="dashboard__ctas btn-group">
        <button
          disabled={!selectedAccount} 
          className="btn btn-brand-secondary"
          onClick={handleSend}
        >
          Enviar
        </button>
        <button
          disabled={!selectedAccount} 
          className="btn btn-brand-secondary"
          onClick={handleReceive}
        >
          Recibir
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