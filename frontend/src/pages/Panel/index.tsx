// @Packages
import React, { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

// @Project
import CurrencyModal from 'components/CurrencyModal';
import { fetchCurrencies } from 'actions/app';
import { selectCurrencies } from 'selectors/app';

// @Own
import './styles.scss';
import { Currency } from 'interfaces';

interface IProps {

}

const Panel: React.FC<any> = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const currencies = useSelector(selectCurrencies);

  const [currencyModalVisible, setCurrencyModalVisible] = useState<boolean>(false);
  const [currencyToEdit, setCurrencyToEdit] = useState<Currency | undefined>();

  const onCurrencyModalSuccess = () => {
    dispatch(fetchCurrencies());
    setCurrencyModalVisible(false);
  }

  const onCurrencyModalClose = () => {
    setCurrencyModalVisible(false)
    setCurrencyToEdit(undefined);
  }

  const onCurrencyClick = (currency: Currency) => {
    setCurrencyToEdit(currency);
    setCurrencyModalVisible(true);
  }

  return (
    <div className="adminpanel">
      <CurrencyModal
        visible={currencyModalVisible}
        onClose={onCurrencyModalClose}
        onSuccess={onCurrencyModalSuccess}
        currency={currencyToEdit}
      />
      <div className="adminpanel__header">
        <button
          className="btn btn-sm btn-brand align-self-start"
          onClick={() => history.go(-1)}
        >
          Volver
        </button>
        <p className="adminpanel__description">
          En el panel de administrador podras gestionar la data de la aplicacion y consultar informacion sensible de la misma.
        </p>
      </div>
      <div className="adminpanel__panel">
        <div className="adminpanel__panel-header">
          <h5 className="adminpanel__panel-header-title">Divisas</h5>
          <div
            className="adminpanel__panel-header-cta"
            onClick={() => setCurrencyModalVisible(true)}
          >
            <FaPlus size={10}/>
          </div>
        </div>
        <div className="adminpanel__panel-body">
          <table className="table table-borderless table-hover table-responsive mt-4">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Simbolo</th>
              </tr>
            </thead>
            <tbody>
              {currencies.map((c) => (
                <tr
                  key={`adminpanel-currency-${c.id}`}
                  onClick={() => onCurrencyClick(c)}
                  className="adminpanel__row"
                >
                  <td>{c.id}</td>
                  <td>{c.name}</td>
                  <td>{c.symbol}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Panel;