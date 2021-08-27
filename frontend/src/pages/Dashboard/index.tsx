// @Packages
import React from 'react';

// @Packages
import AccountSelector from 'components/AccountSelector';
import Balance from 'components/Balance';

// @Own
import './styles.scss';

const Dashboard: React.FC<any> = () => {
  return (
    <div className="dashboard">
      <AccountSelector />
      <div style={{ marginBottom: 25 }}></div>
      <Balance />
    </div>
  )
}

export default Dashboard;