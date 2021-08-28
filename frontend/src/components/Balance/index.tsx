// @Packages
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import cn from 'classnames';

// @Project
import { IThunkDispatch } from 'interfaces';
import { selectSessionId } from 'selectors/session';

// @Own
import { selectOperations } from './selectors';
import MockData from './mock_data.json';
import './styles.scss';

interface IProps {
  accountId?: number
}

const Balance: React.FC<IProps> = ({
  accountId,
}) => {
  const dispatch: IThunkDispatch = useDispatch();

  const sessionId = useSelector(selectSessionId);
  const operations = useSelector(selectOperations);

  useEffect(() => {

  }, [accountId]);

  return (
    <div className="balance">
      <div className="balance__body">
        <table className="table table-borderless table-responsive">
          <thead>
            <tr>
              <th>N°</th>
              <th>Fecha</th>
              <th>Receptor</th>
              <th>Tipo</th>
              <th>Total</th>
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
        {!operations.length && (
          <div className="balance__emptystate">
            <small>Aun no hay transacciones registradas.</small>
          </div>
        )}
      </div>
    </div>
  )
}

export default Balance;