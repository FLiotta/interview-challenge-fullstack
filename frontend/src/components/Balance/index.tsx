// @Packages
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import cn from 'classnames';

// @Project
import { Operation } from 'interfaces';
import { selectSessionId } from 'selectors/session';

// @Own
import MockData from './mock_data.json';
import './styles.scss';

const Balance: React.FC<any> = () => {
  const sessionId = useSelector(selectSessionId);
  const [operations, setOperations] = useState<Operation[]>(MockData);

  return (
    <div className="balance">
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Date</th>
            <th scope="col">Receiver</th>
            <th scope="col">Amount</th>
          </tr>
        </thead>
        <tbody>
          {operations.map((op) => (
            <tr key={`op_${op.id}`}>
              <th scope="row">{op.id}</th>
              <td>{op.date}</td>
              <td>{op.receiver.id === sessionId ? 'You' : op.receiver.username}</td>
              <td
                className={cn({
                  'balance__negative-amount': op.receiver.id !== sessionId,
                  'balance__positive-amount': op.receiver.id === sessionId,
                })}
              >
                {op.amount}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Balance;