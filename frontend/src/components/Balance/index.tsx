// @Packages
import React, { useEffect, useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import cn from 'classnames';

// @Project
import { fetchOperationsNextPage } from 'actions/selectedAccount';
import { IThunkDispatch, Operation, Account } from 'interfaces';

// @Own
import './styles.scss';
import cogoToast from 'cogo-toast';
import { selectOperationsMetadata } from 'selectors/selectedAccounts';

interface IProps {
  accountId?: number,
  operations: Operation[],
  account?: Account
}

const Balance: React.FC<IProps> = ({
  accountId,
  account,
  operations
}) => {
  const dispatch: IThunkDispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  const operationsMetadata = useSelector(selectOperationsMetadata);

  const reachedEndOfResults = useMemo(() => {
    return operations.length >= operationsMetadata.total
  }, [operationsMetadata]);

  const handleLoadMoreOperations = () => {
    setLoading(true);

    dispatch(fetchOperationsNextPage())
      .then(() => setLoading(false))
      .catch(() => {
        cogoToast.error('Hubo un problema al buscar mas operaciones', {
          position: 'bottom-right'
        })
      })
  }

  return (
    <div className="balance">
      <div className="balance__body">
        <table className="table table-borderless table-responsive table-hover">
          <thead>
            <tr>
              <th>N°</th>
              <th>Fecha</th>
              <th>Tipo</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {operations.map((op) => (
              <tr key={`op_${op.id}`} className="balance__row">
                <th scope="row">{op.id}</th>
                <td>{op?.created_at}</td>
                <td>{op?.operation_type === 'transfer' ? 'Transferencia' : 'Deposito'}</td>
                <td
                  className={cn({
                    'balance__negative-amount': op.receiver_account_id !== account?.id,
                    'balance__positive-amount': op.receiver_account_id === account?.id,
                  })}
                >
                  {account?.currency?.symbol} {op.amount}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {!operations.length ? (
          <div className="balance__emptystate">
            <small>Aun no hay transacciones registradas.</small>
          </div>
        ) : (
          <button
            className="border-0 btn btn-brand-secondary w-100"
            onClick={handleLoadMoreOperations}
            disabled={reachedEndOfResults || loading}
          >
            {reachedEndOfResults ? 'Has llegado al final' : 'Cargar mas resultados'}
          </button>
        )}
      </div>
    </div>
  )
}

export default Balance;